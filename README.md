# QuickOpen

### 简介

使用 uTools 工具快速打开历史项目, 支持 JetBrains、vscode、sublime、AndroidStudio、 Xcode。

该项目仅支持 macOS，暂不考虑支持Linux、window系统，如果你有需要可以使用[uTools-plugins](https://github.com/marsvet/uTools-plugins/tree/master/utools-jetbrains-history), 本项目就是参考该项目进行开发的

本项目地址：[https://github.com/JoysKang/QuickOpen](https://github.com/JoysKang/QuickOpen)  
uTools-plugins项目地址：[https://github.com/marsvet/uTools-plugins/tree/master/utools-jetbrains-history](https://github.com/marsvet/uTools-plugins/tree/master/utools-jetbrains-history)  
uTools帖子地址：[QuickOpen](https://yuanliao.info/d/4072-quickopen-xcode)

### 缺点
1. 只支持 Mac；
2. 如果你经常使用 Xcode 开发，会发现启动的时间会稍长，约 600ms 左右；

### 感谢
这里能够添加 Xcode 的支持，少不了 [dacaiguoguo](https://github.com/dacaiguoguo) 大佬的帮助，这里特地列出来表示感谢。

### 食用

1. 安装后直接使用关键字 history 即可唤醒插件；
   ![](https://joys.oss-cn-shanghai.aliyuncs.com/mark_images/WechatIMG297.png)
2. 现支持JetBrains、vscode、AndroidStudio、sublime；
3. 搜索栏中通过:pycharm、:webstorm等关键字直接搜索相对应IDE的历史记录；
4. 如果项目已不存在，已在搜索结果中标记出"路径不存在"提示；
5. 搜索结果优先显示项目名称显示的结果；

### Todo

- [x] 完善JetBrains软件配置
- [x] JetBrains多版本问题
- [x] 打开速度优化
- [x] Xcode 兼容
- [x] vscode 兼容(1.58.2及其以上)
- [x] sublime 兼容
- [x] AndroidStudio 兼容
- [x] 如果项目已不存在，直接从搜索结果中~~移除~~标记出路径不存在
- [x] 搜索栏中通过:pycharm、:webstorm等关键字直接搜索相对应IDE的历史记录

### 注意事项

1. objc 依赖的 node 依赖于 8<node<12, 这里使用的是 node 10，所以 readXcode.js 只有在 node 10.0.0 下执行的js脚本，使用了 objc 库 才能正常使用。
2. 为了能够在高版本使用 readXcode，使用 nexe 在 node 10 环境下，生成了 readXcode 可执行文件；
3. 这里 readXcode 执行需要用到 node_moudules 下的依赖，所以安装依赖时，需要切换到 node 10；
4. 所有生成二进制文件的代码都在分支 binary;

### 更新日志
v1.0.0
- 添加 Xcode 支持；

v0.0.7
- sublime 添加单文件支持；

v0.0.6
- 修复 获取 vscode 项目的路径(感谢 [YingXin-Zheng](https://github.com/undermoodzyx) 的贡献);

v0.0.5
- 修复home的bug，改用 node 主动获取；

v0.0.4
- 修复 vscode 升级带来的bug；

v0.0.3
- 如果项目已不存在，直接从搜索结果中~~移除~~标记出路径不存在；
- 搜索栏中通过:pycharm、:webstorm等关键字直接搜索相对应IDE的历史记录；

v0.0.2
- 优化启动速度，提升约 4 ~ 5 倍；
- 添加 sublime 兼容；
- 搜索时优先根据项目名称筛选；
- 添加 AndroidStudio 兼容；

v0.0.1
- 发布
