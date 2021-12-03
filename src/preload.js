const fs = require("fs");
const {exec} = require("child_process");
const parsers = require('./parsers');
const config = require('./config');


/*******************
 * 打开历史项目的功能 *
 *******************/
let recentProjects = [];
let allHistory = [];
let ideNames = Object.keys(config.icons)


// 搜索 JetBrains 的历史项目文件
function readFileList(path, filesList) {
    let files = fs.readdirSync(path);
    files.forEach(function (itm) {
        let stat = fs.lstatSync(path + itm);
        const absolutePath = path + itm
        if (stat.isDirectory()) {

            // 过滤 AndroidStudiox.x 下的非 options 目录
            if (absolutePath.indexOf("Google") !== -1 &&
                absolutePath.indexOf("AndroidStudio") === -1 &&
                absolutePath.indexOf("options") === -1) {
                return;
            }

            // 过滤 JetBrains 下的非 options 目录
            if (absolutePath.indexOf("JetBrains") !== -1 &&
                // !/\d/.test(absolutePath) &&
                // 排除 JetBrains 下第一级的目录
                absolutePath.split('/').indexOf('JetBrains') !== absolutePath.split('/').length - 2 &&
                absolutePath.indexOf("options") === -1) {
                return;
            }

            readFileList(absolutePath + "/", filesList)
        } else if (itm === "recentProjects.xml" || itm === "recentSolutions.xml"){
            filesList.push({"absolutePath": absolutePath, "atimeMs": stat.atimeMs});
        }
    })
    return filesList
}


// 查找项目历史文件
function serarchFiles(element) {
    // xcode
    if (element.indexOf("xcode") !== -1) {
        return [element]
    }

    // JetBrains 中 Rider 使用的是 recentSolutions.xml 其他 IDE 使用的是 recentProjects.xml
    // 判断是文件还是文件夹
    if (element[element.length - 1] !== "/") {    // 文件
        return [config.home.concat(element)]
    }

    if (element.indexOf("Google") !== -1) {
        const files = readFileList(config.home.concat(element), [])
        return files.map(file => file.absolutePath)
    }

    // JetBrains && AndroidStudio 文件夹
    if (element.indexOf("JetBrains") !== -1) {
        let files = [];
        let ides = new Set()
        let allRecentProjects = readFileList(config.home.concat(element), [])
        console.log(allRecentProjects, "////")

        // 先排序，后遍历，排除重复
        allRecentProjects.sort(function(a, b){return b.atimeMs - a.atimeMs});
        for (let i = 0; i < allRecentProjects.length; i++) {
            const absolutePath = allRecentProjects[i].absolutePath;
            const ideStr = absolutePath.split("JetBrains/")[1].substring(0, 4)
            if (!ides.has(ideStr)) {
                files.push(absolutePath)
                ides.add(ideStr)
            }
        }

        return files;
    }
}


// 读取项目历史文件
function getFileContent(element) {
    try {
        if (element.indexOf("AndroidStudio") !== -1 ||
            element.indexOf("JetBrains") !== -1) {// JetBrains、androidstudio
            return parsers.jetBrainsParsers(element)
        } else if (element.indexOf("Code/storage.json") !== -1) {   // vscode
            return parsers.vscodeParsers(element)
        } else if (element.indexOf("sublime_session") !== -1) {   // sublime
            return parsers.sublimeParsers(element)
        } else if (element.indexOf("xcode") !== -1) {   // xcode
            return parsers.xcodeParsers()
        }
    } catch (err) {
        console.log(err)
        utools.showNotification(err);
    }

}


// 项目异步迭代器
let asyncHistoryIterable = {
    [Symbol.asyncIterator]() {
        return {
            i: 0,
            next() {
                if (this.i < config.ideHistory.length) {
                    return Promise.resolve({
                        value: serarchFiles(config.ideHistory[this.i++]),
                        done: false
                    });
                }

                return Promise.resolve({done: true});
            }
        };
    }
};


// 历史文件异步迭代器
let asyncFileHistoryIterable = {
    [Symbol.asyncIterator]() {
        return {
            i: 0,
            next() {
                if (this.i < recentProjects.length) {
                    return Promise.resolve({
                        value: getFileContent(recentProjects[this.i++]),
                        done: false
                    });
                }

                return Promise.resolve({done: true});
            }
        };
    }
};


async function getHistory() {
    recentProjects = []
    allHistory = []

    // 遍历目录下获取所有的 recentProjects.xml 文件
    for await (element of asyncHistoryIterable) {
        recentProjects.push(...element)
    }

    // 读取所有的文件的配置
    for await (element of asyncFileHistoryIterable) {
        allHistory.push(...element)
    }

    allHistory = allHistory
        .sort((item1, item2) => item2.openTimestamp - item1.openTimestamp)
}


let History = {
    mode: "list",
    args: {
        enter: async (action, callbackSetList) => {
            // console.time('start')
            await getHistory();
            // console.timeEnd('start')
            callbackSetList(allHistory);
        },

        search: (action, searchWord, callbackSetList) => {
            if (!searchWord) return callbackSetList(allHistory);

            let searchResult = []
            // 通过:pycharm、:webstorm等关键字直接搜索相对应IDE的历史记录
            if (searchWord.startsWith(':')) {
                const key = searchWord.split(':')[1].toLowerCase()
                let keyList = []
                for (let i=0; i<ideNames.length; i++) {
                    const item = ideNames[i]
                    if (item.indexOf(key.toLowerCase()) !== -1) {
                        keyList.push(item)
                    }
                }
                searchResult = allHistory.filter((history) => keyList.indexOf(history.ideName) !== -1)
            } else {
                // 搜索后排序(优先根据 title 显示)
                let title_list = [];    // 根据 title 筛选出来的结果(优先显示)
                let description_list = [];  // 根据 description 筛选出来的结果
                for (let i=0; i<allHistory.length; i++) {
                    const item = allHistory[i]
                    if (item.title.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) {
                        title_list.push(item)
                    } else if (item.description.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) {
                        description_list.push(item)
                    }
                }
                searchResult = title_list.concat(description_list)
            }

            return callbackSetList(searchResult);
        },

        select: (action, itemData) => {
            const cmd = itemData.executableFile;
            let command = `"${cmd}" "${itemData.description}"`;
            if (cmd.indexOf("datagrip") !== -1) {   // datagrip 没有历史项目，直接打开 datagrip
                command = `"${cmd}"`;
            }
            exec(command, (err) => {
                if (err) utools.showNotification(err);
            });

            utools.outPlugin();     // 关闭插件
            utools.hideMainWindow();    // 隐藏 uTools 窗口
        },
    },
};


/**
 * 导出
 */
window.exports = {
    History
};

// (async () => {
//     console.time('test')
//     await getHistory();
//     console.log(allHistory)
//     console.timeEnd('test')
// })()
