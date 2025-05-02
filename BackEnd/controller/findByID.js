const account = require("../models/accountpost");

exports.find_by_id= async (req, res) => {
    try{
        //fetch data from req body 
        const {_id} = req.body;
     
        const udpatedfriend = await account.findById({_id:_id})
     
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