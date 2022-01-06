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
    console.log("connection established, id: ", socket.id);

    socket.on('join', (room) => {
        console.log(socket.id, "(join)", room);
        socket.join(room);
    });
    
    socket.on('leave', (room) => {
        console.log(socket.id, "(leave)", room);
        socket.leave(room);
    });

    socket.on('message', ({ room, name, msg }) => {
        console.log(socket.id, "(message)", room, name, msg);
        io.to(room).emit('message', ({ name, msg }));
    });
    
    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});

http.listen(443, () => {
    console.log('connected at 443');
})