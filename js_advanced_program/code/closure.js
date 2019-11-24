// function callFun(func, argu) {
//     return func(argu)
// }

// function add10(num) {
//     return num + 10;
// }
// var res1 = callFun(add10, 10)

// function getGreeting(name) {
//     return 'hello,' + name;
// }
// var res2 = callFun(getGreeting, 'bacra')
// console.log(res2)

function createCom(propertyName) {
    return function(obj1, obj2) {
        var value1 = obj1[propertyName]
        var value2 = obj2[propertyName]
        if (value1 < value2) {
            return -1
        } else if (value1 > value2) {
            return 1
        } else {
            return 0
        }
    }
}
var compare = createCom("name")
var result = compare({ name: 'bacra' }, { name: 'sakura' })