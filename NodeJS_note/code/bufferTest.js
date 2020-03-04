// var str = 'Dear-迪丽热巴'
// var buf = Buffer.from(str, 'utf-8')
// console.log(buf)
// console.log(buf.toString())

// var fs = require('fs')
// var rs = fs.createReadStream('./asset/test.md', {highWaterMark: 11})
// rs.setEncoding('utf8')
// var data = ''
// rs.on("data",function(chunk){
//     data += chunk
// })
// rs.on("end",function(){
//     console.log(data)
// })

// var fs = require('fs')
// var iconv = require('iconv-lite')
// var rs = fs.createReadStream('./asset/test.md', {highWaterMark: 11})
// var data = ''
// var chunks = []
// var size = 0
// rs.on('data',function(chunk){
//     chunks.push(chunk)
//     size += chunk.length
// })
// rs.on('end',function(){
//     var buf = Buffer.concat(chunks,size)
//     var str = iconv.decode(buf,'utf8')
//     console.log(str)
// })

var http = require('http')
var helloworld = ''
for(var i=0;i < 1024 * 100;i++){
    helloworld += '迪'
}
helloworld = Buffer.from(helloworld)
http.createServer(function(req, res){
    console.log('server is running on 8001')
    res.writeHead(200)
    res.end(helloworld)
    
}).listen(8001)