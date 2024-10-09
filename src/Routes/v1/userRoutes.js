const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../../Controller/userController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.post('/logout', logoutUser);

module.exports = router;
