const { execFileSync } = require('child_process');
const config = require('./config')
const fs = require('fs')
const path = require('path');


function getXcodeHistory() {
    // utools.dbStorage.removeItem("lastTime")
    // utools.dbStorage.removeItem("stdout")

    // 先加权限
    let readXCodePath = path.join(__dirname.replace(/([a-f0-9]{32}.asar)/, "$1.unpacked"), "/readXcode").replaceAll("'", '"')
    fs.access(readXCodePath, fs.constants.X_OK, err => {
        if (err) fs.chmodSync(readXCodePath, 0o755)
    })

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

    let stdout = "[]"
    try {
        stdout = execFileSync(readXCodePath)
    } catch (e) {
        utools.showNotification(e.toString())
        utools.showNotification(e.toString().slice(-100))
        return [];
    }

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

