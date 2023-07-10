const fs = require('fs');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const User = require('../schema/userSchema');
const Agent = require('../schema/agentSchema');
const Policy = require('../schema/policySchema');
const Lob = require('../schema/categorySchema');
const Carrier = require('../schema/companySchema');
const Account = require('./schema/accountSchema');
const uploadTheXlsxFile = async function (req, res) {
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
module.exports={uploadTheXlsxFile}