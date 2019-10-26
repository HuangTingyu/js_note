## 策略模式

参考代码 —— `stategy/stategy.html` ，`stategy/stategy.js`

例子——计算工资

S级 x 4，A级 x 3，B级 x 2

```js
var calculateBonus = function(performanceLevel, salary) {
    if (performanceLevel === 'S') {
        return performanceS(salary)
    }
    if (performanceLevel === 'A') {
        return performanceA(salary)
    }
    if (performanceLevel === 'B') {
        return performanceB(salary)
    }
}

function performanceS(salary) {
    return salary * 4
}

function performanceA(salary) {
    return salary * 3
}

function performanceB(salary) {
    return salary * 2
}

calculateBonus('B', 2000)
calculateBonus('S', 6000)
```

### 策略模式应用

上面如果计算工资的规则增加，`calculateBonus` 函数会持续膨胀。

一个基于策略模式的程序由两部分组成，第一部分是一组策略类，策略类封装了具体的算法，负责计算过程；

第二部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。

## js版本的策略模式

```js
var strategies = {
    "S": function(salary) {
        return salary * 4
    },
    "A": function(salary) {
        return salary * 3
    },
    "B": function(salary) {
        return salary * 2
    }
}
var calculateBonus = function(level, salary) {
    return strategies[level](salary)
}
console.log(calculateBonus('S', 2000))

console.log(calculateBonus('A', 1000))
```

