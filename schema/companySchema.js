const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({ 
  company_name: { type: String},
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'LOB'},   
});
const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;