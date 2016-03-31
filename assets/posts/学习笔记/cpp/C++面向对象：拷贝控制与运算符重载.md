本文是对C++面向对象深入学习的第二部分，将对拷贝相关的操作和运算符重载相关的知识进行记录，便于日后回顾。
<!-- more -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 拷贝构造函数
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
如果一个构造函数的第一个参数是自身类类型的引用，且任何额外参数都有默认值，则此构造函数是拷贝构造函数（copy constructor）。
```c++
class Foo{
public:
    Foo();
    Foo(const Foo&);
};
```
* 我们把形参定义为const类型，虽然我们也可以定义非const的形参，但是这样做基本上没有意义的，因为函数的功能只涉及到成员的复制操作。
* 形参必须是本身类类型的引用  
  我们知道函数实参与形参之间的值传递，是通过拷贝完成的。那么当我们将该类的对象传递给一个函数的形参时，会调用该类的拷贝构造函数，而拷贝构造函数本身也是一个函数，因为是值传递而不是引用，在调用它的时候也需要调用类的拷贝构造函数（它自身），这样无限循环下去，将无法完成拷贝操作。
* 拷贝构造函数通常不应该是explicit的
  * 很多情况下我们需要拷贝构造函数被隐式得使用。

#### 合成拷贝构造函数
如果我们没有定义拷贝构造函数，编译器会为我们定义一个。与合成默认构造函数不同，即使我们定义了其他构造函数，编译器也会为我们生成一个**合成拷贝构造函数**（synthesized copy constructor）。这个合成的拷贝构造函数会从给定的对象中依次将每个非static成员拷贝到正在创建的对象中。成员自身的类型决定了它是如何被拷贝的：类类型的成员，会使用其拷贝构造函数来拷贝；内置类型则直接拷贝；数组成员会逐元素地拷贝。

#### 直接初始化与拷贝初始化
假设String类定义了接受C风格字符串的构造函数和拷贝构造函数，且未定义移动构造函数。
```c++
String s1("Hello");             //直接初始化
String s2 = string("Hello");    // 拷贝初始化
String s3 = "world";            // 拷贝初始化
```
直接初始化是要求编译器使用普通的函数匹配来选择与我们提供的参数最匹配的构造函数；当我们使用拷贝初始化时，我们要求编译器将右侧运算对象拷贝到正在创建的对象中，如果需要的话还要进行一次类型转换（第三行代码隐藏了一个C风格字符串转换为String类型）。

拷贝初始化不仅在我们用`=`定义变量时会发生，下列情况下也会发生
* 将一个对象作为实参传递给一个非引用类型的形参。
* 从一个返回类型为非引用类型的函数返回一个对象。
* 用花括号初始化列表初始化数组中的元素或一个聚合类中的成员时
* 某些类类型还会对它们所分配的对象使用拷贝初始化(例如使用标准库容器的insert或push成员时)。

##### 编译器可以绕过拷贝构/移动造函数
在拷贝初始化过程中，编译器可以（但不是必须）跳过拷贝/移动构造函数，直接创建对象。即，编译器被允许将下面的代码
```c++
String s = "Hello World!";  // 拷贝初始化
```
改写为
```c++
String s("Hello World");    // 直接初始化
```
但是，即使编译器略过了拷贝/移动构造函数，但在程序这点上，拷贝/移动构造函数必须是存在且可访问的。
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 拷贝赋值运算符
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
拷贝赋值运算符是一个对赋值运算符的重载函数，它的参数与拷贝构造函数相同是其自身类型的引用，通常返回左侧运算对象的引用。
```c++
class Foo
{
public:
    Foo& operator=(const Foo&);
};
```
拷贝赋值运算符通常需要完成析构函数和拷贝构造函数的工作。

##### 合成拷贝赋值运算符
与处理拷贝构造函数一样，如果没有给类定义自己的拷贝赋值运算符，编译器将为生成一个**合成拷贝赋值运算符**（synthesized copy-assignment operator）。合成拷贝赋值运算符会将右侧运算对象的每个非static成员赋予做成运算对象的对应成员，这一工作是通过成员的拷贝赋值运算符来完成的。对于数组类型的成员，逐个赋值数组元素。合成拷贝复制运算符返回一个指向其左侧运算对象的引用。
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 析构函数
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->



析构函数是由波浪线接类名构成，它没有返回值，也不接受参数。因为没有参数，所以它不存在重载函数，也就是说一个类只有一个析构函数。

析构函数做的事情与构造函数相反，那么我们先回忆一个构造函数都做了哪些事：
1. 按成员定义的顺序创建每个成员。
2. 根据成员初始化列表初始化每个成员。
3. 执行构造函数函数体。

在析构函数中，不存在类似构造函数中初始化列表的东西来控制成员如何销毁，析构部分是隐式的。成员如何销毁依赖于成员自身的类型，如果是类类型则调用本身的析构函数，如果是内置类型则会自动销毁。

析构函数在对象销毁时被自动调用：
* 变量在离开其作用域时被销毁；
* 当一个对象被销毁时，其成员被销毁;
* 容器被销毁时，成员被销毁;
* 对于动态分配的对象，当对指向它的指针应用delete运算符时被销毁;
* 对于临时对象，当创建它的赛事表达式结束时被销毁。
<!-- class="alert alert-warning" -->
当指向一个对象的引用或指针离开作用域时，析构函数不会执行。
<!-- endclass -->

##### 合成析构函数
当一个类未定义自己的析构函数时，编译器会为它定义一个**合成析构函数**（synthesized destructor）。该析构函数的函数体为空。
<!-- class="panel panel-danger" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
##### 析构函数的函数体并不直接销毁成员
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
析构函数的函数体并不直接销毁成员，成员是在析构函数体之后隐含的析构阶段中被销毁的。在整个对象销毁过程中，析构函数体是作为成员销毁步骤之外的另一部分而进行的。
<!-- endclass -->
<!-- endclass -->

<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 定义拷贝控制的原则(三/五法则)
* **如果一个类需要定义析构函数，那么几乎可以肯定它也需要一个拷贝构造函数和一个拷贝赋值函数，反过来不一定成立**。
* **如果一个类需要一个拷贝构造函数，几乎可以肯定它也需要一个拷贝赋值函数，反之亦然**。
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
为什么析构函数与拷贝构造函数与赋值函数关系这么紧密呢，或者说为什么我们在讨论拷贝控制(5种)的时候要把析构函数一起放进来呢？

首先，我们思考什么时候我们一定要自己来定义析构函数，比如：类里面有动态分配内存。
```c++
class HasPtr
{
public:
    HasPtr(const string&s = string()) :ps(new string(s), i(0)){}
    ~HasPtr(){ delete ps; }
private:
    int i;
    string* ps;
};
```
我们知道如果是编译器自动合成的析构函数，则不会去delete指针变量的，所以ps指向的内存将无法释放，所以一个主动定义的析构函数是需要的。那么如果没有给这个类定义拷贝构造函数和拷贝赋值函数，将会怎么样？

编译器自动合成的版本，将简单的拷贝指针成员，这意味着多个HasPtr对象可能指向相同的内存。
```
HasPtr p("some values");
f(p);         // 当f结束时，p.ps指向的内存被释放
HasPtr q(p);  // 现在p和q都指向无效内存
```
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 使用`=default`和`=delete`
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
我们可以使用=default来显式地要求编译器生成合成的版本。合成的函数将隐式地声明为内联的，如果我们不希望合成的成员是内联的，应该只对成员的类外定义使用`=default`。

有的时候我们定义的某些类不需要拷贝构造函数和拷贝赋值运算符，比如iostream类就阻止拷贝，以避免多个对象写入或读取相同的IO缓冲。

我们可以在拷贝构造函数和拷贝赋值运算符函数的参数列表后面加上`=delete`用来指出我们希望将它定义为删除的，这样的函数称为删除函数。
```c++
class NoCopy
{
    NoCopy() = default;     // 使用合成的默认构造函数
    NoCopy(const NoCopy&) = delete;         // 删除拷贝
    NoCopy& operator=(const NoCopy&) = delete;    // 删除赋值
    ~NoCopy() = default;    // 使用合成的析构函数
};
```
<!-- class="alert alert-danger" -->
析构函数不能是删除的成员，因为这样的类是无法销毁的。
<!-- endclass -->

<!-- class="panel panel-warning" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
###### 合成的拷贝控制成员可能是删除的
当类存在不可能拷贝、赋值或销毁的成员时，类的合成拷贝控制成员就被定义为删除的。
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->

如果一个类有数据成员不能默认构造、拷贝、赋值或销毁，则对应的成员函数将被定义为删除的
* 如果类的某个成员的的析构函数是删除的或不可访问的，则合成析构函数被定义为删除的。
* 如果类的某个成员的拷贝构造函数是删除的或不可访问的，或者某个成员的析构函数是删除的或不可访问的，则类的合成拷贝构造函数被定义为删除的。
* 如果类的某个成员的拷贝运算符是删除的或不可访问的，或是类有一个const成员或引用成员，则类的合成拷贝赋值运算符被定义为删除的。
  * 如果一个类有const成员，则它不能够使用合成的拷贝负值运算符。毕竟，次运算符师徒赋值所有成员，而将一个新值赋予一个const对象是不允许的。
* 如果类的某个成员析构函数是删除的或不可访问的，或是类有一个引用成员，它没有类内初始器，或者类有一个const成员，它没有类内初始器且未显式定义默认构造函数，则该类的默认构造函数被定义为删除的。
<!-- endclass -->
<!-- endclass -->
##### private拷贝控制
在C++11之前，类是通过将其拷贝构造函数的拷贝赋值运算符声明为private来阻止拷贝，而且为了防止成员被友元或其他成员访问，会对这些成员函数只声明，但不定义。
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 右值引用
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
右值引用就是必须绑定在右值上的引用，我们可以通过&&来声明右值引用。右值引用一个很重要的性质是只能绑定到一个将要销毁的对象，所以我们可以自由地将一个右值引用的资源“移动”到另一个对象中。

我们可以将一个右值引用绑定到表达式上，但不能将右值引用绑定到一个左值上：
```c++
int i = 42;
int &r = i;             // 正确：r引用i
int &&rr = i;           // 错误：不能将一个右值引用绑定到一个左值上
int &r2 = i * 42;       // i*42是一具右值
const int& r3 = i * 42; // 可以将一个const的引用绑定到一个右值上
int && rr2 = i * 42;    // 正确：将rr2绑定到乘法结果上
```
左值有持久的状态，而右值要么是字面常量，要么是表达式求值过程中创建的临时对象。

由于右值引用只能绑定到临时对象，我们得知：
* 所引用的对象将要销毁；
* 该对象没有其他用户。
这两个特性意味着：使用右值引用可以自由地接管所引用的对象的资源。
<!-- class="alert alert-success" -->
右值引用指向将要销毁的对象。因此，我们可以从绑定到右值引用的对象“窃取”状态。
<!-- endclass -->

通过标准库的`std::move`函数(定义在`utility`头文件中)，我们可以获得绑定在左值上的右值引用。
```c++
int  &&r3 = std::move(rr1); // rr1是一个左值
```
<!-- class="alert alert-danger" -->
我们可以销毁一个移动后的源对象，也可以赋予它新值，但不能使用一个移动后源对象的值。
<!-- endclass -->

<!-- class="alert alert-warning" -->
使用move的代码应该使用`std::move`而不是`move`。这样做可以避免潜在的名字冲突。
<!-- endclass -->

### 右值引用与函数重载
左值引用和右值引用可被用于区别函数重载，但右值引用的形参将发生微妙的变化。
```c++
#include <iostream>
using namespace std;
void func(int& i) { cout << "LValue func" << endl; }
void func(int&& i){ cout << "LValue func" << endl; }
void func1(int&& i)
{
  func(i);  // 传人的实参i接受一个右值，将i作为左值传给func函数
}

int main()
{
  func1(1+1); // 输出 LValue func
  return 0;
}
```
>右值引用类型既可以被当作左值也可以被当作右值，判断的标准是，**如果它有名字，那就是左值，否则就是右值**。
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 移动构造函数和移动赋值运算符
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
类似`std::string`类（及其他标准库类），如果我们自己的类也同时支持移动和拷贝，那么也能从中受益。为了让我们自己的类型支持移动操作，需要为其定义移动构造函数和移动赋值运算符。这两个成员类似对应的拷贝操作，但它们从给定对象“窃取”资源而不是拷贝资源。

#### 移动构造函数
类似拷贝构造函数，移动构造函数的第一个参数是该类类型的一个引用。不同于拷贝构造函数的是,这个引用参数在移动构造函数中是一个右值引用。与拷贝构造函数一样，任何额外的参数的必须有默认参数。
```c++
StrVec(StrVec&& s) noexcept // 此移动操作不抛出任何异常
//成员初始化器接管s中的资源
: elements(s.elements), cap(s.cap)
{
  // 令s进入这样一个状态——对其运行析构函数是安全的
  s.elements = s.cap = nullptr;
}
```
除了完成资源移动，移动构造函数还必须确保移后源对象处于这样一个状态——销毁它是无害的。特别是，一旦资源完成移动，源对象必须不再指向被移动的资源——这些资源的所有权已经归属新创建的对象。


#### 移动赋值运算符
移动赋值运算符的定义形式上与拷贝赋值运算符类似，只是将拷贝函数的形参的引用换成右值引用。
```c++
MyClass& operator= (MyClass&&);
```
移动赋值运算符执行与析构函数和移动构造函数类似的工作。
```c++
StrVec& StrVec::operator=(StrVec&& rhs) noexcept
{
  // 直接检测自我赋值
  if(this != & rhs){
    free();           // 释放已有元素
    elements = rhs.elements; // 从rhs接管资源
    cap = rhs.cap;
    // 将rhs置于可析构状态
    rhs.elements = rhs.cap = nullptr;
  }
}
```
<!-- class="alert alert-warning" -->
不抛出异常的移动构造函数和移动赋值运算符必须标记为noexcept。
<!-- endclass -->
<!-- class="alert alert-danger" -->
在移动操作之后，移动源对象必须保持有效的、可析构的状态，但是用户不能对其值进行任何假设。
<!-- endclass -->


#### 合成的移动操作
只有类当一个满足以下条件时，编译器才会为我们的类合成移动操作
* 没有定义任何自己版本的拷贝控制成员
* 类的每个非static数据成员都可以移动
```c++
struct X {
  int i;         // 内置类型可以移动
  std::string s; // std::string定义了自己的移动操作
};
struct hasX {
  X mem;         // X 有合成的移动操作
};
X x, x2 = std::move(x);       // 使用合成的移动构造函数
hasX hx, hx2 = std::move(hx); // 使用合成的移动构造函数
```

合成的移动操作永远不会被定义为删除的。但是，如果我们显式地使用`=default`要求编译器生成移动操作，且编译器不能移动所有成员，则编译器会将移动操作定义为删除的函数。
<!-- class="alert alert-warning" -->
定义了一个移动构造函数或移动赋值运算符的类必须也定义自己的拷贝操作。否则，这些拷贝操作默认地被定义为删除的。
<!-- endclass -->

#### 对应的拷贝操作与移动操作构成重载
也就是说，如果一个类既有移动构造函数，也有拷贝构造函数，编译器使用普通函数匹配规则来确定使用那个构造函数。赋值操作的情况与之类似。

如果`MyClass`类定义了移动操作和拷贝操作的话
```c++
MyClass fn();            // 返回MyClass类型对象的函数
MyClass foo;             // 默认初始化构造
MyClass bar = foo;       // 拷贝初始化构造
MyClass baz = fn();      // 移动初始化构造
foo = bar;               // 拷贝赋值
baz = MyClass();         // 移动赋值
```

**如果没有移动构操作，右值也会被拷贝**：
如果一个类有一个可用的拷贝构造函数而没有移动构造函数，则其对象是通过拷贝构造函数来“移动”的。拷贝赋值运算符和移动赋值运算符的情况类似。
```c++
class Foo {
public:
  Foo() = default;
  Foo(const Foo&);    // 拷贝构造函数
  Foo& operator=(const Foo&); // 拷贝赋值运算符
};

Foo x;               // 默认构造
Foo y(x);            // 拷贝构造函数，x是左值
Foo z(std::move(x)); // 拷贝构造，因为未定义移动构造函数
z = x;               // 拷贝赋值，x是左值
z = std::move(y);    // 拷贝赋值，因为未定义移动赋值
```
<!-- endclass -->
<!-- endclass -->


<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 拷贝、移动优化手段
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->

<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
### 运算符重载和类类型转换操作
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->

<!-- endclass -->
<!-- endclass -->

### 参考文献
* [C++的那些事：类的拷贝控制](http://www.cnblogs.com/ronny/p/3734110.html)
* [C 11中的右值引用&&](https://github.com/cheyiliu/All-in-One/wiki/C--11%E4%B8%AD%E7%9A%84%E5%8F%B3%E5%80%BC%E5%BC%95%E7%94%A8&&)
* [\[译\]详解C++右值引用](http://jxq.me/2012/06/06/%E8%AF%91%E8%AF%A6%E8%A7%A3c%E5%8F%B3%E5%80%BC%E5%BC%95%E7%94%A8/)
