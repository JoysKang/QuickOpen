const fs = require("fs");

// 递归获取二进制文件
function readToolboxExecutableFile(path, filesList) {
    let files = fs.readdirSync(path);
    files.forEach(function (itm) {
        let stat = fs.lstatSync(path + itm);
        const absolutePath = path + itm
        if (stat.isDirectory()) {
            readToolboxExecutableFile(absolutePath + "/", filesList)
        } else{
            if (absolutePath.indexOf("/MacOS/") !== -1) {
                filesList.push(absolutePath)
            }
        }
    })

    return filesList
}


module.exports = {
    readToolboxExecutableFile
};