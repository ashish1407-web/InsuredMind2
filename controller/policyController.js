const Policy=require('../schema/policySchema')
const User=require('../schema/userSchema')
const Agent=require('../schema/agentSchema')
const createPolicy = async function (req, res) {
    try {
      const { policy_mode, policy_type, policy_start_date, policy_end_date, csr, user } = req.body;
      const newPolicy = new Policy({
        policy_mode,
        policy_type,
        policy_start_date,
        policy_end_date,
        csr,
        user,
        isDeleted: false,
      });
  
      const savedPolicy = await newPolicy.save();
      res.status(201).json({ message: 'Policy created successfully.', policy: savedPolicy });
    } catch (error) {
      console.error('Error creating policy:', error);
      res.status(500).json({ error: 'An error occurred while creating the policy.' });
    }
  }
  const fetchDataFromPolicy = async function (req, res) {
    var requestBody = req.body;
    var conditions = {};
  
    if (requestBody.policy_mode) {
      conditions.policy_mode = requestBody.policy_mode;
    }
  
    if (requestBody.policy_acount) {
      conditions.policy_acount = requestBody.policy_acount;
    }
    if (requestBody.policy_type) {
      conditions.policy_type = requestBody.policy_type;
    }
    if (requestBody.policy_start_date) {
      conditions.policy_start_date = requestBody.policy_start_date;
    }
    if (requestBody.policy_end_date) {
      conditions.policy_end_date = requestBody.policy_end_date;
    }
    if (requestBody.csr) {
      conditions.csr = requestBody.csr;
    }
    try {
      var data = await Policy.find(conditions).populate('User').ppopulate('Agent');
      return res.send(data);
    } catch (err) {
      console.error('Error fetching data from Account:', err);
      res.status(500).send('Error fetching data from Ploicy');
    }
  };  
  const updateThePolicyData = async function (req, res) {
    var queryData = req.body;
    var id = req.query.Id;
    try {
      const updatedUser = await Policy.findOneAndUpdate({ _id: id }, queryData, { new: true });
      console.log('policy data updated:', updatedUser);
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error('Error updating policy data:', err);
      res.status(500).send('Error updating policy data');
    }
  };
  const deleteThePolicyData = async function (req, res) {
    const id = req.query['id '].trim();
    try {
      console.log("id", id)
  
      var deletedUser = await Policy.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
      console.log(deletedUser)
      if (!deletedUser) {
        console.log('User data not found or already deleted');
        return res.status(404).send('policy data not found or already deleted');
      }
      console.log('policy data deleted:', deletedUser);
      res.status(200).json(deletedUser);
    } catch (err) {
      console.error('Error deleting policy data:', err);
      res.status(500).send('Error deleting policy data');
    }
  };

module.exports={createPolicy,fetchDataFromPolicy,updateThePolicyData,deleteThePolicyData}



























