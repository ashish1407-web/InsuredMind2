const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  acount_name: { type: String},
  account_type: { type: String},
  phone: { type: String},
  address: { type: String},

  state: { type: String},
  zip: { type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policies'}, 
  isDelete:{type:Boolean,default:false}
});
const Account = mongoose.model('User Account', accountSchema);
module.exports = Account;
