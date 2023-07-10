const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'carrier'
  }, 
  agent_name: { type: String},
  producer: { type: String},
});
const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
