const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// title : title of recipe
// ver : array of versions of recipe(recipe detail)
// favorit : boolean field indicating whether if this recipe is favorite or not
// owner : owner's id(human readable id, not id from db)
const RecipeShema = new Schema({
  title: { type: String, required: true },
  versions: [{id: Schema.Types.ObjectId}],
  favorite: { type: Boolean, default: false },
  owner: { type: String, required: true },
  img: { type: String }
});

module.exports = mongoose.model('Recipe', RecipeShema);