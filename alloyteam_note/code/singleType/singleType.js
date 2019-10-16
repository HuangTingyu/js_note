var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function() {
    console.log(this.name)
}