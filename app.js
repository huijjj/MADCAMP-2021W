const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const res = require('express/lib/response');

const PORT = 443;
let roomSet = new Map();

app.use(express.json());

// db setting
const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'express_db'
});

con.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("db connected");
    // const sql = "SELECT * FROM users";
    // con.query(sql, function(err, result) {
    //     if(err) {
    //         throw err;
    //     }
    //     else {
    //         console.log(result);
    //     }
    // });
});

// creating db (allowed only once)
// const sql = 'CREATE DATABASE express_db

// query for creating table, id | name | email | 
// const sql = 'CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, win INT DEFAULT 0, lose INT DEFAULT 0)';

// query for searching all users
// const sql = "SELECT * FROM users";

// query for inserting user
// const sql = "INSERT INTO users(name, email, win, lose) VALUES(?, ?, ?, ?)";
        
// for checking if user with given email already exists in DB
app.get('/user/:email', (req, res) => {
    console.log(`GET /isUser/${req.params.email}`);
    const sql = `SELECT * FROM users WHERE email='${req.params.email}'`;
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        res.send(result); // sends empty list if user is not a member [] [{id: 1, name: "정희종", ... }]
    });
});

// for adding new user in DB
app.post('/user', (req, res) => {
    const name = String(req.body.name);
    const email = String(req.body.email);
    console.log(`POST /user { ${name} ${email} }`);
    const sql = "INSERT INTO users(name, email, win, lose) VALUES(?, ?, ?, ?)";
    con.query(sql, [ name, email, 0, 0 ], function(err, result) {
        if(err) {
            throw err;
        }
        res.send(result);
    });
});

// for updating user win count
app.patch('/change/:email/win/:new', (req, res) => {
    const email = String(req.params.email);
    const new_win = Number(req.params.new);
    const sql = `UPDATE users SET win=${new_win} WHERE email='${email}'`;
    con.query(sql, function(err, result) {
        if(err) {
            throw err;
        }
        res.send(result);
    });
});

// for updating user lose count
app.patch('/change/:email/lose/:new', (req, res) => {
    const email = String(req.params.email);
    const new_lose = Number(req.params.new);
    const sql = `UPDATE users SET lose=${new_lose} WHERE email='${email}'`;
    con.query(sql, function(err, result) {
        if(err) {
            throw err;
        }
        res.send(result);
    });
});

io.on('connection', (socket) => {
    console.log('(connection) ', socket.id);
    
    socket.on('join', (room, name) => {
        console.log("(join)", room, socket.id);
        
        if(roomSet.has(room)) { // this room already exist
            if(roomSet.get(room).length == 1) { // able to join
                roomSet.set(room, [ roomSet.get(room)[0], { id: socket.id, name: name} ]);
                socket.join(room);
                io.to(roomSet.get(room)[0].id).emit('start', "white", roomSet.get(room)[1].name); // color, opponent name
                io.to(roomSet.get(room)[1].id).emit('start', "black", roomSet.get(room)[0].name);
            }
            else { // room already occupied
                // send error msg
                io.to(socket.id).emit('invalid room name'); // client should handle this error event
            }
        }
        else {  // room does not exist
            // create and join
            socket.join(room);
            roomSet.set(room, [{ id: socket.id, name: name }]);
        }
    });

    socket.on('rejoin', (room) => {
        // client re-joins the room after activity change
        socket.join(room);
    });

    socket.on('set go', (room, color, X, Y) => {
        console.log("(set go)", room, color, X, Y);
        io.to(room).emit('set go', color, X, Y);
    });

    socket.on('game end',(room, winner)=>{
        console.log("(game end)", room, winner);
        io.to(room).emit('game result', winner);
        roomSet.delete(room);
    });

    socket.on('rooms', () => {
        console.log("(rooms)", socket.id);
        const ret = []
        roomSet.forEach((v, k, _) => {
            if(v.size === 1) {
                ret.push(k);
            }
        })
        io.to(socket.id).emit('rooms', ret);
    });

    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});

http.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});