const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({           //schema for User Model
    phone: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    purchasePower: { type: Number, default: 0 },
    password: { type: String, required: true } 
});

module.exports = mongoose.model('User', userSchema);
