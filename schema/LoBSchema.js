const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
  category_name: { type: String},
});
const LOB = mongoose.model('LOB', lobSchema);

module.exports = LOB;