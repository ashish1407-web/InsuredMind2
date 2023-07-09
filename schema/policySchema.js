const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policy_mode: { 
    type: Number, 
    required: true,
    validate: {
      validator: function(value) {
        return !isNaN(value);
      },
      message: 'policy_mode must be a number'
    }
  },
  policy_type: { 
    type: String, 
    required: true,
    enum: ['Single', 'Package']
  },
  policy_start_date: { type: Date},
  policy_end_date: { type: Date},
  csr: { type: String,required:true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
  isDeleted:{type:Boolean,default:false}
});
const Policy = mongoose.model('Policy', policySchema);
module.exports = Policy;