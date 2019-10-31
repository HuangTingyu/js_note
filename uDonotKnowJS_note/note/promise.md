## Promise笔记

详见 `code\promise`

### 应用1

```js
function add(xPromise, yPromise) {
    return Promise.all([xPromise, yPromise]).then(function(values) {
        return values[0] + values[1];
    })
}
function fetchX() {
    return 1
}

function fetchY() {
    return 2
}
add(fetchX(), fetchY()).then(function(sum) {
    console.log(sum)
})
```

Promise.all([..])接受一个promise数组并返回一个新的promise。返回的时候，前面数组里面的function已执行完毕；

add(fetchX(), fetchY())执行完之后，会得到这两数之和的`promise` ；

上面代码有两层promise，第一层，fetchX()和fetchY被调用后，返回值传给add(...)；第二层add(...)，创建并返回promise。

## 应用2 - 订阅形式

```js
function foo(x) {
    //构造listener事件，通知处理对象来返回
    return listener;
}
var evt = foo(42);
evt.on("completion", function() {
    // 可以进行下一步了
})
evt.on('failure', function(err) {
    // foo(...)中间出错了
})
```

foo(...) 创建并返回了一个事件订阅对象，并在上面注册了两个事件处理函数。这里，并没有把回调传给foo(...)，而是返回一个名为evt的事件注册对象，由它来接受回调。上面的机制，可以实现如下的调用 ——

```js
var evt = foo(42)
bar(evt)
baz(evt)
```

bar(...)和baz(...)，不需要关心foo(...)里面的具体调用细节，foo(..)也不用关注bar(...)，baz(...) 是否存在，或者是否等待foo(...) 完成通知。

promise也可以实现，类似上面的调用。

```js
function foo(x) {
    // 做一些耗时的工作
    return new Promise(function(resolve, reject) {
        // 最终调用resolve(...)或者reject(...)
    })
}
var p = foo(42)
bar(p)
baz(p)
```

