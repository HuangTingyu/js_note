class People {
    constructor(name) {
        this.name
    }
    say() {
        console.log('hi')
    }
}
class A extends People {
    constructor(name) {
        super(name)
    }
    say() {
        console.log('This is A')
    }
}
class B extends People {
    constructor(name) {
        super(name)
    }
    say() {
        console.log('This is B')
    }
}
let kidA = new A('bacra')
let kidB = new B('sakura')
    // kidA.say()
    // kidB.say()