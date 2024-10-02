const express = require('express');
const User = require('../../Model/User');
const router = express.Router();

// POST: Create new user
router.post('/create-User', async (req, res) => {
    const { firstName, lastName, email, mobile, gender } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            mobile,
            gender,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST: User login
router.post('/verify', async (req, res) => {
    const { emailOrMobile } = req.body; // Expecting the user to send either email or mobile number

    try {
        // Find user by email or mobile
        const user = await User.findOne({
            $or: [
                { email: emailOrMobile },
                { mobile: emailOrMobile }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or mobile number' });
        }

        // Here, you can implement any further logic, like password verification if you add passwords
        // For now, we will just return the user data (excluding sensitive information)
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
