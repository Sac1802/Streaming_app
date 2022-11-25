const express = require('express');
const { Socket } = require('socket.io');

const app = express();

//Create server http of express
const http = require('http').Server(app);

//generate a communication we will work with socket.io
const io = require('socket.io')(http);

//router
app.use(require('./routes/router'));

//where the index will be loaded
app.use(express.static(__dirname+ '/public'));

io.on('connection', (Socket) => {
    Socket.on('stream', (Image) => {
        Socket.broadcast.emit('stream', Image)
    })
});

module.exports = http;