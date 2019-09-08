var obj1 = {
    'name': 'zhangsan',
    'age': '18',
    'language': [1, [2, 3],
        [4, 5]
    ],
};

var obj2 = obj1;


var obj3 = shallowCopy(obj1);

function shallowCopy(src) {
    var dst = {};
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            dst[prop] = src[prop];
        }
    }
    return dst;
}

obj2.name = "lisi";
obj3.age = "20";

obj2.language[1] = ["二", "三"];
obj3.language[2] = ["四", "五"];

console.log("obj1")
console.log(obj1);
//obj1 = {
//    'name' : 'lisi',
//    'age' :  '18',
//    'language' : [1,["二","三"],["四","五"]],
//};
console.log("obj2")
console.log(obj2);
//obj2 = {
//    'name' : 'lisi',
//    'age' :  '18',
//    'language' : [1,["二","三"],["四","五"]],
//};
console.log("obj3")
console.log(obj3);
//obj3 = {
//    'name' : 'zhangsan',
//    'age' :  '20',
//    'language' : [1,["二","三"],["四","五"]],
//};