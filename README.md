# 고스트 오목왕 (Ghost Gomoku King)
몰입캠프 2주차 과제로 실시간 오목 게임을 만들었습니다.
안드로이드 스튜디오와 코틀린을 사용하여 사용자 응용프로그램을 만들었으며, Node.js와 express를 사용하여 서버를 구축하였습니다.
추가적으로, 실시간 통신과 데이터 저장을 위해 socket.io와 MySQL을 사용하였으며, 사용자 로그인을 위해 카카오 SDK를 사용하였습니다.

We made real time five-in-a-row(gomoku) game for mad camp week 2 project.
We used android studio and Kotlin for making client application, and Node.js and express for server.
MySQL and socket.io are additionally used for real time communication and storing data.
Kakao SDK is used for user log-in.


# Front-End (android studio, Kotlin)
사용자 응용 프로그램은 크게 3개의 화면으로 구성되어 있으며 구성은 아래와 같습니다.

Client application is consisted of following 3 activities.

+ 로그인 화면 (Log-in page)
+ 로비 화면 (Lobby page)
+ 대기 화면 (Waiting page)
+ 게임 화면 (Game page)

## 로그인 화면 (Log-in page)
카카오 SDK에서 제공하는 API를 사용하여 로그인을 할 수 있는 페이지입니다.

You can log in using your kakao account. This is done by API provieded by kakao SDK.

## 로비 화면 (Lobby page)
로그인 이후, 현재 참여 가능한 방들과 전체 랭킹을 확인할 수 있는 화면입니다.
좌측의 사이드 탭을 열어 자신의 프로필 이미지와 이름, 그리고 승리 횟수와 패배 횟수를 확인할 수 있습니다.
상단의 텍스트 입력창에 방 이름을 입력해 방에 참석하거나, 방 목록의 방을 클릭해 게임을 시작할 수 있습니다. 방 리스트 우 상단의 새로고침 버튼을 눌러 목록을 새로고침할 수 있습니다.
아래의 랭킹에선 총 승률을 기준으로 1, 2, 3등을 확인 할 수 있습니다. 유저 정보와 랭킹 정보는 http GET 요청을 통해, 방의 목록은 socket 통신을 통해 서버로부터 받아옵니다.

This page is main lobby of your application. After logging in with kakao account in log-in page, you can see joinable rooms and ranking in this page.
You can see your profile image, name, and win lose count at side view by opening the side view at the top left.
You can either enter room name at the text input and click go button or click room at the list to start the game.
You can refresh the list with the refresh button at the top right of the list.
You can see the top 3 rankers at the bottom-side of the page according to win rate.
User data and Ranking data is fetched from the server using http GET request, and room list is fetch by socket communication.

## 대기 화면 (Waiting page)
방을 생성한 이후, 상대가 들어올 때까지 대기하는 화면입니다. 유서 깊은 포켓몬 게임의 방식을 오마주하여 별도의 준비 버튼 없이 상대가 들어오고 눈이 마주치자마자 승부가 시작되므로,
대기 화면에서는 항상 긴장을 늦추지 말아야 합니다. 긴장감 조성을 돕기 위해 대기실에서는 웅장한 음악이 재생되며,
해당 음악은 전체 앱 컨셉을 따온 고스트 바둑왕의 대국 장면에 삽입된 음악입니다.

After creating a room, you have to wait in this page until the opponent joins. Following the fashion of good old Pokémon game, the match starts as soon as the opponent comes
without any additional ready logic. You should keep on your toe since you have no idea when will the opponent join. To help you to maintain your intention magnificent background music is played.
This music is from japanese animation *Hikaru's Go*.

## 게임 화면 (Game page)
실제 게임이 진행되는 화면이며, 바둑판을 클릭하여 착수할 수 있습니다. 규칙으로는 국제 표준 오목 규칙인 _*고모쿠룰*_ 을 채택하였습니다. 
더 나은 사용자 경험을 위해, 바둑판은 바둑판계의 에르메스인 *비자나무* 의 이미지를 사용했습니다.
바둑알로 대화를 나누는 수담이 가능한 바둑과 달리, 오목에서는 대화를 통한 교란 역시 전략의 한 요소로 사용될 수 있으므로 채팅 기능을 구현하였습니다.
채팅은 우 하단의 채팅버튼을 눌러 생성되는 팝업에서 진행할 수 있습니다. 착수와 채팅은 socket 통신을 통해 구현되었습니다.

This page is the page where the actual game is done. For our gomoku game, we used the global standard _*gomoku rule*_.
You can set your stone by clicking the desired position at the Go board. For better user experience, we used *japanese nutmeg-yew's* image.
*Japanese nutmeg-yew* is the tree used to make a high-end state of an art Go board in real world.
Since distracting opponent with deft eloquence is part of the strategy in gomoku, we implemented chatting for you to test your skills.
Setting stone and Chatting function is implemented via socket.io.

# Back-End (Node.js, express, MySQL, http, socket.io)
Node.js 환경 위에서 express로 서버를 구축하였으며 클라이언트와의 통신을 위해 http와 socket.io를 사용합니다. 유저 정보 저장을 위한 데이터베이스로는 MySQL을 사용합니다.
자세한 설명은 아래의 코드와 주석을 참고 바랍니다.

We used express to create a server running on Node.js. To communicate with the client, we used http and socket.io. And last but not least, we used MySQL to store user data.
please refer to comments and code below for detailed infromation.

전체 코드는 다음 repository에서 확인 할 수 있습니다.

Whole code is at the following repository.

https://github.com/huijjj/madcamp_week2_back

```
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 443;
let roomSet = new Map(); // data structure for managing on going rooms

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
});
        
// get user data with kakao id
// if user does not exists return empty array
// else return user data
app.get('/users/:kid', (req, res) => {
    const sql = `SELECT * FROM users WHERE id='${req.params.kid}'`;
    con.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        res.json({ user : result }); // sends empty list if user is not a member [] [{id: 1, name: "정희종", ... }]
    });
});

// get best 3 users according to win rate
app.get('/rank', (_, res) => {
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
        res.json({ rank : rank });
    });
});

// for adding new user in DB
app.post('/users', (req, res) => {
    const kid = Number(req.body.kid);
    const name = String(req.body.name);
    const sql = "INSERT INTO users(id, name, win, lose) VALUES(?, ?, ?, ?)";
    con.query(sql, [ kid, name, 0, 0 ], function(err, result) {
        if(err) {
            throw err;
        }
        res.send(result);
    });
});

io.on('connection', (socket) => {

    // handling join event
    socket.on('join', (room, name, kid) => {
        if(roomSet.has(room)) { // if this room already exist
            if(roomSet.get(room).length == 1) { // able to join
                roomSet.set(room, [ roomSet.get(room)[0], { id: socket.id, name: name, kid: kid } ]); // update room data structure
                socket.join(room); // join socket to given room
                io.to(roomSet.get(room)[0].id).emit('start', "black", roomSet.get(room)[1].name);
                io.to(roomSet.get(room)[1].id).emit('start', "white", roomSet.get(room)[0].name);
            }
            else { // room already occupied
                io.to(socket.id).emit('invalid room name'); // send error message to client, client should handle this error event
            }
        }
        else {  // room does not exist
            // create and join
            socket.join(room);
            roomSet.set(room, [{ id: socket.id, name: name, kid: kid }]);
        }
    });
    
    // handling rejoin event
    socket.on('rejoin', (room) => {
        // client re-joins the room after activity change for 
        socket.join(room);
    });

    // handling leave event
    socket.on('leave', (room) => {
        socket.leave(room); // leave room
        if(roomSet.has(room)) {
            if(roomSet.get(room).length == 1) {
                roomSet.delete(room); // update room data structure
            }
        }
    });
  
    // handling set go event
    socket.on('set go', (room, color, X, Y) => {
        io.to(room).emit('set go', color, X, Y);
    });

    // handling game end event
    socket.on('game end',(room, winner)=>{
        io.to(room).emit('game result', winner); // send game results to client
        roomSet.delete(room); // update room data structure
    });

    // handling win event
    socket.on('win', (kid) => {
        // get use data
        const get_sql = `SELECT * FROM users WHERE id='${kid}'`;
        con.query(get_sql, function(err, result) {
            if (err) { // can't get user data from db
                throw err;
            }
            if(result.length == 1) { // if fetching user data from db is successful
                // update db
                const win = Number(result[0].win) + 1;
                const patch_sql = `UPDATE users SET win=${win} WHERE id='${kid}'`;
                con.query(patch_sql, function(err, _) {
                    if(err) {
                        throw err;
                    }
                });
            }
        });
    });

    // handling lose event
    socket.on('lose', (kid) => {
        // get user data
        const get_sql = `SELECT * FROM users WHERE id='${kid}'`;
        con.query(get_sql, function(err, result) { // can't get user data from db
            if (err) { // can't get user data from db
                throw err;
            }
            if(result.length == 1) { // if fetching user data from db is successful
                // update db
                const lose = Number(result[0].lose) + 1;
                const patch_sql = `UPDATE users SET lose=${lose} WHERE id='${kid}'`;
                con.query(patch_sql, function(err, _) {
                    if(err) {
                        throw err;
                    }
                });
            }
        });
    });

    // handling room event
    socket.on('rooms', () => {
        const ret = []
        const nameRet = []
        roomSet.forEach((v, k, _) => { // find joinable rooms
            if(v.length === 1) {
                ret.push(k);
                nameRet.push(v[0].name);
            }
        });
        io.to(socket.id).emit('rooms', ret, nameRet);
    });

    // handling msg event
    socket.on('msg', (room, name, msg) => {
        console.log("(msg)", room, name, msg);
        io.to(room).emit(name, msg);
    });

    // handling disconnect event
    socket.on('disconnect', async () => {
        console.log(socket.id, "(disconnect)");
    });
});

http.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
```

# Credit
+ 박도윤(victoria0406): victoria0406@kaist.ac.kr
+ 정희종(huijjj): hui0213@postech.ac.kr
