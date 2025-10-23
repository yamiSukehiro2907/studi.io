const express = require('express');
const { sendEmailVerificationOTP, verifyOTP, forgotPasswordOtp } = require('../controllers/otp.controller');

const router = express.Router();

router.post('/send-email-otp' , sendEmailVerificationOTP)
router.post('/verify-otp' , verifyOTP)
router.post('/forgot-password' , forgotPasswordOtp)

module.exports = router