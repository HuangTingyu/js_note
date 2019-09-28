class People {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    eat() {
        console.log(`${this.name} eat something`)
    }
    speak() {
        console.log(`My name is ${this.name},my age is ${this.age}`)
    }
}
class Student extends People {
    constructor(name, age, number) {
        super(name, age)
        this.number = number
    }
    study() {
        console.log(`${this.name} whose number is ${this.number} studying`)
    }
}
let bacra = new Student('bacra', 31, 'A1')
let sakura = new Student('sakura', 21, 'A2')
    // bacra.eat()
    // bacra.speak()
    // bacra.study()
    // sakura.study()