// home
const home = utools.getPath("home")
// const home = "/Users/joys/"


// 配置
const ideHistoryDir = [
    // 多添加一个 \ 是防止下边字符串拼接时被转义
    "/Library/Application\\ Support/JetBrains"
]


// mac 下 IDE 的可执行文件地址
const executableFile = {
    "appcode": "/Applications/AppCode.app/Contents/MacOS/appcode",
    "clion": "/Applications/CLion.app/Contents/MacOS/clion",
    "datagrip": "/Applications/DataGrip.app/Contents/MacOS/datagrip",
    "goland": "/Applications/GoLand.app/Contents/MacOS/goland",
    "idea": "/Applications/IntelliJ\ IDEA.app/Contents/MacOS/idea",
    "phpstorm": "/Applications/PhpStorm.app/Contents/MacOS/phpstorm",
    "pycharm": "/Applications/PyCharm.app/Contents/MacOS/pycharm",
    "rider": "/Applications/Rider.app/Contents/MacOS/rider",
    "rubymine": "/Applications/RubyMine.app/Contents/MacOS/rubymine",
    "webstorm": "/Applications/WebStorm.app/Contents/MacOS/webstorm"
}


// icon
icons = {
    "appcode": "icons/AppCode.png",
    "clion": "icons/Clion.png",
    "datagrip": "icons/DataGrip.png",
    "goland": "icons/GoLand.png",
    "idea": "icons/IntelliJ IDEA.png",
    "phpstorm": "icons/PhpStorm.png",
    "pycharm": "icons/PyCharm.png",
    "rider": "icons/Rider.png",
    "rubymine": "icons/RubyMine.png",
    "webstorm": "icons/WebStorm.png"
}


module.exports = {
    home,
    ideHistoryDir,
    executableFile,
    icons
};

