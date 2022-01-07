const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let waiting = new Array();

io.on('connection', (socket) => {
    console.log('(connection) ', socket.id);
    
    socket.on('join', (room) => {
        console.log("(join)", socket.id, "cur waiting: ", waiting.length ? "true" : "false");
        socket.join("test");
        waiting.push(socket.id);

        if(waiting.length == 2) {
            io.to(waiting[0]).emit('start', "white");
            io.to(waiting[1]).emit('start', "black");
            waiting = [];
        }
    });

    socket.on('set go', ({ color, X, Y }) => {
        // sending message to clients in the room
        console.log("(set go)", color, X, Y);
        io.emit('set go', ({ color, X, Y }));
    });

    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});


http.listen(443, () => {
    console.log('listening to port 443');
});