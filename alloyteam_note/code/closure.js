// 版本1——————————————————————
// var cache = {};
// var mult = function() {
//     var args = Array.prototype.join.call(arguments, ',');
//     if (cache[args]) {
//         return cache[args];
//     }
//     console.log('执行')
//     var a = 1;
//     for (var i = 0, l = arguments.length; i < l; i++) {
//         a = a * arguments[i]
//     }
//     return cache[args] = a
// }
// console.log(mult(1, 2, 3))
// console.log(mult(1, 2, 3))
//
// 版本2——————————————————————
// var mult = (function() {
//     var cache = {}
//     return function() {
//         var args = Array.prototype.join.call(arguments, ',');
//         if (args in cache) {
//             return cache[args]
//         }
//         var a = 1;
//         for (var i = 0, l = arguments.length; i < l; i++) {
//             a = a * arguments[i]
//         }
//         return cache[args] = a
//     }
// })()
// console.log(mult(1, 2, 3))
// console.log(mult(1, 2, 3))
//
// 版本3————————————————————————
// var mult = (function() {
//     var cache = {}
//     var calculate = function() {
//         var a = 1;
//         for (var i = 0, l = arguments.length; i < l; i++) {
//             a = a * arguments[i]
//         }
//         return a
//     }
//     return function() {
//         var args = Array.prototype.join.call(arguments, ',');
//         if (args in cache) {
//             return cache[args]
//         }
//         return cache[args] = calculate.apply(null, arguments)
//     }
// })()
// console.log(mult(1, 2, 3))
// console.log(mult(1, 2, 3))

// 闭包与对象相互转化
// 闭包
// var extent = function() {
//     var value = 0
//     return {
//         call: function() {
//             value++
//             console.log(value)
//         }
//     }
// }
// var extent = extent()
// extent.call();
// extent.call();
//对象
// var extend = {
//     value: 0,
//     call: function() {
//         this.value++
//             console.log(this.value)
//     }
// }

// extend.call()
// extend.call()
// 工厂模式
var Extent = function() {
    this.value = 0
}
Extent.prototype.call = function() {
    this.value++;
    console.log(this.value);
}
var extent = new Extent()
extent.call()
extent.call()
extent.call()