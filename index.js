const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Recipes = require('./src/models/recipes');
const RecipeDetails = require('./src/models/recipeDetail');
const Users = require('./src/models/users');

const PORT = 443;

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("connected to mongoDB");
});

/* logging in
body: {
  id: String,
  password: String
}
sends user info with status 200, if login is valid
status 400, and fail message otherwise */
app.post('/login', async (req, res) => {
  console.log("POST /login");
  // console.log(req.body);

  try {
    const user = await Users.findOne({ id: req.body.id });
    if(user.password === req.body.password) {
      res.status(200).json(user);
    }
    else {
      res.status(400).send({ status: "fail"});
    }
  } catch (err) {   
    res.status(400).send({ status: "fail" });
  }
});

/* register
body: {
 id: String,
 password: String,
 nickname: String
}
sends success message and status 201, if registeration is valid
status 400, and fail message otherwise */
app.post('/register', async (req, res) => {
  console.log("POST /register");
  // console.log(req.body);

  const newUser = new Users({
    id: String(req.body.id),
    password: String(req.body.password),
    nickname: String(req.body.nickname)
  });

  try {
    await newUser.save();
    res.status(201).json({ status: "success" });
  }
  catch(err) {
    res.status(400).json({ status: "fail" });
  }
});


/* get all recipe 
send all recipes in db with status 400, if successful 
status 400, and error message otherwise */
app.get('/recipe', async (_, res) => {
  console.log("GET /recipe");

  try {
    const recipes = await Recipes.find();
    res.status(200).json(recipes);
  } 
  catch(err) {
    res.status(400).send({ status: "fail" });
  }
});

/* get all recipes of chosen user
params : {
  userId: String
} 
send all recipes of chosen user and status 200, if requst is successful
else status 400 and error message */
app.get('/recipe/:userId', async (req, res) => {
  console.log(`GET /recipe/${req.params.userId}`);
  
  try {
    const recipes = await Recipes.find({ owner: req.params.userId });
    res.status(200).json(recipes);
  }
  catch(err) {
    res.status(400).send({ status: "fail" });
  }
});

/* add new recipe
body: {
  owner: String,
  title: String,
  favorite: Boolean,
  memo: String,
  ingredients: []
  procedure: []
} 
add recipe to db, return status 200 if successful
status 400 otherwise */
app.post('/recipe', async (req, res) => {
  console.log("POST /recipe");
  // console.log(req.body);

  const owner = req.body.owner;
  const title = req.body.title;
  const favorite = req.body.favorite ? req.body.favorite : false;
  const memo = req.body.memo ? req.body.memo : "";
  const ingredients = req.body.ingredients ? req.body.ingredients : [];
  const procedure = req.body.procedure ? req.body.procedure : [];
  
  try {
    const newRecipeDetail = await new RecipeDetails({
      version: 1,
      memo: memo,
      ingredients: ingredients,
      procedure: procedure
    }).save();
    // console.log(newRecipeDetail);
    await new Recipes({
      title: title,
      favorite: favorite,
      owner: owner,
      versions: [{ id: newRecipeDetail._id }]
    }).save();
    res.status(201).send({ status: "success" });
    // console.log(newRecipe);
  }
  catch(err) {
    console.log(err);
    res.status(400).send({ status: "fail" });
  }
});

/* get specific version of given recipe
params : {
  id: ObjectId
}
get specific version of recipe with recipe id, return data if successful 
status 404 if such entry does not exist, status 400 for other errors */
app.get('/recipe/version/:id', async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const detail = await RecipeDetails.findById(id);
    // console.log(detail);
    if(detail) {
      res.status(200).json(detail);
    } 
    else {
      res.status(404).send({ staus: "fail" });
    }
  }
  catch(err) {
    res.status(400).send({ status: "fail" });
  }
});


















app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/minchae');