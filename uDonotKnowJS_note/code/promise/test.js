var list = ['1', '2']
var flag = false;
var ifOne = list.forEach(function(e) {
    if (e === '1') {
        flag = true
    }
})
console.log(flag)