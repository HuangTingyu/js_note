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
var folder = new Folder('学习资料')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('JQuery')
var file1 = new File('JS设计模式与实践')
var file2 = new File('锋利的JQuery')
var file3 = new File('你不知道的Javascript')
folder1.add(file1)
folder2.add(file2)
folder.add(folder1)
folder.add(folder2)
folder.add(file3)
folder.scan()