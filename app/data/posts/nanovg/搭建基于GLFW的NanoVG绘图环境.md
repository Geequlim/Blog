[NanoVG](https://github.com/memononen/nanovg) 是一个基于OpenGL的轻量级的矢量图形渲染开源库,由[Mikko Mononen](https://github.com/memononen) 领导开发，并基于[zlib协议](https://github.com/memononen/nanovg/blob/master/LICENSE.txt)开源，项目仓库可本段开头的链接查看。由于其易用性被国外许多开源项目所用.也有许多衍生版本，如 [Branimir Karadžić](https://github.com/bkaradzic) 大神编写的[bgfx版本](https://github.com/bkaradzic/bgfx/tree/master/examples/20-nanovg) 、[Chris Maughan](https://github.com/cmaughan) 编写的 [DX11版本](https://github.com/cmaughan) 。
<!-- more -->
![](https://raw.githubusercontent.com/memononen/nanovg/master/example/screenshot-01.png)

如上图所示，NanoVG能快速地绘制出令人赞叹的矢量图形，得益于各路大神的衍生版本使得NanoVG不仅仅能使用OpenGL进行硬件加速，其适用范围扩大到各个图形领域。

## 创建GLFW窗口
接下来我们就开始探索这个神奇的图形库，搭建一个基于GLFW的跨平台渲染环境。得益于GLFW跨平台的特性，这个例子能在Linux、Mac OSX和Windows系统上运行。将来有时间的话我也可能分享使用bgfx或SDL这样支持移动平台的搭建经验， 看情况吧，现在主要讨论的是绘图，就先用简单易用的GLFW吧。你可以从[GLFW的官方网站](http://www.glfw.org/)获取到最新的代码，然后你需要编译成你的操作系统对应的链接库，并添加到你的项目中。 更详细的步骤你可以参考此文[《创建窗口》](http://learnopengl-cn.readthedocs.org/zh/latest/01%20Getting%20started/02%20Creating%20a%20window/) 。

### 使用轻量级对话框 [NativeDialog](https://github.com)
在窗口创建过程中可能会出现一些问题，这时我们可以通过一个对话框提示我们错误信息；为了更方便我们观察我们绘制的图形，我们经常需要对绘图背景等颜色进行修改，我们可以通过一个拾色器对话框帮我们搞定；有时我们还需要操作文件，比如保存截图，也能通过选择文件对话框来帮助我们选择文件。这个轻量级的对话框API能帮你解决这些问题，并且像GLFW一样为你解决跨平台的问题。它目前支持GLFW所支持的操作系统，提供原生的对话框界面。你可以到[我的Github仓库](https://github.com/Geequlim/NativeDialogs)中获取到它，按照说明集成到你的项目中。

### OpenGL ES的支持
为了使用OpenGL ES进行硬件加速，我们可以使用GLFW创建OpenGL ES的状态机。 遗憾的是[《创建窗口》](http://learnopengl-cn.readthedocs.org/zh/latest/01%20Getting%20started/02%20Creating%20a%20window/) 中所使用的glew并不给力，它并不支持OpenGL ES。为此我推荐你抛弃glew，使用[glad](https://github.com/Dav1dde/glad)代替它。 从这里获取到你需要的glad代码，并添加到你的项目中。 当然选择OpenGL ES 的支持是必要的：

![](/assets/images/nanovg/glad_config.png)

添加glad的代码到你的项目之后孩需要对代码进行修改，引用glad并添加OpenGL ES的支持

首先定义两个宏用于表示我们希望使用的OpenGL、OpenGL ES的版本

```c++
#define NOGL_VERSION 0
#define NOGLES_VERSION 20
```
这里我们使用OpenGL ES 2.0进行绘图，所以我们`NOGLES_VERSION`定义为20，同理如果你想使用OpenGL 3.3进行绘图那需要定义为如下

```c++
#define NOGL_VERSION 33
#define NOGLES_VERSION 0
```

据此，我们就能定义NanoVG需要定义的渲染宏定义了

```c++
#include "nanovg.h"
#if( NOGL_VERSION >= 30 )
  #define NANOVG_GL3_IMPLEMENTATION
#elif( NOGL_VERSION >= 20 )
  #define NANOVG_GL2_IMPLEMENTATION
#elif( NOGLES_VERSION >= 30 )
  #define NANOVG_GLES3_IMPLEMENTATION
#elif( NOGLES_VERSION >= 20 )
  #define NANOVG_GLES2_IMPLEMENTATION
#endif

#include "nanovg_gl.h"
#ifdef NANOVG_GL3_IMPLEMENTATION
  auto nvgCreateContext = nvgCreateGL3;
#elif defined(NANOVG_GL2_IMPLEMENTATION)
  auto nvgCreateContext = nvgCreateGL2;
#elif defined(NANOVG_GLES3_IMPLEMENTATION)
  auto nvgCreateContext = nvgCreateGLES3;
#elif defined(NANOVG_GLES2_IMPLEMENTATION)
  auto nvgCreateContext = nvgCreateGLES2;
#endif
```

同时我还定义了一个函数指针， `nvgCreateContext`用于代替NanoVG提供的各种创建上下文的函数。

最后告诉GLFW如何创建OpenGL/OpenGL ES上下文

```c++
int gl_major =0, gl_minor = 0;
#if NOGL_VERSION
  gl_major = NOGL_VERSION / 10;
  gl_minor = NOGL_VERSION % 10;
#elif NOGLES_VERSION
  gl_major = NOGLES_VERSION / 10;
  gl_minor = NOGLES_VERSION % 10;
#endif

// Setting up OpenGL context
#if NOGLES_VERSION
  glfwWindowHint(GLFW_CLIENT_API,GLFW_OPENGL_ES_API);
#elif(NOGL_VERSION >= 32)
  glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
#endif
glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, gl_major);
glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, gl_minor);
glfwWindowHint(GLFW_RESIZABLE, GL_TRUE);
glfwWindowHint(GLFW_OPENGL_DEBUG_CONTEXT, GL_TRUE);
glfwWindowHint(GLFW_SAMPLES, 4);
```

## 一些优化设置
为了方便，我们需要定义一些变量来配置窗口尺寸等参数。同时定义几个函数用作事件回调或提示错误信息。

```c++
#include "NativeDialog.h"
#ifdef ND_PLATFORM_GTK
#include <gtk/gtk.h>
#endif
// Keyboard event handler
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mode);
// Window resize event handler
void resize_callback(GLFWwindow*,int,int);
// Window size
int wndWidth = 800, wndHeight = 480;
// (Buffer size) / (window size)
float bufWndRatio = 1.0f;
// Show Error Message dialog
void showError(const std::string& msg){MessageDialog("Error",msg,{"Close"}).show();}
```

这段代码被放于`main`函数之前。 `key_callback`函数用作按键事件的回调，我们希望按下C时改变窗口背景颜色，按下I时现实渲染上下文的信息,这里我使用了[NativeDialog](https://github.com/Geequlim/NativeDialogs)。 `key_callback`定义如下

```c++
// Called whenever a key is pressed/released via GLFW
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mode)
{
  std::cout << key << std::endl;
  if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
    glfwSetWindowShouldClose(window, GL_TRUE);
  // Change background color
  else if(key == GLFW_KEY_C && action == GLFW_PRESS)
  {
    ColorPickerDialog cp("Choose Background Color");
    cp.setDecideHandler([](const Dialog& dlg)
    {
      auto colorPicker = dynamic_cast<const ColorPickerDialog&>(dlg);
      auto color = colorPicker.color();
      glClearColor(color.r,color.g,color.b,color.a);
    }).show();
  }
  // Show OpenGL context information
  else if(key == GLFW_KEY_I && action == GLFW_PRESS)
  {
    char glVersionStr [100]={0};
    sprintf (glVersionStr, "OpenGL Version:%s\n",glGetString (GL_VERSION));

    char rendererStr [100]={0};
    sprintf (rendererStr, "Renderer:%s\n",glGetString (GL_RENDERER));

    std::string msg = "\n";
                msg += glVersionStr;
                msg += rendererStr;
    MessageDialog("Information",msg,{"OK"}).show();
  }
}
```

`resize_callback`函数用于窗口尺寸改变的回调，在次函数中我们要改变OpenGL视口的大小、NanoVG的缩放比率，其定义如下所示

```c++
// Called whenever the window size changed
void resize_callback(GLFWwindow* window,int w,int h)
{
  wndWidth  = w;
  wndHeight = h;
  glViewport(0,0,wndWidth,wndHeight);

  int fbW = w;
  int fbH = h;
  glfwGetFramebufferSize(window, &fbW, &fbH);
  bufWndRatio = ((float)fbW)/wndWidth;
}
```
## 主角登场

现在可以创建NanoVG并进行矢量图形渲染，在创建NanoVG上下文环境之前，需要先初始化GLFW、创建窗口（OpenGL上下文）并初始化glad。

`main`函数定义如下

```c++
int main()
{
  // Init GLFW
  if( glfwInit() == GL_TRUE )
  {
#ifdef ND_PLATFORM_GTK
    gtk_init(nullptr,nullptr);
#endif
    int gl_major =0, gl_minor = 0;
#if NOGL_VERSION
    gl_major = NOGL_VERSION / 10;
    gl_minor = NOGL_VERSION % 10;
#elif NOGLES_VERSION
    gl_major = NOGLES_VERSION / 10;
    gl_minor = NOGLES_VERSION % 10;
#endif
    // Setting up OpenGL context
#if NOGLES_VERSION
    glfwWindowHint(GLFW_CLIENT_API,GLFW_OPENGL_ES_API);
#elif(NOGL_VERSION >= 32)
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
#endif
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, gl_major);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, gl_minor);

    glfwWindowHint(GLFW_RESIZABLE, GL_TRUE);
    glfwWindowHint(GLFW_OPENGL_DEBUG_CONTEXT, GL_TRUE);
    glfwWindowHint(GLFW_SAMPLES, 4);

    // Create a GLFWwindow
    GLFWwindow* window = glfwCreateWindow( wndWidth,
                                          wndHeight,
                                          "NVGResearch",
                                          nullptr,
                                          nullptr);
    glfwMakeContextCurrent(window);
    if (window == NULL)
    {
      showError("Failed to create GLFW window");
      glfwTerminate();
      return -1;
    }

    // Set the required callback functions
    glfwSetKeyCallback(window, key_callback);
    glfwSetWindowSizeCallback(window,resize_callback);
    glfwSetErrorCallback([](int,const char* msg){ showError(msg); });

    // Initialize glad
    if (!gladLoadGLLoader((GLADloadproc) glfwGetProcAddress))
    {
      showError("Failed to initialize OpenGL context");
      glfwTerminate();
      return -1;
    }
    // nanovg context
    NVGcontext* vg = nvgCreateContext(NVG_STENCIL_STROKES | NVG_DEBUG);
    if(!vg)
    {
      showError("Create nanovg context error!");
      glfwTerminate();
      return -1;
    }
    // Define the viewport dimensions
    glViewport(0, 0, wndWidth, wndHeight);

    // main loop
    while (!glfwWindowShouldClose(window))
    {
      // Check events
      glfwPollEvents();
      // Clear buffers
      glClear(GL_COLOR_BUFFER_BIT|GL_STENCIL_BUFFER_BIT);

      // nanovg rendering begins here
      nvgBeginFrame(vg,wndWidth,wndHeight,bufWndRatio);

      nvgBeginPath(vg);
      nvgRoundedRect(vg,wndWidth-100-10,wndHeight-100-10,100,100,10);
      nvgFill(vg);

      // nanovg rendering end here
      nvgEndFrame(vg);

      // Swap the screen buffers
      glfwSwapBuffers(window);
    }
  }
  //Terminate glfw application
  glfwTerminate();
  return 0;
}
```
如上代码所示，所有的NanoVG操作都是通过`nvgCreateContext`创建的NanoVG的上下文进行的。 NanoVG绘制操作须放在`nvgBeginFrame`和`nvgEndFrame`两函数之间。 `nvgBeginPath`函数开始定义一个路径，这里使用`nvgRoundedRect`定义了一个圆角长宽均为100的圆角矩形，最后调用`nvgFill`对其填充默认颜色。

<!-- class="panel panel-success" -->
<!-- class="panel-heading" -->
##### 提示
<!-- endclass -->
<!-- class="panel-body" -->
NanoVG中每次渲染工作都是在`nvgBeginFrame`和`nvgEndFrame`这两个函数调用之间进行的，所有不在此区间的绘图调用不会起作用。如果在`nvgEndFrame`函数调用前调用了`nvgCancelFrame`，那么在`nvgCancelFrame`之前的绘制命令都会被忽略。
<!-- endclass -->
<!-- endclass -->

运行效果如下所示：

![](/assets/images/nanovg/helloGLFW.png)

至此基于GLFW的NanoVG跨平台绘图环境搭建完毕，接下来就尽情领受NanoVG的风采吧！
