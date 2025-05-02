const account = require("../models/accountpost");

exports.userAccount= async (req, res) => {
    try{
        //fetch data from req body 
        const {email,password} = req.body;
     
        const udpatedfriend = await account.findOne({email: email,password:password})
     
        res.json({
            post:udpatedfriend,
        });

    }
    catch(err) {    console.log(err);
        return res.status(500).json({
            error: err,
             
        });

    
    }
};