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
  res.send('Root');
});

/*get every user information*/
app.get('/api/user/all', (req, res) => {
  res.send('Root');
});

/*get user info, create new row when it doesn't exist*/
app.get('/api/user/:id/:nickname', (req, res) => {
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
