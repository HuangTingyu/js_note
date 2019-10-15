// var obj = {
//     a: 1,
//     getA: function() {
//         console.log(this === obj)
//         console.log(this.a)
//     }
// }
// obj.getA()
// global.name = 'globalName'
// var getName = function() {
//     return this.name
// }
// console.log(getName())
var obj = {
    myName: 'sven',
    getName: function() {
        return this.myName
    }
}
console.log(obj.getName())

var getName2 = obj.getName
console.log(getName2())