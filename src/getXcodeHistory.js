const { execFileSync } = require('child_process');
const config = require('./config')
const fs = require('fs')


function getXcodeHistory() {
    // 判断 com.apple.dt.xcode.sfl2 文件是否存在
    let filePath = "/Library/Application\ Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/com.apple.dt.xcode.sfl2"
    filePath = config.home.concat(filePath)
    try {
        const stat = fs.statSync(filePath)
        const lastTime = utools.dbStorage.getItem("lastTime")
        // 不常使用，使用数据库记录(缓存)
        if (stat && stat.mtimeMs === lastTime) {
            return utools.dbStorage.getItem("stdout")
        } else {
            utools.dbStorage.setItem("lastTime", stat.mtimeMs)
        }
    } catch (e) {   // 不使用 xcode 直接跳过
        return [];
    }

    const cmd = __dirname + '/readXcode'
    let stdout = execFileSync(cmd);
    stdout = JSON.parse(stdout.toString().replaceAll("'", '"'))
    utools.dbStorage.setItem("stdout", stdout)
    // console.log(stdout)
    return stdout;
}


module.exports = {
    getXcodeHistory
};


// console.time('test')
// getXcodeHistory();
// console.timeEnd('test')

