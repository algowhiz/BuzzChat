const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io to the HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log("socket id", socket.id);

    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log("user with id ",{data});
    })

    socket.on('send_chat',(data) =>{
        // console.log(data);
        socket.to(data.room).emit('received_message',data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the HTTP server
server.listen(4000, () => {
    console.log("server Started");
});
