var cache = []
var miniConsole = {
    log: function() {
        var args = arguments
        cache.push(function() {
            return miniConsole.log.apply(miniConsole, args)
        })
    }
}
miniConsole.log('bacra')
miniConsole.log('sb')
miniConsole.log('wf')
console.log(cache)