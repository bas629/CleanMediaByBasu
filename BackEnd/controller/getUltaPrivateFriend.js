const user=require('../models/accountpost');



exports.getUltaPrivateFriend = async (req, res) => {
    try {
        const {id} = req.body;
        const account = await user.findById({_id:id});
        const ultraPrivateFriend = account.ultra_private_friends;
        res.status(200).json({
           ultraFriend:ultraPrivateFriend,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }






}