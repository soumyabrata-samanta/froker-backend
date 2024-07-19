const express = require('express');
const auth = require('../middleware/auth');
const { signup,login,getUserData,borrowMoney } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signup);  //post method for sign-up
router.post('/login',login);   //post method for login
router.post('/borrow', auth, borrowMoney); //post method for borrowing money
router.get('/user', auth, getUserData);  //get method for fetching user data
module.exports = router;
