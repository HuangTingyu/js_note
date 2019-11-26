## 组合模式

组合模式将对象组合成树形结构，以表示 “部分-整体” 的层次结构。

组合模式的优点 —— 提供一种遍历树结构的方案，通过调用组合对象的execute方法，程序会递归调用组合下面的叶对象的execute方法。

请求从树最顶端的对象往下传递，组合对象会遍历它属下的子节点，将请求继续传递给这些子节点。

### 应用

扫描文件

```js
var Folder = function(name) {
    this.name = name;
    this.files = []
}
Folder.prototype.add = function(file) {
    this.files.push(file)
}
Folder.prototype.scan = function() {
    console.log('开始扫描文件夹：' + this.name)
    for (var i = 0, file, files = this.files; file = files[i++];) {
        file.scan()
    }
}
var File = function(name) {
    this.name = name
}
File.prototype.add = function() {
    throw new Error('文件下面不能再添加文件')
}
File.prototype.scan = function() {
    console.log('开始扫描文件：' + this.name)
}
```

可以往 `folder` 添加文件夹和文件

```js
var folder = new Folder('学习资料')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('JQuery')
var file1 = new File('JS设计模式与实践')
var file2 = new File('锋利的JQuery')
var file3 = new File('重构与模式')
folder1.add(file1)
folder2.add(file2)
folder.add(folder1)
folder.add(folder2)
folder.add(file3)
```

此时，执行一下 `folder.scan()`

```
开始扫描文件夹：学习资料
开始扫描文件夹：Javascript
开始扫描文件：JS设计模式与实践
开始扫描文件夹：JQuery
开始扫描文件：锋利的JQuery
开始扫描文件：你不知道的Javascript
```

### 注意的点

关于组合模式要注意的点 ——

1. 组合对象把请求委托给它所有的叶对象，能委托的关键是，拥有 `相同` 的接口！！！

2. 组合模式对于叶对象的操作，必须一致！！！

   比如上面扫描，如果只是针对部分文件的扫描，那么不能用组合模式。

3. 如果一个叶对象，隶属于多个组合对象，那么相互间的引用将变得复杂，可以引入中介模式来管理。

4. 用职责链模式提高组合模式的性能。

ps.那个，应用选人组件里面，隐藏元素的部分，使用了组合模式，每一个模块都添加了 `remove` 方法，然后集中到一个模块，一次 `remove` 调用可以隐藏多个模块。