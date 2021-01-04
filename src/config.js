// home
const home = utools.getPath("home")

// 配置
const ideHistoryDir = [
    // 多添加一个 \ 是防止下边字符串拼接时被转义
    "/Library/Application\\ Support/JetBrains"
]

// mac 下 IDE 的可执行文件地址
const executableFile = {
    "pycharm": "/Applications/PyCharm.app/Contents/MacOS/pycharm",
    "webstorm": "/Applications/WebStorm.app/Contents/MacOS/webstorm",
    "goland": "/Applications/GoLand.app/Contents/MacOS/goland",
    // "idea": "/Applications/GoLand.app/Contents/MacOS/idea"
}

// icon
icons = {
    "idea": "icons/IntelliJ IDEA.png",
    "androidstudio": "icons/android-studio.png",
    "pycharm": "icons/PyCharm.png",
    "pycharmedu": "icons/pycharm-edu.png",
    "webstorm": "icons/WebStorm.png",
    "phpstorm": "icons/PhpStorm.png",
    "goland": "icons/GoLand.png",
    "appcode": "icons/AppCode.png",
    "clion": "icons/CLion.png",
    "rubymine": "icons/RubyMine.png"
}


module.exports = {
    home,
    ideHistoryDir,
    executableFile,
    icons
};

