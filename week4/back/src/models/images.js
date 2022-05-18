const mongoose = require('mongoose');

const { Schema } = mongoose;
const ImageScehma = new Schema({
  // img: Buffer,
  type: String,
});

module.exports = mongoose.model('Image', ImageScehma);
