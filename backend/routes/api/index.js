var router = require('express').Router();
router.use('/api/v1/user', require('./user'));
router.use('/api/v1/user', require('./comment'));


module.exports = router;