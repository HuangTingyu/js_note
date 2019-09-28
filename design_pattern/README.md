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

