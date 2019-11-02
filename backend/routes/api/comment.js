const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const tryCatch = require('./../../middleware/tryCatch');
const _ = require('lodash');
const userAuth = require('../../middleware/userAuth');
const {ObjectID} = require('mongodb');

const postComment = async (req,res) =>{
    let comment =await new Comment({
        comment:req.body.comment,
        childId:req.body.childId,
        parentId : req.body.parentId,
        user:req.user
    }).save();
    if(comment){
        if(req.body.parentId){
            if(ObjectID.isValid(req.body.parentId)){
                await Comment.findByIdAndUpdate(req.body.parentId,{$push:{childId:comment._id}});
                return res.send({'message':'comment added successfully','statusCode': 0});
            }else{
                return res.send({'message':'Please check the parentId','statusCode': 0})
            }
        }else{
            return res.send({'message':'comment added successfully','statusCode': 0});
        }
    };
    res.send({'message':'Something went wrong'});
}


const deleteComment = async (req,res) =>{
    let comment = await Comment.findOneAndRemove({_id:req.params.id});
    if(comment.childId.length>0){
        for (const child of comment.childId) {
            await deleteChildComment(child)
        }   
    }
    res.send({'message':'comment deleted successfully' , 'statusCode':0});    
}

const deleteChildComment = async(id)=>{
    let comment = await Comment.findOneAndRemove({_id:id});
    if(comment){
        if(comment.childId.length>0){
            for (const child of comment.childId) {
                await deleteChildComment(child);
            }   
        }
    }
    return true;
}


const putComment = async (req,res) =>{
    let comment = await Comment.findOneAndUpdate({_id:req.params.id , "user._id":req.user._id},{$set:{comment:req.body.comment }});
    if(comment) return res.send({'message':'comment updated successfully','statusCode': 0});
    res.send({'message':'Sorry you don\'t have permission to edit this comment'});
}


const getComment = async (req,res) =>{
    let comments = await Comment.find({parentId:{$exists:false}}).sort({createdDate:-1});
    for (const comment of comments) {
        if(comment.childId.length > 0){
            comment.children = await getChildren(comment.childId,comment.children);   
        }
    }
    res.send({'comments':comments , 'message':'list of comments'});
}


async function getChildren(childIds,children){
    for (const childId  of childIds) {
        let comment = await Comment.findOne({_id:childId});
        if(comment){
            children.push(comment);
            if(comment.childId.length>0){
                await getChildren(comment.childId,comment.children);
            }
        }   
    }
    return children;
}


router.post("/comment",userAuth,tryCatch(postComment));
router.put("/comment/:id",userAuth , tryCatch(putComment));
router.delete("/comment/:id",userAuth , tryCatch(deleteComment));
router.get("/comment",userAuth,tryCatch(getComment));

module.exports = router;