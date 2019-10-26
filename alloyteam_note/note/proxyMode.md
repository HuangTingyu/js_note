## 虚拟代理

虚拟代理，把一些开销很大的对象，延迟到真正需要它的时候才去创建。

### 应用

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