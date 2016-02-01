[BGFX](https://github.com/bkaradzic/bgfx) 是一个强大的跨平台渲染库。它对各种底层图形API进行了封装，使用BGFX使我们可以不必为相同的绘图操作为各个图形API进行重复编码。作者 [Branimir Karadžić](https://github.com/bkaradzic) 称其是一个 *Bring Your Own Engine/Framework* 的图形库。
<!-- more -->

### 该渲染库目前支持如下后端渲染API

* Direct3D 9
* Direct3D 11
* Direct3D 12 (WIP)
* Metal (WIP)
* OpenGL 2.1
* OpenGL 3.1+
* OpenGL ES 2
* OpenGL ES 3.1
* WebGL 1.0

### 该渲染库目前支持如下操作系统

 * Android (14+, ARM, x86, MIPS)
 * asm.js/Emscripten (1.25.0)
 * FreeBSD
 * iOS (iPhone, iPad, AppleTV)
 * Linux
 * MIPS Creator CI20
 * Native Client (PPAPI 37+, ARM, x86, x64, PNaCl)
 * OSX (10.9+)
 * RaspberryPi
 * Windows (XP, Vista, 7, 8, 10)
 * WinRT (WinPhone 8.0+)

### 是否可以使用BGFX —— Geequlim个人观点

BGFX是一个较为底层的图形渲染库，但相对于OpenGL、DirextX11这类底层硬件加速API来说又更高级。它对多种底层硬件加速渲染API进行了封装，使编写跨平台图形应用又多了一种方式，最值得关注的是它不仅跨平台还支持多种底层硬件加速渲染API绘图，这才是该图形库最大的亮点。

你可能不敢轻易下决定是否采用BGFX库进行图形应用开发。我想你最主要的顾虑有两点：

* 该图形库是否可靠? 毕竟这是一个较为低级的渲染库，要使用它进行夸平台图形应用开发我还需要基于它开发一个应用框架，如果后期发现它不可靠那我岂不是在浪费时间。
* 这个图形库的性能如何？ 它对各个硬件加速图形API进行了封装，还能不能发挥出硬件加速的最大效益？

#### 关于是否可靠的顾虑

对于这个问题，你首先应该看一下这两张截图，这是我写本篇文章时从Github上的截取到的

![](/assets/images/bgfx/ScreenshotCommits.png)

BGFX从2012年4月1日在Github上开放源代码到我写这篇文章是今天，其维护者们每天都在提交代码，修复Bug。其作者 [Branimir Karadžić](https://github.com/bkaradzic) 对每一个Issue都会查看和回复。说到作者 [Branimir Karadžić](https://github.com/bkaradzic) 我不得不让你看另外一张截图，这也是我在写这篇文章时所截取的情况。

![](/assets/images/bgfx/ScreenshotKaradzic.png)

每次看到这个我都会对他肃然起敬，什么是大神？不是技术搞得牛逼轰轰轰到处批评小白的，也不是靠技术赚上成百上千万到处显摆的，而是这样每天为自己所喜爱的事业坚持不懈地奋斗、为一个领域默默做出贡献并愿意分享其劳动成果的人，这才是我所理解的**大神**，只有这样的人才能对得起**大神**这个称呼。

说了这么多，搞得像个人崇拜一样，刚说到这个框架是否可靠来着。上文关于BGFX维护的活跃程度虽然让人赞叹，但可能还不足以说服你，那请你接着读。

下面我们来看看使用BGFX开发的软件，这才是最具说服力的

##### [cmftStudio](https://github.com/dariomanesku/cmftStudio) 开源跨平台CubeMap编辑器

![](https://raw.githubusercontent.com/dariomanesku/cmftStudio/master/screenshots/cmftStudio_spheres0.jpg)

##### [Torque6](https://github.com/andr3wmac/Torque6) 开源3D游戏引擎

![](https://raw.githubusercontent.com/andr3wmac/Torque6/master/projects/02-Sponza/screenshot.png)

##### [LumixEngine](https://github.com/nem0/LumixEngine) 另一个基于BGFX的3D游戏引擎

![](https://cloud.githubusercontent.com/assets/153526/10109455/450c51be-63c7-11e5-9c87-96d9d00efe02.png)

#### [AirMech](https://www.carbongames.com/airmech/home.html) 和 [dogbytegames](http://www.dogbytegames.com/) 的几款游戏

![](https://camo.githubusercontent.com/1110cb1f3faf02e8265ab7f4182009611a0ca484/687474703a2f2f7777772e646f676279746567616d65732e636f6d2f626766782f6f6666726f61646c6567656e6473325f626766785f69706164322e6a7067)

最后在来看一条Tiwtter上的截图，原来 [Karadžić](https://github.com/bkaradzic) 在20多年前就开始从事于图形计算领域了，大神不是一下子练成的。

![](/assets/images/bgfx/ScreenshotKaradzic20DOS.png)

#### 关于性能的顾虑

性能方面我不方便一段文字或几张图片向你展示并说服你，BGFX的性能是如何高。
你都看到这里了，我建议你到[BGFX的Github](https://github.com/bkaradzic/bgfx)上克隆一份代码按照[构建文档](https://bkaradzic.github.io/bgfx/build.html)试试它提供的20多个例子并在你的机器上执行看看，我相信这些例子(尤其是24-nbody)会让你感到震撼。

![](https://github.com/bkaradzic/bgfx/raw/master/examples/18-ibl/screenshot.png)

通过这些列子，我相信你对BGFX可靠性和性能的顾虑也该消除了。如果你现在想使用BGFX进行开发又不想暂时开发一系列开发框架的话，那么上文中所提到的引擎是不错的工具，当然BGFX也提供了足够多的例子，你可以试着玩弄一下。进入崭新的图形开发世界吧！
