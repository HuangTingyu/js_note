// var calculateBonus = function(performanceLevel, salary) {
//     if (performanceLevel === 'S') {
//         return performanceS(salary)
//     }
//     if (performanceLevel === 'A') {
//         return performanceA(salary)
//     }
//     if (performanceLevel === 'B') {
//         return performanceB(salary)
//     }
// }

// function performanceS(salary) {
//     return salary * 4
// }

// function performanceA(salary) {
//     return salary * 3
// }

// function performanceB(salary) {
//     return salary * 2

// }

// console.log(calculateBonus('B', 2000))
// console.log(calculateBonus('S', 6000))

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