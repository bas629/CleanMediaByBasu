const account = require("../models/accountpost");


//business logic 

exports.Private_Post = async (req, res) => {
    try{
        //fetch data from req body 
        const {_id,title, descp, post_url} = req.body;
     
        const udpatedPost = await account.findByIdAndUpdate(_id, {$push:{private_Post: {title:title,descp:descp,post_url:post_url}} }, {new :true})
     
        res.json({
            post:udpatedPost,
        });

    }
    catch(err) {
        return res.status(500).json({
            error: err,
             
        });

        console.log(err);
    }
};

exports. Protected_Post = async (req, res) => {
    try{
        //fetch data from req body 
        const {_id,title, descp, post_url} = req.body;
     
        const udpatedPost = await account.findByIdAndUpdate(_id, {$push:{protected_Post: {title:title,descp:descp,post_url:post_url}} }, {new :true})
     
        res.json({
            post:udpatedPost,
        });

    }
    catch(err) {
        return res.status(500).json({
            error: err,
             
        });

        console.log(err);
    }
};
exports.Public_Post = async (req, res) => {
    try{
        //fetch data from req body 
        const {_id,title, descp, post_url} = req.body;
     
        const udpatedPost = await account.findByIdAndUpdate(_id, {$push:{public_Post: {title:title,descp:descp,post_url:post_url}} }, {new :true})
     
        res.json({
            post:udpatedPost,
        });

    }
    catch(err) {
        return res.status(500).json({
            error: err,
             
        });

        console.log(err);
    }
};