const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
const config = require('./config')

const ideNames = Object.keys(config.executableFile)

// 过去 ide 的名称
function getIdeName(fileName) {
    let ideName = "";
    for (const item of ideNames) {
        if (fileName.toLowerCase().indexOf(item) !== -1) {
            ideName = item
            break
        }
    }
    return ideName
}


// 获取可执行文件的绝对路径
function getExecutableFile(key) {
    return config.executableFile[key]
}


// 获取 icon
function getIcon(key) {
    return config.icons[key]
}


let parser = new xml2js.Parser();
function jetBrainsParsers(fileName) {
    if (fileName.indexOf('PyCharm') === -1) {
        return []
    }

    let projectList = []
    const ideName = getIdeName(fileName)
    const executableFile = getExecutableFile(ideName)
    const icon = getIcon(ideName)
    const data = fs.readFileSync(fileName)
    parser.parseString(data, function (err, result) {
        const component = result.application.component[0];
        const option =
            component.option[
                component.option.findIndex((item) => item.$.name == "additionalInfo") // 获取 name="additionalInfo" 的 option 元素
                ];
        option.map[0].entry.map((item) => {
            const options = item.value[0].RecentProjectMetaInfo[0].option;
            // const projectPath = item.$.key
            const projectPath = item.$.key.replace("$USER_HOME$", utools.getPath("home"))   // "$USER_HOME$" 得替换成用户的家目录
            projectList.push({
                ideName: ideName,
                icon: icon,
                executableFile: executableFile,
                description: projectPath,
                openTimestamp: options[options.findIndex((item) => item.$.name == "projectOpenTimestamp")].$.value, // 获取 name="projectOpenTimestamp" 的 option 元素的 value 值
                title: path.basename(projectPath)

            });
        });
     });
    return projectList;
}


module.exports = {
    jetBrainsParsers,
};


// jetBrainsParsers("/Users/joys/Library/Application\ Support/JetBrains/PyCharm2020.3/options/recentProjects.xml")

