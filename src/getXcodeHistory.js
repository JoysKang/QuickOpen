const { execFileSync } = require('child_process');
const config = require('./config')
const fs = require('fs')


function getXcodeHistory() {
    // 判断 com.apple.dt.xcode.sfl2 文件是否存在
    let filePath = "/Library/Application\ Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/com.apple.dt.xcode.sfl2"
    filePath = config.home.concat(filePath)
    try {
        fs.statSync(filePath)
    } catch (e) {
        return [];
    }

    const cmd = __dirname + '/readXcode'
    let stdout = execFileSync(cmd);
    stdout = JSON.parse(stdout.toString().replaceAll("'", '"'))
    // console.log(stdout)
    return stdout;
}


module.exports = {
    getXcodeHistory
};


// console.time('test')
// getXcodeHistory();
// console.timeEnd('test')

