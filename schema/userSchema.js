const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userType: { type: String,required:true},
  gender: { type: String},
  firstName: { type: String,required:true},
  city: { type: String,require:true},
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/, 
  },
  dob: { type: Date,required:true},
  isDeleted: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);
module.exports = User;