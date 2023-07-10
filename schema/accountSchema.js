const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  account_name: { type: String},
  account_type: { type: String}, 
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier'}, 
  isDelete:{type:Boolean,default:false}
});
const Account = mongoose.model('User Account', accountSchema);
module.exports = Account;
