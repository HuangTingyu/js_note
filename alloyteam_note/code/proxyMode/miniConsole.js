// before press f2
var cache = [];
var miniConsole = {
        log: function() {
            var args = arguments;
            cache.push(function() {
                return miniConsole.log.apply(miniConsole, args)
            })
        }
    }
    // press f2，加载miniConsole
var handler = function(ev) {
    if (ev.keyCode === 113) {
        var script = document.createElement('script')
        script.onload = function() {
            for (var i = 0, fn; fn = cache[i++];) {
                fn()
            }
        }
        script.src = 'miniConsole.js'
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}
document.body.addEventListener('keydown', handler, false)
miniConsole = {
        log: function() {
            // 省略真正代码
            console.log(Array.prototype.join.call(arguments))
        }
    }
    // 保证F2被重复按下的时候，miniConsole.js只被加载一次。整理一下miniConsole代理对象的代码，
    // miniConsole标准虚拟对象如下——
var miniConsole = (function() {
    var cache = []
    var handler = function(ev) {
            if (ev.keyCode === 113) {
                var script = document.createElement('script')
                script.onload = function() {
                    for (var i = 0, fn; fn = cache[i++];) {
                        fn()
                    }
                }
                script.src = 'miniConsole.js'
                document.getElementsByTagName('head')[0].appendChild(script);
                document.body.removeEventListener('keydown', handler);

            }
        }
        // 只加载一次miniConsole
    document.body.addEventListener('keydown', handler, false);
    return {
        log: function() {
            console.log(cache)
            var args = arguments
            cache.push(function() {
                return miniConsole.log.apply(miniConsole, args)
            })
        }
    }
})()
miniConsole.log('bacra')
miniConsole.log('sb')
miniConsole.log('wf')

// miniConsole = {
//     log: function() {
//         // 真正代码略
//         console.log(Array.prototype.join.call(arguments))
//     }
// }