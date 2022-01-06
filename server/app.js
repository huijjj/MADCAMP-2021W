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

    socket.on('message', ({ name, msg }) => {
        console.log(name, msg);
        io.emit('message', ({ name, msg }));
    });
    
    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(443, () => {
    console.log('connected at 443');
})