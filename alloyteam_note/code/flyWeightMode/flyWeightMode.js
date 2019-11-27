var Model = function(sex, underwear) {
    this.sex = sex;
    this.underwear = underwear;
}
Model.prototype.takePhoto = function() {
    console.log('sex=' + this.sex + 'underwear=' + this.underwear)
}
for (var i = 1; i <= 50; i++) {
    var maleModel = new Model('male', 'underwear' + i)
    maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
    var femaleModel = new Model('female', 'underwear' + j)
    femaleModel.takePhoto()
}

// 享元模式改写
var Model = function(sex) {
    this.sex = sex
}
Model.prototype.takePhoto = function() {
        console.log('sex=' + this.sex + 'underwear=' + this.underwear)
    }
    // 分别创建一个男模特对象和女模特对象
var maleModel = new Model('male'),
    femaleModel = new Model('female')
for (var i = 1; i <= 50; i++) {
    maleModel.underwear = 'underwear' + i
    maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
    femaleModel.underwear = 'underwear' + i
    femaleModel.takePhoto()
}
// 改进方法后，只需要两个对象便完成了相同的功能