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