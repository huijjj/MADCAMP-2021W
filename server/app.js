const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log("connection established");

    socket.on('join', (room) => {
        socket.join(room);
    });

    socket.on('message', ({ room, name, msg }) => {
        console.log(room, name, msg);
        io.to(room).emit('message', ({ name, msg }));
    });
    
    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(443, () => {
    console.log('connected at 443');
})