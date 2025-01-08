const mongoose = require('mongoose');


const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phonenumber: { type: String, required: true, unique: true },
    address: {
        flatno: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
    },
    pincode: { type: String, required: true },
    age: { type: String, required: true },
    drivinglicense: { type: String, required: true, unique: true },
    addharno: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: String,
    otpExpiry: Date,
    verified: { type: Boolean, default: false },
    resetToken: String,
    resetTokenExpiry: Date
});


const Driver = mongoose.model('Driver', DriverSchema);
module.exports = Driver;
