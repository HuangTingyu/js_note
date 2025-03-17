### slice

记住，slice不会改变原数组

```
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits.slice(1,3))
```

```
[ 'Orange', 'Lemon' ]
```

`slice(a, b)`，从a位置开始截，b位置结束，不包含b



### splice

```
const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
console.log(fruits.splice(1,3))
```

```
['Orange', 'Lemon', 'Apple']
```

`splice(a,count)`，从a位置开始，截取count个元素



### substr

```
const str = 'abcde'
console.log(str.substring(0,3))
```

```
abc
```

`str.substring(a,count)`，从a位置开始，截取count个字符