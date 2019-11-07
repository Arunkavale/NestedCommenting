const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');
const tryCatch = require('./../../middleware/tryCatch');
const _ = require('lodash');
const userAuth = require('../../middleware/userAuth');
const {ObjectID} = require('mongodb');


/**
 * API function for adding comment data
 * @param {request} req 
 * @param {response} res 
 */
const postComment = async (req,res) =>{ 
    let comment =await new Comment({
        comment:req.body.comment,
        childId:req.body.childId,
        parentId : req.body.parentId,
        user:req.user
    }).save();
    if(comment){  // check if comment got saved
        if(req.body.parentId){ // check if is the child or parent comment
            if(ObjectID.isValid(req.body.parentId)){ // if the child comment check is the parentId is valid or not
                await Comment.findByIdAndUpdate(req.body.parentId,{$push:{childId:comment._id}});  // push the child it in parent comment 
                return res.send({'message':'comment added successfully','statusCode': 0}); // sending the success response to front end side 
            }else{
                return res.send({'message':'Please check the parentId','statusCode': 0})
            }
        }else{//if it's not a child comment then adding it as a parent with null childId and sending success response to fronend
            return res.send({'message':'comment added successfully','statusCode': 0});
        }
    };
    res.send({'message':'Something went wrong'}); // if comment will not get save because of some eroor then sending this respose
}


/**
 * API function for deleting  comment
 * @param {request} req 
 * @param {response} res 
 */
const deleteComment = async (req,res) =>{
    let comment = await Comment.findOneAndRemove({_id:req.params.id}); // getting and reomveing comment data from database
    if(comment.childId.length>0){ // checking if that removed comment have any child comment 
        for (const child of comment.childId) { // looping through child ids
            await deleteChildComment(child) ; // funtion which deletes shild comment one by one 
        }   
    }
    res.send({'message':'comment deleted successfully' , 'statusCode':0});     // sending success response to front end
}

const deleteChildComment = async(id)=>{
    let comment = await Comment.findOneAndRemove({_id:id});// getting and reomveing comment data from database
    if(comment){
        if(comment.childId.length>0){// checking if that removed comment have any child comment 
            for (const child of comment.childId) {// looping through child ids
                await deleteChildComment(child); // this funciton call recursively to delete all nested child comment's
            }   
        }
    }
    return true;
}


/**
 * API for edit single comment 
 * @param {request} req 
 * @param {response} res 
 */
const putComment = async (req,res) =>{
    let comment = await Comment.findOneAndUpdate({_id:req.params.id , "user._id":req.user._id},{$set:{comment:req.body.comment }}); // updating comment data using userId and commentId
    if(comment) return res.send({'message':'comment updated successfully','statusCode': 0}); // sending success response
    res.send({'message':'Sorry you don\'t have permission to edit this comment'}); // if comment is not present then sending this response
}


/**
 * API for getting all comments with it's children
 * @param {request} req 
 * @param {response} res 
 */
const getComment = async (req,res) =>{
    let comments = await Comment.find({parentId:{$exists:false}}).sort({createdDate:-1}); // get all parent comments
    for (const comment of comments) { // looping through all prent comment to get it's child
        if(comment.childId.length > 0){ // checking if is there any child comment 
            comment.children = await getChildren(comment.childId,comment.children);    // function to get it's it's child snd it's hirarchy
        }
    }
    res.send({'comments':comments , 'message':'list of comments'}); // sending all generated comment array of object as response
}


async function getChildren(childIds,children){ // function to get all child comments
    for (const childId  of childIds) { // looping though all child ids
        let comment = await Comment.findOne({_id:childId});// getting child by child id
        if(comment){
            children.push(comment); // pushing child comment in to parent children array
            if(comment.childId.length>0){
                await getChildren(comment.childId,comment.children); // recursively checking if taht child have any other child
            }
        }   
    }
    return children; // returning children array 
}


router.post("/comment",userAuth,tryCatch(postComment)); // API for post comment
router.put("/comment/:id",userAuth , tryCatch(putComment));// API for edit single comment by ID
router.delete("/comment/:id",userAuth , tryCatch(deleteComment)); // API for delete  single comment by ID 
router.get("/comment",userAuth,tryCatch(getComment)); // APi for get all comments

module.exports = router;