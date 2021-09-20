const { execSync } = require('child_process');
const {isEmpty, isNil} = require('licia');
const config = require("./config");
const fs = require('fs')


function generateScript(configPath) {
    return `osascript -e "use framework \\"Foundation\\"
        use scripting additions
        property |⌘| : a reference to current application
        set documentPaths to {}
        try
          set recentDocumentsPath to \\"${configPath}\\"
          set plistData to |⌘|'s NSData's dataWithContentsOfFile:recentDocumentsPath
          set recentDocuments to |⌘|'s NSKeyedUnarchiver's unarchiveObjectWithData:plistData
          repeat with doc in (recentDocuments's objectForKey:\\"items\\")
            set documentBookmark to (doc's objectForKey:\\"Bookmark\\")
            set {documentURL, resolveError} to (|⌘|'s NSURL's URLByResolvingBookmarkData:documentBookmark options:0 relativeToURL:(missing value) bookmarkDataIsStale:(missing value) |error|:(reference))
            if resolveError is missing value then
              set end of documentPaths to documentURL's |path|() as string
            end if
          end repeat
          documentPaths as list
        on error
          {}
        end try"
        `
}


function readXcodeHistory() {
    // utools.dbStorage.removeItem("lastTime")
    // utools.dbStorage.removeItem("stdout")

    // 判断 com.apple.dt.xcode.sfl2 文件是否存在
    let configPath = "/Library/Application\ Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/com.apple.dt.xcode.sfl2"
    configPath = config.home.concat(configPath)

    try {
        const stat = fs.statSync(configPath)
        const lastTime = utools.dbStorage.getItem("lastTime")
        // 不常使用，使用数据库记录(缓存)
        if (stat && stat.mtimeMs === lastTime) {
            return utools.dbStorage.getItem("stdout")
        } else {
            utools.dbStorage.setItem("lastTime", stat.mtimeMs)
        }
    } catch (e) {   // 不使用 xcode 直接跳过
        console.log(e)
        return [];
    }

    let result = execSync(generateScript(configPath), {encoding: 'utf-8'})
    if (!isNil(result) && !isEmpty(result)) {
        const paths = result.split(',').map(p => p.trim());
        utools.dbStorage.setItem("stdout", paths)
        return paths
    }

    return [];
}


// const configPath = "/Users/joys/Library/Application Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/com.apple.dt.xcode.sfl2"
// read(configPath)


module.exports = {
    readXcodeHistory
};