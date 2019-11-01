var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'User name is required'],
        unique: ['username is already registered']

    },
    email:{
        type:String,
    },
    avatar:{
      type:String,
    },
    password: {
      type: String,
      required: [true,'Password is required'],
      minlength: [8,'Password should be more than 8 character']
    },  
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
},{timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }});
UserSchema.plugin(uniqueValidator);


UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id','username','email','phone','avatar']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
  user.tokens[0]={access, token};
  return user.save().then(() => {
    return token;
  });
};


UserSchema.methods.generateAuthDummyToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin },  process.env.JWT_SECRET);
  return token;
}

UserSchema.methods.removeToken = function (token) {
  var user = this;
  return user.updateOne({
    $pull: {
      tokens: {token}
    },
    $unset:{
      fcmToken:1
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token
  })
};





UserSchema.statics.findByCredentials = function (username, password) {
  var User = this;
  return User.findOne({username}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};



UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = {User};


  




