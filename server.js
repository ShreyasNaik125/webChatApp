const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

app.use(express.static(__dirname + '/public'))

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html')
})

//socket code

const io = require('socket.io')(server)

io.on('connection',function(socket){
    socket.on('usernameStore',username => {

        socket.emit('user-joined','You')
        socket.broadcast.emit('user-joined',username)
        
        socket.on('recvMessage',message => {
            obj = {user:username,msg:message}
            socket.emit('msg-out',obj)
            socket.broadcast.emit('msg-inc',obj)
        })

        socket.on('disconnect',()=>{
            socket.broadcast.emit('user-left',username)
        })
    })
})

//socket code

server.listen(3000,function(){
    console.log('listening on port *3000')
})
