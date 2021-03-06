const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const PORT = 443;
const roomSet = new Map();


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
        
// for checking if user with given kakao id already exists in DB
app.get('/users/:kid', (req, res) => {
    console.log(`GET /isUser/${req.params.kid}`);
    const sql = `SELECT * FROM users WHERE id='${req.params.kid}'`;
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.json({ user : result }); // sends empty list if user is not a member [] [{id: 1, name: "정희종", ... }]
    });
});

// get best 5 winrate users
app.get('/rank', (_, res) => {
    console.log("GET /rank");
    const sql = "SELECT * FROM users";
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        const rank = result;
        rank.sort((a, b) => {
            const a_winrate = (a.win + a.lose) === 0 ? -1 : a.win / (a.win + a.lose);
            const b_winrbte = (b.win + b.lose) === 0 ? -1 : b.win / (b.win + b.lose);
            return a_winrate == b_winrbte ? (a.win == b.win ? (a.lose < b.lose ?  -1 : 1 ) : a.win > b.win ? -1 : 1) : (a_winrate > b_winrbte ? -1 : 1);
        });
        const ret = rank.slice(0, 3);
        console.log(ret);
        res.json({ rank : rank });
    });
});

// for adding new user in DB
app.post('/users', (req, res) => {
    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.query);
    const kid = Number(req.body.kid);
    const name = String(req.body.name);
    console.log(`POST /user { ${kid} ${name} }`);
    const sql = "INSERT INTO users(id, name, win, lose) VALUES(?, ?, ?, ?)";
    con.query(sql, [ kid, name, 0, 0 ], function(err, result) {
        if(err) {
            throw err;
        }
        console.log(result);
        res.send(result);
    });
});

io.on('connection', (socket) => {
    console.log('(connection) ', socket.id);
    
    socket.on('join', (room, name, kid) => {
        console.log("(join)", room, name, kid, socket.id);
        
        if(roomSet.has(room)) { // this room already exist
            if(roomSet.get(room).length == 1) { // able to join
                roomSet.set(room, [ roomSet.get(room)[0], { id: socket.id, name: name, kid: kid } ]);
                socket.join(room);
                io.to(roomSet.get(room)[0].id).emit('start', "black", roomSet.get(room)[1].name);
                io.to(roomSet.get(room)[1].id).emit('start', "white", roomSet.get(room)[0].name); // color, opponent name
            }
            else { // room already occupied
                // send error msg
                io.to(socket.id).emit('invalid room name'); // client should handle this error event
            }
        }
        else {  // room does not exist
            // create and join
            socket.join(room);
            roomSet.set(room, [{ id: socket.id, name: name, kid: kid }]);
        }
    });

    socket.on('rejoin', (room) => {
        // client re-joins the room after activity change
        socket.join(room);
    });

    socket.on('leave', (room) => {
        console.log("(leave)", room, socket.id);
        socket.leave(room);
        if(roomSet.has(room)) {
            if(roomSet.get(room).length == 1) {
                roomSet.delete(room);
            }
        }
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

    socket.on('win', (kid) => {
        // get users win data
        console.log("(win)", kid);
        const get_sql = `SELECT * FROM users WHERE id='${kid}'`;
        con.query(get_sql, function(err, result) {
            if (err) {
                throw err;
            }
            if(result.length == 1) {
                const win = Number(result[0].win) + 1;
                const patch_sql = `UPDATE users SET win=${win} WHERE id='${kid}'`;
                con.query(patch_sql, function(err, _) {
                    if(err) {
                        throw err;
                    }
                    console.log("user ", kid, " updated");
                });
            }
        });
    });

    socket.on('lose', (kid) => {
        // get users win data
        console.log("(lose)", kid);
        const get_sql = `SELECT * FROM users WHERE id='${kid}'`;
        con.query(get_sql, function(err, result) {
            if (err) {
                throw err;
            }
            if(result.length == 1) {
                const lose = Number(result[0].lose) + 1;
                const patch_sql = `UPDATE users SET lose=${lose} WHERE id='${kid}'`;
                con.query(patch_sql, function(err, _) {
                    if(err) {
                        throw err;
                    }
                    console.log("user ", kid, " updated");
                });
            }
        });
    });

    socket.on('rooms', () => {
        console.log("(rooms)", socket.id);
        const ret = []
        const nameRet = []
        roomSet.forEach((v, k, _) => {
            if(v.length === 1) {
                ret.push(k);
                nameRet.push(v[0].name);
            }
        });
        // console.log("room set", roomSet);
        // console.log("room list", ret);
        io.to(socket.id).emit('rooms', ret, nameRet);
    });

    socket.on('msg', (room, name, msg) => {
        console.log("(msg)", room, name, msg);
        io.to(room).emit('msg', name, msg);
    });

    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});

http.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});