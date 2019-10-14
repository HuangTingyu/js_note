## 多态

一段代码改造，如何使不同动物发出不同的声音

实现1 ——

```js
var makeSound = function(animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎')
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯')
    }
}
var Duck = function() {}
var Chicken = function() {}
makeSound(new Duck())
makeSound(new Chicken())
```

改进之多态扩展实现 ——

把不变的地方即，`动物发出声音`，抽离出来。改变的地方，各自封装起来。

```js
	var makeSound = function( animal ){
		animal.sound();
	};

	var Duck = function(){};

	Duck.prototype.sound = function(){
		console.log( '嘎嘎嘎' );
	};

	var Chicken = function(){};

	Chicken.prototype.sound = function(){
		console.log( '咯咯咯' );
	};

	makeSound( new Duck() ); // 嘎嘎嘎
	makeSound( new Chicken() ); // 咯咯咯

	var Dog = function(){};

	Dog.prototype.sound = function(){
		console.log( '汪汪汪' );
	};

	makeSound( new Dog() ); // 汪汪汪
```

