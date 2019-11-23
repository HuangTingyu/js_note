var salesOffices = {} // 定义售楼处
salesOffices.clientList = [] // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function(fn){
    this.clientList.push(fn) // 订阅的消息添加进缓存列表
}
salesOffices.trigger = function(){
    for(var i=0,fn;fn=this.clientList[i++];){
        fn.apply(this,arguments) // arguments 是发布消息时带上的参数
    }
}

salesOffices.listen(function(price,squareMeter){
    console.log('价格=' + price)
    console.log('squareMeter=' + squareMeter)
})
// salesOffices.trigger(2000000,88)
// salesOffices.trigger(3000000,110)

// 增加筛选条件，过滤掉110的消息
var salesOffices={}
salesOffices.clientList=[]
salesOffices.listen=function(){
    if(!this.clientList[key]){
        this.clientList[key] = []
    }
    this.clientList[key].push(fn) // 订阅的消息添加进消息缓存列表
}
salesOffices.trigger=function(){
    var key = Array.prototype.shift.call(arguments),fns = this.clientList[key]
    if(!fns || fns.length === 0){
        return false
    }
    for(var i=0,fn;fn=fns[i++];){
        fn.apply(this,arguments)
    }
}
salesOffices.listen('squareMeter88',function(price){
    console.log('价格='+price)
})
salesOffices.listen('squareMeter110',function(price){
    console.log('价格='+price)
})
salesOffices.trigger('squareMeter88',2000000)
salesOffices.trigger('squareMeter110',3000000)
