const User=require('../schema/userSchema');
const Account=require('../schema/accountSchema')
const createUser = async function (req, res) {
    try {
      const { userType, gender,userAccount,firstName, city, email, dob } = req.body;
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
        userAccount,
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
  /*fetch the data based on any specific field*/
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
      var data = await User.find(conditions).populate('Account');
      return res.send(data);
    } catch (err) {
      console.error('Error fetching data from Account:', err);
      res.status(500).send('Error fetching data from Account');
    }
  }
  const updateTheUserData = async function (req, res) {
    var id = req.query.Id;
    const {
        userType,
        name,
        email,
        gender,
        phone,
        dob,
        state,
        city,
        address,
        zip,
        primary
    } = req.body;

    const updateFields = {};

    if (userType) {
        updateFields.userType = userType
    }
    if (name) {
        updateFields.name = name
    }
    if (email) {
        updateFields.email = email
    }
    if (gender) {
        updateFields.gender = gender
    }
    if (phone) {
        updateFields.phone = phone
    }
    if (dob) {
        updateFields.dob = dob
    }
    if (state) {
        updateFields.state = state
    }
    if (city) {
        updateFields.city = city
    }
    if (address) {
        updateFields.address = address
    }
    if (zip) {
        updateFields.zip = zip
    }
    if (primary) {
        updateFields.primary = primary
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
  /*only i am setting in database field isDelete*/
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
module.exports={createUser,fetchDataFromUser,updateTheUserData,deleteUserData}












