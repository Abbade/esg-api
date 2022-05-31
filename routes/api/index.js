const router = require('express').Router();


router.use('/user', require('./user'));
router.use('/esg', require('./esg'));


module.exports = router;