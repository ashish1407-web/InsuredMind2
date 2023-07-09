const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'policy'}, 
  company_name: { type: String},
});
const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;