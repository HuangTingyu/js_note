## 变量

#### 1.局部变量

var 操作符定义的变量，将成为定义该变量作用域中的局部变量，如果在函数中var定义一个变量，那么这个变量在函数退出后就会被销毁。

```js
function test(){
  var message = 'hi'
}
test()
console.log(message)
```

如果去掉上面的var定义，那么message将变成一个全局变量，就不会报错。

#### 2.定义多个变量

用逗号隔开

```js
var message = 'help', found = false, age = 29
```

#### 变量转换规则

数据类型 - 转化为true的值 - 转化为false的值

String - 任何非空字符串 - “” (空字符串)

Number - 任何非零数字值(包括无穷大) - 0和NaN

Object - 任何对象 - null

#### Number类型

 1.八进制(以0开头)

```
var octalNum1 = 070  // 八进制的56
var octalNum2 = 079  // 无效的八进制 —— 解析为79
var octalNum3 = 08 // 无效八进制 —— 解析为8
```

2. 十六进制(以0x开头)

```
var hexNum1 = 0xA  // 十进制的10
var hexNum2 = 0x1f // 十进制的31
```

进行算术计算的时候，所有八进制和十六进制表示的数值都将被转换成十进制的数值。

#### isNAN

NAN, 即非数值。

```
isNAN(NAN)	// true
isNAN(10)	// false(10是一个数值)
isNAN("10")	// false(可以被转化为数值10)
isNAN("blue")	//true(不能被转化为数值)
isNAN(true)	// false(可以被转化为数值)
```

