const fs = require("fs");

// 递归获取二进制文件
function readToolboxExecutableFile(path, filesList) {
    let files = fs.readdirSync(path);
    files.forEach(function (itm) {
        let stat = fs.lstatSync(path + itm);
        const absolutePath = path + itm
        if (absolutePath.indexOf('plugins') > -1 ||
            absolutePath.indexOf('Resources') > -1 ||
            absolutePath.indexOf('lib') > -1 ||
            absolutePath.indexOf('license') > -1 ||
            absolutePath.indexOf('jbr') > -1 ||
            absolutePath.indexOf('bin') > -1 ||
            absolutePath.indexOf('_CodeSignature') > -1
        ) {
            return
        }
        if (stat.isDirectory()) {
            readToolboxExecutableFile(absolutePath + "/", filesList)
        } else{
            if (absolutePath.indexOf("/MacOS/") !== -1) {
                filesList.push({"absolutePath": absolutePath, "atimeMs": stat.atimeMs});
            }
        }
    })

    return filesList
}


module.exports = {
    readToolboxExecutableFile
};