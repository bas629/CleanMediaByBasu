const account = require("../models/accountpost");
const nodemailer = require("nodemailer");

//business logic 

exports.createAccount = async (req, res) => {
    try{
        //fetch data from req body 
        const {name, email, password,profile_url} = req.body;
     
        const savedPost = await  account.create({name:name, email:email, password:password,profile_url:profile_url});
       
       
       
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure:false,
            auth: {
              user: "basupahariya6@gmail.com",
              pass:"mbyhvzhbnvtbjosg"
            },
          });
       
         
            const info = await transporter.sendMail({
              from: "basupahariya6@gmail.com",
              to: email,
              subject: "Account Created in Clean Media successfully", 
              text:"Account Created in Clean Media successfully congratulations",
            });
        
            
          
       
       
       
        res.json({
            post:savedPost,
        });

    }
    catch(err) {
        return res.status(500).json({
            error: err,
        
        });

      
    }
};