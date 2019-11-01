const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const tryCatch = require('./../../middleware/tryCatch');
const _ = require('lodash');


const registerUser = async (req,res) =>{
    let user =await new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
        avatar:req.body.avatar
    }).save();
    if(user) return res.send({'message':'user added successfully','statusCode': 0});
    res.send({'message':'Something went wrong'});
}


const loginUser = async (req,res) =>{
    var body = _.pick(req.body, ['username', 'password']);
    let user =  User.findByCredentials(body.username, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('user_auth', token).send({
                'statusCode': 0,
                'message': 'User logged in successfully',
                'data':user
            });
        });
    }).catch((e) => {
        console.log(e);
        res.status(200).send({"statusCode": 2,
        "message": 'Invalid username / password ','Error':e});
    });
}

router.post("/register",tryCatch(registerUser));
router.post("/login",tryCatch(loginUser));
module.exports = router;