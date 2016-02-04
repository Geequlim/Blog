最近在学习Javascript，毕竟Web是将来的趋势不学不行嘛。今年来Web技术在NodeJS的推动下发展过于太快了，很多洁身自傲的Native开发者包括我感觉变化太大一下子接受不了。各种框架、各种后台几乎每天都有新的框架出现，更令人头晕的是Javascript其本身的语法都有多个标准就更令人琢磨不透了。没办法，Web技术必须得学会，只好硬着头皮去干了。我现在选择使用facebook的React作为我的入门框架，并尽量使用ECMAScript 6新标准。
<!-- more -->

下面是我在学习Javascript这门脚本语言的学习笔记，供日后查阅复习。

### 语句和注释

Javascript的语句和注释与C++基本一样，有一点区别就是语句后面可以不加分号';'但是多年习惯改不了了，继续写分号也是Javascript编码规范中所鼓励的。需要注意的是在使用`return` 返回多行表达式构成的值时加个括号是必不可少的！

### 基本数据类型

Javascript 提供了这几种数据类型:

* object    对象类型，就是一组数据和功能的集合
* number 数字类型
* string 字符串类型，字符串常量可用一对单引号`'Hello'`或一对双引号包裹`"Hello"`
* boolean 取值为`true`或`false`
* null 只有一个取值为`null`
* undefined 只有一个取值为`undefined`
* function 函数类型

使用`typeof()`函数可返回变量的类型，以字符串表示

```js
var apple = ':apple:';
typeof(apple); // 返回 "string"
```

---

### 变量与常量

#### 变量

Javascript通过 var 或 let 定义变量。

```js
var a = 3;
```

<!-- class="panel panel-info" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
##### 变量作用域
<!-- endclass -->
<!-- endclass -->
<!-- class="panel-body" -->
在函数中生命的变量处于函数作用域，函数外声明的变量处于全局作用域；使用ES6中的let关键字可以定义代码块作用域内的变量。
<!-- endclass -->
<!-- endclass -->

#### 常量(ECMAScript 6)

ECMAScript 6允许使用`const`定义常量， 定以后不能修改其绑定的对象，这类似于C++中的顶层const常量。

```js
const fruits = [':apple:',':pear:'];
fruits.push(':banana:'); //合法的
fruits = []; // 非法的
```

<!-- class="panel panel-info" -->
<!-- class="panel-heading" -->
<!-- class="panel-title" -->
##### Javascript对象深究
<!-- endclass -->
<!-- endclass -->


<!-- class="panel-body" -->
Javascrip中的object类型的对象类似与C++中的引用，Javascript内置类型中array同样属于此类对象，在赋值时进行浅拷贝；number、string、undefined、null 、boolean 类型变量在赋值时则会进行按值拷贝。

```js
var a = { name: 'Geequlim' };
var b = a;
b.name = "Hola"
console.log(a);  // 输出 Object {name: "Hola"}
```
<!-- endclass -->
<!-- endclass -->


---

### 函数

Javascript使用`function`关键字定义函数，主要有两种形式

```js
function add(a,b) {
    return a + b;
};
add(2+2); // 返回 4

var minus = function(a,b) {
    return a - b;
};
minus(2,2); // 返回 0
```

#### ES6开始支持默认参数，在参数后使用`=默认值`的方式，用法与C++一致。

#### ES6 解构函数参数

```js
function breakfast(dessert, drink, {location,resturant}={}){
    // location 和 resturant 是通过第三个参数解构出来的
    console.log(dessert,drink,location,resturant);
}
breakfast(':cake:',':beer:',{location:'昆明',resturant:'农家乐'});
```

#### this

函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

#### ES6 函数对象有一个name属性，表示该函数原始定义时的函数名。

#### 函数对象有一个length属性，表示函数参数的个数

指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。

#### ES6 箭头函数，是一种匿名函数，类似于C++11中的lambda表达式。
```js
let func = (param1,param2) => param1+param2;
```
等价于
```js
var func = function(param1,param2){
    return param1+param2;
}
```

---

### 操作符和流程控制

Javascript支持C++中所有的算术运算符和逻辑运算符，用法完全一致。详细内容可以参考[W3C教程的相关文章](http://www.w3schools.com/js/js_operators.asp)。

<!-- class="panel panel-info" -->

<!-- class="panel-heading" -->
<!-- class="panel-title" -->
##### ES6中的...操作符
<!-- endclass -->
<!-- endclass -->

<!-- class="panel-body" -->
###### 用作展开(Spread)操作符
```js
let fruits = [':apple:',':banana:'],
     foods = [':cake:',...fruits];
console.log(...fruits);  // 输出 :apple: :banana:
console.log(foods);    // 输出  :cake: :apple: :banana:
```

###### 用作剩余(Rest)操作符实现不定长参数
```js
// Rest 形参被在函数内被当做数组使用
function breakfast(dessert, drink, ...foods) { // 此处的...用作Rest操作
    console.log(dessert,drink,...foods); // 此处的 ... 用作Spread操作
}
breakfast(':cake:',':beer:',':apple:',':pear:');
```
<!-- endclass -->
<!-- endclass -->


Javascript中的`if`、`else`和`switch`用法与C++的用法一样，同时`for`、`while`、`do while`循环的用法也与C++中的用法完全一致。

此外ECMAScript 5之后还提供了类似C++11中的范围for循环语句`for...in`，用于遍历对象中的属性。

---

### 对象

JavaScript中的所有事物都是对象：字符串、数值、数组、函数、object...对象也能将这些类型的数据作为它的内容，被称为属性，JavaScript允许我们自定义对象。

下面是对象的基本操作示例

// 创建对象
```js

// 定义一个`person`对象，其属性`name`的值为`"Geequlim"`
var person = { name: "Geequlim" };

// 访问对象属性
person.name;
// 或则这样来访问对象属性
person['name'];

// ES6 还支持使用变量作为属性名来操作对象
let eleName = "name";
person[eleName];

//  为不存在的属性赋值则会创建一个属性
person.age = 23;
person['country'] = "China";

// 删除对象的属性
delete person.country;

// 使用 for in 遍历对象的属性
for (var property in person) {
    console.log(property);
}

```

#### ES6中的对象解构

```js
var person = {firstName: "John", lastName: "Doe"};
var {firstName, lastName} = person;
```

解构的变量名与对应的属性名不一致是被允许。下面的例子中，name变量将会被声明为person.firstName的值

```js
var person = {firstName: "John", lastName: "Doe"};
var {firstName: name, lastName} = person;
```

ES6 对象表达式，定义对象时属性名和值一样时可以不必写赋值操作(` : `)

```js
let dessert = ':cake:' , drink = ':beer:';
let food = {
        dessert,
        drink,
        breakfast(){
            console.log(this.dessert,this.drink);
        }
};
```

这段代码与之是等价的
```js
var dessert = ':cake:' , drink = ':beer:';
var food = {
        dessert : dessert,
        drink : drink,
        breakfast: function(){
            console.log(this.dessert,this.drink);
        }
};
```

---

### 数组和字符串

#### 数组

数组Array是Javascript中的一种特殊对象，用于存储一序列对象。

```js
// 创建空数组
var a = new Array();
var b = [];

// 定义数组
var array = ['壹', '貮', '叄'];

// 通过下标获取元素
array[0] = '一';

// 获取元素的下标，不存在返回-1
array.indexOf('一');
array.lastIndexOf('貮');

// 获取长度
var length = array.length;

//向尾部追加,返回追加后长度
array.push('肆', '伍', '陆');

// 向头部添加,返回追加后长度
array.unshift('零', '零零');

// 移除尾元素,返回移除的元素
array.pop();

// 移除首元素,返回移除的元素
array.shift();

// 删除元素的值，并不会从列表中移除
delete array[array.length - 1];
//  移除元素
array.splice((array.length - 1) / 2, array.length / 2);

// 合并元素
array.concat(['柒', '捌']);

// 字符串链接，将两个数组转为字符串再拼接到一起
typeof(array + ['玖', '拾']);
```

##### ES6中数组解构

```js
function breakfast() {
    return [':cake:', ':coffee:', ':apple:'];
}
let [dessert, drink, fruit] = breakfast();
console.log(dessert, drink, fruit);
```

#### 字符串

Javascript 中的字符串也是一种特殊的对象，用于表示字符序列。

```js
// 定义字符串
var hello = "一二三四五六七";

// 字符串拼接
hello += "八九十一二三";

//通过下标获取字符
hello.charAt(0);
hello[0];

// 查找字符串第一次出现的位置
hello.indexOf("一二三");
// 反向查找
hello.lastIndexOf("一二三");

// 分割为数组
hello.split('二');

// 替换字符串
hello.replace("六七八", "678");

// 截取字符串，第一个参数是截取的起始位置
hello.substr(1, 5); // 第二个参数是要截取的长度
hello.substring(1, 5); // 第二个参数截取的结束位置

// ES6 操作
hello.startsWith("一");
hello.endsWith("八");
hello.includes("678");

// ES6模板字符串
let dessert = ':cake:', drink=':coffee:';
let breakfast = `今天的早餐是 ${dessert} 和 ${drink}。
  你要不要先来杯${drink}？
`
console.log(breakfast);
```

---

### ES6面向对象

使用`class`关键字创建类，构造函数名字固定为`constructor`；可以使用`get`和`set`关键字设置getter和setter；使用static关键字创建静态成员；成员之间不必使用逗号分隔。

```js

class Animal {
    constructor(name) {
        this.name = name;
    }
    static animalType(){
        return 'unknown';
    }
    get name() {
        return this.name;
    }
    set name(n){
        this.name = name;
    }
}
```

使用`extends`关键字指定类的基类，可在类中使用`super`表示基类。

```js
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
}
```

创建类对象使用`new`关键字

```js
let doggy = new Dog('doggy');
```

---

### DOM相关

从页面获取id属性取值为page-title的标签
```js
document.getElementById('page-title');
```

获取页面中所有li标签，存储在一个数组中
```js
document.getElementsByTagName('li');
```


文档对象的属性对应Javascript的对象属性
```js
var body = document.getElementsByTagName('body')[0];
// 设置节点属性
body.bgColor = '#a8b0c6';
```

修改DOM树
```js
// 创建新的li节
var li = document.createElement('li');
// 创建文本节点
var text = document.createTextNode('Hello World!');
// 添加节点到已有DOM节点中
li.appendChild(text);
body.appendChild(li);
body.insertBefore(document.createTextNode('Hello World!!'), li);
```

---

深入学习？强烈推荐阮一峰老师的[《ECMAScript 6 入门》](http://es6.ruanyifeng.com/)。
