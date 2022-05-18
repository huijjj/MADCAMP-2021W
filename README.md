# MADCAMP 2021W

1. Week1 project - [Present of Santa(산타의 선물)](#week1---산타의-선물present-of-santa)
2. Week2 project - [Ghost Gomoku King(고스트 오목왕)](#week2---고스트-오목왕-ghost-gomoku-king)
3. Week3 project - [DRUNKEN FRAM(꽐라 농장)](#week3---drunken-farm-꽐라-농장)
4. Week4 project - [Minchae's Cookbook(김민채의 요리보고 조리보고)](#김민채-그녀의-요리가-시작된다)
5. Side project1 - [What is Your Name](#sideproject1---2021w-몰입캠프-3분반-이름-맞추기)
6. Side project2 - [Chat APP](#sideproject2---chat-app)

# Contributors

* Week1
    * Minhee KIM(<a href="https://github.com/minizzang">minizzang</a>): minizzang@kaist.ac.kr

* Week2
    * Doyoon KIM(<a href="https://github.com/victoria0406">victoria0406</a>): victoria0406@kaist.ac.kr

* Week3
    * Giyeong KIM(<a href="https://github.com/ddungiii">ddungiii</a>): ggcc503@kaist.ac.kr
    * Seungjae LIM(<a href="https://github.com/seungjaelim">seungjaelim</a>): seungjaelim@kaist.ac.kr

* Week4
    * Minchae KIM(<a href="https://github.com/passa021">passa021</a>): passa021@korea.ac.kr
    * Junseo KANG(<a href="https://github.com/junseooo">junseooo</a>): pointjunseo@dgist.ac.kr

* Side project1
    * Sihyeong PARK(<a href="https://github.com/sihyeong671">sihyeong671</a>): bshlab671@pusan.ac.kr

* Special help
    * Seolyeong BAE(<a href="https://github.com/pell13">pell13</a>): peixueying@gmail.com - (week3 character design)
    * Junyeong CHOI(<a href="https://github.com/DDoubleA">DDoubleA</a>): ace9804@unist.ac.kr - (week4 VM donor)
    * Mingyeol KIM(<a href="https://github.com/KimMingyeol">KimMingyeol</a>): kmg1902@postech.ac.kr - (roommate at SARANG131)

# Project deatails

## Week1 - 산타의 선물(Present of Santa)

We made an single activity application with 3 tabs with Kotlin and android studio for the first week common project.
3 tabs are like below.

첫 주 과제로 android studio와 Kotlin을 사용하여 3개의 탭으로 구성된 응용프로그램을 제작하였습니다.
각 탭의 구성은 아래와 같습니다.

- Contacts (연락처)
- Gallery (갤러리)
- Advent calendar (이벤트 달력)



<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147923580-bf94fa43-a64d-4c2d-a444-f7f30b380d88.gif" />
</p>

### Tab 1. Contacts (연락처)
***
To meet the projects requirements, our first tab is contacts. This tab is implemented with fragment and recycler view for efficient screen rendering.
Contacts shown are read from assets/contacts.json using asset manager and inserted in to list by recycler view's adapter.
At the top of the contact list, information of user is shown. User information can be edited by clicking the edit icon at the right top.
Changes in user data is stored in application's data file, so that the changes can remain after application resart.
Please refer to src/main/java/ui/contact and src/main/res/layout/fragment_contact.xml, contact_list_item.xml, contact_user_item.xml for detailed information.

프로젝트의 요구 사항에 맞춰, 첫 번째 탭으로 연락처를 구현하였습니다. 효율적인 화면 구성을 위해 fragment와 recycler view를 사용하였습니다. 
보여지는 연락처는 assets/contacts.json에 저장되어 있으며 asset manager를 사용해 읽어와 adapter를 통해 리스트에 삽입됩니다.
연락처 리스트의 최상단에는 사용자의 정보가 있으며, 우상단의 수정 아이콘을 클릭하여 사용자 정보를 수정할 수 있습니다.
수정된 사용자 정보는 앱의 data file에 저장되어, 앱 재시작시에도 반영됩니다.
자세한 정보는 src/main/java/ui/contact와 src/main/res/layout/fragment_contact.xml, contact_list_item.xml, contact_user_item.xml를 참고 바랍니다.


<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147923726-425695e4-06a3-473b-9142-a108f252904e.gif" />
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147923890-ac9e4d1a-91c5-4bff-9034-1aa6f21afff3.gif" />
</p>

### Tab 2. Gallery (갤러리)
***
Our second tabs is gallery, this tab show photos in src/main/drawable. Like contacts tab, this tab uses fragment and recycler view. 
For efficient loading and orienting of image file we used Glide library when creating list item in adapter. 
You can click the individual photos to get a closer look in the detail page.
At the detail page, you can zoom & scroll over chosen image and date information is shown below.
We seperated images metadata(file name, date information) in seperated json file(photos.json) for extensibility and easy resource management.
And image itself is included in the app file as resource file.
Please refer to src/main/java/ui/gallery and src/main/res/layout/fragment_gallery.xml, contact_gallery_list_item.xml for implementation details.

두 번째 탭은 갤러리를 구현하였습니다. 연락처와 마찬가지로 fragment와 recycler view를 사용했으며 추가로, 빠른 이미지 로딩을 위해 adapter에서 Glide 라이브러리를 사용하였습니다. 갤러러에서 각 사진을 클릭할 경우, 선택된 사진의 디테일 페이지로 전환되며 디테일 페이지에서는 확대 및 축소가 가능합니다.
디테일 페이지의 하단에는 사진이 찍힌 날짜가 출력됩니다. 이미지 추가의 확장성과 관리의 편의성을 위해 파일명을 비롯한 사진의 metadata를 별개의 json 파일로 저장하며, 사진 파일 자체는 앱의 리소스로 포함되어 있습니다.
추가적인 정보는 src/main/java/ui/gallery와 src/main/res/layout/fragment_gallery.xml, contact_gallery_list_item.xml를 참고 바랍니다.

<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918115-c98415bd-decd-4b9c-bcac-82f37e04c55b.gif" />
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918348-2e78581e-ddfc-4be6-b43c-3db599517be0.gif" />
</p>

### Tab 3. Advent calendar(이벤트 달력)
***
Last but not least, out final third tab is advent calendar!
An Advent calendar is a special calendar used to count the days of Advent in anticipation of Christmas.
You can open up the ornaments one at a time, one for each day to recieve small but pleasing presents.
You can also enjoy the joyful carol and feel the vibe of christmas.
Checkout the codes at src/main/java/ui/calendar and src/main/res/layout/fragment_calendar.xml to see how this is done.
Every ornament images used are carefully hand-drawn by **Minhee Kim** a.k.a. **minizzang**.
You can get a pleasant gift if you open the presents in right order.
```
You better watch out!
You better not cry!
You better not pout!
I'm telling you why,
Santa Claus is coming to town
He's making a list!
He's checking it twice!
He's gonna find out who's naughty or nice
Santa Claus is coming to town
```

마지막 자유 주제 탭은 재림절 달력을 만들어보았습니다. 재림절 달력은 크리스마스를 기다리며 하루에 하나씩 작은 선물을 열어볼 수 있는 달력입니다.
또한, 이 탭에서는 즐거운 캐럴을 들으며 연말 분위기에 흠뻑 취할 수 있습니다. 
자세한 구현은 src/main/java/ui/calendar와 src/main/res/layout/fragment_calendar.xml의 코드를 참고해주시길 바랍니다.
사용된 모든 장식품 이미지는 **김민희(minizzang)** 께서 손수 그리신 이미지입니다.
나쁜 아이는 선물을 받을 수 없어용~
```
울면 안 돼!
울면 안 돼!
산타할아버지는 우는 아이에겐
선물을 안 주신대
산타할아버지는 알고 계신대
누가 착한 앤지 나쁜 앤지
오늘밤에 다녀가신대
잠 잘 때나 일어날 때
짜증날 때 장난할 때도
산타할아버지는
모든 것을 알고 계신대
```

<p align="center">
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918646-ff2b80be-012d-47e2-b896-f93a1d6e0557.gif" />
  <img width="20%" src="https://user-images.githubusercontent.com/64083281/147918804-d5541c9d-3351-426f-9702-98702958f285.gif" />
</p>

### Credit
+ Minhee Kim(minizzang): minizzang@kaist.ac.kr
+ Huijong Jeong(huijjj): hui0213@postech.ac.kr

****** 

## Week2 - 고스트 오목왕 (Ghost Gomoku King)
몰입캠프 2주차 과제로 실시간 오목 게임을 만들었습니다.
안드로이드 스튜디오와 코틀린을 사용하여 사용자 응용프로그램을 만들었으며, Node.js와 express를 사용하여 서버를 구축하였습니다.
추가적으로, 실시간 통신과 데이터 저장을 위해 socket.io와 MySQL을 사용하였으며, 사용자 로그인을 위해 카카오 SDK를 사용하였습니다.


We made real time five-in-a-row(gomoku) game for mad camp week 2 project.
We used android studio and Kotlin for making client application, and Node.js and express for server.
MySQL and socket.io are additionally used for real time communication and storing data.
Kakao SDK is used for user log-in.

## Credit
+ 박도윤(victoria0406): victoria0406@kaist.ac.kr
+ 정희종(huijjj): hui0213@postech.ac.kr

<img width="100%" src="https://user-images.githubusercontent.com/64083281/148896176-c1755e2e-826b-482c-b417-757c537e2d97.gif" />
<p align="center"><em>지금, 치타가 달리기 시작했다.</em></p>
<p align="center"><em>At the moment, the cheetah is on it's way.</em></p>

## Front-End (android studio, Kotlin)
사용자 응용 프로그램은 크게 3개의 화면으로 구성되어 있으며 구성은 아래와 같습니다.


Client application is consisted of following 3 activities.

+ 로그인 화면 (Log-in page)
+ 로비 화면 (Lobby page)
+ 대기 화면 (Waiting page)
+ 게임 화면 (Game page)

### 로그인 화면 (Log-in page)
<p align="center">
    <img width="30%" src="https://user-images.githubusercontent.com/81007362/148932226-ee8578b1-caeb-4166-8688-7d4fb4250183.gif"/>
</p>

카카오 SDK에서 제공하는 API를 사용하여 로그인을 할 수 있는 페이지입니다.

You can log in using your kakao account. This is done by API provieded by kakao SDK.

### 로비 화면 (Lobby page)
<p align="center">
    <img width="30%" src="https://user-images.githubusercontent.com/81007362/148932234-b15b7aec-0f13-4dfd-a6ea-c156e18eda84.gif"/>
    <img width="30%" src="https://user-images.githubusercontent.com/64083281/148900089-8115122c-c1f3-4ba6-9aed-77969a907ede.gif"/>
    <img width="30%" src="https://user-images.githubusercontent.com/81007362/148931735-02dc0a8c-4ba6-402f-b343-764e97b58d33.gif"/>
</p>

로그인 이후, 현재 참여 가능한 방들과 전체 랭킹을 확인할 수 있는 화면입니다.
좌측의 사이드 탭을 열어 자신의 프로필 이미지와 이름, 그리고 승리 횟수와 패배 횟수를 확인할 수 있습니다.
상단의 텍스트 입력창에 방 이름을 입력해 방에 참석하거나, 방 목록의 방을 클릭해 게임을 시작할 수 있습니다. 방 리스트 우 상단의 새로고침 버튼을 눌러 목록을 새로고침할 수 있습니다.
아래의 랭킹에선 총 승률을 기준으로 1, 2, 3등을 확인 할 수 있습니다. 유저 정보와 랭킹 정보는 http GET 요청을 통해, 방의 목록은 socket 통신을 통해 서버로부터 받아옵니다.
사이드뷰 하단의 로그아웃 버튼을 클릭해 로그아웃 할 수 있습니다.

This page is main lobby of your application. After logging in with kakao account in log-in page, you can see joinable rooms and ranking in this page.
You can see your profile image, name, and win lose count at side view by opening the side view at the top left.
You can either enter room name at the text input and click go button or click room at the list to start the game.
You can refresh the list with the refresh button at the top right of the list.
You can see the top 3 rankers at the bottom-side of the page according to win rate.
User data and Ranking data is fetched from the server using http GET request, and room list is fetch by socket communication.
You can log out via log out button at the bottom of the side view.

### 대기 화면 (Waiting page)
<p align="center">
    <img width="30%" src="https://user-images.githubusercontent.com/64083281/148902084-99e9fdcd-4a11-44b1-a36f-ab572730d48f.gif" />
</p>

방을 생성한 이후, 상대가 들어올 때까지 대기하는 화면입니다. 유서 깊은 포켓몬 게임의 방식을 오마주하여 별도의 준비 버튼 없이 상대가 들어오고 눈이 마주치자마자 승부가 시작되므로,
대기 화면에서는 항상 긴장을 늦추지 말아야 합니다. 긴장감 조성을 돕기 위해 대기실에서는 웅장한 음악이 재생되며,
해당 음악은 전체 앱 컨셉을 따온 고스트 바둑왕의 대국 장면에 삽입된 음악입니다.

After creating a room, you have to wait in this page until the opponent joins. Following the fashion of good old Pokémon game, the match starts as soon as the opponent comes
without any additional ready logic. You should keep on your toe since you have no idea when will the opponent join. To help you to maintain your intention magnificent background music is played.
This music is from japanese animation *Hikaru's Go*.

### 게임 화면 (Game page)
<p align="center">
    <img width="30%" src="https://user-images.githubusercontent.com/64083281/148900924-dea911e4-08b4-4878-b381-5c7a264b8dd6.gif" />
    <img width="30%" src="https://user-images.githubusercontent.com/64083281/148901737-2d631c7d-234c-4db4-b1ce-52aba2944529.gif" />
</p>

실제 게임이 진행되는 화면이며, 바둑판을 클릭하여 착수할 수 있습니다. 규칙으로는 국제 표준 오목 규칙인 _*고모쿠룰*_ 을 채택하였습니다. 
더 나은 사용자 경험을 위해, 바둑판은 바둑판계의 에르메스인 *비자나무* 의 이미지를 사용했습니다.
바둑알로 대화를 나누는 수담이 가능한 바둑과 달리, 오목에서는 대화를 통한 교란 역시 전략의 한 요소로 사용될 수 있으므로 채팅 기능을 구현하였습니다.
채팅은 우 하단의 채팅버튼을 눌러 생성되는 팝업에서 진행할 수 있습니다. 착수와 채팅은 socket 통신을 통해 구현되었습니다.
채팅 기능을 통해 마법의 문장을 입력할 경우 게임에서 승리하는 이스터에그가 존재합니다.

This page is the page where the actual game is done. For our gomoku game, we used the global standard _*gomoku rule*_.
You can set your stone by clicking the desired position at the Go board. For better user experience, we used *japanese nutmeg-yew's* image.
*Japanese nutmeg-yew* is the tree used to make a high-end state of an art Go board in real world.
Since distracting opponent with deft eloquence is part of the strategy in gomoku, we implemented chatting for you to test your skills.
Setting stone and Chatting function is implemented via socket.io.
There exists a magical secret sentence that you can send via chat and win in any situation. Try it out! 

## Back-End (Node.js, express, MySQL, http, socket.io)
Node.js 환경 위에서 express로 서버를 구축하였으며 클라이언트와의 통신을 위해 http와 socket.io를 사용합니다. 유저 정보 저장을 위한 데이터베이스로는 MySQL을 사용합니다.
자세한 설명은 아래의 코드와 주석을 참고 바랍니다.

We used express to create a server running on Node.js. To communicate with the client, we used http and socket.io. And last but not least, we used MySQL to store user data.
please refer to comments and code below for detailed infromation.

전체 코드는 다음 repository에서 확인 할 수 있습니다.

Whole code is at the following repository.

https://github.com/huijjj/MADCAMP-2021W/tree/master/week2/server

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

******

## Week3 - DRUNKEN FARM (꽐라 농장)

<div>
   <p align="center">
      <img width="25%" src="https://user-images.githubusercontent.com/64083281/149874704-27812e65-86e1-4848-9b1e-249e3d6d02f0.gif" />
      <img width="25%" src="https://user-images.githubusercontent.com/64083281/149874703-40b41f5e-d272-4097-9b02-734202a5c63f.gif" />
      <img width="25%" src="https://user-images.githubusercontent.com/64083281/149874702-67829a93-29e8-4680-b195-24abe5d9f725.gif" />
   </p>
</div>
<p align="center"><em>special thanks to gifted artist, SEOLYEONG BAE(<a href="https://github.com/pell13">pell13</a>, peixueying@gmail.com)</em></p>

----

<p align="center"><em>평화로운 카이스트, 어느날 시험지가 바뀌는 사건이 발생했다.</em></p>
<p align="center"><em>류 교수님께서, 대학원 시험지를 학부생에게 주고 만 것이었다...</em></p>
<br>
<p align="center"><em>보기만 해도 정신이가 아찔해지는 난이도에 학부생들은 그만 정신을 잃고 말았다.</em></p>
<p align="center"><em>더 이상 맨 정신으로 살아갈 수 없게 되어 버린 그들은 동물이 되고 마는데...</em></p>
<br>
<p align="center"><em>그들을 무사히 창업 휴학의 유혹과 급성 알콜 중독으로부터 지켜내어 무사히 졸업을 시켜보자!</em></p>


## Credit
+ Giyeong KIM(<a href="https://github.com/ddungiii">ddungiii</a>): ggcc503@kaist.ac.kr
+ Huijong JEONG(<a href="https://github.com/huijjj">huijjj</a>): hyojadong_bulhyoja@kaist.ac.kr
+ Seungjae LIM(<a href="https://github.com/SeungjaeLim">seungjaelim</a>): seungjaelim@kaist.ac.kr

******

## 김민채, 그녀의 요리가 시작된다..!

사이트 주소 : http://192.249.18.176/ (no longer available)

<img width="100%" src="https://user-images.githubusercontent.com/64083281/150281161-e6b3f787-b1a5-4edf-b49d-9fed4cf73c18.gif" />

---
## Week4 - Minchae's Cookbook (김민채의 요리보고 조리보고)

|main|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151125184-7c7eafd0-5262-452b-a0a3-8537d341a1d9.gif" />|

- 처음 링크에 접속하였을 때 화면입니다.
  - 요리를 시작하는 사람들을 위해 자신만의 레시피를 저장할 수 있는 사이트를 구현하였습니다.
  - 로그인과 회원가입을 통해 사이트를 이용할 수 있도록 하였습니다.

|login|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151126733-d796b097-2cf6-424d-a788-3a352a8393e9.gif" />|

- `기존 회원이신가요?` 링크를 누를 경우 로그인 화면으로 넘어갑니다.
  - input 칸에 ID와 PW를 입력받아 db에 존재하는 회원일 경우 로그인이 완료되고 홈 화면으로 넘어갑니다.
  - 실수로 로그인 화면에 들어온 사람들을 위하여 `아이디가 없으신가요?` 링크를 누를 경우 회원가입 화면으로 넘어갈 수 있도록 하였습니다.

|register|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151126489-3deaf822-f7ea-4c99-bac5-7d99a77263d5.gif" />|

- `신규 회원이신가요?` 링크를 누를 경우 회원가입 화면으로 넘어갑니다.
  - 회원가입 화면에서는 ID, PW, Nickname을 받고, PW의 경우 같은 비밀번호를 한 번 더 입력받아 올바르게 입력하였는지 확인합니다.
  - Nickname의 경우 홈 화면에서 Nickname을 통해 사용자를 환영하는 문구를 볼 수 있습니다.

---
### 기능 소개

|home|
|--|
|<img src="https://user-images.githubusercontent.com/63199133/151129931-f130cd39-b518-4baf-9d7f-fcd24437e402.png" />|

- 로그인이 성공한 후의 화면입니다. url로 사용자의 ID를 받기 때문에 아이디 별로 고유의 웹사이트를 띄우게 됩니다.
  - 우측 상단에는 회원가입에서 설정한 Nickname으로 사용자를 반겨줍니다. 또한 옆의 로그아웃 버튼을 통해 다른 사용자로 로그인할 수 있습니다.
  - 수평으로 정렬된 하얀색 배경의 레시피는 즐겨찾기 기능으로 추가해놓은 레시피들입니다.
  - 수직으로 정렬된 푸른색 배경의 레시피는 사용자가 저장한 모든 레시피들입니다.

|search|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151154776-467bf5a1-474e-43f2-877e-680d3ffe9612.gif" />|

- 수직 방향으로 정렬해놓은 레시피의 상단에 있는 돋보기 모양을 누르면 검색이 가능합니다.
  - 사용자가 저장해놓은 레시피들 중 알고 싶은 요리 레시피를 확인할 수 있습니다.

|add|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151155035-91331fd2-55bc-4320-b7f4-e245551b08f6.gif" />|

- 우측 하단에 존재하는 플러팅 버튼을 통해 레시피를 추가할 수 있도록 하였습니다.
  - 레시피 등록의 경우 사진, 제목, 메모, 재료, 과정을 작성할 수 있습니다.
  - 이 모든 정보는 db에 저장되어 다음에 이 레시피를 보고 싶다면 바로 볼 수 있습니다.
  - 재료와 과정의 경우 문구 작성 후 십자 모양의 버튼을 누르면 곧바로 추가되는 모습을 확인할 수 있습니다.
  - 이들을 다시 삭제하고 싶다면 생성된 아이템을 클릭하면 곧바로 삭제가 가능합니다.

---
### 레시피 세부사항 소개
|detail|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151156448-36775408-9bd4-4c90-961b-5ceec45e6ce0.gif" />|

- add 버튼으로 추가한 레시피들을 확인할 수 있는 화면입니다.
  - 홈 화면에서 볼 수 있는 레시피들을 클릭할 경우 detail 화면으로 넘어와 저장해놓은 요리 이름, 메모, 재료, 과정을 볼 수 있습니다.
  - 요리 이름 옆에는 버전을 선택할 수 있는 `dropdown menu`가 있는데, 이를 통해 버전별 재료와 과정의 상황을 확인할 수 있습니다.
  - 우측 상단에 있는 메뉴 버튼을 누르면 여러 버튼이 나옵니다. 레시피가 여러 버전이 있는 경우 5개의 버튼이 나오고 버전이 하나인 경우에는 4개의 버튼이 나옵니다.
  - 하나의 직선만 있는 버튼을 클릭할 경우 현재 버전을 삭제합니다.
  - 여러 직선이 있는 버튼을 클릭할 경우 이 레시피 전체를 삭제합니다.

|chart|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151156331-eb0ee2ea-8315-4396-bec2-b416e578c842.gif" />|

- 꺾은 선 모양의 버튼을 클릭할 경우 버전 별로 사용된 재료의 추이를 볼 수 있는 그래프를 볼 수 있습니다.

|add version|
|--|
|<img src="https://user-images.githubusercontent.com/96764875/151155884-a1fa4c9e-ecd1-4b30-b1bd-86cdf34941e6.gif" />|


- 펜 모양의 버튼을 클릭할 경우 이 레시피의 다음 버전을 추가할 수 있습니다.

---
### Credit

+ 강준서(<a href="https://github.com/junseooo">junseooo</a>): pointjunseo@dgist.ac.kr
+ 김민채(<a href="https://github.com/passa021">passa021</a>): passa021@korea.ac.kr
+ 정희종(<a href="https://github.com/huijjj/">huijjj</a>): hui0213@postech.ac.kr

******

## sideproject1 - 2021W 몰입캠프 3분반 이름 맞추기

<a href="https://huijjj.github.io/what-is-your-name/">3분반 친구들의 이름을 외워 보아요</a>

******

## sideproject2 - chat-app
Simple chatting app using node and socket.io

Change the IP at /client/src/App.js line 10 to your IP before running the codes.

### Simple setup

#### Client
```
cd ./client
npm start
```

#### Server
```
cd ./server
node app.js
```
