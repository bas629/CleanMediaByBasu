 const user=require('../models/accountpost'); 
const mongoose = require('mongoose');
 exports.publicPostDeleted=async (req, res)=>{
    try{ 
        const {id,userId} = req.body;
        console.log(id,userId);
        const result = await user.updateOne(
            { _id: userId },
            {
              $pull: {
                public_Post: { _id: new mongoose.Types.ObjectId(id) }
              }
            })
        res.json({
            post:result,
        });
        }
    
    catch(err) {  
        
        console.log(err);
        return res.status(500).json({
            error: err,
              
        });
    } }