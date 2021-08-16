// 当前脚本依赖于 objc 库，当期 objc 库 只支持node 8~11版本
const objc = require('objc');

let receurlList = []
const userHome = process.env.HOME
const fileName = userHome + "/Library/Application\ Support/com.apple.sharedfilelist/com.apple.LSSharedFileList.ApplicationRecentDocuments/com.apple.dt.xcode.sfl2";

const {
    NSData,
    NSURL,
    NSString,
    NSKeyedUnarchiver
} = objc;

const path = NSString.stringWithString(fileName);
const url = NSURL.fileURLWithPath(path)
const data = NSData.dataWithContentsOfURL(url)
if (!data) {
    console.log(receurlList);
    return;
}

const recentListInfo = NSKeyedUnarchiver.unarchiveObjectWithData(data)
const recentList = recentListInfo.objectForKey("items")

for (let i = recentList.count() - 1; i >= 0; i--) {
    const firstObj = recentList.objectAtIndex(i)
    const bookmarkData = firstObj.objectForKey("Bookmark")
    let receurl = NSURL.URLByResolvingBookmarkData_options_relativeToURL_bookmarkDataIsStale_error(bookmarkData, 1 << 8, null, null, null)
    if (receurl) {
        receurl = String(receurl)
        receurlList.push(receurl)
    }
}
console.log(receurlList)
