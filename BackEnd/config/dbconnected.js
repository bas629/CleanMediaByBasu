const moongoose = require('mongoose');
 
    require("dotenv").config();
const   dbConnection  = ()=>{
 try{
 moongoose.connect(process.env.MONGO_DB)
  
 console.log("Connect to DB Successfully");

 }
catch(err){
console.error(err);
 console.log("Error connecting to DB");

}



} 
module.exports=dbConnection;