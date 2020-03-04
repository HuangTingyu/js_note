var net = require('net')
var client = net.createConnection({port:8124}, function(){
    console.log('client connected')
    client.write('server is running')
})
client.on('data',function(data){
    console.log(data.toString())
    client.end()
})
client.on('end',function(){
    console.log('client disconnected')
})