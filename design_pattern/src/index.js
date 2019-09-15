class Person {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}
let p = new Person('bacra')
console.log(p.getName())