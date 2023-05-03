const express = require('express');
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.static(__dirname + '/static'))

app.get('/',function(req,res){
    res.sendFile(__dirname + 'index.html')
})

port = process.env.PORT || 3000

//socket

users = [];

io.on('connection', (socket) => {

    socket.on('userSet',function(username){
        users.push(username)
        console.log(users)
    })

    socket.on('recvMessage',(data) => {
        socket.broadcast.emit('sendMsg',data)
        socket.emit('sendMsg',data)
    })

});

//socket

server.listen(port,function(){
    console.log('listening on port:'+port)
})