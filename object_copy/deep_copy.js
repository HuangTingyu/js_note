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

    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    // $.extend = function(target) {
    //         var deep, args = slice.call(arguments, 1);

    //         //第一个参数为boolean值时，表示是否深度合并
    //         if (typeof target == 'boolean') {
    //             deep = target;
    //             //target取第二个参数
    //             target = args.shift()
    //         }
    //         // 遍历后面的参数，都合并到target上
    //         args.forEach(function(arg) { extend(target, arg, deep) })
    //         return target
    //     }
    //test1
    var test1 = {
        name: "a",
        item: {
            name: "b",
            nickname: "c"
        }
    };

    //简单扩展
    extend(test1, { name: "1", item: { name: "2", item: { name: "3" } } }, true);
    console.log(test1);