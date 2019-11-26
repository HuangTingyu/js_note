var Folder = function(name) {
    this.name = name;
    this.parent = null // 增加this.parent属性
    this.files = []
}
Folder.prototype.add = function(file) {
    file.parent = this;
    this.files.push(file)
}
Folder.prototype.scan = function() {
        console.log('扫描文件夹：' + this.name)
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan;
        }
    }
    // 增加remove方法
Folder.prototype.remove = function() {
    if (!this.parent) {
        // 根节点或树外的游离节点
        return
    }
    // 遍历父节点的子节点列表，找到自己，然后删除
    for (var files = this.parent.files, I = files.length - 1; I >= 0; I--) {
        var file = files[I]
        if (file === this) {
            files.splice(I, 1)
        }
    }
}