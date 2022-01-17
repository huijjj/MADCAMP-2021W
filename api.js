const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const cors       = require('cors');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

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
  let milliSecond = (dateKey.getMilliseconds() % 800) + 100;
  jobKey = jobKey + randKey + month + day + hours + minutes + seconds + milliSecond;
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

/*give money to user*/
app.put('/api/user/money/:id', (req, res) => {
  let {id} = req.params;
  let money = req.body.money;
  let sqlMoneySet = 'UPDATE User set Money = ? where id = ?';
  let paramMoneySet = [money,id];
  connection.query(sqlMoneySet, paramMoneySet, (error, results) => {
    if (error) throw error;
    console.log('/api/user/money/'+id+'/'+money);
    res.json({status : "Success"});
  });
});


/*register*/
app.post('/api/user/register', (req, res) => {
  const id = req.body.id;
  const nick = req.body.nick;
  const pwd = req.body.pwd;
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
  let sqlAnimalAll = 'SELECT * from Animal';
    connection.query(sqlAnimalAll, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/all');
    res.json(results);
  });
});

/*get every animal info which owner has*/
app.get('/api/animal/owner/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  let sqlOwnerAnimal = 'SELECT * from Animal where owner = ? and isAbandoned = 0';
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

/*update animal x, y*/
app.put('/api/animal/move', (req, res) => {
  const { id, X, Y } = req.body;
  const sql = `UPDATE Animal SET X=${Number(X)}, Y=${Number(Y)} WHERE id=${id}`;
  connection.query(sql, (err, result) => {
    if(err) {
      throw err;
    }
    console.log('/api/animal/move/'+id+'/'+X+'/'+Y);
    res.json(result);
  });
});

/*buy from animal market*/
app.post('/api/animal/buy/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  const name = req.body.name;
  const sex = req.body.sex;
  const type = req.body.type;
  const price = req.body.price;
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
app.put('/api/animal/abandon', (req, res) => {
  const id = req.body.id;
  let sqlAbandonAnimal = 'Update Animal SET isAbandoned = 1 where id = ?';
  let paramAbandonAnimal = [id];
  connection.query(sqlAbandonAnimal, paramAbandonAnimal, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/abandon/' + id);
    res.json({status : "Success"});
  });
});

/*get animal info which abandoned*/
app.get('/api/animal/abandoned', (req, res) => {
  let sqlShowAbandoned = 'SELECT * from Animal where isAbandoned = 1';
  connection.query(sqlShowAbandoned, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/abandoned');
    res.json(results);
  });
});

/*adopt from animal market*/
app.put('/api/animal/adopt/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  const id = req.body.id;
  let sqlAdoptAnimal = 'Update Animal SET owner = ?, isAbandoned = 0 where id = ? and isAbandoned = 1';
  let paramAdoptAnimal = [ownerId,id];
  connection.query(sqlAdoptAnimal, paramAdoptAnimal, (error, results) => {
    if (error) throw error;
    let sqlInfoAnimal = 'SELECT * from Animal where id = ?';
    let paramInfoAnimal = [id];
    connection.query(sqlInfoAnimal, paramInfoAnimal, (error, results) => {
      if (error) throw error;
      console.log('/api/animal/adopt/'+id+'/'+ownerId);
      res.json(results);
    });
  });
});

/*change status*/
app.put('/api/animal/change/:id', (req, res) => {
  let {id} = req.params;
  const geee = req.body.geee;
  const duck = req.body.duck;
  const chae = req.body.chae;
  const adventureCount = req.body.adventureCount;
  const itemCount = req.body.itemCount;
  let sqlChangeAnimal = 'UPDATE Animal set geee = geee + ?, duck = duck + ?, chae = chae + ?, adventureCount = adventureCount + ?, itemCount = itemCount + ? where id = ?';
  let paramChangeAnimal = [Number(geee), Number(duck), Number(chae), Number(adventureCount), Number(itemCount), id];
  connection.query(sqlChangeAnimal, paramChangeAnimal, (err, result, fields) => {
    if (err) throw err;
    let sqlGeeeUpperBound = 'UPDATE Animal set geee = 300 where geee > 300';
    let sqlDuckUpperBound = 'UPDATE Animal set duck = 300 where duck > 300';
    let sqlChaeUpperBound = 'UPDATE Animal set chae = 300 where chae > 300';
    connection.query(sqlGeeeUpperBound, (err, result, fields) =>
    {
      if (err) throw err;
      connection.query(sqlDuckUpperBound, (err, result, fields) =>{
        if (err) throw err;
        connection.query(sqlChaeUpperBound, (err, result, fields) =>{
          if (err) throw err;
          let sqlInfoAnimal = 'SELECT * from Animal where id = ?';
          let paramInfoAnimal = [id];
          connection.query(sqlInfoAnimal, paramInfoAnimal, (error, results) => {
            if (error) throw error;
            console.log('/api/animal/change/' + id + '/' + geee +'/' + duck + '/'+chae+'/'+adventureCount+'/' +itemCount);
            res.json(results);
          });
        });
      });
    });
  });
});

/*die animal*/
app.delete('/api/animal/kill', (req, res) => {
  const id = req.body.id;
  let sqlAnimalKill = 'DELETE FROM Animal where id=?'
  let paramAnimalKill = [id];
  connection.query(sqlAnimalKill, paramAnimalKill, (error, results) => {
    if (error) throw error;
    let delCnt = results.affectedRows;
    if(delCnt == 0)
    {
      console.log('/api/animal/kill/'+id+'-> Fail');
      res.json({status : "Fail"});
    }
    else
    {
      console.log('/api/animal/kill/'+id);
      res.json({status : "Success"});
    }
  });
});

/*graduate animal*/
app.delete('/api/animal/graduate/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  const id = req.body.id;
  const reward = req.body.reward;
  let sqlAnimalGraduate = 'DELETE FROM Animal where id=?'
  let paramAnimalGraduate = [id];
  connection.query(sqlAnimalGraduate, paramAnimalGraduate, (error, results) => {
    if (error) throw error;
    let delCnt = results.affectedRows;
    if(delCnt == 0)
    {
      console.log('/api/animal/graduate/'+id+'/'+ownerId+'/'+reward +'-> Fail');
      res.json({status : "Fail"});
    }
    else
    {
      let sqlUserReward = 'UPDATE User set Money = Money + ?, graduateCount = graduateCount + 1, tier = graduateCount/5 where id = ?';
      let paramUserReward = [Number(reward), ownerId];
      connection.query(sqlUserReward, paramUserReward, (error, results) => {
        if (error) throw error;
        console.log('/api/animal/graduate/'+id+'/'+ownerId+'/'+reward);
        res.json({status : "Success"});
      });
    }
  });
});

/*evolve animal*/
app.put('/api/animal/evolve/:id', (req, res) => {
  let {id} = req.params;
  const type = req.body.type;
  let sqlEvolve = 'UPDATE Animal set type = ? where id = ?';
  let paramEvolve = [type, id];
  connection.query(sqlEvolve, paramEvolve, (error, results) => {
    if (error) throw error;
    console.log('/api/animal/evolve/'+id+'/' +type);
    res.json({status : "Success"});
  });
});

/*get all item info*/
app.get('/api/item/all', (req, res) => {
  let sqlItemAll = 'SELECT * from Item';
    connection.query(sqlItemAll, (error, results) => {
    if (error) throw error;
    console.log('/api/item/all');
    res.json(results);
  });
});

/*get single item info*/
app.get('/api/item/info/:id', (req, res) => {
  let {id} = req.params;
  let sqlInfoItem = 'SELECT * from Item where id = ?';
  let paramInfoItem = [id];
  connection.query(sqlInfoItem, paramInfoItem, (error, results) => {
    if (error) throw error;
    console.log('/api/item/info/'+id);
    res.json(results);
  });
});

/*buy item from shop*/
app.post('/api/item/buy/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  const type = req.body.type;
  const geee = req.body.geee;
  const duck = req.body.duck;
  const chae = req.body.chae;
  const price = req.body.price;
  let sqlUserMoney = 'SELECT Money from User where id = ?'
  let paramUserMoney = [ownerId];
  connection.query(sqlUserMoney, paramUserMoney, (err, result, fields) => {
    if (err) throw err;
    let userMoney = result[0].Money;
    let id = CreateRandomID();
    if(userMoney >= Number(price))
    {
      let sqlItemCreate = 'INSERT INTO Item (id, type, owner, geee, duck, chae) VALUES(?,?,?,?,?,?)';
      let paramItemCreate = [id, type, ownerId, Number(geee), Number(duck), Number(chae)];
      connection.query(sqlItemCreate, paramItemCreate, (err, result, fields) => {
        if (err) throw err;
        let sqlMoneyDecr = 'UPDATE User set Money = Money - ? where id = ?';
        let paramMoneyDecr = [Number(price), ownerId];
        connection.query(sqlMoneyDecr, paramMoneyDecr, (err, result, fields) => {
          if (err) throw err;
          let sqlInfoItem = 'SELECT * from Item where id = ?';
          let paramInfoItem = [id];
          connection.query(sqlInfoItem, paramInfoItem, (error, results) => {
            if (error) throw error;
            console.log('/api/item/buy/'+ownerId+'/'+type+'/'+geee + '/'+duck + '/'+ chae +'/'+price);
            res.json(results);
          });
        });
      });
    }
    else
    {
      console.log('/api/item/buy/'+ownerId+'/'+type+'/'+geee + '/'+duck + '/'+ chae +'/'+price);
      res.json({status : "fail"});  
    }
  });
});

/*get every item owner has*/
app.get('/api/item/owner/:ownerId', (req, res) => {
  let {ownerId} = req.params;
  let inventory = [];
  let sqlOwnerItemRose = 'SELECT * from Item where owner = ? and type = \'rose\'';
  let sqlOwnerItemDumbell = 'SELECT * from Item where owner = ? and type = \'dumbell\'';
  let sqlOwnerItemBook = 'SELECT * from Item where owner = ? and type = \'book\'';
  let sqlOwnerItemJangBook = 'SELECT * from Item where owner = ? and type = \'jangBook\'';
  let sqlOwnerItemRyuMedal = 'SELECT * from Item where owner = ? and type = \'ryuMedal\'';
  let paramOwnerItem = [ownerId];
  connection.query(sqlOwnerItemBook, paramOwnerItem, (error, results) => {
    if (error) throw error;
    inventory.push(results);
    connection.query(sqlOwnerItemRose, paramOwnerItem, (error, results) => {
      if (error) throw error;
      inventory.push(results);
      connection.query(sqlOwnerItemDumbell, paramOwnerItem, (error, results) => {
        if (error) throw error;
        inventory.push(results);
        connection.query(sqlOwnerItemJangBook, paramOwnerItem, (error, results) => {
          if (error) throw error;
          inventory.push(results);
          connection.query(sqlOwnerItemRyuMedal, paramOwnerItem, (error, results) => {
            if (error) throw error;
            inventory.push(results);
            console.log('/api/item/owner/'+ownerId);
            res.json(inventory);
          });
        });
      });
    });
  });
});

/*use item*/
app.delete('/api/item/use/:animalId', (req, res) => {
  let {animalId} = req.params;
  const itemId = req.body.itemId;
  let itemGeee, itemDuck, itemChae;
  let sqlInfoItem = 'SELECT * from Item where id = ?';
  let paramInfoItem = [itemId];
  connection.query(sqlInfoItem, paramInfoItem, (error, results) => {
    if (error) throw error;
    itemGeee = results[0].geee;
    itemDuck = results[0].duck;
    itemChae = results[0].chae;
    let sqlAddStat = 'UPDATE Animal set geee = geee + ?, duck = duck + ?, chae = chae + ?, itemCount = itemCount + 1 where id = ?';
    let paramAddStat = [itemGeee, itemDuck, itemChae, animalId];
    connection.query(sqlAddStat, paramAddStat, (error, results) => {
      if (error) throw error;
      let sqlGeeeUpperBound = 'UPDATE Animal set geee = 300 where geee > 300';
      let sqlDuckUpperBound = 'UPDATE Animal set duck = 300 where duck > 300';
      let sqlChaeUpperBound = 'UPDATE Animal set chae = 300 where chae > 300';
      connection.query(sqlGeeeUpperBound, (err, result, fields) =>
      {
        if (err) throw err;
        connection.query(sqlDuckUpperBound, (err, result, fields) =>{
          if (err) throw err;
          connection.query(sqlChaeUpperBound, (err, result, fields) =>{
            let sqlItemUse = 'DELETE FROM Item where id=?'
            let paramItemUse = [itemId];
            connection.query(sqlItemUse, paramItemUse, (error, results) => {
              if (error) throw error;
              let delCnt = results.affectedRows;
              if(delCnt == 0)
              {
                console.log('/api/item/use/'+animalId+'/'+itemId+'-> Fail');
                res.json({status : "Fail"});
              }
              else
              {
                console.log('/api/item/use/'+animalId+'/'+itemId);
                res.json({status : "Success"});
              }
            });   
          });
        });
      });
    });
  });
});


app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});