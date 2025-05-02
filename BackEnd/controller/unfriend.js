const user=require("../models/accountpost");

exports.unfriend= async (req, res) => {
try{
  const{id,_id}=req.body;
  const protectedDeleted=await user.updateOne({_id:id},{$pull:{protected_friends:_id}});
  const udpated_follwers= await user.findByIdAndUpdate({_id:id},{$inc:{follows: -1 }}, {new :true})
  const privateDeleted=await user.updateOne({_id:_id},{$pull:{private_friends:id}});
  const udpated_follows= await user.findByIdAndUpdate({_id:_id},{$inc:{followers:-1 }}, {new :true})
  res.status(200).json({
    message:"success",
    protectedDeleted:protectedDeleted,
    privateDeleted:privateDeleted
  })



}

catch(err){
    console.log(err);
    res.status(500).json({message:"Internal server error"});


}

}