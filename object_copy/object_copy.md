参考链接 —— <https://juejin.im/post/59ac1c4ef265da248e75892b>

## 堆、栈的概念

- 栈 —— 自动分配内存空间，由系统自动释放
- 堆 —— 动态分配的内存，大小不定也不会释放

## JS 的引用类型

引用类型包括 —— 对象，数组，函数

引用类型 (object) 是存放在内存中的，变量是一个存放在栈内存的指针，这个指针指向堆内存的地址。

demo1 ——

虽然变量a和变量b的内容相同，但是内存位置不同，所以不相等。

```js
var a = [1, 2, 3];
var b = [1, 2, 3];
console.log(a === b); // false
```

## JS对象拷贝的三种方式

### 1.直接赋值

a,b都指向一个对象，两者操作相互影响 。

```js
var a = {}; // a保存了一个空对象的实例
var b = a;  // a和b都指向了这个空对象

a.name = 'jozo';
console.log(a.name); // 'jozo'
console.log(b.name); // 'jozo'

b.age = 22;
console.log(b.age);// 22
console.log(a.age);// 22

console.log(a == b);// true
```

### 2.浅拷贝

- obj1 —— 原始数据
- obj2 —— 直接赋值
- obj3 —— 浅拷贝获得

```js
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
```

浅拷贝得到的obj3重新创建了对象，但只复制一层对象的属性，不包括里面引用类型的数据。

所以，改变浅拷贝得到的 `obj3 `中的引用类型时，会同时改变 `原始数据` 中的引用类型。

### 3.深拷贝

深拷贝 —— 将对象以及对象所有子对象进行拷贝。

来自 `zepto` 源码，如果判断对象是应用类型，则执行递归操作。

详细参考 `deep_copy.js`

```js
    // 内部方法：用户合并一个或多个对象到第一个对象
    // 参数：
    // target 目标对象  对象都合并到target里
    // source 合并对象
    // deep 是否执行深度合并

    function isWindow(obj) { return obj != null && obj == obj.window }
    //对象
    function isObject(obj) {
        return typeof obj == "object"
    }
    //字面量对象
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }

    function isArray(arr) {
        return Array.isArray(arr) || arr instanceof Array
    }

    function extend(target, source, deep) {
        for (key in source)
            if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
                // source[key] 是对象，而 target[key] 不是对象， 则 target[key] = {} 初始化一下，否则递归会出错的
                if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                    target[key] = {}

                // source[key] 是数组，而 target[key] 不是数组，则 target[key] = [] 初始化一下，否则递归会出错的
                if (isArray(source[key]) && !isArray(target[key]))
                    target[key] = []
                    // 执行递归
                extend(target[key], source[key], deep)
            }
            // 不满足以上条件，说明 source[key] 是一般的值类型，直接赋值给 target 就是了
            else if (source[key] !== undefined) target[key] = source[key]
    }
```

