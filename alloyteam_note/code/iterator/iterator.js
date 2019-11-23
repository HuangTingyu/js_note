// jquery自带的迭代器
// $.each([1,2,3],function(i,n){
//     console.log('当前下标为：' + i)
//     console.log('当前值为：' + n)
// })

// 实现自己的迭代器
var each = function(ary, callback){
    for(var i=0, l = ary.length; i < l;i++){
        callback.call(ary[i],i,ary[i])
    }
}

each([1,2,3],function(i,n){
    // console.log(i + ',' + n)
})

// 比较两个数组中的数是否相同
var Iterator = function(obj){
    var current = 0;
    var length = obj.length;
    var next = function(){
        current+=1;
    }
    var isDone = function(){
        return current >= obj.length;
    }
    var getCurrItem = function(){
        return obj[current]
    }
    return {
        length:length,
        next:next,
        isDone:isDone,
        getCurrItem:getCurrItem
    }
}

var compare = function(iterator1,iterator2){
    if(iterator1.length !== iterator2.length){
        console.log('iterator1和iterator2不相等')
        return 
    }
    while(!iterator1.isDone()&&!iterator2.isDone()){
        if(iterator1.getCurrItem()!== iterator2.getCurrItem()){
            console.log('iterator1和iterator2不相等')
            return
        }
        iterator1.next()
        iterator2.next()
    }
    console.log('iterator1和iterator2相等')
}

var iterator1 = Iterator([1,2,3])
var iterator2 = Iterator([1,2,4])
compare(iterator1,iterator2)
