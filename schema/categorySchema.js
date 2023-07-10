const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  category_name: { type: String},
});
const LOB = mongoose.model('LOB', lobSchema);

module.exports = LOB;