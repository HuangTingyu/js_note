var inherit = require('./3Elements/inherit.js')
var polymorphic = require('./3Elements/polymorphic.js')
var jqueryApply = require('./3Elements/jqueryApply.js')
class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}
let p = new Person('bacra')
p.getName()