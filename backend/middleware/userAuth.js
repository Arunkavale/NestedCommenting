let {User} = require("./../models/user-model"); 

var userAuth = (req, res, next) => {
  console.log("inside user auth");
  console.log(req.body);
  console.log(req.header('user_auth'));
  
  var token = req.header('user_auth');
  User.findByToken(token).then((user) => {
    console.log(user);
    
    if (!user) return Promise.reject();
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    console.log(e);
    res.status(401).send({"statusCode": 2,
    "message": 'Invalid authentication','Error':e});
  });
};

module.exports = userAuth;
