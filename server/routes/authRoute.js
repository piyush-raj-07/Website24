const express = require('express');
const { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, resendVerificationEmail } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword);

router.post('/resend-verification-email', resendVerificationEmail);

module.exports = router;