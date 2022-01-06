const app = require('express')();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

http.listen(80, () => {
    console.log('connected at 80');
})