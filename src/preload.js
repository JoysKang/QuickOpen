const { exec, execSync } = require("child_process");
const parsers = require('./parsers');
const config = require('./config');


/*******************
 * 打开历史项目的功能 *
 *******************/
let allHistory = [];
function getHistory() {
    // 遍历目录下获取所有的 recentProjects.xml 文件
    let recentProjects = []
    config.ideHistoryDir.forEach(function (element) {
        const files = execSync("find " + config.home + element + " -name '*recentProjects*'");
        const str = files.toString("utf8").trim();
        recentProjects.push(...str.split(/[\n|\r\n]/))
    })

    // 读取所有的文件的配置
    recentProjects.forEach(function (element) {
        if (element.indexOf("JetBrains") !== -1) {
            allHistory.push(...parsers.jetBrainsParsers(element))
        }
    })

    allHistory = allHistory
        .sort((item1, item2) => item2.openTimestamp - item1.openTimestamp)
}


let History = {
    mode: "list",
    args: {
        enter: (action, callbackSetList) => {
            allHistory = []
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
            const command = `"${cmd}" "${itemData.description}"`;
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
