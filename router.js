const express=require('express');
const route=express.Router();
const controller=require('./controller');
route.post("/getDataFromXlsx",controller.getDataInUrl)
route.post("/createUser",controller.createUser)
route.post("/getDataForCrud",controller.fetchDataFromUser)
route.put("/updateData",controller.updateTheUserData)
route.delete("/deleteData",controller.deleteUserData)
route.post("/createPolicy",controller.createPolicy)
route.post("/createAccount",controller.createAccount);
route.put("/updatePolicyData",controller.updateThePolicyData)
route.delete("/deleteThePolicyData",controller.deleteThePolicyData)
route.get("/fetchDataFromAccount",controller.fetchDataFromAccount)
route.put("/updateTheAccountData",controller.updateTheAccountData)
route.post("/createAgent",controller.createAgent);
route.post("/createLob",controller.createLob);
route.post("/createCarrier",controller.createCarrier)
route.delete("/deleteTheAccountData",controller.deleteTheAccountData)
module.exports=route;
