let {User} = require("./../models/user-model"); 

var userAuth = (req, res, next) => {
  var token = req.header('user_auth');
  User.findByToken(token).then((user) => {
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
