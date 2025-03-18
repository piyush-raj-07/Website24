const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer'); 

const router = express.Router();




const upload = multer({ dest: 'Profile/' }); // Define multer here

router.get('/', verifyToken, getUserDetails);
router.post('/', verifyToken, upload.single('image'), updateUserDetails);

module.exports = router;


// const express = require('express');
// const { getUserDetails, updateUserDetails } = require('../controllers/userController');
// const verifyToken = require('../middleware/verifyToken');

// const router = express.Router();


// router.get('/', verifyToken, getUserDetails);

// router.put('/', verifyToken, updateUserDetails);

// module.exports = router;