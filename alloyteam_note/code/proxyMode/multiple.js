var mult = function() {
    console.log('开始计算乘积')
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments
    }
    return a;
}
mult(2, 3);
var proxyMult = (function() {
    var cache = {}
    return function() {
        var args = Array.prototype.join.call(arguments, ',')
        if (args in cache) {
            return cache[args]
        }
        return cache[args] = mult.apply(this, arguments)
    }
})()