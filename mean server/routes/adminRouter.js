const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin.controller');

// const jwtHelper = require('../config/jwtHelper');

router.post('/adminRegister', admin.adminRegister);
router.post('/adminAuthenticate', admin.adminAuthenticate);
router.get('/adminProfile', admin.adminProfile);


// router.get('/userProfile',jwtHelper.verifyJwtToken, admin.userProfile);

module.exports = router;



