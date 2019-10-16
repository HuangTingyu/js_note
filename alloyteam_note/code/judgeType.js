// var isString = function(obj) {
//     return Object.prototype.toString.call(obj) === '[object String]'
// }
// var isArray = function(obj) {
//     return Object.prototype.toString.call(obj) === '[object String]'
// }
// var isNumber = function(obj) {
//     return Object.prototype.toString.call(obj) === '[object Number]'
// }
// var isType = function(type) {
//     return function(obj) {
//         return Object.prototype.toString.call(obj) === '[object ' + type + ']'
//     }
// }
// var isString = isType('String');
// var isArry = isType('Array');
// var isNumber = isType('Num');

// 批量注册
var Type = {}
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function(type) {
        Type['is' + type] = function(obj) {
            return Object.prototype.toString.call(obj) === '[object ' + type + ']'
        }
    })(type)
}
console.log(Type.isArray([1, 2, 3]))