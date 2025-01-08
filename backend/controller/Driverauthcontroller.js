const crypto = require('crypto');
const Driver = require('../models/Driver');
const jwt = require('jsonwebtoken');
const transporter = require('../config/NodemailerConfig');
const passwordUtils = require('../utils/Password-utils');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const sendOTP = async (req, res) => {
    const { email, password, name, phonenumber, address, pincode, age, drivinglicense, addharno } = req.body;

    if (!email || !password || !name || !phonenumber || !address || !address.flatno || !address.street || !address.city || !address.state || !pincode || !age || !drivinglicense || !addharno) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        let driver = await Driver.findOne({ email });
        
        
        if (driver && driver.verified) {
            return res.status(400).json({ message: 'Driver already exists and is verified' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
        const hashedPassword = await passwordUtils.hashPassword(password);

        
        if (!driver) {
            driver = new Driver({ 
                email, 
                password: hashedPassword,
                name,
                phonenumber,
                address,  
                pincode,
                age,
                drivinglicense,
                addharno,
                otp, 
                otpExpiry 
            });
        } else {
            
            driver.password = hashedPassword;
            driver.otp = otp;
            driver.otpExpiry = otpExpiry;
        }

        await driver.save();

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP is ${otp}. It expires in 10 minutes.`,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find driver by email
        const driver = await Driver.findOne({ email });

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        // Check if OTP is valid or expired
        if (driver.otp !== otp || driver.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark driver as verified
        driver.verified = true;
        driver.otp = undefined;
        driver.otpExpiry = undefined;
        await driver.save();

        // Generate JWT token
        const token = generateToken(driver._id);
        res.status(200).json({ message: 'Driver verified successfully', token });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};


const loginDriver = async (req, res) => {
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email or password missing' });
    }

    try {
        const driver = await Driver.findOne({ email });
        
        if (!driver) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!driver.verified) {
            return res.status(400).json({ message: 'Driver not verified. Please verify OTP first.' });
        }

        // Password verification
        const isValid = await passwordUtils.verifyPassword(password, driver.password);
        
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(driver._id);
        res.json({ driver, token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        const resetToken = crypto.randomInt(100000, 999999).toString();
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);  // Token valid for 10 minutes

        driver.resetToken = resetToken;
        driver.resetTokenExpiry = resetTokenExpiry;
        await driver.save();

        // Send reset email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `Your password reset code is ${resetToken}. It expires in 10 minutes.`,
        });

        res.status(200).json({ message: 'Reset code sent to email' });
    } catch (err) {
        console.error('Error during forgot password process:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { email, resetToken, newPassword } = req.body;

    try {
        // Input validation
        if (!newPassword || typeof newPassword !== 'string' || !newPassword.trim()) {
            return res.status(400).json({
                message: 'New password is required and must be a non-empty string'
            });
        }

        // Find driver by email, reset token, and check expiry
        const driver = await Driver.findOne({
            email,
            resetToken,
            resetTokenExpiry: { $gt: Date.now() },  // Check if the reset token is expired
        });

        if (!driver) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password and update driver
        driver.password = await passwordUtils.hashPassword(newPassword);
        driver.resetToken = undefined;
        driver.resetTokenExpiry = undefined;
        await driver.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error during password reset:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

module.exports = { 
    sendOTP, 
    verifyOTP, 
    loginDriver, 
    forgotPassword, 
    resetPassword
};
