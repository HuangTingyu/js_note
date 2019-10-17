## 单例模式

相关代码 —— `singleType.html` ，`singleType.js`

应用场景，创建div

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

