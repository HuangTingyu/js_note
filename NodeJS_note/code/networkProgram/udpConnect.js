var dgram = require('dgram')
var message = Buffer.from("Dear-迪丽热巴")
var client = dgram.createSocket('udp4')
client.send(message,0,message.length,41234,"localhost",function(){
    client.close()
})