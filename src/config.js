// home
// const home = utools.getPath("home")
const home = "/Users/joys"


// 配置
const ideHistory = [
    // 文件夹多添加一个 \ 是防止下边字符串拼接时被转义
    "/Library/Application\ Support/JetBrains/",
    "/Library/Application\ Support/Code/storage.json",
    "/Library/Application\ Support/Sublime\ Text/Local/Session.sublime_session",
    "/Library/Application\ Support/Google/"
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
    "webstorm": "/Applications/WebStorm.app/Contents/MacOS/webstorm",
    "vscode": "/Applications/Visual\ Studio\ Code.app/Contents/MacOS/Electron",
    "sublime": "/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl",
    "studio": "/Applications/Android\ Studio.app/Contents/MacOS/studio"
}


// icon
icons = {
    "appcode": "icons/AppCode.png",
    "clion": "icons/CLion.png",
    "datagrip": "icons/DataGrip.png",
    "goland": "icons/GoLand.png",
    "idea": "icons/IntelliJ IDEA.png",
    "phpstorm": "icons/PhpStorm.png",
    "pycharm": "icons/PyCharm.png",
    "rider": "icons/Rider.png",
    "rubymine": "icons/RubyMine.png",
    "webstorm": "icons/WebStorm.png",
    "vscode": "icons/Visual Studio Code.png",
    "sublime": "icons/sublime-text.png",
    "studio": "icons/studio.png",
}


module.exports = {
    home,
    ideHistory,
    executableFile,
    icons
};

