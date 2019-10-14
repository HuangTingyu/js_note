## this的指向总结

#### 1.作为对象的方法被调用

作为对象的方法被调用的时候，this指向该对象

```js
var obj = {
    a: 1,
    getA: function() {
        console.log(this === obj)
        console.log(this.a)
    }
}
obj.getA()
```

#### 2.作为普通函数

this指向全局变量

```js
global.name = 'globalName'
var getName = function() {
    return this.name
}
console.log(getName())
```

### this丢失

#### 状况1：

```js
var obj = {
    myName: 'sven',
    getName: function() {
        return this.myName
    }
}
console.log(obj.getName()) // sven
var getName2 = obj.getName
console.log(getName2()) //undefined
```

这里的getName2引用了obj.getName，也就是，以 `普通函数` 的方式调用。所以此时，this指向的是window

#### 状况2：

```js
var getId = document.getElementById;
getId('div1')
```

