const {exec, execSync} = require("child_process");
const parsers = require('./parsers');
const config = require('./config');


/*******************
 * 打开历史项目的功能 *
 *******************/
let allHistory = [];
let deDuplication = []; // 过滤重复

function getHistory(reload= 0) {
    let recentProjects = []
    allHistory = []
    deDuplication = []

    // 遍历目录下获取所有的 recentProjects.xml 文件
    config.ideHistoryDir.forEach(function (element) {
        // JetBrains 中 Rider 使用的是 recentSolutions.xml 其他 IDE 使用的是 recentProjects.xml
        const findCmd = "find ".concat(config.home, element,
            " \\( -name 'recentProjects.xml' -o -name 'recentSolutions.xml' \\)")

        const files = execSync(findCmd);
        const str = files.toString("utf8").trim();
        recentProjects.push(...str.split(/[\n|\r\n]/))
    })

    // 读取所有的文件的配置
    recentProjects.forEach(function (element) {
        if (element.indexOf("JetBrains") !== -1) {
            allHistory.push(...parsers.jetBrainsParsers(element, deDuplication))
        }
    })

    allHistory = allHistory
        .sort((item1, item2) => item2.openTimestamp - item1.openTimestamp)
}


let History = {
    mode: "list",
    args: {
        enter: (action, callbackSetList) => {
            getHistory();
            callbackSetList(allHistory);
        },

        search: (action, searchWord, callbackSetList) => {
            if (!searchWord) return allHistory;
            return callbackSetList(allHistory.filter((x) =>
                x.description.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1));
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

// getHistory()
// const command = `"/Applications/PyCharm.app/Contents/MacOS/pycharm" "/Users/joys/work/code/tb_api/cms"`;
// exec(command, (err) => {
//     if (err) utools.showNotification("不是有效的可执行程序");
// }); // 这种命令必须异步执行
