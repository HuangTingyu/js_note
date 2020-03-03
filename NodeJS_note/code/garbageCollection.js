// var a = []
// for(var i=0; i<10000000; i++){
//     a.push(new Array(100))
// }

// var useMem = function(fd){
//     var size = 200 * 1024 *1024
//     var buffer = new Buffer(size)
//     for(var i=0; i < size; i++){
//         buffer[i]=0
//         getRAM(fd)
//     }
//     return buffer;
// }

// var getRAM = function(fd){
//     var mem = process.memoryUsage();
//     var format = function(bytes) { 
//           return (bytes/1024/1024).toFixed(2)+'MB'; 
//     };
//     var ramStr = 'Process: heapTotal '+format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss)
//     ramStr += '\n'
//     fs.writeFile(fd,ramStr,function(err){
//         if(err){
//             throw err;
//         }
//     })
// }

const fs = require('fs')

// fs.open(__dirname + '/gc.log', 'a', function (err, fd) {
//     if(err){
//         throw err;
//     }
//     useMem(fd)
    
      
// })

var reader = fs.createReadStream('./asset/in.md')
var writer = fs.createWriteStream('./asset/out.md')
reader.pipe(writer)