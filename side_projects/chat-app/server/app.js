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
        const rooms = io.sockets.adapter.rooms;
        if(rooms[room]?.has(socket.id)) {
            console.log(socket.id, " already joined ", room);
        }
        else {
            socket.join(room);
        }
    });
    
    socket.on('leave', (room) => {
        console.log(socket.id, "(leave)", room);
        socket.leave(room);
    });

    socket.on('message', ({ room, name, msg }) => {
        console.log(socket.id, "(message)", room, name, msg);
        io.to(room).emit('message', ({ name, msg }));
    });
    
    socket.on('rooms', () => {
        console.log(socket.id, "(rooms)");
        const rooms = io.sockets.adapter.rooms;
        let available = [];

        if(rooms) {
            // console.log(rooms);
            rooms.forEach((element, key) => {
                // console.log(key, element);
                if(!(element.has(key))) {
                    const participants = element.size;
                    available.push({ key, participants });
                }
            });
        }

        console.log("room list", available);
        io.to(socket.id).emit('rooms', available);
    });

    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});

http.listen(443, () => {
    console.log('connected at 443');
})