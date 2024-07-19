const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => { //function for signup
    const { phone, email, name, dob, monthlySalary, password } = req.body;
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    if (age <= 20) {
        return res.status(400).json({ message: 'User should be above 20 years of age.' });
    }
    if (monthlySalary < 25000) {
        return res.status(400).json({ message: 'Monthly salary should be 25k or more.' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ phone, email, name, dob, monthlySalary, password: hashedPassword, status: 'Approved' });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
const login = async (req, res) => {    //function for login 
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
const getUserData = async (req, res) => {  //function for getting user data
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
const borrowMoney = async (req, res) => {  //function for borrowing money
    const { amount, tenure } = req.body;

    try {
        const user = await User.findById(req.user.id);
        const interestRate = 0.08;
        const monthlyRepayment = (amount * (1 + interestRate)) / tenure;
        user.purchasePower -= amount;
        await user.save();
        res.json({
            message: 'Money borrowed successfully',
            purchasePower: user.purchasePower,
            monthlyRepayment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { signup ,login , getUserData, borrowMoney};  
