var mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({
    username:{
        type:String
    },
    avatar:{
        type:String
    }
 });


let CommentSchema = new mongoose.Schema({
    user:{
        type:UserSchema,
    },
    "comment":{
        type:String
    },
    children:[Object],
    parentId:{
        type:mongoose.Schema.Types.ObjectId
    },
    childId:{
        type:[mongoose.Schema.Types.ObjectId]
    },
},{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }});


var Comment = mongoose.model('Comment', CommentSchema);
module.exports = {Comment};