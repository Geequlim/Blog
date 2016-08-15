简单使用说明
===========

这是一个高级的富文本编辑工具，允许您在此书写[Markdown](https://zh.wikipedia.org/wiki/Markdown)或者HTML这样的标记语言。当然您也可以按照传统的纯文本输入框使用。

如果你熟悉Github的Markdown语法，那么恭喜你，这里支持Github的所有Markdown编辑功能。如果你之前没有接触过Markdown，那么我推荐你花几分钟时间[到这里](https://zh.wikipedia.org/wiki/Markdown)看一下这个主流的纯文本编辑工具，我相信你肯定会有所收获，并且我保证花这点时间是值得的。

---

高级编辑部分
===========

如果普通的Markdown还满足不了你书写个性的内容，那么这里也许有你需要的功能。


<!-- class="well fillW" -->
<h2>使用emoji表情</h2>

你可以使用`:emoji:`的方式来使用emoji表情，如下所示

<!-- class="ui info message" -->
我认为每个帅气的程序员:boy:都能泡到好看的妹子:girl:只需要给他吃一个:apple:就可以了，如果不行，那就给她个:green_apple:。

如果你做不到，说明你不够帅，或者你不是程序员:cry:。
<!-- endclass -->

关于emoji标签符号名称，可以[在这里找到](http://unicode.org/emoji/charts/full-emoji-list.html)。
<!-- endclass -->


<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
#### 在Markdown中使用CSS样式
本编辑器支持所有[Bootstrap](http://fezvrasta.github.io/bootstrap-material-design/bootstrap-elements.html)和[Semantic-ui](http://semantic-ui.com/)样式
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->

你可以通过以下方式在Markdown中使用指定CSS样式的元素，并且下面的语法与其他所有Markdown解析器兼容。

```markdown
<!-- class="ui button" -->
### 这是一个按钮
<!-- endclass -->
```
这段代码会被解析为下列的HTML元素

```html
<div class="ui button">
  <h3>这是一个按钮</h3>
</div>
```
<!-- class="ui teal button" -->
### 这是一个按钮
<!-- endclass -->

<!-- endclass -->
<!-- endclass -->



<!-- class="panel panel-info" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
#### 使用HTML
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
你可以在这个编辑区中使用HTML标记，甚至允许在这里嵌入自己的小程序。
```html
<div class="ui blue button" onclick="myfunc()">弹出消息</div>
<script type="text/javascript">
function myfunc(){
  swal('提示', '我是一条消息', 'success');
}
</script>
```
这段代码将生成下面这样的一个按钮，点击会弹出一个对话框。

<div class="ui blue button" onclick="myfunc()">弹出消息</div>
<script type="text/javascript">
function myfunc(){
  swal('提示', '我是一条消息', 'success');
}
</script>

<!-- endclass -->
<!-- endclass -->

<!-- class="ui positive message" -->
#### 使用此富文本编辑器，你可以做出很漂亮的页面，本帮助页面也是使用Markdown写的。<!-- endclass -->
