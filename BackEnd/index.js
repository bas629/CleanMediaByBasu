const express = require('express');
const cors=require('cors'); 
require("dotenv").config();
const port=process.env.PORT || 2000

const app = express(); 
app.use(cors());
const cloudinary = require('cloudinary');
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const userRoutes = require("./router/routers");
const dbConnect = require("./config/dbconnected")
const cloudinaryConnect=require("./config/cloudniary");
cloudinaryConnect.connectCloudinary();
app.use(express.json());
dbConnect();
app.use(userRoutes);
 
app.listen(port,()=>{
console.log(`server  Stated at port ${port}`);
})