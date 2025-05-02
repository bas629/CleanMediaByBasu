const express = require("express");
const router = express.Router();
const { createAccount } = require("../controller/accountCreate");
const {Private_Post,Public_Post,Protected_Post}=require("../controller/post");
const{get_Post}=require("../controller/getAllPost");
const{Private_Friend, Protected_Friend}=require("../controller/friends");
const{find_by_id}=require("../controller/findByID")
const{userAccount}=require("../controller/userAccount");
const {publicPost}=require("../controller/publicPost");
const{PrivatePost}=require("../controller/PrivatePost"); 
const{ProtectedPost}=require("../controller/ProtectedPost");
const{unfriend}=require("../controller/unfriend");
const {publicPostDeleted}=require("../controller/publicPostDeleted");
const{ultraPrivateFriend}=require("../controller/ultraPrivateFriend")
const {ultraPrivatePost}=require("../controller/PrivatePost");
const {ultraUnFriendPrivate}=require("../controller/ultraUnFriendPrivate")
const {getUltaPrivateFriend}=require("../controller/getUltaPrivateFriend")
router.post("/creatAccount", createAccount);
router.put("/PrivatePost", Private_Post);
router.put("/PublicPost", Public_Post);
router.put("/ProtectedPost", Protected_Post);
router.post("/PrivateFriend", Private_Friend);
router.put("/ProtectedFriend", Protected_Friend);
router.post("/findById",find_by_id);
router.get("/getAllPost",get_Post);
router.post("/userAccount",userAccount);
router.get("/publicPost",publicPost);
router.post("/privatePost",PrivatePost);
router.post("/protectedPost",ProtectedPost);
router.post("/unfriend",unfriend);
router.post("/publicPostDeleted",publicPostDeleted);
router.post("/ultraPrivateFriend",ultraPrivateFriend);
router.post("/ultraPrivatePost",ultraPrivatePost);
router.post("/ultraUnFriendPrivate",ultraUnFriendPrivate);
router.post("/getUltaPrivateFriend",getUltaPrivateFriend);
module.exports = router;