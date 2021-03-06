const express = require('express')
const app = express()
const server = require('http').Server(app)


/***************socket.io**********************/
const io = require('socket.io')(server);
server.listen(80)

io.on('connection', (socket) => {

    socket.on('login', (userdata) => {              //监听登录
        socket.userdata = userdata;

        socket.broadcast.emit('user join', socket.userdata)
    })

    socket.on('disconnect', (reason) => {           //监听退出
        if (socket.userdata) {
            socket.broadcast.emit('user left', socket.userdata);
        }
    });

    socket.on('sendMsg', function (data) {          //监听消息
        socket.broadcast.emit('receiveMsg', data);
    });

});

/***************socket.io**********************/

