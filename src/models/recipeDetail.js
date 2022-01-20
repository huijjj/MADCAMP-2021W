const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// version 
const RecipeDetailShema = new Schema({
  time: Number,
  version: { type: Number, required: true, default: 1 },
  memo: String,
  ingredients: [{ name: String, amount: Number }],
  procedure: [{ index: Number, content: String }],
});

module.exports = mongoose.model('RecipeDetail', RecipeDetailShema);