const account = require("../models/accountpost");


//business logic 

exports.get_Post = async (req, res) => {
    try{
        //fetch data from req body 
        
     
        const getpost= await account.find();
        res.json({
            post:getpost,
        });

    }
    catch(err) {
        return res.status(500).json({
            error: err,
             
        });

        console.log(err);
    }
};