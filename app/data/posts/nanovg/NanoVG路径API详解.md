>NanoVG is small antialiased vector graphics rendering library for OpenGL. It has lean API modeled after HTML5 canvas API. It is aimed to be a practical and fun toolset for building scalable user interfaces and visualizations.

这段说明摘自NanoVG的[README文档](https://github.com/memononen/nanovg/blob/master/README.md)，NanoVG的绘图API和HTML5的Canvas的绘图API是类似的。因此，如果你使用过Canvas我相信你会很快掌握它。如果你没使用过Canvas也不用担心，这些NanoVG的API并不是难以理解的，只要认真看一遍、每个API试几下就能掌握。万一你看完我的文章仍觉得有些东西不能理解，我建议你查阅一下[Canvas的API文档](http://www.w3schools.com/tags/ref_canvas.asp)，如果你像深入理解这些API阅读[NanoVG的头文件](https://github.com/memononen/nanovg/blob/master/src/nanovg.h)应该是最好的途径了。
<!-- more -->

## NanoVG路径API详解
<!-- class="panel panel-info" -->
<!-- class="panel-heading" -->
##### 路径 [引自维基百科](https://zh.wikipedia.org/wiki/%E8%B7%AF%E5%BE%84)
<!-- endclass -->
<!-- class="panel-body" -->
路径是使用绘图工具创建的任意形状的曲线，用它可勾勒出物体的轮廓，所以也称之为轮廓线。 为了满足绘图的需要，路径又分为开放路径和封闭路径。

GIMP / Adobe illustrator 中所有的矢量图都是由路径构成的。绘制矢量图就是以为着路径的建立和编辑。

一条路径由若干条线段组成，其中可能包含直线和各种曲线线段。为了更好的绘制和修改路径，每个线段的两端均有锚点（Anchor Point）可将其固定，通过移动锚点，可以修改线段的位置和改变路径的形状。

另外，非矢量绘图工具中，也存在路径概念。
<!-- endclass -->
<!-- endclass -->

NanoVG从`nvgBeginPath`函数的调用开始绘制几何形状，该函数的调用会清除所有已定义的路径。之后通过定义一个或多个路径以及一些子路径来描述你要绘制的形状。NanoVG提供许多函数用于绘制诸如矩形、圆这类的通用几何形状，也提供许多低层次的路径定义函数允许你一步一步地构造出各种形状。

NanovG使用描边或填充的方式来绘制路径定义的形状。默认情况下实心物体使用逆时针方式环绕，空心形状使用顺时针的方式环绕。你可以通过`nvgPathWinding`这一函数来指定绘图的环绕方式。有时使用逆时针方式（Counter Clokwise Winding,CCW）绘制普通形状是很有用的。最后你可以调用`nvgFill`函数来填充你定义的路径，你也可以使用`nvgStroke`函数对你的形状进行描边。

---------------

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgFill(NVGcontext* ctx)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：使用当前填充样式填充当前的路径定义的形状

参数说明：

* `ctx` NanoVG上下文
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgStroke(NVGcontext* ctx)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：使用当前描边样式描绘当前的路径定义的形状

参数说明：

* `ctx` NanoVG上下文
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgPathWinding(NVGcontext* ctx, int dir)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：设置当前路径的环绕方向

参数说明：

* `ctx` NanoVG上下文
* `dir` 环绕方向
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgRect(NVGcontext* ctx, float x, float y, float w, float h)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个矩形形状

参数说明：

* `ctx` NanoVG上下文
* `x`  矩形左上角横坐标
* `y`  矩形左上角纵坐标
* `w` 矩形的宽
* `h` 矩形的高
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgRoundedRect(NVGcontext* ctx, float x, float y, float w, float h, float r)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个圆角矩形形状

参数说明：

* `ctx` NanoVG上下文
* `x`  矩形左上角横坐标
* `y`  矩形左上角纵坐标
* `w` 矩形的宽
* `h` 矩形的高
* `r` 四个圆角所在圆的半径
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgCircle(NVGcontext* ctx, float cx, float cy, float r)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个圆形形状

参数说明：

* `ctx` NanoVG上下文
* `cx` 圆心横坐标
* `cy` 圆心纵坐标
* `r` 半径长度
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgEllipse(NVGcontext* ctx, float cx, float cy, float rx, float ry)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个椭圆形形状

参数说明：

* `ctx` NanoVG上下文
* `cx` 圆心横坐标
* `cy` 圆心纵坐标
* `rx` 椭圆横向半径的长度
* `ry` 椭圆纵向半径的长度
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgArc(NVGcontext* ctx, float cx, float cy, float r, float a0, float a1, int dir)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个圆弧、即圆边上的一部分

参数说明：

* `ctx` NanoVG上下文
* `cx` 圆心横坐标
* `cy` 圆心纵坐标
* `r` 半径长度
* `a0` 圆弧起点位置（弧度）
* `a1` 圆弧终点位置（弧度）
* `dir` 圆弧的环绕方向（ CW，CCW分别表示顺时针和逆时针 ）

<!-- class="panel panel-success" -->
<!-- class="panel-heading" -->
**图解**

<!-- endclass -->
<!-- class="panel-body" -->
![](/assets/images/nanovg/img_arc.gif)

如上图所示，圆心位于(cx,cy)在图中用绿色点表示；圆弧起始点位置a0 = 0 位于(cx+r,cy) 处，在图中用红点表示；圆弧终点 a1 = 1.5π 位于(cx,cy-r)处，在图中用蓝色点表示；dir = CW 以顺时针方向环绕。所得的弧形即为上图中圆上从红色点顺时针到蓝色点的部分。
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgMoveTo(NVGcontext* ctx, float x, float y)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个新的子路径，并设置新路径的起点

参数说明：

* `ctx` NanoVG上下文
* `x`  路径起点的横坐标
* `y`  路径起点的纵坐标
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgLineTo(NVGcontext* ctx, float x, float y)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：将路径的最后一点用线段连接到指定位置

参数说明：

* `ctx` NanoVG上下文
* `x`  终点位置的横坐标
* `y`  终点位置的纵坐标
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgBezierTo(NVGcontext* ctx, float c1x, float c1y, float c2x, float c2y, float x, float y)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：将路径的最后一点使用两个控制点的贝塞尔曲线连接到指定点上

参数说明：

* `ctx` NanoVG上下文
* `c1x` 第一个控制点的横坐标
* `c1y` 第一个控制点的纵坐标
* `c2x` 第二个控制点的横坐标
* `c2y` 第二个控制点的纵坐标
* `x`  终点位置的横坐标
* `y`  终点位置的纵坐标

<!-- class="panel panel-success" -->
<!-- class="panel-heading" -->
**图解**

<!-- endclass -->
<!-- class="panel-body" -->
![](/assets/images/nanovg/cubic_bezierto.png)

如上图所示，红色点表示控制点C1；蓝色点表示控制点C2；黄色点为起始点Start；终点End用绿色标出；从起点Start到终点End的黑色曲线即为所得曲线。

你可以从[cubic-bezier.com](http://cubic-bezier.com/#.26,.89,.8,.13)获取此曲线的参数。
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgQuadTo(NVGcontext* ctx, float cx, float cy, float x, float y)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：将路径的最后一点使用单个控制点的贝塞尔曲线连接到指定点上

参数说明：

* `ctx` NanoVG上下文
* `cx` 控制点的横坐标
* `cy` 控制点的纵坐标
* `x`  终点位置的横坐标
* `y`  终点位置的纵坐标

<!-- class="panel panel-success" -->
<!-- class="panel-heading" -->
**图解**
<!-- endclass -->

<!-- class="panel-body" -->
![](/assets/images/nanovg/img_quadraticcurve.gif)

如上图所示，起始点位于(20,20)，用橙色点标出；控制点位于(20,100)，用红色点标出；终点位于(200,20)，用绿色点标出。
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgArcTo(NVGcontext* ctx, float x1, float y1, float x2, float y2, float radius)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：创建一个连接到指定位置的圆弧

参数说明：

* `ctx` NanoVG上下文
* `x1` 弧外控制点的横坐标
* `y1` 弧外控制点的纵坐标
* `x2`  终点位置的横坐标
* `y2`  终点位置的纵坐标
* `radius` 圆弧的半径

<!-- class="panel panel-success" -->
<!-- class="panel-heading" -->
**图解**
<!-- endclass -->

<!-- class="panel-body" -->
![](/assets/images/nanovg/img_arcto.png)

如上图所示，蓝色点表示起点；弧外控制点位于(x1,y1)，用红点标出；终点位置为(x2,y2)，用绿点标出；
圆弧半径为radius线段，用黄色线段表示；图中蓝色点到绿色点部分，即为所得弧线。
<!-- endclass -->
<!-- endclass -->

<!-- endclass -->
<!-- endclass -->

<!-- class="ui segments" -->
<!-- class="ui segment" -->
###### void nvgClosePath(NVGcontext* ctx)
<!-- endclass -->
<!-- class="ui secondary segment" -->
函数作用：关闭路径，即将当前路径的最后一点与第一个点用直线连接

参数说明：

* `ctx` NanoVG上下文
<!-- endclass -->
<!-- endclass -->

--------

### 路径API绘图实例

下面的例子中我将上文中讲到的API调用都写了一下，绘制了9个几何形状。

```c++
void drawSapes(NVGcontext* vg)
{

  nvgSave(vg);

  int x =10 , y =10;
  int width =100 ,height = 100;

  // Set draw style
  nvgFillColor(vg,nvgRGB(255,0,0));
  nvgStrokeColor(vg,nvgRGB(255,255,255));
  nvgStrokeWidth(vg,2);

  // Draw a rectangle
  nvgBeginPath(vg);
  nvgRect(vg,x,y,width,height);
  nvgFill(vg);

  x += width + 10;

  // Draw a rounded rectangle
  nvgBeginPath(vg);
  nvgRoundedRect(vg,x,y,width,height,10);
  nvgStroke(vg);

  x += width + 10;
  // Draw a circle
  nvgBeginPath(vg);
  nvgCircle(vg,x+width/2,y+height/2,width/2);
  nvgStroke(vg);

  x += width + 10;

  // Draw an ellipse
  nvgBeginPath(vg);
  nvgEllipse(vg,x+width/2,y+height/2,width/2,height/2 - 10);
  nvgFill(vg);

  x += width + 10;

  // Draw Arcs
  for(int i=0;i!=5;++i)
  {
    nvgBeginPath(vg);
    nvgArc(vg,x+width/2,y+height/2,width/2-i*10,0,NVG_PI,NVG_CW);
    nvgStroke(vg);
  }

  x += width + 10;
  for(int i=0;i!=5;++i)
  {
    nvgBeginPath(vg);
    nvgArc(vg,x+width/2,y+height/2,width/2-i*10,NVG_PI/2,NVG_PI,NVG_CCW);
    nvgClosePath(vg);
    nvgStroke(vg);
  }

  x += width + 10;

  //MoveTo LineTo ArcTo and close
  nvgBeginPath(vg);
  nvgMoveTo(vg,x,y);
  nvgLineTo(vg,x+width-30,y);
  nvgArcTo(vg,x+width,y,x+width,y+30,30);
  nvgLineTo(vg,x+width,y+height);
  nvgClosePath(vg);
  nvgFill(vg);
  nvgStroke(vg);

  x = 10;
  y += height + 10 + height;
  // Draw cube bazier
  {
    float endX = x + width;
    float endY = y - height;
    float c1x = x + 0.0f * (endX-x);
    float c1y = y + 1.0f *(endY-y);
    float c2x = x + 1.0f * (endX-x);
    float c2y= y +  0.0f *(endY-y);
    nvgBeginPath(vg);
    nvgMoveTo(vg,x,y);
    nvgBezierTo(vg,c1x,c1y,c2x,c2y,endX,endY);
    nvgStroke(vg);
  }

  x += width +10;
  y -= height;
  // Draw Quad bazier
  nvgBeginPath(vg);
  nvgMoveTo(vg,x,y);
  nvgQuadTo(vg,x,y+height,x+width,y+height);
  nvgStroke(vg);


  nvgRestore(vg);
}
```

讲`nvgEndFrame`函数置于绘制范围内，这样才能正确绘制出来。

```c++
// nanovg rendering begins here
nvgBeginFrame(vg,wndWidth,wndHeight,bufWndRatio);
drawSapes(vg)
// nanovg rendering end here
nvgEndFrame(vg);
```

运行效果如下所示：

![](/assets/images/nanovg/Screenshot_sapes.png)
