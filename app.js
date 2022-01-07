const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('(connection) ', socket.id);

    socket.on('rooms', () => {
        // sends available(joinable) room list
        console.log("(rooms)", socket.id);
        const allRoom = io.sockets.adapter.rooms;
        const availableRoom = [];
        if(allRoom) {
            allRoom.forEach((element, key) => {
                if(!(element.has(key)) && element.size === 1) {
                    availableRoom.push(key);
                }
            });
        }

        io.to(socket.id).emit(availableRoom);
    });

    socket.on('join', (room) => {
        console.log("(join)", socket.id, room);
        socket.join(room);
        const _room = io.sockets.adapter.rooms[room];
        const players = Array.from(_room ? _room : []);
        io.to(socket.id).emit('participant count', _room ? 2 : 1);
        if(_room?.size === 2) {
            if(players[0] == socket.id) {
                io.to(players[1]).emit('opponent join');
            }
            else {
                io.to(players[0]).emit('opponent join');
            }
        }
    });

    socket.on('ready', (room) => {
        // client sends game ready
        console.log("(ready)", socket.id);
        const _room = io.sockets.adapter.rooms[room];
        if(_room && _room.size === 2) { // check if room exists and game is ready to go
           io.to(room).emit('ready'); 
        }
    });

    socket.on('start', (room) => {
        // client requests game start
        // sets clients color
        console.log("(start)", start);
        const _room = io.sockets.adapter.rooms[room];
        if(_room && _room.size === 2) { // check if room exists and game is ready to go
            const players = Array.from(_room);
            players.sort();
            io.to(players[0]).emit('color', "white");
            io.to(players[1]).emit('color', "black");
        }
    });

    socket.on('set go', ({ room, color, X, Y }) => {
        // sending message to clients in the room
        console.log("(set go)", room, color, X, Y);
        io.to(room).emit('set go', ({ color, X, Y }));
    });

    socket.on('game end', (winner) => {
        io.to(room).emit('game result', winner);
    });

    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});


http.listen(443, () => {
    console.log('listening to port 443');
});