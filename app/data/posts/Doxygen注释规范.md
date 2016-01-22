Doxygen是个非常简单实用的工具，通过它可以快速读取源代码来生成各种形式的文档。本文并不打算展开讨论Doxygen的配置和使用，因为[官方文档](http://www.stack.nl/~dimitri/doxygen/manual/index.html)已经描述得足够详尽了，本文是对代码进行Doxygen文档化注释的规范说明。

# 标签格式
Doxygen支持两种约定文档化标签的语法
- Doxygen标签格式： `\tag 内容...`
- Javadoc标签格式：`@tag 内容...`

# 注释风格
Doxygen支持以下多种注释风格

1、Javadoc样式

```c++
/**
 * 一个示范类，描述在此
 */
```

2、C++样式

```c++
///
/// ... text ...
///
```

或者

```c++
//!
//! ... text ...
//!
```

3、Qt的简化风格

```c++
/*!
    多行注释
    ...  
*/
```

Doxygen也允许把注释放到代码后面，具体格式是放一个'<'到注释开始部分。例如：

```c++
int var1 ; /**< ….text…. */
int var2; ///< ….text….
```

# Doxygen常用标签
<h4 class="orange_title"> 文献信息 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>author</td>
      <td>作者</td>
    </tr>
    <tr>
      <td>brief</td>
      <td>摘要</td>
    </tr>
    <tr>
      <td>file</td>
      <td>文件声明</td>
    </tr>
  </tbody>
</table>

<h4 class="blue_title"> 状态信息 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>version</td>
      <td>版本号,推荐使用$Id$</td>
    </tr>
    <tr>
      <td>todo</td>
      <td>改进,可以指定针对的版本</td>
    </tr>
    <tr>
      <td>warning</td>
      <td>警告信息</td>
    </tr>
    <tr>
      <td>date</td>
      <td>日期</td>
    </tr>
    <tr>
      <td>deprecated</td>
      <td>被弃用的</td>
    </tr>
    <tr>
      <td>since</td>
      <td>从什么版本、时间写此部分代码</td>
    </tr>
    <tr>
      <td>pre</td>
      <td>用来说明代码项的前提条件</td>
    </tr>
    <tr>
      <td>post</td>
      <td>用来说明代码项之后的使用条件</td>
    </tr>
    <tr>
      <td>History</td>
      <td>修改历史记录，每条修改记录应包括修改日期、修改者及修改内容简述</td>
    </tr>
  </tbody>
</table>

<h4 class="red_title"> 模块信息 </h4>

注释和代码完全分离，放在其他地方也是允许的，但需要使用特殊的模块标签加上名称或者声明进行标识，这里不推荐使用，建议注释尽量放在代码前后。
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>class</td>
      <td>类型说明</td>
    </tr>
    <tr>
      <td>struct</td>
      <td>结构体说明</td>
    </tr>
    <tr>
      <td>union</td>
      <td>联合体说明</td>
    </tr>
    <tr>
      <td>fn</td>
      <td>函数说明</td>
    </tr>
    <tr>
      <td>namespace</td>
      <td>命名空间说明</td>
    </tr>
    <tr>
      <td>package</td>
      <td>包说明</td>
    </tr>
    <tr>
      <td>interface</td>
      <td>接口说明</td>
    </tr>
    <tr>
      <td>var</td>
      <td>模块变量说明</td>
    </tr>
    <tr>
      <td>typedef</td>
      <td>模块变量类型说明</td>
    </tr>
    <tr>
      <td>def</td>
      <td>宏定义说明</td>
    </tr>
    <tr>
      <td>enum</td>
      <td>枚举类型说明</td>
    </tr>
  </tbody>
</table>

<h4 class="blue_title"> 函数信息 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>fn</td>
      <td>函数名称</td>
    <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></tr>
    <tr>
      <td>param p</td>
      <td>参数 p 说明</td>
    </tr>
    <tr>
      <td>arg</td>
      <td>列表说明参数 信息</td>
    </tr>
    <tr>
      <td>return</td>
      <td>返回值说明</td>
    </tr>
    <tr>
      <td>retval</td>
      <td>返回值类型说明</td>
    </tr>
    <tr>
      <td>exception</td>
      <td>抛出异常说明</td>
    </tr>
  </tbody>
</table>

## param标签附加参数
- in 该参数作为输入数据
- out 该参数用于输出

例如

```c++
/*!
   @param[int] inputStr 读取字符串
   @param[out] outputStr 输出字符串
*/
```

<h4 class="green_title"> 提醒信息 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>note</td>
      <td>注解</td>
    </tr>
    <tr>
      <td>attention</td>
      <td>注意</td>
    </tr>
    <tr>
      <td>bug</td>
      <td>问题</td>
    </tr>
    <tr>
      <td>warning</td>
      <td>警告</td>
    </tr>
  </tbody>
</table>

<h4 class="purple_title"> 关联信息 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>sa</td>
      <td>参考资料</td>
    <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></tr>
    <tr>
      <td>see</td>
      <td>参考资料</td>
    </tr>
    <tr>
      <td>relates</td>
      <td>通常用做把非成员函数的注释文档包含在类的说明文档中</td>
    </tr>
  </tbody>
</table>

<h4 class="blue_title"> 块结构 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
    </tr>
    <tr>
      <td>par</td>
      <td>段落</td>
    </tr>
    <tr>
      <td>li</td>
      <td>列表</td>
    <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></tr>
    <tr>
      <td>page</td>
      <td>声明创建一个相关页面，内容将组织到最终的“相关页面”中，与 Todo Bug 列表页面等等并列在一起</td>
    </tr>
    <tr>
      <td>section</td>
      <td>页面中的章节，只能在 @page 命令后作用</td>
    </tr>
    <tr>
      <td>code</td>
      <td>代码块开始，与endcode一一对应</td>
    </tr>
    <tr>
      <td>endcode</td>
      <td>代码块结束，与code一一对应</td>
    </tr>
  </tbody>
</table>

<h4 class="brown_title"> 行内修饰 </h4>
<table class="table table-bordered center">
  <tbody>
    <tr>
      <td><b>标签</b></td>
      <td><b>描述</b></td>
      <td><b>生成内容</b></td>
    </tr>
    <tr>
      <td>b 文字</td>
      <td>文字加粗</td>
      <td><code>&lt;b&gt;文字&lt;/b&gt;</code></td>
    <iframe id="tmp_downloadhelper_iframe" style="display: none;"></iframe></tr>
    <tr>
      <td>e 文字</td>
      <td>斜体文字</td>
      <td><code>&lt;i&gt;文字&lt;/i&gt;</code></td>
    </tr>
    <tr>
      <td>c 文字</td>
      <td>等宽字体</td>
      <td><code>&lt;tt&gt;文字&lt;/tt&gt;</code></td>
    </tr>
    <tr>
      <td>n</td>
      <td>换行</td>
      <td><code>&lt;br/&gt;</code></td>
    </tr>
  </tbody>
</table>

# 注释的书写
> 注释应该怎么写，写多还是写少。过多的注释甚至会干扰对代码的阅读。写注释的一个总的原则就是注释应该尽量用来表明作者的意图，至少也应该是对一部分代码的总结，而不应该是对代码的重复或者解释。对代码的重复或者解释的代码，看代码可能更容易理解。反映作者意图的注释解释代码的目的，从解决问题的层次上进行注释，而代码总结性注释则是从问题的解答的层次上进行注释。

> 推荐的写注释的过程是首先使用注释勾勒出代码的主要框架，然后根据注释撰写相应的代码。对各种主要的数据结构、输出的函数、多个函数公用的变量进行详细地注释。对代码中控制结构，单一目的的语句集进行注释。下面是一些写注释时需要注意的要点：
  - 避免对单独语句进行注释；
  - 通过注释解释为什么这么做、或者要做什么，使代码的读者可以只阅读注释理解代码；
  - 对读者可能会有疑问的地方进行注释；
  - 对数据定义进行注释，而不是对其使用过程进行注释；
  - 对于难于理解的代码，进行改写，而不要试图通过注释加以说明；
  - 对关键的控制结构进行注释；
  - 对数据和函数的边界、使用前提等进行注释。

--------------------------------------------------------------------------------

参考文献：
- [文档化开发注释规范](http://wiki.woodpecker.org.cn/moin/CodeCommentingRule#DoxygenApiTag.dox.2BXjh1KFR9TuQ-)
- [Doxygen格式](http://my.oschina.net/alphajay/blog/10235)
