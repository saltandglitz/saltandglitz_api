const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { User } = require("../Model");

// In-memory OTP storage (for demonstration only, use a database in production)
let otpStore = {};

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "mbkaneriya1998@gmail.com",  // Your Gmail address
        pass: "rmfnynwipqbiixyc",  // Your Gmail App Password
    },
});

// Generate OTP function
const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Send OTP email function
const sendOtpEmail = (email, otp) => {
    return transporter.sendMail({
        from: '"👻" <mbkaneriya1998@gmail.com>',
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
    });
};

// Controller function to handle OTP sending
const sendOtp = (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    // Generate OTP
    const otp = generateOtp();

    // Store OTP in memory (in a real app, store in DB)
    otpStore[email] = otp;

    // Send OTP to email
    sendOtpEmail(email, otp)
        .then(() => {
            res.status(200).json({ message: "OTP sent successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error sending OTP", details: error });
        });
};

// Controller function to handle OTP verification
// Controller function to handle OTP verification
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
    }

    const user = await User.findOne({ email })

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase();

    // Check if OTP matches
    if (otpStore[normalizedEmail] === otp) {
        // OTP verified successfully
        delete otpStore[normalizedEmail];  // Remove OTP after verification

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "OTP verified successfully", token, user });
    } else {
        console.log("Stored OTP:", otpStore[normalizedEmail]);
        console.log("Provided OTP:", otp);
        res.status(400).json({ error: "Invalid OTP" });
    }
};


module.exports = { sendOtp, verifyOtp };
