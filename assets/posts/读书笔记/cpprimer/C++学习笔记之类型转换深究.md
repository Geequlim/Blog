本文将对C++的隐式类型转换和显式类型转换（强制类型转换）进行深入研究。理解这一部分的内容有利于更深入理解C++的基础知识，提高代码的执行效率，写出更加优美、健壮的代码。
<!-- more -->

## 隐式类型转换
### 何时发生隐式类型转换
* 在大多数表达式中，比int类型小的整型值首先提升为较大的整数类型。
* 在条件中，非布尔值转换成布尔类型。
* 初始化过程中，初始值转换成变量的类型；在赋值语句中，右侧运算对象转换成左侧运算对象的类型。
* 如果算术运算或者关系运算的运算对象有多种类型，需要转换成同一种类型。
* 函数调用时如果实参与形参不完全匹配时也会发生类型转换

### 算术转换
算术转换的规则定义了一套另外i型转换的层次，其中运算符的运算对象将转换成最宽的类型。例如，如果一个运算对象的类型是long duoble，那么不论另一个运算对象的类型是什么都会转换成long duoble。还有一种更普遍的情况，当表达式中基友浮点类型也有整数类型时，整数值讲转换成相应的浮点类型。
* 整型提升，负责把小整数类型转换成较大的整数类型。
* 无符号类型的运算转换
在进行整型提升之后，如果一个运算对象是无符号类型，另外一个运算对象是带符号类型，而且其中的无符号类型不小于带符号类型，那么带符号的运算对象转换成无符号的。

### 数组转换成指针
在大多数用到数组的表达式中，数组自动转换成只想数组首元素的指针
```c++
int ia[10];
int* ip = ia;
```
当数组被用作 `decltype`关键字的参数，或者作为取地址符（&）、sizeof及typeid等运算付的运算时，上述转换不会发生。

### 指针的转换
* 常量整数值`0`或者字面值`nullptr`能被转换成任意指针类型。
* 指向任意非常量的指针能被转换成`void*`。
* 指向任意对象的指针能被转换成`const void*`。
* 指向派生类对象的指针能被转换成指向其基类的指针。

### 布尔值类型的转换
* 从算术类型或指针类型转换成布尔值，如果指针或所算术类型的值为`0`，转换结果是`false`；否则转换结果是`true`。
* `true`转换成算术类型的值为`1`，`false`转换成算术类型的值为`0`.

### 转换成常量
允许讲指向非常量类型的指针转换成指向相应的常量类型的指针，对于应用也是这样。也就是说，如果`T`是一种类型，我们就能讲指向`T`的指针或引用分别转换成指向`const T`的指针或引用。

### 隐式的类类型转换
* 当函数的实参和形参类型不同时，如果可行，将进行**一次**类类型转换。
* 类类型转换并不总是有效
* 可使用`explicit`关键字抑制构造函数中的隐式类类型转换
* `explicit`构造函数只能用于直接初始化
* `explicit`还能用与赋值运算符和类型转换运算符，参见[explicit详细用法]( http://en.cppreference.com/w/cpp/language/explicit )

## 显示类型转换
### 旧式的强制类型转换
```c++
type (expr);    // 函数形式的强制类型转换
(type) expr;    // C语言风格的强制类型转换
```
这是我们用的最多的类型转换方式，但它并不一定是安全的，因此C++增加了后面的4中类型转换方式来为其分工。
### static_cast
任何具有明确定义的类型转换，只要不包含底层const,都可以使用static_cast
```c++
// 进行强制类型转换以便执行浮点数除法
double slope = static_cast<duoble>(j) / i;
void* p = &slope; // 正确，任何非常量对象的地址都能存入void*
// 正确：将void*转换回初始的指针类型
double* dp = static_cast<double*>(p);
```
### dynamic_cast
安全的将类的指针或引用进行据其集成关系的向上或向下转型。
```c++
dynamic_cast<type*>(e)		
dynamic_cast<type&>(e)		
dynamic_cast<type&&>(e)		
```
该表达式的`e`和`type`必须符合一下三个条件中的一个，否则转换失败。
1. `e`的类型是目标`type`的公有派生类
2. `e`的类型是目标`type`的基类
3. `e`的类型就是目标`type`的类型

如果转换成功，表达式返回`new_type`类型的值；如果转换失败，当`new_type`是指针类型时返回空指针，当`new_type`是引用类型时则抛出`std::bad_cast`异常。

<!-- class="alert alert-info" -->
**明细解释**

>对于这条转换语句，有如下特征
```c++
dynamic_cast < type > (e)		
```
* 如果e的类型是type或者type是与e类型的const形式，转换将成功(换言之，dynamic_cast可以用来添加常量性)。
* 我们可以对一个空指针进行dynamic_cast，结果是所需类型的空指针。
* 如果type类型是e类型的唯一公共基类，结果是指向e的type类型的引用或指针。
* 如果e的类型是一个多态类（拥有至少一个虚函数的类）而type是void*，这样的转换会成功。
* 如果e是一个多态类的指针或引用，同时type是e类型的派生类的指针或引用，则执行以下行运行时检查： 如果type的类型是e类型一路唯一公共派生下来的，那就通过，如果中途出现了第三者公共基类，那么转换失败。
* 尽量避免在构造函数和析构函数中使用dynamic_cast

翻译自[cppreference](http://en.cppreference.com/w/cpp/language/dynamic_cast)
<!-- endclass -->

#### 指针类型的使用
```c++
// 假设bp是Base类型的指针，Drived是Base的共有派生类
if (Drived * dp = dynamic_cast<Drived*>(bp))
{
  // 使用 dp 指向的Drived对象
} else {
  // 使用 bp 指向的Base对象
}
```
<!-- class="alert alert-success" -->
在条件部分执行dynamic_cast操作可以确保类型转换和结果检查在同一条表达式中完成。
<!-- endclass -->


### const_cast
const_cast只能改变运算对象的底层const。用const_cast去掉对象底层const不应对其进行写值操作。同样，也不能用const_cast改变表达式的类型。
```c++
const char* pc;
char *p = const_cast<char*>(pc); // 正确，但是通过p写值是为定义的行为
```
#### 使用const_cast的正确姿势：用于函数重载
```c++
const string& shorterString(const string& s1, const string& s2)
{
  return s1.size() <= s2.size() ? s1 : s2;
}
string& shorterString(string& s1, string& s2)
{
  auto& r = shorterString(const_cast<const string&>(s1),
                          const_cast<const string&>(s1));
  return const_cast<string&>(r);
}
```
第二个版本的函数中，首先讲它的实参强制转换成对const的引用，然后调用了重载函数的const版本。const版本返回对const string的引用，这个引用事实上绑定在了某个初始的非常量实参上。因此，我们可以在将其转换回一个普通的string&，这显然是安全的。

### reinterpret_cast
> 该类型转换本质上依赖与机器。要想安全的使用reinterpret_cast必须对设计的类型和编译器的实现转换过程都非常了解。

《C++ Primer》中的这句话貌似在告诉我们，小白你别用，这是我们提供给实现编译器的大牛用的。再说，一看这么长的名字，我也记不住，懒得理你，知道有这么一种类型转换方式就行了。

<!-- class="alert alert-warning" -->
每次书写了一条强制类型转换的语句，都应该反复斟酌能否一其他的方式实现相同的目标。就算实在无法避免，也应该尽量限制类型转换值的作用域，并且记录对相关类型的所有假定，这样可以减少错误发生的机会。
<!-- endclass -->
