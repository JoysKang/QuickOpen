const exec = require('child_process').execSync;
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
        const files = exec("find " + element + " -name '*recentProjects*'");
        const str = files.toString("utf8").trim();
        recentProjects = str.split(/[\n|\r\n]/)
    })

    // 读取所有的文件的配置
    recentProjects.forEach(function (element) {
        allHistory.push(...parsers.parsers(element))
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
