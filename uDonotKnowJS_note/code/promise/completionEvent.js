// function foo(x) {
//     //构造listener事件，通知处理对象来返回
//     return listener;
// }
// var evt = foo(42);
// evt.on("completion", function() {
//     // 可以进行下一步了
// })
// evt.on('failure', function(err) {
//     // foo(...)中间出错了
// })
// function foo(x) {
//     // 做一些耗时的工作
//     return new Promise(function(resolve, reject) {
//         // 最终调用resolve(...)或者reject(...)
//     })
// }
// var p = foo(42)
// bar(p)
// baz(p)
function bar(fooPromise) {
    fooPromise.then(function() {
        // 监听foo(...)完成
    }, function() {
        // foo出错
    })
}

function oopsBar() {
    // foo(...)出错了
}
var p = foo(42)
p.then(bar, oopsBar)
p.then(baz, oopsBaz)