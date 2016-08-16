## SCons 简介
>SCons 是一个开放源代码、以 Python 语言编写的下一代的程序建造工具。它最初的名字是 ScCons, 基于由 perl 语言编写的 Cons 软件开发而成，它在 2000 年 8 月获得了由 Software Carpentry 举办的 SC 建造比赛的大奖。现在 ScCons 已经被改名为 SCons，目的是为了表示不再与 Software Carpentry 有联系，当然，还有一个目的，就是为了更方便的输入。
<!-- more -->

>作为下一代的软件建造工具，SCons 的设计目标就是让开发人员更容易、更可靠和更快速的建造软件。与传统的 make 工具比较，SCons 具有以下优点：
* 使用 Python 脚本做为配置文件
* 对于 C,C++ 和 Fortran, 内建支持可靠自动依赖分析. 不用像 make 工具那样需要执行"make depends"和"make clean"就可以获得所有的依赖关系。
* 内建支持 C, C++, D, Java, Fortran, Yacc, Lex, Qt，SWIG 以及 Tex/Latex。 用户还可以根据自己的需要进行扩展以获得对需要编程语言的支持。
* 支持 make -j 风格的并行建造。相比 make -j, SCons 可以同时运行 N 个工作，而 不用担心代码的层次结构。
* 使用 Autoconf 风格查找头文件，函数库，函数和类型定义。
良好的夸平台性。SCons 可以运行在 Linux, AIX, BSD, HP/UX, IRIX, Solaris, Windows, Mac OS X 和 OS/2 上。

## 执行选项
下面列出了Scons部分常用选项，全部选项可执行`scons -h`查看

| 选项    | 功能     |
| :------------- | :------------- |
| `-c`, `--clean`, `--remove` | 清理生成的项目及其依赖项 |
| `-f FILE`, `--file=FILE`, `--makefile=FILE`, `--sconstruct=FILE`| 指定`FILE`作为顶层配置文件|
| `-j N`, `--jobs N`| 允许同时执行`N`个构建工作 |
| `-Q` | 精简读取、构建输出 |
| `-s`, `--silent`, `--quiet` | 不输出命令 |

## 配置文件

### SConstruct 文件
与Make构建系统的Makefile对应，SConstruct作为Scons的顶层配置文件，Scons从中读取构建信息。
* SConstruct实际上是一个Python脚本
* SCons配置脚本中的构建方法调用顺序可能与书写顺序不同，是根据依赖进行的

  * 从下面的配置脚本
```python
print "Calling Program('hello.c')"
Program('hello.c')
print "Calling Program('goodbye.c')"
Program('goodbye.c')
print "Finished calling Program()"
```
执行的输出证明了配置脚本中函数调用的*无序性*
```bash
% scons
scons: Reading SConscript files ...
Calling Program('hello.c')
Calling Program('goodbye.c')
Finished calling Program()
scons: done reading SConscript files.
scons: Building targets ...
cc -o goodbye.o -c goodbye.c
cc -o goodbye goodbye.o
cc -o hello.o -c hello.c
cc -o hello hello.o
scons: done building targets.
```

## 内置构建函数

| 函数 | 用途 |
| :------------- | :------ |
| `Program` | 构建可执行项目  |
| `Object`  | 构建object文件  |
| `Library`, `StaticLibrary` | 构建静态链接库 |
| `SharedLibrary` | 构建动态链接库 |

## 简单构建
* 指定构建目标输出文件

  内置构建函数第一个参数`target`可用于指定目标输出文件，Scons会根据平台需要自动添加文件后缀

* 添加多个文件用于构建目标
  * 内置构建函数第二个参数`source`接受一个**字符串**或一个**字符串列表**，用于指定用于构建的输入文件。
  * `Split`函数可用于分割包含多个空格或换行的字符串，便于设置`source`参数。
```python
src_files = Split("""main.c
                     file1.c
                     file2.c""")
Program('program', src_files)
```
  * `Glob`函数可使用通配符查询文件，生成文件列表,便于设置`source`参数。
```python
Program('program', Glob('*.c'))
```
* 执行多项构建

  只需简单的在配置脚本中调用多个构建函数即可。
```python
Program('foo.c')
Program('bar', ['bar1.c', 'bar2.c'])
```
* 在多个构建任务中共享文件
```python
common = ['common1.c', 'common2.c']
foo_files = ['foo.c'] + common
bar_files = ['bar1.c', 'bar2.c'] + common
Program('foo', foo_files)
Program('bar', bar_files)
```
* 添加链接库

  在Scons中，通过$LIB构造参数来设置构建项目的链接库文件，通过$LIBPATH构造参数来设置链接库的查询目录。
```python
Library('foo', ['f1.c', 'f2.c', 'f3.c'])
Program('prog.c', LIBS=['foo', 'bar'], LIBPATH='.')
```

## 节点对象
所有构建函数返回一个节点对象列表用于标记将要被构建的文件，这些返回的节点能被用作其他构建函数的参数。

举个例子：
我们需要为两个源文件设置不同的编译参数，然后将它们编译到同一个可执行文件中。这时我们可以通过`Object`构建函数返回的节点对象来作为`Program`构建函数的参数。
```python
hello_list = Object('hello.c', CCFLAGS='-DHELLO')
goodbye_list = Object('goodbye.c', CCFLAGS='-DGOODBYE')
Program(hello_list + goodbye_list)
```
在类Unix系统下的构建输出为
```bash
% scons -Q
cc -o goodbye.o -c -DGOODBYE goodbye.c
cc -o hello.o -c -DHELLO hello.c
cc -o hello hello.o goodbye.o
```
在Windows下构建输出
```
C:\>scons -Q
cl /Fogoodbye.obj /c goodbye.c -DGOODBYE
cl /Fohello.obj /c hello.c -DHELLO
link /nologo /OUT:hello.exe hello.obj goodbye.obj
embedManifestExeCheck(target, source, env)
```
从构建输出中可以看到，构建函数返回的节点对象代表的文件是各平台通用的，这样我们不再需要为文件后缀和路径分隔符的不同而操心。
* 显式创建节点对象

  虽然在大多数情况下我们不需要这样做，但Scons仍然允许我们手动创建节点对象，提供以下函数
  * `File` : 创建表示文件的节点对象
  * `Dir`  : 创建表示目录的节点对象
  * `Entry`: 创建表示文件或目录的节点对象

* 节点对象能通过Python的`str`函数转换为字符串
  ```python
  import os.path
  program_list = Program('hello.c')
  program_name = str(program_list[0])
  if not os.path.exists(program_name):
      print program_name, "does not exist!"
  ```
  在POSIX系统中执行输出
  ```bash
  % scons -Q
  hello does not exist!
  cc -o hello.o -c hello.c
  cc -o hello hello.o
  ```
* `GetBuildPath`函数: 从节点对象或字符串中获取路径

  参数可以是用于表示路径的字符串、字符串列表，节点对象、节点对象列表。返回值对应传入参数的数目，传入参数的路径可以是不存在的。
```python
env=Environment(VAR="value")
n=File("foo.c")
print env.GetBuildPath([n, "sub/dir/$VAR"])
```
  执行构建输出
```
% scons -Q
['foo.c', 'sub/dir/value']
scons: `.' is up to date.
```
## 依赖处理

### `Decider`函数
`Decider`函数设置如何检查依赖项是否发生变化而需要重新为该依赖项执行构建活动
```python
Program('hello.c')
Decider('MD5-timestamp')
```
`Decider`函数接受以下参数：
* `content`, `MD5` : 默认采用，根据文件内容(MD5值)进行判断
* `make`, `timestamp-newer` : 根据文件修改时间进行判断，文件修改时间比之前晚则重新构建
* `timestamp-match` : 根据文件修改时间进行判断，文件修改时间不同则重新构建
* `MD5-timestamp`: 根据文件内容（MD5值）和修改时间进行判断，对修改时间有变化的依赖项进行MD5检查
* 自定义检查方式: 实现dicide函数，用于依赖检查
```python
Program('hello.c')
def decide_if_changed(dependency, target, prev_ni):
    if self.get_timestamp() != prev_ni.timestamp:
        dep = str(dependency)
        tgt = str(target)
        if specific_part_of_file_has_changed(dep, tgt):
            return True
    return False
Decider(decide_if_changed)
```
  decide函数参数说明:
  * dependency 节点对象，表示依赖项文件
  * target 节点对象，表示构建的对象
  * prev_ni **上一次构建时** 的依赖文件的信息，具有以下属性
    * `csig` MD5值
    * `size` 文件字节大小
    * `timestamp` 文件修改时间

* 混合使用Decider示例

  使用多个Environment对象实现
```python
env1 = Environment(CPPPATH = ['.'])
env2 = env1.Clone()
env2.Decider('timestamp-match')
env1.Program('prog-MD5', 'program1.c')
env2.Program('prog-timestamp', 'program2.c')
```
  构建输出
```bash
% scons -Q
cc -o program1.o -c -I. program1.c
cc -o prog-MD5 program1.o
cc -o program2.o -c -I. program2.c
cc -o prog-timestamp program2.o
% touch inc.h
% scons -Q
cc -o program2.o -c -I. program2.c
cc -o prog-timestamp program2.o
```

### 显式依赖

#### $CPPPATH 构造变量
$CPPPATH变量值告诉Scons构建目标所依赖的源文件需要在提供的目录内查找头文件作为该源文件的依赖项。
```python
Program('hello.c', CPPPATH = ['include', '/home/project/inc'])
```
执行scons构建在类Unix系统中输出
```bash
% scons -Q hello
cc -o hello.o -c -Iinclude -I/home/project/inc hello.c
cc -o hello hello.o
```
执行scons构建在类Windows系统中输出
```
C:\>scons -Q hello.exe
cl /Fohello.obj /c hello.c /nologo /Iinclude /I\home\project\inc
link /nologo /OUT:hello.exe hello.obj
embedManifestExeCheck(target, source, env)
```
* Scons 支持将依赖的头文件进行缓存，这样能减少源文件的解析而有效缩短重新构建的时间。同时，此功能需要合理利用，否则会导致依赖更改后不能重建的问题。详细用法请参考Scons官方文档：[Caching Implicit Dependencies](http://scons.org/doc/production/HTML/scons-user/ch06s04.html)。

#### 使用`ParseDepends`函数创建第一次构建产生的文件依赖

Scons在建立头文件依赖解析在某些情况下可能失灵，比如这类代码
```c
#define FOO_HEADER <foo.h>
#include FOO_HEADER

int main() {
    return FOO;
}
```
此时执行scons构建
```
% scons -Q
cc -o hello.o -c -I. hello.c
cc -o hello hello.o
%    [修改头文件 foo.h]
% scons -Q
scons: `.' is up to date.
```

由于Scons并没有如此强大的代码解析功能。这时候，我们不得不借助编译器来处理了,让编译器生成头文件标记，然后让它作为源文件的依赖。
```python
obj = Object('hello.c', CCFLAGS='-MD -MF hello.d', CPPPATH='.')
SideEffect('hello.d', obj)
ParseDepends('hello.d')
Program('hello', obj)
```
使用ParseDepends的缺点是由于部分依赖项是由编译器生成的，这样会增加不必要的重复构建操作，因为一些文件首次编译后会添加新的依赖项。
```
% scons -Q
cc -o hello.o -c -MD -MF hello.d -I. hello.c
cc -o hello hello.o
% scons -Q --debug=explain
scons: rebuilding `hello.o' because `foo.h' is a new dependency
cc -o hello.o -c -MD -MF hello.d -I. hello.c
% scons -Q
scons: `.' is up to date.
```

#### 使用`Depends`手动创建依赖
`Depends`函数用与建立自定义依赖项，第一个参数是构建目标，第二个参数是构建目标的依赖项（接受字符串，字符串列表，节点对象，节点对象列表）
```python
hello = Program('hello.c')
Depends(hello, 'other_file')
```
执行scons构建输出
```
% scons -Q hello
cc -c hello.c -o hello.o
cc -o hello hello.o
% scons -Q hello
scons: `hello' is up to date.
% edit other_file
    [修改 other_file]
% scons -Q hello
cc -c hello.c -o hello.o
cc -o hello hello.o
```

另一个例子，用于建立依赖项，scons会自动调整合适的构建顺序
```python
hello = Program('hello.c')
goodbye = Program('goodbye.c')
Depends(hello, goodbye)
```
执行scons构建，依赖项goodbye将在依赖者hello之前被构建
```
% scons -Q hello
cc -c goodbye.c -o goodbye.o
cc -o goodbye goodbye.o
cc -c hello.c -o hello.o
cc -o hello hello.o
```

#### 使用`Ignore`忽略依赖
忽略（移除）自动建立在源文件上的头文件依赖示例
```python
hello_obj=Object('hello.c')
hello = Program(hello_obj)
Ignore(hello_obj, 'hello.h')
```
使用scons执行两次构建
```
% scons -Q hello
cc -c -o hello.o hello.c
cc -o hello hello.o
% scons -Q hello
scons: `hello' is up to date.
% edit hello.h
  [修改头文件 hello.h]
% scons -Q hello
scons: `hello' is up to date.
```

* `Ignore`函数可以用于间接依赖，如下所示，能够避免在不同系统中构建因为标准库的不同而重新构建
```python
hello = Program('hello.c', CPPPATH=['/usr/include'])
Ignore(hello, '/usr/include/stdio.h')
```

* `Ignore`可用忽略构建函数，如下所示
```python
hello_obj=Object('hello.c')
hello = Program(hello_obj)
Ignore('.',[hello,hello_obj])
```
执行scons构建输出
```
% scons -Q
scons: `.' is up to date.
% scons -Q hello
cc -o hello.o -c hello.c
cc -o hello hello.o
% scons -Q hello
scons: `hello' is up to date.
```

#### 使用`Requires`函数建立期许依赖

在我们要向一个源文件version.c中自动生成编译时间的构建中，我们在构建脚本中这样写
```python
import time

version_c_text = """
char *date = "%s";
""" % time.ctime(time.time())
open('version.c', 'w').write(version_c_text)

hello = Program(['hello.c', 'version.c'])
```

但是这样我们的version.c在每次执行构建时都被修改，因此，每次都需要重新构建"hello"。这并不是我们想要的结果，因为从逻辑上讲，单是该文件变动不需要更新版本日志。

因此需要调整构建脚本，现在可以使用`Require`为hello建立期许依赖项version.c的编译后对象(object)，version.c不在作为hello的依赖源码。

```python
import time

version_c_text = """
char *date = "%s";
""" % time.ctime(time.time())
open('version.c', 'w').write(version_c_text)

version_obj = Object('version.c')

hello = Program('hello.c',
                LINKFLAGS = str(version_obj[0]))

Requires(hello, version_obj)
```
执行scons构建输出
```
% scons -Q hello
cc -o version.o -c version.c
cc -o hello.o -c hello.c
cc -o hello version.o hello.o
% sleep 1
% scons -Q hello
cc -o version.o -c version.c
scons: `hello' is up to date.
% sleep 1
%     [CHANGE THE CONTENTS OF hello.c]
% scons -Q hello
cc -o version.o -c version.c
cc -o hello.o -c hello.c
cc -o hello version.o hello.o
% sleep 1
% scons -Q hello
cc -o version.o -c version.c
scons: `hello' is up to date.
```

#### `AlwaysBuild`不管依赖是否变动，总是重新执行构建操作

```python
hello = Program('hello.c')
AlwaysBuild(hello)
```
此函数将指定的构建活动总是标记为过时的，因此，它的直接依赖将被重建
```
% scons -Q
cc -o hello.o -c hello.c
cc -o hello hello.o
% scons -Q
cc -o hello hello.o
```


## 参考文献
* [Scons Documentation](http://scons.org/documentation.html)
* [使用 SCons 轻松建造程序](https://www.ibm.com/developerworks/cn/linux/l-cn-scons/)
