const express = require('express');
const { registerUser, loginUser, googleLoginUser, logoutUser, getUserProfile } = require('../../Controller/userController');
const { authenticateJWT } = require('../../middleware/auth');
const { User } = require('../../Model');
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

router.get('/user', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming req.user.id contains the user ID
        if (user) {
            res.json({ id: user._id, name: user.name }); // Send user ID and other details
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;
