const express=require('express');
const mongoose=require('mongoose');
const route=require('./route');
var bodyParser = require("body-parser");
const multer= require("multer");
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }).then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));
app.use( multer().any())
app.use("/",route);
var port=`${8007}`;
app.listen(port,()=>{
console.log(`server is started on port ${port}`);
})


