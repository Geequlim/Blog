BGFX是一个跨平台的图形渲染库，其本身是不包括窗口创建这类平台相关的代码的，这也使得它看上去不是那么复杂。事实上要我们自己来为各个平台实现渲染窗口的创建工作肯定不是一件容易做到的事，者需要我们对各个操作系统的编程环境有一定了解。同时，我们不仅仅需要创建一个渲染窗口这么简单，我们还可能需要处理来自各个平台的事件、操作各个平台的文件等，这肯定是一件令人发疯的体力活。
<!-- more -->

事实上，如果是为了学习BGFX绘图库，我们完全没必要自己写一遍这些无聊的平台相关的东西，因为已经有勤劳的人儿做过这些事了，并且他们无私地把他们的劳动成果贡献出来了，我们直接用就行了。方便起见，我使用的是BGFX的示例里的代码，起码这些代码的实现是可靠的，因为哪些示例程序我们已经成功的编译运行过了是吧。

## 使用BGFX的entry

### 创建项目

首先使用你的开发工具创建一个控制台程序，就是你玩过最简单的C++ Hello World的那种。为了使用BGFX，需要先编译bgfx和他的示例（请参考官方[构建指南](https://bkaradzic.github.io/bgfx/build.html)）。然后将编译到的bgfx和example-common链接库添加到你创建的项目链接库中，并将BGFX的文件目录`bgfx/include`和`bgfx/examples/common`添加到你项目的头文件搜索列表中。

由于使用的开发环境各有不同，我就不进行展示如何操作了。我相信有过几个C++项目开发经验的开发者都不会被这个问题难住的。

#### `_main_`　入口函数

BGFX的示例程序通过entry相关的代码实现创建各个平台的渲染窗口，提供一个统一的程序入口`_main_`作为BGFX绘图程序中的`main`入口函数。具体实现我们现在可以先不用进行深入了解，我们现在要学习的是BGFX这个绘图库而不是如何创建跨平台窗口对吧，当然如果你对其实现感兴趣也可以去看它的示例中[entry部分的源代码](https://github.com/bkaradzic/bgfx/tree/master/examples/common/entry)。

使用示例entry创建的渲染窗口程序，我们认为它是以`_main_`函数作为程序的入口，因此我们要定义该函数,所有的程序都在这个函数内执行（或写在其他地方在此函数内调用）。

#### 初始化BGFX

在使用BGFX之前，我们们必须使用`bgfx::init()`对它进行初始化。这里我们对其进行初始化以后需要设置窗口大小和BGFX的视口大小为，以及调试方式等，在程序结束时我们还需要调用`bgfx::shutdown()`函数来关闭BGFX。

```c++
int _main_(int _argc, char** _argv*)
{
    unsigned width = 1280;
    unsigned height = 720;
    unsigned debug = BGFX_DEBUG_TEXT;
    unsigned reset = BGFX_RESET_VSYNC;
    bool initialed = bgfx::init();
    if( initialed )
    {
        bgfx::reset(width, height, reset);
        // Enable debug text.
        bgfx::setDebug(debug);
        // Set view 0 clear state.
        bgfx::setViewClear(0
            , BGFX_CLEAR_COLOR|BGFX_CLEAR_DEPTH|BGFX_CLEAR_STENCIL
            , 0x203030ff
            , 1.0f
            , 0
            );
        }
        // Shutdown bgfx.
       bgfx::shutdown();
       return 0
}
```

使用`bgfx::init`初始化BGFX完成后，我们调用`bgfx::reset`对窗口和视口大小进行初始设置。
`bgfx::setDebug`用于设置调试属性，然后使用`bgfx::setViewClear`设置清楚视图缓冲区的的标志，这里将颜色缓冲设置为深绿色，深度缓冲设为1.0，模板缓冲值设为0；在最后调用`bgfx::shutdown`结束BGFX。

关于上述函数的详细用法，请查阅[BGFX的API文档](https://bkaradzic.github.io/bgfx/bgfx.html)。

#### 主循环

为了使程序在我们明确告诉他要关闭窗口之前一直保持运行状态而不是执行一次绘图之后就退出，我们需要给我们的应用程序添加一个循环。这个循环通常被称为*主循环*或*主消息循环*。每次循环都获取来自系统窗口的事件消息，检查到关闭窗口的消息时停止循环，在这个循环内我们处理其他的窗口消息并进行绘图操作。

```c++
while (!entry::processEvents(width, height, debug, reset) )
{            
    // Set view 0 default viewport.
    bgfx::setViewRect(0, 0, 0, width, height);

    // This dummy draw call is here to make sure that view 0 is cleared
    // if no other draw calls are submitted to view 0.
    bgfx::touch(0);

    // Use debug font to print information about this example.
    bgfx::dbgTextClear();
    bgfx::dbgTextPrintf(0, 0, 0x4f, "Entry:HelloWorld");
    // Advance to next frame. Rendering thread will be kicked to
    // process submitted rendering primitives.
    bgfx::frame();
}
```

该循环中使用`bgfx::setViewRect()`对id为0的View进行视口设置，设为窗口的大小，然后使用`bgfx::touch()`绑定该View为当前绘制使用的View对象。
`bgfx::dbgTextClear()`和`bgfx::dbgTextPrintf()`函数用于清空然后现实一行调试文本到渲染窗口上。最后通过`bgfx::frame()`进行绘制、交换缓冲操作。

下面是BGFX文档中对View的解释，你可以查看[API文档](https://bkaradzic.github.io/bgfx/bgfx.html?highlight=touch#views)获得更加详细的信息。

>View is primary sorting mechanism in bgfx. View represent bucket of draw and compute calls. Compute and draw calls inside bucket are sorted in the way that all compute calls are executed before draw calls. Compute calls are always in order of submission, while draw calls are sorted by internal state if view is not in sequential mode. In the most of cases when z-buffer is used this change in order is not noticable to desired output. In cases where order has to be preserved (for example in rendering GUIs), view can be set to be in sequential order. Sequential order is less efficient, because it doesn’t allow state change optimization, and should be avoided when possible.

关于上述函数的详细用法，请查阅[BGFX的API文档](https://bkaradzic.github.io/bgfx/bgfx.html)。

如果你一切都做对了，你现在可以编译并运行你的第一个BGFX窗口程序了。

![](/assets/images/bgfx/01-HelloWorld/ScreenshotHelloMain.png)

你可以[从这里](/assets/code/bgfx/01-HelloWorld/HelloWorld.cpp)获取该程序的完整源代码。

### 使用`entry::AppI`接口

BGFX示例的entry定义了一个方便的应用程序管理借口`AppI`,这是一个纯虚类，其声明如下所示

```c++
struct BX_NO_VTABLE AppI
{
    virtual ~AppI() = 0;
    virtual void init(int _argc, char** _argv) = 0;
    virtual int  shutdown() = 0;
    virtual bool update() = 0;
};
```

代码是自注释型的，我就不用多说了，我们可以通过继承并重写其方法来更加方便的管理我们的BGFX窗口应用程序。

```c++
class App : public entry::AppI
{
public:
    App() = default;
    virtual ~App(){};        
    virtual void init(int _argc, char** _argv);
    virtual int  shutdown() override;
    virtual bool update() override;
protected:
    unsigned m_width  = 1280; // Window width
    unsigned m_height = 720;  // Window height
    unsigned m_debug  = BGFX_DEBUG_TEXT;
    unsigned m_reset   = BGFX_RESET_VSYNC;
};
```

我们把之前初始化BGFX的代码搬到`init()`方法内
```c++
void App::init(int _argc, char** _argv)
{
    bool initialized = bgfx::init();
    if( initialized )
    {
        bgfx::reset(m_width, m_height, m_reset);
        // Enable debug text.
        bgfx::setDebug(m_debug);
        // Set view 0 clear state.
        bgfx::setViewClear(0
            , BGFX_CLEAR_COLOR|BGFX_CLEAR_DEPTH|BGFX_CLEAR_STENCIL
            , 0x203030ff
            , 1.0f
            , 0
            );
    }
}
```
现在不需要我们手动写主循环了，只要把主循环内每次要做的事情写到`update()`方法里就行

```c++
bool App::update()
{
    bool succeed = false;
    if (!entry::processEvents(m_width, m_height, m_debug, m_reset) )
    {
        // Set view 0 default viewport.
        bgfx::setViewRect(0, 0, 0, m_width, m_height);

        // This dummy draw call is here to make sure that view 0 is cleared
        // if no other draw calls are submitted to view 0.
        bgfx::touch(0);

        // Use debug font to print information about this example.
        bgfx::dbgTextClear();
        bgfx::dbgTextPrintf(0, 0, 0x5f, "Entry:HelloApp");
        // Advance to next frame. Rendering thread will be kicked to
        // process submitted rendering primitives.
        bgfx::frame();

        succeed = true;
    }
    return succeed;
}
```

在`shutdown()`方法内结束BGFX
```c++
int  App::shutdown()
{
    bgfx::shutdown();
    return 0;
}
```

最后，在`_main_`函数中使用`entry::runApp`执行我们的应用程序
```c++

// The App instance
App app;

int _main_(int _argc, char** _argv)
{
    return entry::runApp(&app,_argc,_argv);
}
```
![](/assets/images/bgfx/01-HelloWorld/ScreenshotHelloAppI.png)

你可以[从这里](/assets/code/bgfx/01-HelloWorld/HelloApp.cpp)获取该程序的完整源代码。

## 使用其他方式

如果你不喜欢使用BGFX的entry来创建渲染窗口，也有其他的途径可以做到的。如果你不想自己写一套的话，你可以试试[GLFW](http://www.glfw.org/)来创建运行与Windows、Linux、Mac OSX上的OpenGL窗口管理库，也有另外两个个比较常用的[SDL](https://www.libsdl.org/)和[SFML](http://www.sfml-dev.org/) 。另外一个在Github的开源项目也可以用来在iOS、WebGL和Android上做同样的事情，有兴趣可以看看[glfm](https://github.com/brackeen/glfm)。
