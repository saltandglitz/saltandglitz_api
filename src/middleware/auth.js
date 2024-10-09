const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    const JWT_SECRET = "SALTANDGLITZ"

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
