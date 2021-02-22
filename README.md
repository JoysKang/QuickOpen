# QuickOpen

### 简介

使用 uTools 工具快速打开历史项目, 支持 JetBrains、vscode、sublime、AndroidStudio, 后续会添加 Xcode的支持

该项目仅支持 macOS，暂不考虑支持Linux、window系统，如果你有需要可以使用[uTools-plugins](https://github.com/marsvet/uTools-plugins/tree/master/utools-jetbrains-history), 本项目就是参考该项目进行开发的

本项目地址：[https://github.com/JoysKang/QuickOpen](https://github.com/JoysKang/QuickOpen)  
uTools-plugins项目地址：[https://github.com/marsvet/uTools-plugins/tree/master/utools-jetbrains-history](https://github.com/marsvet/uTools-plugins/tree/master/utools-jetbrains-history)

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
- [ ] Xcode 兼容(暂时不知道Xcode历史项目的记录位置，暂时放放)
- [x] vscode 兼容
- [x] sublime 兼容
- [x] AndroidStudio 兼容
- [x] 如果项目已不存在，直接从搜索结果中~~移除~~标记出路径不存在
- [x] 搜索栏中通过:pycharm、:webstorm等关键字直接搜索相对应IDE的历史记录

### 更新日志

v0.0.3
- 如果项目已不存在，直接从搜索结果中~~移除~~标记出路径不存在
- 搜索栏中通过:pycharm、:webstorm等关键字直接搜索相对应IDE的历史记录

v0.0.2
- 优化启动速度，提升约 4 ~ 5 倍；
- 添加 sublime 兼容；
- 搜索时优先根据项目名称筛选；
- 添加 AndroidStudio 兼容；

v0.0.1
- 发布
