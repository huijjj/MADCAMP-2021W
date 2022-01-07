const { request } = require('http');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let roomSet = new Map();

io.on('connection', (socket) => {
    console.log('(connection) ', socket.id);
    
    socket.on('join', (room) => {
        console.log("(join)", socket.id);
        
        if(roomSet.has(room)) { // this room already exist
            if(roomSet.get(room).length == 1) { // able to join
                roomSet.set(room, [ roomSet.get(room)[0], socket.id ]);
                socket.join(room);
                io.to(roomSet.get(room)[0]).emit('start', "white");
                io.to(roomSet.get(room)[1]).emit('start', "black");
            }
            else { // room already occupied
                // send error msg
            }
        }
        else {  // room does not exist
            // create and join
            socket.join(room);
            roomSet.set(room, [ socket.id ]);
        }
    });

    socket.on('rejoin', (room) => {
        socket.join(room);
    });

    socket.on('set go', (room, color, X, Y) => {
        console.log("(set go)", room, color, X, Y);
        io.to(room).emit('set go', color, X, Y);
    });

    socket.on('game end',(room, winner)=>{
        console.log("(game end)", room, winner);
        io.to(room).emit('game result', winner);
    });

    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});


http.listen(443, () => {
    console.log('listening to port 443');
});