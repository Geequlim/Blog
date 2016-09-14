AUR是一个强大的Arch Linux社区包管理器，其优点是由庞大的Arch Linux用户社区维护，软件一般都能通过yaourt这类aur工具进行安装，并能轻松升级到最新版本。

<!-- more -->

### 为什么要用AUR而不是直接用Android Studio或SDK Manager？

因为我曾被这两个工具虐得不轻，好不容易装好各种依赖包。那天Android Studio升级一不高兴就提示你必须升级SDK，升级后就呵呵了～

而使用AUR软件仓库，你就不必为这些问题费心了。因为社区中的Android开发者已经为你解决了这些问题，我们只要安装它们制作的软件包就能用了。其次，AUR安装的的SDK等工具一般被存放在/opt这样的目录下，因此正常打开Android Studio或SDK Manager对SDK目录是没有写入权限的，不用担心坑底的更新提示了。

在更新方面，AUR虽不能保证一直和官方同步，但一般就比官方更新慢个一两天，我想一般一不会有什么影响。

### 开始安装

整个Android开发环境包括以下几项

| 所需的软件 | AUR中的软件包名称    |
| :------------- | :------------- |
| Android SDK    | android-sdk    |
| Android SDK Build Tools | android-sdk-build-tools |
| Android SDK Platform Tools | android-sdk-platform-tools 注解0|
| Android Platform | android-platform |
| Android Support Repository | 	android-support-repository |
| Google Play Services | google-play-services |
| Android Virtual Device | 注解1 |
| Android NDK | android-ndk |
| Android Studio | android-studio |

### 注解0
在实际项目中，各种依赖库可能需要不同版本的构建工具集，可以根据需要添加安装`android-sdk-build-tools-版本号`的包。

### 注解1
Android虚拟机推荐使用[Genymotion](https://www.genymotion.com/)，基于Virtual Box的x86(x86-64)架构的安卓虚拟机，支持种机型和系统版本，体验非常棒。

如果需要其他cpu架构的虚拟机或带有谷歌服务框架支持的虚拟机，请从AUR中选择安装以下软件包:
* android-x86-64-system-image
* android-x86-system-image
* android-armv7a-eabi-system-image
* android-google-apis-armv7a-eabi
* android-tv-x86-system-image-22

### AUR中没有你需要的SDK资源
请使用root权限执行`/opt/android-sdk/tools/android`通过SDK Manager进行安装
