const user= require('../models/accountpost');

exports.ultraPrivateFriend = async (req, res) => {
    try {
       
        const {id,up_id} = req.body;

        const updatedFriend = await user.findByIdAndUpdate(
            id,
            { $push: { ultra_private_friends:up_id} },
            { new: true }
        );

        res.json({
            post: updatedFriend,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
}