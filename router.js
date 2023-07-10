const express=require('express');
const route=express.Router();
const accountController=require('../assigment/controller/accountController');
const  userController=require('../assigment/controller/userController');
const policyController=require('../assigment/controller/policyController')
const fileUpload=require('../assigment/controller/fileUploading')
route.post("/getDataFromXlsx",fileUpload.uploadTheXlsxFile)
route.post("/createUser",userController.createUser)
route.post("/getDataForCrud",userController.fetchDataFromUser)
route.put("/updateData",userController.updateTheUserData)
route.delete("/deleteData",userController.deleteUserData)
route.post("/createAccount",accountController.createAccount);
route.put("/fetchDataFromAccount",accountController.fetchDataFromAccount)
route.delete("/deleteThePolicyData",accountController.deleteAccountData)
route.get("/updateTheAccountData",accountController.updateTheUserData)
route.put("/createThePolicyData",policyController.createPolicy)
route.post("/updateThePolicyData",policyController.updateThePolicyData);
route.post("/fetchThePolicyData",policyController.fetchDataFromPolicy);
route.post("/createCarrier",policyController.deleteThePolicyData)
module.exports=route;
