### 闭包

```js
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
```

匿名函数从 `createCom()` 被返回后，作用域链被初始化为 `createCom()` 中的对象和全局变量对象。这样，匿名函数就可以访问在 `createCom()` 中定义的变量。

`createCom()` 函数返回后，执行环境的作用域链会被销毁，但它的对象仍留在内存中。直到匿名函数被销毁，`createCom()` 才会被销毁。

### 释放内存

```js
compare = null;
```

通过上面的方式，解除引用，可以释放内存。