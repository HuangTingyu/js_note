 // document.getElementById('bacra').onclick = function() {
 //     var showid = getSingle(function() {
 //         console.log(this)
 //         new Showid().init.apply(this)
 //     })
 //     showid()
 // }
 // var Showid = function() {}
 // Showid.prototype.init = function() {
 //     console.log(this.id)
 // }
 var getSingle = function(fn) {
     var result;
     return function() {
         if (result) {
             return result
         }
         return result = fn.apply(this, arguments)
     }
 }


 var CreateA = function() {
     this.init()

 }
 CreateA.prototype.init = function() {
     console.log('创建了A')
 }

 var CreateB = function() {
     this.init()

 }
 CreateB.prototype.init = function() {
     console.log('创建了B')
 }

 var getA = function() {
     var a = new CreateA()
     return a
 }
 var getB = function() {
     var b = new CreateB()
     return b
 }
 var createSingleA = getSingle(getA)
     //  var b = getSingle(
     //      getB
     //  )
 createSingleA()
 createSingleA()