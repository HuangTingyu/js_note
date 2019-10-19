## 单例模式

相关代码 —— `singleType.html` ，`singleType.js`

创建单例的函数，请在本页搜索 `getSingle`

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

把管理单例的代码抽离出来，封装在 `getSingle` 函数内部，创建对象的方法 `fn` 当成参数动态传入

```js
var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}
```

#### 解释

1.关于这里的 `fn.apply(this,arguments)`

`apply` 需要一个参数数组，因此：

给定`arguments = [1,2,3]`。

```
this.fn.apply(this, arguments);
```

会给你：

```
this.fn(1,2,3);
```

但：

```
this.fn(arguments);
```

会给你：

```
this.fn( [1,2,3] );
```

2.关于这里为什么要 `return function`

因为如果不这样写，函数执行完，result就会被释放

### 单例模式的应用

`getSingleton` 的应用1 ——

实际上就是，把一个类存起来，防止你重复调用同一个类。

```js
var CreateA = function() {
     this.init()

 }
 CreateA.prototype.init = function() {
     console.log('创建了A')
 }
 var getA = function() {
     var a = new CreateA()
     return a
 }
 var createSingleA = getSingle(getA)
 createSingleA()
 createSingleA()
```

`getSingleton` 的应用2 ——

在页面只创建一个登录框

```js
        var createLoginLayer = function() {
            var div = document.createElement('div')
            div.innerHTML = '弹出登录框'
            div.style.display = 'none'
            document.body.appendChild(div)
            return div
        }
        var createSingleLoginLayer = getSingle(createLoginLayer)
        document.getElementById('loginBtn').onclick = function() {
            var loginLayer = createSingleLoginLayer()
            loginLayer.style.display = 'block'
        }
```

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

