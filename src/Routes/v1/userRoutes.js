const express = require('express');
const { registerUser, loginUser, googleLoginUser, logoutUser, getUserProfile } = require('../../Controller/userController');
const { authenticateJWT } = require('../../middleware/auth');
const router = express.Router();

// Google Sign-in route
router.post('/google-login', googleLoginUser);

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route (requires authentication)
router.post('/logout', authenticateJWT, logoutUser);

// Get user profile route (requires authentication)
router.get('/profile', authenticateJWT, getUserProfile);

module.exports = router;
