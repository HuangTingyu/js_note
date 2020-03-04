var net = require('net')
var server = net.createServer(function(socket){
    socket.on('data',function(data){
        console.log(data.toString())
        socket.write('Welcome!')
    })
    socket.on('end',function(){
        console.log('server disconnected')
    })
    socket.write('Dear-迪丽热巴:',function(){
        console.log('写入完成')
    })
})
server.listen(8124,function(){
    console.log('server bound')
})