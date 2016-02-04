NanoVG 会将变换设置、填充样式、描边样式、文字和字体样式、剪裁配置等信息以状态的方式保存在一个状态堆栈中。这样极大得方便了我们的绘制工作，把人们从繁杂的样式设置和其他属性配置工作中解放出来。
<!-- more -->

NanoVG使用堆栈的方式，状态的备份和恢复是非常容易的，具体方法如下：
<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
###### void nvgSave(NVGcontext* ctx)
<!-- endclass -->
<!-- endclass -->

<!-- class="panel-body" -->
将当前NanoVG的状态压入栈中，用于保存当前的状态。
<!-- endclass -->
<!-- endclass -->


<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
###### void nvgRestore(NVGcontext* ctx)
<!-- endclass -->
<!-- endclass -->

<!-- class="panel-body" -->
将NanoVG当前的状态恢复为栈顶的状态，执行退栈操作。
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
###### void nvgReset(NVGcontext* ctx)
<!-- endclass -->
<!-- endclass -->

<!-- class="panel-body" -->
将NanoVG当前的状态恢复NanoVG默认状态，不会影响到状态栈
<!-- endclass -->
<!-- endclass -->

### 状态栈使用示例

本例首先将5个不同的NanoVG状态进行配置并保存到栈中，绘制出保存时的样式。

然后退栈逐一恢复状态栈中的状态，重新绘制。

```c++
void stateStackDemo(NVGcontext* vg)
{
  int width =100 , height = 100;
  int x = 10 , y = 10;

  for( unsigned char i=0;i!=5;++i)
  {
    // Set current state
    unsigned char colorStep = 50;
    auto color = nvgRGB( colorStep*i,colorStep*i,colorStep*i);
    nvgFillColor(vg,color);
    nvgStrokeWidth(vg,1+i);
    // push state to stack
    nvgSave(vg);

    // draw
    nvgBeginPath(vg);
    nvgRoundedRect(vg,x+i*(width+10),y,width,height,10);
    nvgFill(vg);
    nvgStroke(vg);
  }

  y += height +10;

  for( unsigned char i=0;i!=5;++i)
  {
    // pop state from stack ,restore state
    nvgRestore(vg);

    // draw
    nvgBeginPath(vg);
    nvgRoundedRect(vg,x+i*(width+10),y,width,height,10);
    nvgFill(vg);
    nvgStroke(vg);
  }
}
```

与上节一样，调用`stateStackDemo`进行绘制。

```c++
// nanovg rendering begins here
nvgBeginFrame(vg,wndWidth,wndHeight,bufWndRatio);
stateStackDemo(vg)
// nanovg rendering end here
nvgEndFrame(vg);
```

运行效果如下所示：

![](/assets/images/nanovg/Screenshot_state_stack.png)

从效果中，可以看到和我们预期的一样。
