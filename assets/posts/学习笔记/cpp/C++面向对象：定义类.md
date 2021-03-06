本文是对C++面向对象深入学习的第一部分，将对类的定义和一些容易遗忘的基础知识进行记录，便于日后回顾。这篇文章主要是在我再次阅读《C++ Primer》时所写，并对书中没有提到的内容进行扩展，我并不会按照书本的顺序或方式来抄下所有内容，只是记录一些我个人比较生疏的知识点。
<!-- more -->

### 定义类
* `class`和`struct`关键字定义类的唯一区别是默认的成员访问权限不同；前者默认的成员访问权限是public，后者默认的成员访问权限是private。
* 每个类都会定义它自己的作用域。在类的作用域之外，普通的数据成员和函数成员只能由对象、引用或者指针使用成员访问运算符来访问。对于类类型成员则使用作用域运算符访问。
* 定义在类内的成员函数是隐式的内联函数。

### 向前声明（forward declaration）
* 使用 `class ClassName;` 表达式可声明一个**不完全类型**。
* 不完全类型只能在非常有限的情景下使用：可以定义该类型的指针或引用，也可以声明(但不能定义)以不完全类型作为参数或者返回值类型的函数。
* 因为只有类全部完成后类才算被定义，所以一个类的成员类型不能是该类自己。然而，一旦一个类型出现后，它就被认为是声明过了，因此类允许包含指向它自身类型的引用或指针。

### 常量成员函数
在成员函数参数表后带一个`const`关键字的成员函数被称为**常量成员函数**(const member function)。这个`const`限定符作为成员函数的调用形式的一部分，能与不带`const`版本的具有相同返回值类型、相同参数表的成员函数进行重载。
* 常量成员函数中的`this`是一个指向常量的指针。
* 常量成员函数不能修改成员的值。
* 常量对象，以及常量对象的引用或指针都只能调用常量成员函数。

#### 可变数据成员
* 使用`mutable`关键字定义可变成员
* 可变数据成员永远不会是const,即使它是const对象的成员。
* 一个const成员函数可以改变一个可变成员的值。

### 构造函数
#### 默认构造函数
* 拥有0个参数或所有参数提供默认实参的构造函数。
* 使用默认构造函数：
  ```c++
  Object o1;   // 执行默认构造
  Object o2{}; // 执行默认构造
  Object o3(); // 一个返回Object对象的函数
  ```
* 在实际中，如果定义了其他构造函数，那么最好也提供一个默认构造函数。
* 自动生成的默认构造函数
  * 只有当类没有声明任何构造函数时，编译器才会自动生成默认构造函数。
  * `= default`要求编译器生成构造函数，适用于已经定义了多个参数的构造函数同时希望提供默认构造函数的情形。
  * 合成的默认构造函数初始化成员方式：如果存在类内的初始值，用它来初始化成员;否则，进行默认初始化该成员。
  * 如果类包含有内置类型或复合类型的成员，则只有当这些成员全部都被赋予了类内的初始值时，这个类才适合于使用合成的默认构造函数。

#### 委托构造函数
* 在构造函数的初始化列表中调用另一个构造函数进行初始化操作。
  ```c++
  class Vector {
    double x, y , z;
  public:
    Vector(double vx, double vy, double vz): x(vx), y(vy), z(vz) {}
    Vector(double vx, double vy): Vector(vx, vy, 0.0) {}
  };
  ```

### 成员初始化
* 当我们提供一个类内成员初始值时，必须以符号=或花括号表示。
* 在构造函数的初始值列表中给定成员初始值和在构造函数体内为成员赋值是两码事。
  * 初始化和赋值的区别事关底层效率问题：前者直接初始化数据成员，后者则先初始化再赋值。
  * 如果成员是const、引用，或者属于某种未提供默认构造函数的类型，我们必须通过构造函数初始化列表为这些成员提供初始值。
* 成员初始化顺序与它们在类中定义的出现顺序一致，构造函数初始值列表的前后位置关系不会影响实际的初始化顺序。
  * 如果一个成员是用另一个成员初始化的，那么这两个成员初始化的顺序是很关键的。
  * 最好令构造函数初始值的顺序与成员声明的顺序保持一致。而且，如果可能的话，尽量避免使用某些成员初始化其他成员。

### 静态成员
* 即使静态成员不属于任何对象，我们仍可以通过类的成员操作符访问类的静态成员。
* 成员函数可以不用通过作用域运算符就能直接使用静态成员。
* 必须在类的外部定义和初始化每个静态成员。
* 静态成员一旦被定义，就将一直存在于程序的整个生命周期中。
* 静态成员可以作为函数的默认实参。
* static成员函数没有this指针，因此不能访问该类的非静态成员。
* 可以为字面值常量类型的静态成员提供**const整数类型**的类内初始值。


### 友元
* 类可以允许其他类或函数访问它的非公有成员，方法是令其他类或函数成为它的友元。
* 一般来说，最好在类定义开始或结束前的位置集中声明友元。
 * 友元声明仅仅指定了函数的访问权限，而非一个通常意义的函数声明。如果我们希望类的用户能够调用某个友元函数，那么我们就必须在友元声明之外再专门对函数进行一次声明。
* 友元不是类的成员也不受它所在区域访问控制级别的约束。
* 每个类负责控制自己的友元类或友元函数。

《C++ Primer》中一个经典的例子
```c++
struct X {
  friend void f() { /*友元函数可以定义在类的内部*/ }
  X() { f(); }    // 错误，f还没有被声明
  void g();
  void h();
};
void X::g() { f(); } // 错误，f还没有被声明
void f();            // 声明那个定义在X中的函数
void X::h() { f(); } // 正确，现在f的声明在作用域中了
```

### 聚合类
聚合类（aggregate class）使得用户可以直接访问其成员，并且具有特殊的初始化语法形式。
* 所有成员都是public的。
* 没有定义任何构造函数。
* 没有类内初始值。
* 没有基类，也没有virtual成员函数。

```c++
struct Data{
  int ival;
  string s;
};
// 可以用花括号列表初始化聚合类成员，成员初始值顺序必须与聚合类成员声明顺序一致
Data val = { 0, "Anna" };
```

值得注意的是，显式地初始化类的对象的成员存在三个明显缺点：
1. 要求类的所有成员都是public的；
2. 将正确初始化每个对象的每个成员的重任交给了类的用户（而非类的作者）。因为用户很容易忘掉某个初始值，或者提供一个不恰当的初始值，所以这样的初始化过程乏味而容易出错。
3. 添加或删除一个成员之后，所有的初始化语句都需要更新。

### 字面值常量类
* 数据成员都是字面值类型的聚合类是字面值常量类。
* 如果一个类不是聚合类，但它符合下述要求，则它也是一个字面值常量类：
  * 成员都是字面类型；
  * 至少包含一个constexpr构造函数（函数体为空）；
  * 若含有类内初始化，内建类型成员用constexpr初始化，类类型用constexpr构造函数初始化；
  * 使用默认析构函数。

```c++
class Base
{
public:
  constexpr Base(int a, int b):a(a), b(b) {}
  constexpr int getA() {return a;}
  constexpr int getB() {return b;}
private:
  int a;
  int b;
};
```

<!-- class="alert alert-success" -->
constexpr构造函数必须初始化所有数据成员，初始值或使用constexpr构造函数，或是一条常量表达式。
<!-- endclass -->

#### 参考文献
* 《C++ Premier》第五版
* [C++11专题：constexpr类型](http://particle128.com/posts/2015/04/constexpr.html)
