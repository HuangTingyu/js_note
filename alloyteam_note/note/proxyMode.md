## 虚拟代理

虚拟代理，把一些开销很大的对象，延迟到真正需要它的时候才去创建。

### 应用

### 1.图片加载

1.虚拟代理实现图片预加载

当图片过大，或者网络不佳的时候，图片的位置将一片空白。解决方法，用一张loading图片占位，然后异步加载图片，图片加载好了再填充到img节点中。

版本1 ——

主要思路，把加载的图片的任务交给 `img对象` ，一开始 `dom节点` 的src指向一张loading图片，等`img对象`中的图片加载完毕后，再修改`dom节点` 的src指向。

```js
var simplyImage = (function() {
            var imgNode = document.createElement('img')
            document.body.appendChild(imgNode)
            var img = new Image;
            img.onload = function() {
                imgNode.src = img.src
            }
            return {
                setSrc: function(src) {
                    imgNode.src = './loading-gif.gif'
                    img.src = src
                }
            }
        })()
```

版本2，引进代理模式 ——

```js
var myImage = (function() {
        var imgNode = document.createElement('img')
        document.body.appendChild(imgNode)
        return {
            setSrc: function(src) {
                imgNode.src = src;
            }
        }
    })()
var proxyImage = (function() {
    var img = new Image;
    img.onload = function() {
        myImage.setSrc(this.src)
    }
    return {
        setSrc: function(src) {
            myImage.setSrc('./loading-gif.gif')
            img.src = src;
        }
    }
})()
proxyImage.setSrc('http://i0.hdslb.com/bfs/archive/1ee3febf53becf8ca9e84387c4578f1b41c354be.png')
```

解释一下，页面一开始执行第一个闭包，也就是初始化imgNode，往document里面插img节点，然后执行第二个闭包，初始化img对象，最后执行`proxyImage.setSrc` 。

执行`proxyImage.setSrc` ，也就是调用 `myImage.setSrc` ，让dom节点的src指向loding图片，把加载真正图片的任务交给img对象，图片加载完毕后，执行onload函数，修改dom节点的src指向。

### 2.合并http请求

实现一个文件同步功能，当选中一个checkbox的时候，对应的文件将被同步到另外一台备用服务器上面。

版本1 ——

```js
var synchronousFile = function(id) {
    console.log('开始同步文件，ID为:' + id);
}
var checkbox = document.getElementsByTagName('input')
for (var i = 0, c; c = checkbox[i++];) {
    c.onclick = function() {
        if (this.checked === true) {
            synchronousFile(this.id)
        }
    }
}
```

如果用户狂点checkbox，频繁的网络请求可能造成巨大的开销，所以，用一个代理函数`proxySynchronousFile` 收集一段时间之内的请求，最后一次性发给服务器。

```js
var proxySynchronousFile = (function() {
    var cache = [],
        timer;
    return function(id) {
        cache.push(id)
        if (timer) {
            return;
        }
        timer = setTimeout(function() {
            synchronousFile(cache.join(','))
            clearTimeout(timer)
            timer = null;
            cache.length = 0
        }, 2000)
    }
})()
var checkbox = document.getElementsByTagName('input')
for (var i = 0, c; c = checkbox[i++];) {
    c.onclick = function() {
        if (this.checked === true) {
            proxySynchronousFile(this.id)
        }
    }
}
```

### 3.合并console命令

一个mini控制台开源项目miniConsole.js，可以帮助开发者进行简单的调试工作，调用方法`miniConsole.log(1)` ，这句话会在页面中创建一个div，并把log显示在div里面。

miniConsole.js一开始并不被加载，只有当用户按下F2唤出控制台的时候，才开始加载。为了让用户正常使用里面的API，可以先提供miniConsole的代理对象给用户提前使用。

代理函数将把打印log的请求都包裹在一个函数里面，随后这些函数将全部被放到缓存队列中，用户按下F2唤出控制台的时候，加载真正的miniConsole代码，加载之后遍历miniConsole代理对象中的缓存函数队列，同时依次执行他们。

