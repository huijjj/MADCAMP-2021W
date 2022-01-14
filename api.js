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


/*----------------------DEBUG--------------------------*/
/*register*/
app.get('/debug/user/register/:id/:nick/:pwd', (req, res) => {
  let {id, nick, pwd} = req.params;  
  let sqlUserIdExist = 'select EXISTS(select * from User where id=? limit 1) as success';
  let paramUserIdExist = [id];
  connection.query(sqlUserIdExist, paramUserIdExist, (error, results) =>{
    if (error) throw error;
    var existSTR = JSON.stringify(results);
    console.log(existSTR);
    if(!parseInt(existSTR[12]))
    {
      let sqlRegister = 'INSERT INTO User (id,nick,tier,graduateCount,pwd,Money) VALUES (?,?,?,?,?,?);';
      let paramRegister = [id, nick, 0, 0, pwd, 100];
      connection.query(sqlRegister, paramRegister, (error, insRes) => {
        if (error) throw error;
        let sqlUserRegistered = 'select * from User where id=?';
        let paramUserRegistered = [id];
        connection.query(sqlUserRegistered, paramUserRegistered,(error, results) => {
          if (error) throw error;
          console.log('/api/user/register/');
          res.json(results);
        });
      });
    }
    else
    {
      console.log('/debug/user/register/'+id+'/'+nick+'/'+pwd+'-> err-dupId');
      res.json({status : "invalid"});
    }
  })
});


/*login*/
app.get('/debug/user/login/:id/:pwd', (req, res) => {
  let {id, pwd} = req.params;  
  let sqlLoginValid = 'select EXISTS(select * from User where id=? AND pwd=? limit 1) as success';
  let paramLoginValid = [id, pwd];
  connection.query(sqlLoginValid, paramLoginValid,  (error, results) =>{
    if (error) throw error;
    var existSTR = JSON.stringify(results);
    if(parseInt(existSTR[12]))
    {
      let sqlUserId = 'SELECT * from User where id = ?';
      let paramUserId = [id];
      connection.query(sqlUserId, paramUserId, (error, results) => {
        if (error) throw error;
        console.log('/api/user/login/'+id+'/'+pwd);
        res.json(results);
      });
    }
    else
    {
      console.log('/debug/user/login/'+id+'/'+pwd+'-> fail');
      res.json({status : "fail"});
    }
  })
});

/*----------------------API----------------------------*/
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

/*register*/
app.post('/api/user/register', (req, res) => {
  let sqlUserIdExist = 'select EXISTS(select * from User where id=? limit 1) as success';
  let paramUserIdExist = [id];
  connection.query(sqlUserIdExist, paramUserIdExist, (error, results) =>{
    if (error) throw error;
    var existSTR = JSON.stringify(results);
    console.log(existSTR);
    if(!parseInt(existSTR[12]))
    {
      let sqlRegister = 'INSERT INTO User (id,nick,tier,graduateCount,pwd,Money) VALUES (?,?,?,?,?,?);';
      let paramRegister = [id, nick, 0, 0, pwd, 100];
      connection.query(sqlRegister, paramRegister, (error, insRes) => {
        if (error) throw error;
        let sqlUserRegistered = 'select * from User where id=?';
        let paramUserRegistered = [id];
        connection.query(sqlUserRegistered, paramUserRegistered,(error, results) => {
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
app.post('/api/user/login', (req, res) => {
  const id = req.body.id;
  const pwd = req.body.pwd;
  let sqlLoginValid = 'select EXISTS(select * from User where id=? AND pwd=? limit 1) as success';
  let paramLoginValid = [id, pwd];
  connection.query(sqlLoginValid, paramLoginValid,  (error, results) =>{
    if (error) throw error;
    var existSTR = JSON.stringify(results);
    if(parseInt(existSTR[12]))
    {
      let sqlUserId = 'SELECT * from User where id = ?';
      let paramUserId = [id];
      connection.query(sqlUserId, paramUserId, (error, results) => {
        if (error) throw error;
        console.log('/api/user/login/'+id+'/'+pwd);
        res.json(results);
      });
    }
    else
    {
      console.log('/api/user/login/'+id+'/'+pwd+'-> fail');
      res.json({status : "fail"});
    }
  })
});

/*get every animal information*/
app.get('/api/animal/all', (req, res) => {
  let sqlUserAll = 'SELECT * from Animal';
    connection.query(sqlUserAll, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/all');
    res.json(results);
  });
});

/*get every animal info which owner has*/
app.get('/api/animal/owner/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  let sqlOwnerAnimal = 'SELECT * from Animal where owner = ?';
  let paramOwnerAnimal = [ownerId];
  connection.query(sqlOwnerAnimal, paramOwnerAnimal, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/owner/'+ownerId);
    res.json(results);
  });
});

/*get single animal info*/
app.get('/api/animal/info/:id', (req, res) => {
  let {id} = req.params;
  let sqlInfoAnimal = 'SELECT * from Animal where id = ?';
  let paramInfoAnimal = [id];
  connection.query(sqlInfoAnimal, paramInfoAnimal, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/info/'+id);
    res.json(results);
  });
});

/*buy from animal market*/
app.get('/api/animal/buy/:ownerId/:name/:sex/:type/:price', (req, res) => {
  let {ownerId, name, sex, type, price} = req.params;
  let sqlUserMoney = 'SELECT Money from User where id = ?'
  let paramUserMoney = [ownerId];
  connection.query(sqlUserMoney, paramUserMoney, (err, result, fields) => {
    if (err) throw err;
    let userMoney = result[0].Money;
    let id = CreateRandomID();
    if(userMoney >= Number(price))
    {
      let sqlAnimalCreate = 'INSERT INTO Animal (id, name, type, sex, owner, adventureCount, itemCount, geee, duck, chae, isAbandoned, X, Y) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)';
      let paramAnimalCreate = [id, name, type, sex, ownerId, 0, 0, 0, 0, 0, 0, 0, 0];
      connection.query(sqlAnimalCreate, paramAnimalCreate, (err, result, fields) => {
        if (err) throw err;
        let sqlMoneyDecr = 'UPDATE User set Money = Money - ? where id = ?';
        let paramMoneyDecr = [Number(price), ownerId];
        console.log(paramMoneyDecr);
        connection.query(sqlMoneyDecr, paramMoneyDecr, (err, result, fields) => {
          if (err) throw err;
          let sqlInfoAnimal = 'SELECT * from Animal where id = ?';
          let paramInfoAnimal = [id];
          connection.query(sqlInfoAnimal, paramInfoAnimal, (error, results) => {
            if (error) throw error;
            console.log('/api/animal/buy/+'+ownerId+'/'+name+'/'+sex+'/'+type+'/'+price);
            res.json(results);
          });
        });
      });
    }
    else
    {
      console.log('/api/animal/buy/+'+ownerId+'/'+name+'/'+sex+'/'+type+'/'+price+'-> money lick');
      res.json({status : "fail"});  
    }
  });
});

/*adandon animal*/
app.get('/api/animal/abandon/:id', (req, res) => {
  let {id} = req.params;
  let sqlAbandonAnimal = 'Update Animal SET owner = \'SHOP\', isAbandoned = 1 where id = ?';
  let paramAbandonAnimal = [id];
  connection.query(sqlAbandonAnimal, paramAbandonAnimal, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/abandon/' + id);
    res.json({status : "Success"});
  });
});

/*get animal info which abandoned*/
app.get('/api/animal/abandoned', (req, res) => {
  res.send('Root');
});

/*adopt from animal market*/
app.get('/api/animal/adopt/:id', (req, res) => {
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
