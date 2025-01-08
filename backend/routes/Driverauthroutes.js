const express = require('express');
const { loginDriver, sendOTP, verifyOTP, forgotPassword, resetPassword } = require('../controller/Driverauthcontroller');

const router = express.Router();

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginDriver);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
