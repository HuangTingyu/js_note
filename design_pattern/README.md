## 启动项目

```
npm run dev
```

## 面向对象三要素

继承，封装，多态

### 继承

主要 —— `class ... extends ...`，`super(...,...)`

子类可以使用父类里面定义的方法。

```js
class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
    speak() {
        console.log(`My name is ${this.name},my age is ${this.age}`)
    }
}
class Student extends People {
    constructor(name, age, number) {
        super(name, age)
        this.number = number
    }
    study() {
        console.log(`${this.name} whose number is ${this.number} studying`)
    }
}
```

### 封装(TS)

- public —— 完全开放
- private —— 对自己开放
- protected —— 对子类开放

JS没有这种类型定义，如果要定义私有属性(即xxx.key访问不到的属性)，可以把属性的变量名定义为 `_xxxx` ，也就是以下划线开头。

### 多态

子类继承父类的方法，并且不同子类有不同的定义。

```js
class People {
    constructor(name) {
        this.name
    }
    say() {
        console.log('hi')
    }
}
class A extends People {
    constructor(name) {
        super(name)
    }
    say() {
        console.log('This is A')
    }
}
class B extends People {
    constructor(name) {
        super(name)
    }
    say() {
        console.log('This is B')
    }
}
let kidA = new A('bacra')
let kidB = new B('sakura')
kidA.say()
kidB.say()
```

### 面向对象(jquery应用)

详见 —— `3Elements\jqueryApply.js`

```js
class jQuery {
    constructor(selector) {
        let slice = Array.prototype.slice
        let dom = slice.call(document.querySelectorAll(selector))
        let len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
    append(node) {
        // ...
    }
    addClass(name) {
        //...
    }
    html(data) {
            //...
        }
        // 此处省略N个API
}
window.$ = function(selector) {
    return new jQuery(selector)
}
```

## UML类图

### 单个类

抽象结构 ——

-----------------------------------

​											类名

------------------

`+public` 属性名A：类型

`#protected` 属性名B：类型

`-private` 属性名C：类型

----------------------------------------------------

`+public` 方法名A(参数1，参数2)：返回值类型

`#protected` 方法名B(参数1，参数2)：返回值类型

`-private` 方法名C：(参数1)：返回值类型

-----------------------

### 举例

```js
class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
    speak() {
        console.log(`My name is ${this.name},my age is ${this.age}`)
    }
}
```

根据上面的类画出的UML类图 ——

-------------------------

​										People

-------------

` + name`：String

`+ age`：Number

-------------------

`+ eat()` ：void

`+ speak()`：void

-----------

### 多个类

- 泛化，表示继承
- 关联，表示引用

```js
class People {
    constructor(name) {
        this.name = name
      	this.house = house
    }
    say() {
        console.log('hi')
    }
}
class A extends People {
    constructor(name,house) {
        super(name,house)
    }
    say() {
        console.log('This is A')
    }
}
class B extends People {
    constructor(name,house) {
        super(name,house)
    }
    say() {
        console.log('This is B')
    }
}
class House {
    constructor(city) {
        this.city = city
    }
    showCity() {
        console.log(`house in ${this.city}`)
    }
}
```

UML类图 ——

![01 association](D:\03JS学习总结\js_note\design_pattern\asset\01 association.png)

类A，类B继承自类people，类people引用了house。

继承，空箭头；引用，实心箭头。

## 设计模式

设计 —— 

1.即按照哪一种思路或者标准来实现功能

2.功能相同，可以有不同设计方案来实现

3.伴随着需求增加，设计的作用才能体现

《UNIX/LINUX设计哲学》——

- 准则1：小即美
- 准则2：让每个程序只做好一件事

上面两个讲的是一个东西，即让每一个程序足够小，同时只专注一个东西。

- 准则3：快速建立原型

(快速做出一个能满足基本要求的东西，再升级迭代)

- 准则4：舍弃高效率而取可移植性

第一关心，这个程序能不能复用，再关心能不能高效，即使运行卡一点，过两年硬件升级就不卡了。

- 准则5：采用纯文本来存储数据

保证可读性

- 准则6：充分利用软件的杠杆效应(软件复用)
- 准则7：使用shell脚本来提高杠杆效应和可移植性
- 准则8：避免强制性的用户界面

多使用快捷键和命令行，不要强行绑定系统和用户界面，这两个应该是可分离的。

- 准则9：让每个程序称为过滤器

可以把数据先在程序A处理，然后进入程序B处理，...

一系列小准则 ——

- 准则：允许用户定制环境
- 准则：尽量使系统内核小而轻量化
- 准则：使用小写并且尽量简短
- 准则：沉默是金(没有返回的时候，就不要强行返回)
- 准则：各部分之和大于整体
- 准则：寻求90%的解决方案(没有必要追求百分之百满足用户的需求，费力不讨好)

### 演示 —— 沉默是金+让每个程序成为过滤器

- `ls` 列出当前文件夹的所有文件
- `ls | grep *.json ` 列出当前文件夹，后缀为 `json` 的文件
- `ls | grep *.json | grep 'package'` 列出后缀为 `json`，且有`package` 关键字的文件

找不到文件的时候，没有任何返回输出。

- `ls | grep *.json | grep 'package1' | wc -l ` 显示，搜索结果一共有多少行。

沉默是金的反例 ——

当我们没有找到文件的时候，linux命令行是没有输出的。假设，命令行会返回 'no file'，这样上面的`... | wc -l`，那就会显示1，直接出错。所以，没有结果的时候，不要输出就完事了，不要强行输出提示。