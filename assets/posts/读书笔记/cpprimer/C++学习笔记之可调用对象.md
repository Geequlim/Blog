C++中的可调用类型（Callable type）是能够通过调用操作符“()”执行一定操作的对象,或者能用`std::invoke`来调用的对象（C++17）。本文将从函数、仿函数(functor，也被称为函数对象类)、std::function模板类这三个方面对C++的可调用对象进行探究，并对各种类型的可调用对象之间的关系进行阐述。
<!-- more -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
## 函数(Fuctions)
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
## 函数作用域
每个函数内部都有一个独立的作用域，形参和函数体内部定义的变量被称为**局部变量**(local variable) ，他们仅在函数的作用域内可见，同时局部变量还会**隐藏**(hide，或遮盖)在外层作用域中的同名的其他所有声明。

### 自动对象
我们把值存在于块执行期间的对象称为**自动对象**(automatic object)，当函数的控制路径经过变量定义语句时创建该对象，当到达定义所在的模块末尾时销毁它。

### 局部静态对象
**局部静态对象**(local static object)在程序的执行路径第一次你干过对象定义语句时初始化，并且直到程序终止才被销毁，在此期间及时对象所在的函数结束执行也不会对它有影响。

## 函数声明
* 同变量的声明和定义一样，函数的声明和定义是可分离的，函数可以被多次声明但能且只能定义一次。
* 函数的声明和定义非常类似，唯一的区别在于函数声明无需带函数体，用一个分号替代。
* 函数的返回值类型、名称和参数表的类型是函数用于与其他函数的标志。函数的形参名称并非必不可少，但是很多时候写上形参的名字还是有用处的，它可以帮助使用者更好地理解函数的功能。

## 函数参数
* 实参是形参的初始值，关于形参和实参的定义这里不再展开。
* 函数的参数列表可以为空但不能省略，可以使用一个空的形参列表，也可以使用关键字 `void`表示函数没有参数。
```c++
void f1() {}     // 隐式地定义空形参列表
void f2(void) {} // 显式地定义空形参列表
```

#### 传值参数
当初始化一个非引用类型的变量时，初始值被拷贝给变量。此时，对变量的改动不会影响初始对象的值。传值参数的机理完全一样，函数对形参做的所有操作都不会影响实参。


<!-- class="panel panel-warning" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
**指针和形参**
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->

指针的行为和其他非引用类型一样。当执行指针拷贝操作时，拷贝的是指针的值。拷贝之后，两个指针是拥有相同值的不同指针。因为指针使我们可以简介地访问它所指的对象，所以通过指针可以修改它所指向对象的值。
```c++
// 该函数接受一个指针，然后将指针所指的值置为0
void reset(int \*ip)
{
  \*ip = 0;  // 改变指针ip所指对象的值
  ip  = 0;  // 只改变了ip的局部拷贝，实参未被改变
}
```
调用`reset`函数之后，实参所指的对象被置为0，但是实参本身并没有改变。
```c++
int i = 42;                 
reset(&i);                   // 改变i的值而非i的地址
cout << "i = " << i << endl; // 输出 i = 0
```
<!-- endclass -->
<!-- endclass -->

#### 传引用参数

对于引用的操作实际上是作用在引用所引用的对象上的，引用形参的行为与之类似。通过使用引用参数，允许函数改变一个或多个实参的值。

* 使用引用可避免参数的拷贝
* 一个函数只能返回一个值，然而有时函数需要同时返回多个值，引用形参便可实现此功能。

<!-- class="alert alert-warning" -->
如果函数为无需改变引用形参的值，最好将其声明为常量引用。
<!-- endclass -->

#### const形参和实参

和其他初始化过程一样，但用实参初始化形参时会忽略掉顶层const。换句话说，形参的顶层const被忽略掉了。当形参有顶层const时，传递给他常量对象或非常量对象都是可以的。

```c++
// 此函数接受const int类型实参，也接受int类型实参
void fcn(const int i)
{
  // fcn能够读取i，但是不能向i写值
}
```
忽略顶层const会带来另一个问题
```c++
void fcn(const int i) {}
void fcn(int i) {}  // 错误，重复定义了fnc(int)
```
因为顶层const被忽略掉了，所以上面两个fcn函数的参数可以完全一样，因此第二个fcn是错误的，尽管它们形式上有差异，但实际上它的形参和第一个fnc的形参没有什么不同。

* 尽量使用常量引用和指向常量的指针作为形参

#### 数组形参
* 必须确保使用数组时不会越界
* 三种等价的书写形式
  ```c++
  void print(const int*);
  void print(const int[]);
  void print(const int[10]);
  ```
  尽管表现形式不同，但上面三个函数是等价的
* 使用标记指定数组长度(如使用'\0'表示字符数组结尾)
* 使用标准库规范
  ```c++
  void print(const int \*beg, const int \*end);
  ```
* 显示传递一个表示数组大小的形参
  ```c++
  void print(const int ia[], size_t size);
  ```
* 使用数组引用作为形参类型
  ```c++
  void print(int (&arr)[10])
  {
    for (auto elem : arr)
      cout << ele << endl;
  }
  ```
* 多维数组的形参
  ```c++
  // 编译器回忽略掉第一个维度
  void print(int matrix[][10], int rowSize);
  // 等价于下面的声明
  void print(int (*matrix)[10], int rowSize);
  ```
  ```c++
  int main(int argc, char* argv[]);
  ```
  main函数的参数就是用多维数组，执行第一个字符串内容是执行文件的路径

#### 可变形参
##### initializer_list模板类
* 接受相同类型的多个实参
* 元素永远是常量值，无法修改参数元素值
* 使用花括号初始化该类对象

##### 省略符形参
* C语言常用的不定长参数函数，[参考此文](http://www.tutorialspoint.com/cprogramming/c_variable_arguments.htm)。
* 使用示例
  ```c++
  #include <stdio.h>
  #include <stdarg.h>

  double average(int num, ...)
  {
     va_list valist;
     double sum = 0.0;
     int i;
     // initialize valist for num number of arguments
     va_start(valist, num);

     // access all the arguments assigned to valist
     for (i = 0; i < num; i++) {
        sum += va_arg(valist, int);
     }

     // clean memory reserved for valist
     va_end(valist);

     return sum/num;
  }

  int main()
  {
     printf("Average of 2, 3, 4, 5 = %f\n", average(4, 2,3,4,5));
  }
  ```

### 返回值
* auto 返回值类型推断
* 不要返回局部对象的引用或指针
* 返回临时对象
  * 临时对象有构造和析构的成本，影响程序的效率。
  * 优化手段：使用C++11的右值引用
* 返回多个值，用接受列表初始化的返回值类型(如std::vector)
* 尾置返回类型
  ```c++
  auto func(int i) -> int(\*)[10];
  ```

### 内联函数
使用`inline`关键字声明、定义的内联函数在编译时“内联地”展开，可避免函数调用的开销。

##### 设计内联函数的动机
内联扩展是一种特别的用于消除调用函数时所造成的固有的时间消耗方法。一般用于能够快速执行的函数，因为在这种情况下函数调用的时间消耗显得更为突出。这种方法对于很小的函数也有空间上的益处，并且它也使得一些其他的优化成为可能。

没有了内联函式，程式员难以控制哪些函数内联哪些不内联；由编译器自行决定是否内联。加上这种控制维度准许特定于应用的知识，诸如执行函式的频繁程度，被利用于选择哪些函数要内联。

此外，在一些语言中，内联函数与编译模型联系紧密：如在C++中，有必要在每个使用它的模块中定义一个内联函数；与之相对应的，普通函数必须定义在单个模块中。这使得模块编译独立于其他的模块。

##### 与宏的比较
通常，在C语言中，内联展开的功能由带参宏（Macros）在源码级实现。内联提供了几个更好的方法：
* 宏调用并不执行类型检查，甚至连正常参数也不检查，但是函数调用却要检查。
* 宏使用的是文本替换，可能导致无法预料的后果，因为需要重新计算参数和操作顺序。
* 在宏中的编译错误很难发现，因为它们引用的是扩展的代码，而不是程序员键入的。
* 许多结构体使用宏或者使用不同的语法来表达很难理解。内联函数使用与普通函数相同的语言，可以随意的内联和不内联。
* 内联代码的调试信息通常比扩展的宏代码更有用。

<!-- class="alert alert-warning" -->
内联说明只是向编译器发出一个请求，编译器可以选择忽略这个请求。
<!-- endclass -->

### constexpr函数

一个constexpr函数有一些必须严格遵循以下要求：
* 函数中只能有一个return语句
* 只能调用其它constexpr函数
* 只能使用全局constexpr变量

我们允许constexpr函数的返回值并非一个常来表达式：
```c+
  constexpr int new_sz() { return 42; }
  // 如果cnt是常来那个表达式，则scale(arg)也是常量表达式
  constexpr size_t scale(size_t cnt) { return new_sz() * cnt; }
  int arr[scale(2)];    // 正确：scale(2)是常量表达式
  int i = 2;            // i不是常量表达式
  int a2[scale(i)];     // 错误scale(i)不是常量表达式
```

## 函数指针
函数指针指向的是函数而非对象。和其他指针一样，函数指针指向某种特定类型。函数的类型由它的返回值类型和参数类型共同决定，与函数名无关。

```c++
// pf 指向一个函数，该函数的参数是两个const string引用，返回bool类型
bool (*pf)(const string&, const string&);
```
<!-- class="ui red segment" -->
`*pf`两端的括号必不可少。如果不写这对括号，则pf是一个返回bool指针的函数：
```c++
bool* pf(const string&, const string&);
```
<!-- endclass -->

#### 使用函数指针
* 当我们把函数名作为一个值使用时，该函数自动地转换成指针。
* 我们还能直接使用指向函数的指针调用该函数，无需提前解引用指针。
* 可以为函数指针附一个`nullptr`或者值为0的整形常量表达式，表示该指针没有指向任何一个函数。
```c++
// 比较两个string对象的长度
bool lengthCompare(const string&, const string&);
bool (*pf)(const string&, const string&); // 未初始化
pf = nullptr;
pf = lengthCompare;  // pf指向名为lengthCompare的函数
pf = &lengthCompare; // 等价的赋值语句：取地址符是可选的
bool b1 = pf("hello", "goodbye");    // 调用lengthCompare函数
bool b2 = (*pf)("hello", "goodbye"); // 等价的调用
```
* 当我们将decltype作用于某个函数时，它返回函数类型而非指针类型。
* 常用方式，为函数指针类型定义别名
  定义函数类型、函数指针类型别名
  ```c++
  // Func、Func1 和 Func2 是相同的函数类型
  typedef bool Func(const string&, const string&);
  using Func1 = bool(const string&, const string&);
  typedef decltype(lengthCompare) Func2;
  // FuncP、FuncP1 和 FuncP2 是相同的函数指针类型
  typedef bool (\*FuncP)(const string&, const string&);
  using FuncP1 = bool(*)(const string&, const string&);
  typedef decltype(lengthCompare) *FuncP2;
  ```

### 成员函数指针
成员函数指针不像常规指针那样保存某个“准确”的地址。我们可以把它想像成保存的是成员函数在类布局中的“相对”地址。

下面的语法展示了如何声明一个成员函数指针：
```c++
Return_Type (Class_Name::* pointer_name) (Argument_List);
```
* Return_Type:     成员函数的返回值类型
* Class_name:      成员函数所属的类名
* Argument_List:   成员函数参数表
* pointer_name:    指针对象名称

成员函数指针使用示例
```c++
#include <iostream>
#include <string>
using namespace std;

class Foo
{
public:
  int f(string str)
  {
    cout << "Foo::f()" << endl;
    return 1;
  }
};

int main(int argc, char \*argv[])
{
  int (Foo::\*fptr) (string) = &Foo::f;
  Foo obj;
  (obj.\*fptr)("str"); // 通过对象来调用 Foo::f()
  Foo \*p = &obj;
  (p->\*fptr)("str"); // 通过指针来调用 Foo::f()
}
```

类的静态成员和普通成员的区别在于，他们是不依赖于具体对象的，所有实例化的对象都共享同一个静态成员，所以静态成员也没有this指针的概念。所以，指向类的静态成员的指针就是普通的指针。

```c++
typedef const int *STATICDATAPTR;    
typedef int (*STATICFUNCPTR)();        //跟普通函数指针是一样的

class A
{
public:
    static int StaticFunc() { return staticMember; };
    static const int staticMember = 10;
};

int main()
{
    STATICDATAPTR dataPtr = &A::staticMember;
    STATICFUNCPTR funcPtr = &A::StaticFunc;

    cout<<*dataPtr;            //直接解引用
    cout<<(*funcPtr)();    

    return 0;
}
```
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
## 仿函数(functor，函数对象类)
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
如果类重载了函数调用运算符，则我们可以像使用函数一样使用该类的对象。因为这样的类同时也能存储状态，所以与普通函数相比他们更加灵活。

使用示例：
```c++
class PrintString
{
private:
  ostream &os;
  char sep;
public:
  PrintString (ostream &os = cout, char c = ' '):os(o), sep(c) {}
  void operator()(const string& s) const { os << s << sep; }
};

PrintString pf;
pf("Haha~");    // 输出 Haha~ 到标准输出流

vector<string> vs = {"Hello", "World"};
for_each(vs.begin(), vs.end(), PrintString(cerr)); // 使用cerr输出"Hello World"
```

<!-- class="alert alert-success" -->
函数调用运算符必须是成员函数。一个类可以定义多个不同版本的调用运算符，互相之间应该在参数数量或类型上有所区别。
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
## lambda表达式
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
### lambda表达式是函数对象

<!-- endclass -->
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
## std::function
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->

<!-- endclass -->
<!-- endclass -->



### 参考文献
* 《C++ Primer》第5版
* 维基百科：[内联函数](https://zh.wikipedia.org/wiki/%E5%86%85%E8%81%94%E5%87%BD%E6%95%B0)
* [\[翻译\]C++教程：指向成员函数的指针](http://kelvinh.github.io/blog/2014/03/27/cpp-tutorial-pointer-to-member-function/)
* [恼人的函数指针（二）：指向类成员的指针](http://www.cnblogs.com/AnnieKim/archive/2011/12/04/2275589.html)
