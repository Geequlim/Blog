此项目是我个人的博客网站，使用React开发。

实际效果请访问我的网站 [geequlim.com](http://geequlim.com)

## Workflow

此项目有以下两个分支

| 分支            | 用途     |
| :------------- | :------------- |
| master         |   开发使用 |
| publish        |   博客托管 |

* 修改master分支下的app目录下的源代码，对网站结构或功能开发。
* 在master分支下完成网站功能开发，测试。
* 在publish分支下添加新文章或新作品
* 在publish分支的assets目录下添加Markdown文档，并在`assets/posts.yaml`或`works.yaml`内添加文章索引。
* 在publish分支下发布网站

## 构建项目

安装项目和依赖
```bash
$ npm install
```
### 便捷工具及脚本

以下shell脚本用于简化如构建、同步文件。

##### 使用webpack构建JSBundle

```bash
$ chmod +x ./build.sh
$ ./build.sh
```

##### 同步到服务器

切换到publish分支，合并master做出的修改后执行如下操作（sync.sh需根据自己的VPS进行修改）。

```bash
$ git checkout publish
$ ./clean.sh
$ ./build.sh
$ ./sync.sh
```

## 内容书写简介

站点中的博客文章，作品介绍和关于页面都以Markdown来书写。

### 在Markdown中使用特殊标记

Markdown文档中支持使用自定义CSS样式类，允许HTML代码混编，也支持指定其他标记。这些标记采用HTML注释制定，因此与其他Markdown解析并不冲突。

#### 使用自定义CSS样式
```gfm
<!-- class="panel-body" -->
Bootstrap 面板内容
<!-- endclass -->
```

这段文本会被转换成如下HTML标签
```html
<div class="panel-body">
  Bootstrap 面板内容
</div>
```

#### 使用片段标签

![](/assets/images/posti_tem.png)

在博客文章的Markdown文档中使用`<!-- more -->`来截止博客卡片在博客列表中的缩略内容，所有`<!-- more -->`之前的内容会在博客列表中的卡片中展示。

### 修改索引文件

博客文章的索引文件存放在`assets/posts.yaml`下，内容是记录了博客文章的相关信息，如下所示：

```yaml
- title: 【转】Git 版本管理：Git Flow 模型
  publishAt: 2016-05-02T10:35:55.575Z
  file: /assets/posts/【转】Git 版本管理：Git Flow 模型.md
  categories:
    - git
    - 技术
  tags:
    - 版本控制
```

与之类似，作品索引是`assets/works.yaml`文件，内容如下格式：

```yaml
- title: 漫画速递
  file: /assets/works/漫画速递.md
  logo: /assets/images/works/漫画速递/logo.png
  status: 维护中
  time: 2015年11月～2016年1月
  platforms:
    - Android
    - iOS(未发布)
  categories:
    - 移动APP
    - 漫画阅读
  frameworks:
    - React-Native
  cooperators:
    - Fairyex
```

## 效率优化

推荐使用Atom编辑器，进行开发和写作。该编辑器跨平台有很好的Markdown预览效果。如果使用Atom编辑器编辑了项目的JS脚本内容，则会自动执行webpack操作（需安装save-autorun插件）。

#### 适用于本博客的常用Atom代码片段

```cson
'.source.yaml':
  # 在博客索引中创建新文章
  'New Post':
    'prefix': 'post'
    'body': '''
    - title: /assets/posts/${1:Title}
      publishAt: ${3:${4:2016}-${5:01}-${6:01} ${7:12}:${8:00}:${9:00}}
      file: ${10:posts/${11:filename}.md}
      categories:
        - $12
      tags:
        - $13
    '''
  # 在作品索引中创建新作品
  'New Work':
    'prefix': 'work'
    'body': '''
    - title: ${1:Title}
      file: /assets/works/${2:file.md}
      logo: /assets/images/works/${3:logo.png}
      status: ${4:维护中}
      time: ${5}
      platforms:
        - ${6}
      categories:
        - ${7}
      frameworks:
        - ${8}
      cooperators:
        - ${9}
    '''
'.source.gfm':
    # 自定义CSS样式
    'Styled block':
      'prefix': 'class'
      'body': '''
      <!-- class="$1" -->
      $2
      <!-- endclass -->
      '''
    #　Bootstrap 面板容器
    'Bootstrap panel':
      'prefix': 'panel'
      'body': '''
      <!-- class="panel panel-${1:default}" -->
      <!-- class="panel-heading" -->
      <!-- class="panel-title" -->
      ${2:##### }
      <!-- endclass -->
      <!-- endclass -->
      <!-- class="panel-body" -->
      $3
      <!-- endclass -->
      <!-- endclass -->
      '''
    # Semantic Alte 容器
    'Bootstrap alte':
      'prefix': 'alert'
      'body': '''
      <!-- class="alert alert-${1:info}" -->
      $2
      <!-- endclass -->
      '''
    # 终止文章卡片缩略内容
    'End description':
      'prefix': 'more'
      'body': '<!-- more -->'
```
