## 单例模式

相关代码 —— `singleType.html` ，`singleType.js`

应用场景，创建div

单例抽离，搜索 `getSingle`

1.版本1

```js
var CreateDiv = (function() {
    var instance;
    var CreateDiv = function(html) {
        if (instance) {
            return instance
        }
        this.html = html
        this.init()
        return instance = this
    }
    CreateDiv.prototype.init = function() {
        var div = document.createElement('div')
        div.innerHTML = this.html
        document.body.appendChild(div)
    }
    return CreateDiv
})()
```

2.版本2——考虑扩展性

如果有一天，要求函数`CreateDiv` 不再以单例模式限制div的创建，那么将要对上述函数进行大改动。考虑到这一点，就要把类的创建单独抽出来。然后，把负责管理单例的逻辑转移到代理类`ProxySingletonCreateDiv` 中。

```js
var CreateDiv = function(html) {
    this.html = html
    this.init()
}
CreateDiv.prototype.init = function() {
    var div = document.createElement('div')
    div.innerHTML = this.html;
    document.body.appendChild(div)
}
var ProxySingletonCreateDiv = (function() {
    var instance;
    return function(html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance;
    }
})
```

## 惰性单例(重点)

惰性单例指的是，在实际应用更常见，指的是在需要的时候才创建对像实例。

把管理单例的代码抽离出来，封装在 `getSingle` 函数内部，创建对象的方法 `fn` 当成参数动态传入

```js
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}
```

这里的apply可以把this传入到fn中，如果在一个类中调用 `getSingle` ，利用 `apply` 可以改变fn中 `this` 的指向。

427页指正错误，关于jquery事件绑定 `one` ,下面的例子中，div依然会被绑三次事件，只不过，事件执行一次之后将被销毁。

```js
var bindEvent = function() {
    $('div').one('click', function() {
        alert('click');
    });
};
var render = function() {
    console.log('开始渲染列表');
    bindEvent();
};
render()
render();
render();
```

