const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
  policy:{type:mongoose.Schema.Types.ObjectId,ref:'Polices'},
  agent_name: { type: String},
  producer: { type: String},
  premium_amount:{type:String},
});
const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
