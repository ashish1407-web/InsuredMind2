const Account=require('../schema/accountSchema')
const Carrier=require('../schema/companySchema')
const createAccount = async function (req, res) {
    try {
      const { acount_name, account_type,company} = req.body;
  
      const newAccount = new Account({
        acount_name,
        account_type,
        company,
        isDelete: false,
      });
  
      const savedAccount = await newAccount.save();
      res.status(201).json({ message: 'Account created successfully.', account: savedAccount });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ error: 'An error occurred while creating the account.' });
    }
  }
  const fetchDataFromAccount = async function (req, res) {
    var requestBody = req.body;
    var conditions = {};
  
    if (requestBody.account_name) {
      conditions.account_name = requestBody.account_name;
    }  
    if (requestBody.account_Type) {
      conditions.account_type = requestBody.account_type;
    }
    if (requestBody.company) {
      conditions.company = requestBody.comapany
    }
    try {
      const data = await Account.find(conditions)
        .populate('Carrier');
      return res.send(data);
    } catch (err) {
      console.error('Error fetching data from Account:', err);
      res.status(500).send('Error fetching data from Account');
    }
  };
  const updateTheUserData = async function (req, res) {
    var id = req.query.Id;
    const {
        user_type,
       user_name,
    } = req.body;

    const updateFields = {};

    if (user_name) {
        updateFields.user_name = user_name;
    }
    if (user_type) {
        updateFields.user_type =user_type;
    }
    try {
      const accountUpdated = await Account.findOneAndUpdate({ _id: id }, updateFields, { new: true });
      console.log('User account updated:', accountUpdated);
      res.status(200).json(accountUpdated);
    } catch (err) {
      console.error('Error updating user data:', err);
      res.status(500).send('Error updating user data');
    }
  };
  const deleteAccountData = async function (req, res) {
    const id = req.query['id '].trim();
    try {
      var deletedUser = await Account.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
      console.log(deletedUser)
      if (!deletedUser) {
        console.log('User data not found or already deleted');
        return res.status(404).send('User data not found or already deleted');
      }
      console.log('User data deleted:', deletedUser);
      res.status(200).json(deletedUser);
    } catch (err) {
      console.error('Error deleting user data:', err);
      res.status(500).send('Error deleting user data');
    }
  };
module.exports={createAccount,fetchDataFromAccount,updateTheUserData,deleteAccountData}













