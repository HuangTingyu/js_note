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
    // salesOffices.listen('squareMeter88', function(price) {
    //     console.log('价格=' + price)
    // })
    // salesOffices.listen('squareMeter110', function(price) {
    //         console.log('价格=' + price)
    //     })
    // salesOffices.trigger('squareMeter88', '200w')
    // salesOffices.trigger('squareMeter110', '1000w')

// 取消订阅
event.remove = function(key, fn) {
    var fns = this.clientList[key]
    if (!fns) {
        return false
    }
    if (!fn) {
        fns && (fns.length = 0)
    } else {
        for (var I = fns.length - 1; I >= 0; I--) {
            var _fn = fns[I]
            if (_fn === fn) {
                fns.splice(I, 1)
            }
        }
    }
}
var salesOffices = {}
var installEvent = function(obj) {
    for (var i in event) {
        obj[i] = event[i]
    }
}
installEvent(salesOffices)
salesOffices.listen('squareMeter88', fn1 = function(price) {
    console.log('fn1价格=' + price)
})
salesOffices.listen('squareMeter88', fn2 = function(price) {
    {
        console.log('fn2价格=' + price)
    }
})
salesOffices.remove('squareMeter88', fn1)
salesOffices.trigger('squareMeter88', '1080w')

// 网站登录
login.succ(function(data) {
    header.setAvatar(data.avatar) //设置header模块的头像
    nav.setAvatar(data.avatar) // 设置导航模块的头像
    message.refresh() // 刷新消息列表
    cart.refresh() // 刷新购物车列表

})

$.ajax('http://xxx.com?login', function(data) {
    login.trigger('loginSucc', data)
})
var header = (function() {
    login.listen('loginSucc', function(data) {
        address.refresh(obj)
    })
    return {
        refresh: function(avatar) {
            console.log('refresh')
        }
    }
})()