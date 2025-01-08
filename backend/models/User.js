const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: String,
    otpExpiry: Date,
    verified: { type: Boolean, default: false },
    resetToken: String,
    resetTokenExpiry: Date
});



const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
