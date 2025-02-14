const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


router.get('/', verifyToken, getUserDetails);

router.put('/', verifyToken, updateUserDetails);

module.exports = router;
