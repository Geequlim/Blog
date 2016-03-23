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
void reset(int *ip)
{
  *ip = 0;  // 改变指针ip所指对象的值
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
  void print(const int *beg, const int *end);
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
* 不要返回局部对象的引用或指针
* 返回临时对象
  * 临时对象有构造和析构的成本，影响程序的效率。
  * 优化手段：使用C++11的右值引用
* 返回多个值，用接受列表初始化的返回值类型(如std::vector)
* 尾置返回类型
  ```c++
  auto func(int i) -> int(*)[10];
  ```
* auto 返回值类型推断
 C++11允许lambda函数根据return语句的表达式类型推断返回类型。C++14为一般的函数也提供了这个能力。C++14还拓展了原有的规则，使得函数体并不是{return expression;}形式的函数也可以使用返回类型推导。  
 为了启用返回类型推导，函数声明必须将auto作为返回类型，但没有C++11的后置返回类型说明符：
 ```c++
 auto DeduceReturnType();   //返回类型由编译器推断
 ```
 如果函数实现中含有多个return语句，这些表达式必须可以推断为相同的类型。  
 使用返回类型推导的函数可以前向声明，但在定义之前不可以使用。它们的定义在使用它们的翻译单元（translation unit）之中必须是可用的。  
 这样的函数中可以存在递归，但递归调用必须在函数定义中的至少一个return语句之后：
 ```c++
  auto Correct(int i) {
    if (i == 1)
      return i;               // 返回类型被推断为int
    else
      return Correct(i-1)+i;  // 正确，可以调用
  }

  auto Wrong(int i)
  {
    if(i != 1)
      return Wrong(i-1)+i;  // 不能调用，之前没有return语句
    else
      return i;             // 返回类型被推断为int
  }
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
  typedef bool (*FuncP)(const string&, const string&);
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

int main(int argc, char *argv[])
{
  int (Foo::*fptr) (string) = &Foo::f;
  Foo obj;
  (obj.*fptr)("str"); // 通过对象来调用 Foo::f()
  Foo *p = &obj;
  (p->*fptr)("str"); // 通过指针来调用 Foo::f()
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
### lambda表达式
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
一个lambda表达式表示一个可调用的代码单元，它的行为类似与一个未命名的函数对象。与任何函数类似，lambda表达式具有一个返回类型、一个参数列表和一个函数体。但与函数不同，lambda表达式可以定义在函数内部。

一个lambda表达式具有如下形式
```
[capture list](parameter list) -> return type { function body }
```
* _capture list_ 是一个lambda表达式在函数中定义的局部变量的列表，表明该局部变量能被用与这个lambda表达式中
* _return type_、_parameter list_、_function body_ 与任何函数一样，分别表示返回类型、参数列表和函数体。但与函数不同，lambda必须使用尾置返回来指定返回类型。

我们可以忽略参数列表和返回类型，但必须包括捕获列表和函数体
```c++
auto f = []{ return 42;};
cout << f() << endl;   // 输出42
```
* 忽略括号和参数列表等价于指定一个空参数列表
* 如果忽略返回类型，lambda根据函数体中的代码推断出返回类型。如果函数体只是一个return语句，则
返回类型从返回的表达式的类型推断而来，否则，返回类型为**void**。
 <!-- class="alert alert-warning" -->
 如果lambda的函数体包含任何单一return语句之外的内容，且未指定返回类型，则返回void。
 <!-- endclass -->
* lambda不能有默认参数，因此，一个lambda调用的实参数目永远与形参数目相等。
#### 捕获列表
* lambda表达式只有在其捕获列表中补货一个它所在函数中的局部变量，才能在函数体重使用该变量。
* lambda表达式可以直接使用定义在当前函数之外的名字。
* 捕获列表只用于局部非static变量，lambda可以直接使用局部static变量。
* 使用引用的方式捕获变量时需在捕获列表中该变量前添加`&`符号，否则视为按值捕获(拷贝局部变量)
  按值捕获示例
  ```c++
  void func1()
  {
    size_t v1 = 42;   //局部变量
    // 将v1拷贝到名为f的可调用对象
    auto f = [v1] { return v1; }
    v1 = 0;
    auto j = f(); // j为42；f保存了我们创建它时v1的拷贝
  }
  ```
  按引用捕获示例
  ```c++
  void func2()
  {
    size_t v1 = 42;   //局部变量
    // 对象f2包含v1的引用
    auto f2 = [&v1] { return v1; }
    v1 = 0;
    auto j = f(); // j为0；f2保存v1的引用，而非拷贝
  }
  ```
* 除了显式列出我们希望使用的来自所在函数的变量外，还可以让编译器根据lambda体中的代码来推断我们要使用哪些变量。为了只是编译器推断捕获列表，应在捕获列表中写一个`&`或`=`，告诉编译器用引用或拷贝的方式捕获用到的局部变量。
  * 如果我们希望对一部分变量采用一种捕获方式，对某几个采用另一种捕获方式，可以混合使用隐式捕获和显式捕获。
  * 当我们混合使用隐式捕获和显式捕获时，捕获列表中的第一个元素必须是一个`&`或`=`，用来指定默认捕获方式。
  ```c++
  //
  void printStrings(vector<string>& words,
                    ostream& os = cout,
                    char c = ' ')
  {
    // os隐式引用捕获；c显式值捕获
    for_each(words.begin(), words.end(),
             [&,c](const string& s) { os << s << c; }
           );
    // os显式引用捕获；c隐式值捕获
    for_each(words.begin(), words.end(),
             [=,&os](const string& s) { os << s << c; }
           );
  }
  ```
<!-- class="alert alert-warning" -->
当以引用方式捕获一个变量时，必须保证在lambda执行时被捕获的变量仍是存在的。
<!-- endclass -->

<!-- class="panel panel-danger" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
###### 尽量保持lambda的变量捕获简单化
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
一个lambda捕获从lambda被创建（即，定义lambda的代码执行时）到lambda自身执行（可能有多次调用）这段时间内保存的相关信息。**确保lambda每次执行的时候这些信息都有预期的意义，这是程序员的责任**。

捕获一个普通变量，如int、string或其他非指针类型，通常可以采用简单的值捕获方式。在此情况下，只需关注变量在捕获时是否有我们所需的值就可以了。

如果我们捕获一个指针或迭代器，或者采用引用捕获方式，旧必须去报在lambda执行时，绑定到迭代器、指针或引用的对象仍然存在。而且，需要保证对象具有预期的值。在lambda从创建到它执行的这段时间内，可能有代码改变绑定的对象的值。也就是说，在指针（或引用）被捕获的时刻，绑定的对象的值是我们期望的，但在lambda执行时，该对象的值可能已经完全不同了。
<!-- class="alert alert-success" -->
一般来说，我们应该尽量减少捕获的数据量，来避免潜在的捕获导致的问题。而且，如果可能的话，应该避免捕获指针或引用。
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->

#### lambda表达式是函数对象
当我们编写一个lambda后，编译器将该表达式翻译成一个未命名的函数对象类的未命名对象。在lambda表达式产生的雷总含有一个重载的函数调用运算符。

下面的这个用与输出字符串的lambda表达式
```c++
[&os, c](const vector<string>& vs)
{
  for (const auto& s : vs)
    os << s << c;
}
```

编译器将其转换为类似下面这样的仿函数类

```c++
class unnamed_lambda{
public:
  unnamed_lambda(ostram& _os, char _c):os(_os),c(_c) {}
  void operator()(const vector<string>& vs) const
  {
    for (const auto& s : vs)
      os << s << c;
  }
private:
  ostram& os;
  char c;
};
```

###### C++14允许lambda函数的形式参数声明中使用类型说明符auto
```c++
auto lambda = [](auto x, auto y) {return x + y;}
```
泛型lambda函数遵循模板参数推导的规则。以上代码的作用与下面的代码相同
```c++
struct unnamed_lambda
{
  template<typename T, typename U>
  auto operator()(T x, U y) const {return x + y;}
};
auto lambda = unnamed_lambda();
```

<!-- endclass -->
<!-- endclass -->
<!-- endclass -->
<!-- endclass -->

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
## std::function模板类
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
和其他对象一样，可调用的对象也有类型。例如，每个lambda有它自己唯一的（未命名）类类型；函数及函数指针的类型则由其返回值类型和实参类型决定，等等。然而，不同的可调用对象却可能共享同一种**调用形式**(call signature)。调用形式指明了调用返回的类型以及传递给调用的实参类型。一种调用形式对应一个函数类型，例如`int(int,int)`是一个函数类型，它接受两个int，返回一个int。

std::function是一个用于表示可调用对象的模板类。一个std::function的实例，能够用于表示某种调用形式，这个实例类型的对应也可以用来存储拥有相同调用形式的不同类型的函数对象。
```c++
#include <functional>
#include <iostream>

struct Foo {
  Foo(int num) : num_(num) {}
  void print_add(int i) const { std::cout << num_+i << '\n'; }
  int num_;
};

void print_num(int i)
{
  std::cout << i << '\n';
}

struct PrintNum {
  void operator()(int i) const
  {
    std::cout << i << '\n';
  }
};

int main()
{
  // 用于存储普通函数
  std::function<void(int)> f_display = print_num;
  f_display(-9);

  // 储存lambda表达式
  std::function<void()> f_display_42 = []() { print_num(42); };
  f_display_42();

  // 储存成员函数指针
  std::function<void(const Foo&, int)> f_add_display = &Foo::print_add;
  const Foo foo(314159);
  f_add_display(foo, 1);

  // 储存成员函数
  std::function<void(const Foo&, int)> f_add_display1 = Foo::print_add;
  const Foo foo1(1001);
  f_add_display(&foo1, 1);

  // 储存函数对象
  std::function<void(int)> f_display_obj = PrintNum();
  f_display_obj(18);
  return 0;
}
```

<!-- class="panel panel-default" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
#### 可调用对象适配器std::bind函数的使用
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
std::bind函数是一个通用的函数适配器，它接受一个可调用对象，生成一个新的可调用对象来“适应”原对象的参数列表。

调用bind的一般形式为
```c++
auto newCallable = bind(callable, arg_list);
```
其中，_newCallable_ 是要生成的可调用对象，_arg_list_ 是一个逗号分隔符的参数列表，对应给定的 _callable_ 的参数。即，当我们调用_newCallable_时，_newCallable_ 会调用_callable_，并传递给它_arg_list_中的参数。

###### bind的参数
bind的参数可用于定义生成的可调用对象的形参列表，也可用于规划调用适配可调用对象的参数顺序。
```c++
// g是一个有两个参数的可调用对象
auto g = bind(f, a, b, _2, c, _1);
```
该表达式生成一个新的可调用对象，它有两个参数，分别用占位符`_2`和`_1`表示。这个新的可调用对象将它自己的参数作为第三个和第五个参数传递给`f`。`f`的第一个、第二个和第四个参数分别被绑定到给定的值`a`、`b`和`c`上。传递给`g`的参数按位置绑定到占位符。即，第一个参数绑定到`_1`，第二个参数绑定到`_3`。因此，当我们调用`g`时，其第一个参数将被传递给`f`作为最后一个参数，第二个参数将被传递给`f`作为第三个参数。实际上这个bind调用会将`g(_1, _2)`映射为`f(a, b, _2, c, _1)`。即，对`g`的调用会调用`f`，用`g`的参数代替占位符，再加上绑定的参数`a`、`b`和`c`。例如，调用`g(X, Y)`会调用`f(a, b, Y, c, X)`。

###### 使用bind绑定成员函数
使用bind可生成包含成员函数所属成员的可调用对象，我们可以使用这个生成的可调用对象来使用绑定的对象调用其成员函数，而不必再次显式的使用该对象。
```c++
#include <iostream>
#include <functional>

struct Foo {
  Foo(int num) : num_(num) {}
	void add(int i) { num_ += i; }
  void print() const { std::cout << num_ << ' '; }
  int num_;
};
int main()
{
  Foo foo(10);
  // 使用拷贝对象，并绑定其成员函数
  using std::placeholders::_1;
  std::function<void(int)> f_add= std::bind( &Foo::add, foo, _1 );
  f_add(2);
  foo.print();    // 输出 10
  // 使用对象引用绑定成员函数
  std::function<void(int)> f_add1= std::bind( &Foo::add, &foo, _1 );
  f_add1(3);
  foo.print();    // 输出 13
  return 0;
}
```
上示代码中输出`10 13`，由此可以看出使用bind绑定成员函数在绑定对象时是否使用`&`的区别。与lambda捕获列表类似，如果绑定对象时在对象前不写`&`将进行对象拷贝。
<!-- class="alert alert-warning" -->
与以引用捕获临时变量同理，使用bind以引用的方式绑定成员函数时必须确保在调用生成的可调用对象时绑定的对象有意义。
<!-- endclass -->

###### 使用ref绑定引用参数
默认情况下，bind的那些**不是占位符的参数**被拷贝到bind返回的可调用对象中。但是，与lambda类似，有时对有些绑定的参数我们希望以引用的方式传递，或是要绑定的参数无法拷贝。

例如如下的情况，我们需要使用`ref`函数为不是占位符的参数绑定引用。
```c++
ostream& print(ostream& os, const string& s, char c)
{
  return os << s << c;
}

// 错误：不能拷贝os
for_each(words.begin(), words.end(), bind(print, os, _1, ' '));
// 正确，使用ref生成os对象的引用，防止拷贝
for_each(words.begin(), words.end(), bind(print, ref(os), _1, ' '));
```
函数`ref`返回一个对象，包含给定的引用，池对象是可以拷贝的。标准库中还有一个cref函数，生成一个保存const引用的类。与`bind`一样，函数`ref`和`cref`也定义在头文件functional中。

另一个来自cppreference的例子

```c++
#include <functional>
#include <iostream>
void f(int& n1, int& n2, const int& n3)
{
    std::cout << "In function: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
    ++n1; // increments the copy of n1 stored in the function object
    ++n2; // increments the main()'s n2
    // ++n3; // compile error
}
int main()
{
    int n1 = 1, n2 = 2, n3 = 3;
    std::function<void()> bound_f = std::bind(f, n1, std::ref(n2), std::cref(n3));
    n1 = 10;
    n2 = 11;
    n3 = 12;
    std::cout << "Before function: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
    bound_f();
    std::cout << "After function: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
}
```
<!-- endclass -->
<!-- endclass -->


##### 函数对象类的引用，使用`ref`函数
默认情况下使用函数对象初始化一个functon对象是进行拷贝的行为
```c++
class callable
{
private:
  int nSum;
public:
  int operator()(int i) { return nSum += i;}
  int sum() const { return nSum; }
};
int main()
{
  callable counter;
  function<int(int)> f1 = counter;
  function<int(int)> f2 = counter;
  cout << f1(10) << ' ' << f2(10) << counter.sum() << endl;
  return 0;
}
```
上面程序的输出是：`10 10 0`。我们将同一个函数对象赋值给了两个function，然后分别调用了这两个function，但函数对象中nSum的值并没有被修改。这是因为function的默认行为是拷贝一份传递给它的函数对象，于是f1和f2中保存的都是add对象的拷贝，调用f1和f2后，counter对象中的值并没有被修改。

可以用`ref`函数获取函数对象的可拷贝引用
```c++
function<int(int)> f1 = ref(counter);
function<int(int)> f2 = ref(counter);
```

##### mem_fn与成员函数
C++还提供了`std::mem_fn`这样一个模板函数用来绑定成员函数，它生成的可调用对象的第一个参数是该成员函数要被调用的对象，接受这个对象的引用和指针（包括内置智能指针）类型的实参。其用法如下所示
```c++
#include <functional>
#include <iostream>
struct Foo {
    void display_greeting() {
        std::cout << "Hello, world.\n";
    }
    void display_number(int i) {
        std::cout << "number: " << i << '\n';
    }
    int data = 7;
};

int main() {
    Foo f;
    auto greet = std::mem_fn(&Foo::display_greeting);
    greet(f);
    auto print_num = std::mem_fn(&Foo::display_number);
    print_num(f, 42);
    auto access_data = std::mem_fn(&Foo::data);
    std::cout << "data: " << access_data(f) << '\n';
}
```

此外，C++14对该函数的设计有所改变，具体用法上的区别在于
```c++
#include <iostream>
#include <functional>
struct X {
    int x;

    int&       easy()      {return x;}
    int&       get()       {return x;}
    const int& get() const {return x;}
};

int main(void)
{
    auto a = std::mem_fn        (&X::easy); // no problem at all
//  auto b = std::mem_fn<int&  >(&X::get ); // no longer works in C++14
    auto c = std::mem_fn<int&()>(&X::get ); // works with both C++11 and C++14
    auto d = [] (X& x) {return x.get();};   // another approach to overload resolution

    X x = {33};
    std::cout << "a() = " << a(x) << '\n';
    std::cout << "c() = " << c(x) << '\n';
    std::cout << "d() = " << d(x) << '\n';
}
```

<!-- endclass -->
<!-- endclass -->



### 参考文献
* 《C++ Primer》第5版
* [cppreference.com](http://en.cppreference.com)
* 维基百科：[内联函数](https://zh.wikipedia.org/wiki/%E5%86%85%E8%81%94%E5%87%BD%E6%95%B0)
* 维基百科：[C++14](https://zh.wikipedia.org/wiki/C%2B%2B14)
* [\[翻译\]C++教程：指向成员函数的指针](http://kelvinh.github.io/blog/2014/03/27/cpp-tutorial-pointer-to-member-function/)
* [恼人的函数指针（二）：指向类成员的指针](http://www.cnblogs.com/AnnieKim/archive/2011/12/04/2275589.html)
* [C++11 function](http://www.cnblogs.com/hujian/archive/2012/12/07/2807605.html)
