const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');

const Recipes = require('./src/models/recipes');
const RecipeDetails = require('./src/models/recipeDetail');
const Users = require('./src/models/users');
const Images = require('./src/models/images');

const PORT = 443;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

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
    const user = await Users.findOne({ id: req.body.id }).exec();
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

/* get nickname of user
params: {
  userId: String
}
sends nick name if successful */
app.get('/user/:userId', async (req, res) => {
  console.log(`GET /user/${req.params.userId}`);

  try {
    const tar = await Users.find({ id: req.params.userId });
    console.log(tar);
    res.status(200).json(tar[0].nickname);
  } 
  catch(err) {
    res.status(400).send({ status: "fail" });
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
    const recipes = await Recipes.find({ owner: req.params.userId }).exec();
    res.status(200).json(recipes);
  }
  catch(err) {
    res.status(400).send({ status: "fail" });
  }
});

/* add new recipe
body : {
  img: String,
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

  const img = req.body.img ? req.body.img : "";
  const owner = req.body.owner;
  const title = req.body.title;
  const favorite = req.body.favorite ? req.body.favorite : false;
  const memo = req.body.memo ? req.body.memo : "";
  const ingredients = req.body.ingredients ? req.body.ingredients : [];
  const procedure = req.body.procedure ? req.body.procedure : [];

  try {
    const newRecipeDetail = await new RecipeDetails({
      memo: memo,
      ingredients: ingredients,
      procedure: procedure
    }).save();
    // console.log(newRecipeDetail);
    await new Recipes({
      img: img,
      title: title,
      favorite: favorite,
      owner: owner,
      versions: [{ id: newRecipeDetail._id }]
    }).save();
    res.status(201).json({ status: "success" });
    // console.log(newRecipe);
  }
  catch(err) {
    console.log(err);
    res.status(400).send({ status: "fail" });
  }
});

/* add new recipe version
params : {
  id: ObjectId
}
body : {
  img: String,
  title: String,
  favorite: Boolean,
  memo: String,
  ingredients: []
  procedure: []
} 
add version to recipe, return status 200 if successful
status 400 otherwise */
app.post('/recipe/version/:id', async (req, res) => {
  console.log(`POST /recipe/version/${req.params.id}`);

  const id = req.params.id;
  const img = req.body.img ? req.body.img : "";
  const title = req.body.title;
  const favorite = req.body.favorite ? req.body.favorite : false;
  const memo = req.body.memo ? req.body.memo : "";
  const ingredients = req.body.ingredients ? req.body.ingredients : [];
  const procedure = req.body.procedure ? req.body.procedure : [];
  
  try {
    const newRecipeDetail = await new RecipeDetails({
      memo: memo,
      ingredients: ingredients,
      procedure: procedure
    }).save();
    // console.log(newRecipeDetail);
    const target = await Recipes.findById(id);
    const ver = target.versions;
    ver.push({ id: newRecipeDetail._id });
    await Recipes.findByIdAndUpdate(id, {
      img: img,
      title: title,
      favorite: favorite,
      versions: ver
    });

    res.status(201).json({ status: "success", versions: ver });
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
  console.log(`GET /recipe/version/${req.params.id}`);
  const id = req.params.id;
  // console.log(id);
  try {
    const detail = await RecipeDetails.findById(id).exec();
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

/* delete recipe with id
params : {
	id: ObjectId
}
delete recipe with id */
app.delete('/recipe/:id', async (req, res) => {
  console.log(`DELETE /recipe/${req.params.id}`);
  const id = req.params.id;

  try {
    const target = await Recipes.findById(id);
    const img = target.img;
    const vers = target.versions;

    // delete image from file system
    if(img) {
      fs.unlink(`./images/${img}.png`, console.log);
    }

    // delete versions
    await Promise.all(vers.map(v => RecipeDetails.deleteOne({ _id: v.id })));

    // delete recipe
		await Recipes.deleteOne({ _id: id });
		res.status(200).json({ status: "success" });
  } 
	catch(err) {
    res.status(400).send({ status: "fail" });
  }
});

/* delete recipe version with id
params : {
	recipe: ObjectId,
  detail: ObjectId
}
delete recipe version with id */
app.delete('/recipe/version/:recipe/:detail', async (req, res) => {
  console.log(`DELETE /recipe/version/${req.params.recipe}/${req.params.detail}`);
  const rec = req.params.recipe;
  const det = req.params.detail;

  try {
    // delete recipe detail
    await RecipeDetails.deleteOne({ _id: det });

    // update recipe
    const target = await Recipes.findById(rec);
    const vers = target.versions.filter(e => e.id != det);
    await Recipes.findByIdAndUpdate(rec, { versions: vers });

		res.status(200).json({ status: "success", versions: vers });
  } 
	catch(err) {
    res.status(400).send({ status: "fail" });
  }
});

/* post image
file : {
  buffer: Buffer
}
upload image and send image id */
app.post('/image', upload.single('image'), async (req, res) => {
  console.log('POST /image');
  try {
    const img = req.file.buffer;
    if(img.truncated) {
      res.status(413).send({ status: "fail" });
    }
    else {
      const image = new Images({ type: "png" });
      await image.save();
      fs.writeFileSync(`./images/${image._id}.png`, img);
      res.status(201).json(`${image._id}`);
    }
  }
  catch(err) {
    res.status(400).send({ status: "fail" });
  }
});

/* get image
params : {
  id : ObjectId
}
get image with id */
app.get('/image/:id', async (req, res) => {
  console.log(`GET /image/${req.params.id}`);
  const id = req.params.id;
  try {
    const imageData = await Images.findById(id).exec();
    if(!imageData) {
      res.status(404).send({ status: "fail" });
    }
    else {
      // const imageURL = imageData.img;
      // fs.writeFileSync(`./images/${id}.png`, imageURL);
      fs.readFile(`./images/${id}.png`, (err, data) => {
        if(err) {
          res.status(400).send({ status:  "fail" });
        }
        else {
          res.writeHead(200, { 'Content-Type': 'image/png' });
          res.write(data);
          res.end();
        }
      });
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