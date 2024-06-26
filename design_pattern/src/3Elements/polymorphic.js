/*
 * @Author: sakurahuang
 * @Description: 
 * @Date: 2024-06-26 16:00:16
 */
class People {
    constructor(name, house) {
        this.name = name
        this.house = house
    }
    say() {
        console.log('hi')
    }
}
class A extends People {
    constructor(name, house) {
        super(name, house)
    }
    say() {
        console.log('This is A')
    }
}
class B extends People {
    constructor(name, house) {
        super(name, house)
    }
    say() {
        console.log('This is B')
    }
}

class House {
    constructor(city) {
        this.city = city
    }
    showCity() {
        console.log(`House in ${this.city}`)
    }
}

let aHouse = new House('广州')
let a = new A('AAA', aHouse)
