const cloudniary= require('cloudinary'); 
 
require('dotenv').config();

exports.connectCloudinary = ()=>{
 try{
    cloudniary.config(
        {  cloud_name:process.env.cloud_name,
           api_key:process.env.api_key,
           api_secret:process.env.api_secret,



        }) 
        console.log("cloudinary connector");


 }
 catch(err){
    console.log("issues To connect to cloudniary");
   console.error(err);


  }

}