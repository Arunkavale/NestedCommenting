const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const tryCatch = require('./../../middleware/tryCatch');
const _ = require('lodash');
const userAuth = require('../../middleware/userAuth');

const postComment = async (req,res) =>{
    console.log("inside post comment ");
    console.log(req.body);
    let comment =await new Comment({
        comment:req.body.comment,
        children:req.body.children,
        user:req.user
    }).save();
    if(comment) return res.send({'message':'comment added successfully','statusCode': 0});
    res.send({'message':'Something went wrong'});
}


const getComment = async (req,res) =>{
    let comments =await Comment.find();
    res.send({'comments':comments , 'message':'list of comments'});
}

router.post("/comment",userAuth,tryCatch(postComment));
router.get("/comment",tryCatch(getComment));

module.exports = router;