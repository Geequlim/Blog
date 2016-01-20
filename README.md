## 使用说明

此项目有以下三个分支，用于维护两个开源仓库。

| Branch         |      Remote         |   Usage  |
| :------------- | :------------------ | ---------|
| develop        | githubPages/develop |  开发使用 |
| Blog           | githubPages/master  |  博客托管 |
| Template       | RCTemplate/master   |  开源模板 |

### 注意事项：
* 对网站结构、源码有所调整，需切换到`devekop`分支进行编码
* 在`develop`分支中修改代码后应当将该分支合并到`Blog`和`Template`分支中，并提交合并后的分支到对应的远程仓库中
* 合并`develop`分支到`Blog`之后必须执行`build.sh`构建脚本
* 一般情况下`Template`仅用于合并`develop`分支并同步到远程仓库中
* 仅修改博客数据内容，请勿修改`develop`或`Template`分支
