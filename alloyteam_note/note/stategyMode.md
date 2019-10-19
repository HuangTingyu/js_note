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

使用策略模式改写 ——

```js
function performanceS() {}
performanceS.prototype.calculate = function(salary) {
    return salary * 4
}

function performanceA() {}
performanceA.prototype.calculate = function(salary) {
    return salary * 3
}

function performanceB() {}
performanceB.prototype.calculate = function(salary) {
    return salary * 2
}
var Bonus = function() {
    this.salary = null;
    this.strategy = null;
}
Bonus.prototype.setSalary = function(salary) {
    this.salary = salary
}
Bonus.prototype.setStategy = function(strategy) {
    this.strategy = strategy
}
Bonus.prototype.getBonus = function() {
    return this.strategy.calculate(this.salary)
}
```

这里的Bonus本身没有能力进行计算，而是把请求委托给了之前保存好的策略对象。

调用如下 ——

```js
var bonus = new Bonus()
bonus.setSalary(1000)
bonus.setStrategy(new performanceS())
console.log(bonus.getBonus())
```

