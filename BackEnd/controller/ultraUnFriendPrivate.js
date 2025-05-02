
const user = require("../models/accountpost"); 

exports.ultraUnFriendPrivate  = async (req, res) => {
    try {
        //fetch data from req body 
       const {id,up_id} = req.body;
        //update the data in database
        const updatedFriend = await user.findByIdAndUpdate(
            id,
            { $pull: { ultra_private_friends:up_id} },
            { new: true }
        );
        //send response to client
        res.json({
            post: updatedFriend,
        });



      
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
};