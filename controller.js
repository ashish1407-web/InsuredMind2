const fs = require('fs');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const User = require('./schema/userSchema');
const Agent = require('./schema/agentSchema');
const Policy = require('./schema/policySchema');
const Lob = require('./schema/LoBSchema');
const Carrier = require('./schema/carrierSchema');
const Account = require('./schema/accountSchema');
const route = require('./app')
const app = require('./route');
const { log } = require('console');
const getDataInUrl = async function (req, res) {
  var file = req.files[0];
  console.log(file)
  const filePath = 'uploads/' + fileName;
  fs.writeFile(filePath, file.buffer, async (err) => {
    if (err) {
      console.error('Error saving file:', err);
      res.status(500).send('Error saving file.');
      return;
    }
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    try {
      const usersToInsert = jsonData.map((data) => {
        return {
          userType: data.userType,
          gender: data.gender,
          firstName: data.firstname,
          city: data.city,
          email: data.email,
          dob: data.dob
        };
      });
      const agentsToInsert = jsonData.map((data) => {
        return {
          agent_name: data.agent,
          producer: data.producer
        };
      });
      const policiesToInsert = jsonData.map((data) => {
        return {
          policy_mode: data.policy_mode,
          policy_acount: data.policy_acount,
          policy_type: data.policy_type,
          policy_start_date: data.policy_start_date,
          policy_end_date: data.policy_end_date,
          csr: data.csr
        };
      });
      const lobsToInsert = jsonData.map((data) => {
        return {
          category_name: data.category_name
        };
      });
      const carriersToInsert = jsonData.map((data) => {
        return {
          company_name: data.company_name
        };
      });
      const accountsToInsert = jsonData.map((data) => {
        return {
          acount_name: data.acount_name,
          account_type: data.account_type,
          phone: data.phone,
          address: data.address,
          state: data.state,
          zip: data.zip
        };
      });
      await Promise.all([
        User.insertMany(usersToInsert),
        Agent.insertMany(agentsToInsert),
        Policy.insertMany(policiesToInsert),
        Lob.insertMany(lobsToInsert),
        Carrier.insertMany(carriersToInsert),
        Account.insertMany(accountsToInsert)
      ]);

      console.log('Data inserted into MongoDB collection');
      res.status(200).send('Data inserted successfully');
    } catch (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } finally {
      // Delete the uploaded file
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  });
};
/************perform the crud operation  ******************/
const createUser = async function (req, res) {
  try {
    const { userType, gender, firstName, city, email, dob } = req.body;
    if (!userType || !firstName || !email || !dob) {
      return res.status(400).json({ error: 'Required fields are missing.' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
    const newUser = new User({
      userType,
      gender,
      firstName,
      city,
      email,
      dob,
      isDeleted: false,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully.', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
}
const fetchDataFromUser = async function (req, res) {
  var requestBody = req.body;
  var conditions = {};

  if (requestBody.userType) {
    conditions.userType = requestBody.userType;
  }

  if (requestBody.gender) {
    conditions.gender = requestBody.gender;
  }
  if (requestBody.firstName) {
    conditions.firstName = requestBody.firstName;
  }
  if (requestBody.city) {
    conditions.city = requestBody.city;
  }
  if (requestBody.email) {
    conditions.email = requestBody.email;
  }
  if (requestBody.dob) {
    conditions.dob = requestBody.dob;
  }
  try {
    var data = await User.find(conditions);
    return res.send(data);
  } catch (err) {
    console.error('Error fetching data from Account:', err);
    res.status(500).send('Error fetching data from Account');
  }
}
const updateTheUserData = async function (req, res) {
  var queryData = req.body;
  var id = req.query.Id;
  try {
    const accountUpdated = await Account.findOneAndUpdate({ _id: id }, queryData, { new: true });
    console.log('User account updated:', accountUpdated);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user data:', err);
    res.status(500).send('Error updating user data');
  }
};
const deleteUserData = async function (req, res) {
  const id = req.query['id '].trim();
  try {
    var deletedUser = await User.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
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
const createAccount = async function (req, res) {
  try {
    const { acount_name, account_type, phone, address, state, zip, user, policy } = req.body;

    const newAccount = new Account({
      acount_name,
      account_type,
      phone,
      address,
      state,
      zip,
      user,
      policy,
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

  if (requestBody.accountType) {
    conditions.accountType = requestBody.accountType;
  }

  if (requestBody.city) {
    conditions.city = requestBody.city;
  }
  if (requestBody.phone) {
    conditions.phone = requestBody.phone;
  }
  if (requestBody.address) {
    conditions.address = requestBody.address;
  }
  if (requestBody.state) {
    conditions.state = requestBody.state;
  }
  if (requestBody.zip) {
    conditions.zip = requestBody.zip;
  }
  if (requestBody.user) {
    conditions.user = requestBody.user;
  }
  if (requestBody.policy) {
    conditions.policy = requestBody.policy
  }
  try {
    const data = await Account.find(conditions)
      .populate('user');
    return res.send(data);
  } catch (err) {
    console.error('Error fetching data from Account:', err);
    res.status(500).send('Error fetching data from Account');
  }
};
const updateTheAccountData = async function (req, res) {
  var queryData = req.body;
  var id = req.query.Id;
  try {
    const accountUpdated = await Account.findOneAndUpdate({ _id: id }, queryData, { new: true });
    console.log('Acocunt data updated:', updatedUser);
    res.status(200).json(accountUpdated);
  } catch (err) {
    console.error('Error updating :', err);
    res.status(500).send('Error updating account data');
  }
};
const deleteTheAccountData = async function (req, res) {
  const id = req.query['id '].trim();
  try {
    var deletedAcount = await Account.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    if (!deletedAcount) {
      console.log('Account data not found or already deleted');
      return res.status(404).send('Account data not found or already deleted');
    }
    console.log('User data deleted:', deletedAcount);
    res.status(200).json(deletedAcount);
  } catch (err) {
    console.error('Error deleting user data:', err);
    res.status(500).send('Error deleting user data');
  }
};
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
    var data = await Policy.find(conditions);
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
const createCarrier = async function (req, res) {
  try {
    const { policy, carrer } = req.body;
    const newCarrier = new Carrier({
      policy,
      carrer
    });

    const savedPolicy = await newCarrier.save();
    res.status(201).json({ message: 'Carrier created successfully.', policy: savedPolicy });
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({ error: 'An error occurred while creating the policy.' });
  }
}
const createAgent = async function (req,res) {
  const { user, policy, agent_name, producer, premium_acount } = req.body;
  try {

    const newCarrier = new Carrier({
      user,
      policy,
      agent_name,
      producer,
      premium_acount
    });

    const savedCarrier = await newCarrier.save();
    res.status(201).json({ message: 'Carrier created successfully.', carrier: savedCarrier });
  } catch (error) {
    console.error('Error creating policy:', error);
    res.status(500).json({ error: 'An error occurred while creating the Agent.' });
  }
}
const createLob=async function(req,res){
  try{
    const newLob = new Lob({
        user,
        category_name
    });
  const savedLob = await newLob.save();
  res.status(201).json({ message: 'Lob created successfully.', carrier: savedLob});
} catch (error) {
  console.error('Error creating policy:', error);
  res.status(500).json({ error: 'An error occurred while creating the Lob.' });
}
}
module.exports = { getDataInUrl, createUser, createAccount, createPolicy, createCarrier,createLob,createAgent, fetchDataFromUser, updateTheUserData, deleteUserData, updateThePolicyData, deleteThePolicyData, updateTheAccountData, deleteTheAccountData, fetchDataFromAccount, fetchDataFromPolicy };
