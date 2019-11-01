var mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    avatar:{
        type:String
    }
 });


let ChildrenSchema2 = new mongoose.Schema({
    "comment":{
        type:String
    },
    children:{
        type:[ChildrenSchema]
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    user:{
        type:UserSchema
    }
 },{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }});
 



 var ChildrenSchema = new mongoose.Schema({
    "comment":{
        type:String
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    children:{
        type:[ChildrenSchema2]
    },
    user:{
        type:UserSchema
    }
 },{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }});
 


 


let CommentSchema = new mongoose.Schema({
    user:{
        type:UserSchema,
    },
   "comment":{
       type:String
   },
   children:{
       type:[ChildrenSchema]
   }
},{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }});


var Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment};