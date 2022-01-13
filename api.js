const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

function CreateRandomID()
{
  let dateKey = new Date();
  let jobKey = '';
  var randKey = Math.floor(Math.random()*10);
  let month = dateKey.getMonth() % 10;
  let day = dateKey.getDate() + 10;
  let hours = dateKey.getHours() + 10;
  let minutes = dateKey.getMinutes() + 10;
  let seconds = dateKey.getSeconds() + 10;
  jobKey = jobKey + randKey + month + day + hours + minutes + seconds;
  console.log('jobKey: ' + jobKey);
  return jobKey;
}

app.set('port', process.env.PORT || 443);

/*root*/
app.get('/', (req, res) => {
  res.json({status : "root"});
});

/*get every user information*/
app.get('/api/user/all', (req, res) => {
  let sqlUserAll = 'SELECT * from User';
    connection.query(sqlUserAll, (error, results) => {
    if (error) throw error;
    console.log('/api/user/all');
    res.json(results);
  });
});

/*get user info*/
app.get('/api/user/show/:id', (req, res) => {
  let {id} = req.params;
  let sqlUserId = 'SELECT * from User where id = ?';
  let paramUserId = [id];
  connection.query(sqlUserId, paramUserId, (error, results) => {
    if (error) throw error;
    console.log('/api/user/show/'+id);
    res.json(results);
  });
});

/*check ID valid*/
app.get('/api/user/idvalid/:id', (req, res) => {
  let {id} = req.params;
  let sqlUserIdExist = 'select EXISTS(select * from User where id='+id+' limit 1) as success';
  connection.query(sqlUserIdExist, (error, results) =>{
    if (error) throw error;
    if(!parseInt(existSTR[12]))
    {
      console.log('/api/user/idvalid/'+id+'-> valid');
      res.json({status : "invalid"});
    }
    else
    {
      console.log('/api/user/idvalid/'+id+'-> invalid');
      res.json({status : "invalid"});
    }
  })
});

/*register*/
app.post('/api/user/register', (req, res) => {
  const id = req.body.id;
  const nick = req.body.nick;
  const pwd = req.body.pwd;
  let sqlUserIdExist = 'select EXISTS(select * from User where id='+id+' limit 1) as success';
  connection.query(sqlUserIdExist, (error, results) =>{
    if (error) throw error;
    if(!parseInt(existSTR[12]))
    {
      let sqlRegister = 'INSERT INTO User (id,nick,tier,graduateCount,pwd) VALUES (?,?,?,?,?);';
      let paramRegister = [id, nick, '학사', 0, pwd];
      connection.query(sqlRegister, paramRegister, (error, insRes) => {
        if (error) throw error;
        connection.query('select * from User where id='+id,(error, results) => {
          if (error) throw error;
          console.log('/api/user/register/');
          res.json(results);
        });
      });
    }
    else
    {
      console.log('/api/user/register/'+id+'/'+nick+'/'+pwd+'-> err-dupId');
      res.json({status : "invalid"});
    }
  })
});

/*login*/
app.get('/api/user/login/:id/:pwd', (req, res) => {
  res.send('Root');
});

/*get every animal info which owner has*/
app.get('/api/animal/owner/:ownerId', (req, res) => {
  res.send('Root');
});

/*get single animal info*/
app.get('/api/animal/info/:id', (req, res) => {
  res.send('Root');
});

/*get animal info which abandoned*/
app.get('/api/animal/abandoned', (req, res) => {
  res.send('Root');
});

/*buy from animal market*/
app.get('/api/animal/buy/:id', (req, res) => {
  res.send('Root');
});

/*adopt from animal market*/
app.get('/api/animal/adopt/:id', (req, res) => {
  res.send('Root');
});

/*adandon animal*/
app.get('/api/animal/abandon/:id', (req, res) => {
  res.send('Root');
});

/*change status*/
app.get('/api/animal/change/:id/:geee/:duck/:chae/:adventureCount/:itemCount', (req, res) => {
  res.send('Root');
});

/*die animal*/
app.get('/api/animal/kill/:id', (req, res) => {
  res.send('Root');
});

/*graduate animal*/
app.get('/api/animal/graduate/:id', (req, res) => {
  res.send('Root');
});

/*get single item info*/
app.get('/api/item/info/:id', (req, res) => {
  res.send('Root');
});

/*get every item owner has*/
app.get('/api/item/owner/:ownerId', (req, res) => {
  res.send('Root');
});

/*use item*/
app.get('/api/item/use/:animalId/:itemId', (req, res) => {
  res.send('Root');
});


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
