const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Attach user information to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateUser;
