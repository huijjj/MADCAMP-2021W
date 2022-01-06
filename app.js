const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('request_message', (msg) => {
        io.emit('response_message', msg);
    });
    
    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(80, () => {
    console.log('connected at 80');
})