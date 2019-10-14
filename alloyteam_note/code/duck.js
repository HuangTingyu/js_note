// var makeSound = function(animal) {
//     if (animal instanceof Duck) {
//         console.log('嘎嘎嘎')
//     } else if (animal instanceof Chicken) {
//         console.log('咯咯咯')
//     }
// }
// var Duck = function() {}
// var Chicken = function() {}
// makeSound(new Duck())
// makeSound(new Chicken())
// ----------------- 多态实现 --------------------
var makeSound = function(animal) {
    animal.sound();
};

var Duck = function() {};

Duck.prototype.sound = function() {
    console.log('嘎嘎嘎');
};

var Chicken = function() {};

Chicken.prototype.sound = function() {
    console.log('咯咯咯');
};

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯

var Dog = function() {};

Dog.prototype.sound = function() {
    console.log('汪汪汪');
};

makeSound(new Dog()); // 汪汪汪