## this的指向总结

代码参考 `test_this.js` ，`test_this.html`

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

浏览器报错

解决方案 —— 利用apply把document当作this传入getId函数。

```js
document.getElementById = (function(func) {
            return function() {
                return func.apply(document, arguments)
            }
        })(document.getElementById)
        var getId = document.getElementById;
        var div = getId('div1')
        console.log(div.id)
```

解释一下这段代码，首先，里面的func实际上就是document.getElementById

`func.apply(document, arguments)` 相当于document调用了，document.getElementById(arguments)

## 闭包

详见 `closure.js` 以及 `closure.html`

#### 实例1

```js
var Type = {}
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function(type) {
        Type['is' + type] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object' + type + ']';
        }
    })(type)
}
Type.isArray([])
Type.isString("str")
```

解释一下，第一次运行的时候，i=0的时候，type先取'String'，Type对象添加一个属性 `isString` ，`isString` 是一个函数，调用 `Type["isString"]` 相当于调用下面的函数

```js
function(obj) {
    return Object.prototype.toString.call(obj) === '[object String]';
}
```

#### 实例2

下面的代码，实际上就是计算，参数相乘的乘积。

对于相同的参数，为了不重复计算，引入了cache缓存参数，一旦参数相同，不再计算，直接拿到结果。

```js
var cache = {};
var mult = function() {
    var args = Array.prototype.join.call(arguments, ',');
    if (cache[args]) {
        return cache[args];
    }
    console.log('执行')
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i]
    }
    return cache[args] = a
}
```

bug —— cache暴露在全局

解bug —— 把cache封闭在mult函数内部，减少页面中的全局变量

```js
var mult = (function() {
    var cache = {}
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args]
        }
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i]
        }
        return cache[args] = a
    }
})()
```

### 总结

总结上面闭包的封装，就是

```js
var mult = (function(){
  // 这里写原来的全局变量，如 var cache = {}
  return function(){
    // 在这里写函数的逻辑代码
  }
})()
```

### 闭包与面向对象

通常用面向对象思想实现的功能，闭包也能实现

下面的例子，是闭包和对象的相互转化

- 闭包写法

```js
var extent = function() {
    var value = 0
    return {
        call: function() {
            value++
            console.log(value)
        }
    }
}
var extent = extent()
extent.call();
```

- 对象写法

```js
var extend = {
    value: 0,
    call: function() {
        this.value++
            console.log(this.value)
    }
}
extend.call()
```

- 工厂模式

```js
var Extent = function() {
    this.value = 0
}
Extent.prototype.call = function() {
    this.value++;
    console.log(this.value);
}
var extent = new Extent()
extent.call()
```

### 闭包-命令模式

代码参考 `tvOO.html`

命令模式，把请求封装成对象，从而解除，请求发起者和接受者之间的耦合关系。

例子——

```js
var Tv = {
    open: function() {
        console.log('open')
    },
    close: function() {
        console.log('close')
    }
}
var createCommond = function(receiver) {
    var execute = function() {
        return receiver.open()
    }
    var undo = function() {
        return receiver.close()
    }
    return {
        execute: execute,
        undo: undo
    }
}
var setCommand = function(command) {
    document.getElementById('execute').onclick = function() {
        commmand.execute()
    }
    document.getElementById('undo').onclick = function() {
        command.undo()
    }
}
setCommand(createCommond(Tv))
```

### 解决内存泄露

回收变量，手动把变量设置设为null

## 高阶函数

代码参考 `hight_order_func.html`

1.函数可以作为参数被传递

2.函数可以作为返回值输出

创建100个节点，然后隐藏。优化下面的代码 ——

```js
var appendDiv = function() {
    for (var i = 0; i < 100; i++) {
        var div = document.createElement('div');
        div.innerHTML = i;
        document.body.appendChild(div);
        div.style.display = 'none'; // 这个逻辑放在appendDiv里面不太合适，使appendDiv难以复用
    }
};
appendDiv();
```

优化如下，基本思路是把 `div.style.display = 'none';` 抽出来，通过回调的方式传进去。

```js
var appendDiv = function() {
   		......
        if (typeof callback === 'function') {
            callback(div)
        }
};
appendDiv(function(node) {
    node.style.display = 'none'
});
```

