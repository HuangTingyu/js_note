### 订阅者-发布者模式

详细代码见 —— `code\announcer`

```js
var salesOffices = {}
salesOffices.clientList = {}
salesOffices.listen = function(key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
}
salesOffices.trigger = function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];
    if (!fns || fns.length === 0) {
        return false
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments)
    }
}
salesOffices.listen('squareMeter88', function(price) {
    console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function(price) {
        console.log('价格=' + price)
    }
salesOffices.trigger('squareMeter88', '200w')
salesOffices.trigger('squareMeter110', '1000w')
```

解释 ——

 `listen` 相当于，给 `squareMeter88` 绑定后面的 `function` ，`function` 可以是多个函数。

`trigger` 相当于，触发 `squareMeter88` 绑定的 `function`

### 批量注册 `订阅函数`

```js
var event = {
    clientList: [],
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}
var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}
var salesOffices = {}
installEvent(salesOffices)
```

只要执行 `installEvent(salesOffices)` ，salesOffices就自动拥有上面的 `listen` 和 `trigger`

### 取消订阅

```js
event.remove = function(key, fn) {
    var fns = this.clientList[key]
    if (!fns) {
        return false
    }
    if (!fn) {
        fns && (fns.length = 0)
    } else {
        for (var I = fns.length - 1; I >= 0; I--) {
            var _fn = fns[I]
            if (_fn === fn) {
                fns.splice(I, 1)
            }
        }
    }
}
```

应用

```js
installEvent(salesOffices)
salesOffices.listen('squareMeter88', fn1 = function(price) {
    console.log('fn1价格=' + price)
})
salesOffices.listen('squareMeter88', fn2 = function(price) {
    {
        console.log('fn2价格=' + price)
    }
})
salesOffices.remove('squareMeter88', fn1)
salesOffices.trigger('squareMeter88', '1080w')
```

解绑`fn1` 之后，输出 ——

fn2价格=1080w

