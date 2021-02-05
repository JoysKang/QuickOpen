const fs = require("fs");
const {exec} = require("child_process");
const parsers = require('./parsers');
const config = require('./config');


/*******************
 * 打开历史项目的功能 *
 *******************/
let recentProjects = [];
let allHistory = [];
let deDuplication = []; // 过滤重复


// 搜索 JetBrains 的历史项目文件
function readFileList(path, filesList) {
    let files = fs.readdirSync(path);
    files.forEach(function (itm) {
        let stat = fs.statSync(path + itm);
        if (stat.isDirectory() && (path + itm).indexOf("options")) {
            readFileList(path + itm + "/", filesList)
        } else {
            if (itm === "recentProjects.xml" || itm === "recentSolutions.xml") {
                filesList.push(path + itm);
            }
        }
    })
    return filesList
}


// 查找项目历史文件
function serarchFiles(element) {
    // JetBrains 中 Rider 使用的是 recentSolutions.xml 其他 IDE 使用的是 recentProjects.xml
    // 判断是文件还是文件夹
    if (element[element.length - 1] !== "/") {    // 文件
        return [config.home.concat(element)]
    }

    // JetBrains 文件夹
    if (element.indexOf("JetBrains") !== -1) {
        return readFileList(config.home.concat(element), [])
    }
}


// 读取项目历史文件
function getFileContent(element) {
    if (element.indexOf("JetBrains") !== -1) {  // JetBrains
        return parsers.jetBrainsParsers(element, deDuplication)
    } else if (element.indexOf("Code/storage.json") !== -1) {   // vscode
        return parsers.vscodeParsers(element, deDuplication)
    } else if (element.indexOf("sublime_session") !== -1) {   // sublime
        return parsers.sublimeParsers(element, deDuplication)
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
    allHistory = []
    deDuplication = []

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
            await getHistory();
            callbackSetList(allHistory);
        },

        search: (action, searchWord, callbackSetList) => {
            if (!searchWord) return callbackSetList(allHistory);
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

            return callbackSetList(title_list.concat(description_list));
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
//     console.log(allHistory)
//     await getHistory()
//     console.log(allHistory[0])
//     console.log(allHistory[1])
// })()
