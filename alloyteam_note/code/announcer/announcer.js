var salesOffices = {} // 定义售楼处
salesOffices.clientList = [] // 缓存列表
salesOffices.listen = function(fn) {
    this.clientList.push(fn)
}
salesOffices.trigger = function() {
    for (var i = 0, fn; fn = this.clientList[i++];) {
        fn.apply(this, arguments)
    }
}
salesOffices.listen(function(price, squareMeter) {
    console.log('价格=' + price)
    console.log('squareMeter=' + squareMeter)
})
salesOffices.listen(function(price, squareMeter) {
        console.log('价格=' + price)
        console.log('squareMeter=' + squareMeter)
    })
    // salesOffices.trigger('200w', 88)
    // salesOffices.trigger('1000w', 110)

// 屏蔽110平方
var salesOffices = {}
salesOffices.clientList = {}
salesOffices.listen = function(key, fn) {
    if (!this.clientList[key]) {
        this.clientList[key] = []
    }
    this.clientList[key].push(fn)
}
salesOffices.trigger = function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];
    if (!fns || fns.length === 0) {
        return false
    }
    for (var i = 0, fn; fn = fns[i++];) {
        fn.apply(this, arguments)
    }
}
salesOffices.listen('squareMeter88', function(price) {
    console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function(price) {
        console.log('价格=' + price)
    })
    // salesOffices.trigger('squareMeter88', '200w')
    // salesOffices.trigger('squareMeter110', '1000w')

// 添加动态职责
var event = {
    clientList: [],
    listen: function(key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function() {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}
var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}
var salesOffices = {}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', function(price) {
    console.log('价格=' + price)
})
salesOffices.listen('squareMeter110', function(price) {
    console.log('价格=' + price)
})
salesOffices.trigger('squareMeter88', '200w')
salesOffices.trigger('squareMeter110', '1000w')