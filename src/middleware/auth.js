const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'SALTANDGLITZ';

exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// const jwt = require('jsonwebtoken');

// exports.authenticateJWT = (req, res, next) => {
//   const authHeader = req.header('Authorization');

//   if (!authHeader) {
//     return res.status(401).json({ message: 'Authorization header missing' });
//   }

//   const token = authHeader.split(' ')[1];  // Extract token
//   const JWT_SECRET = process.env.JWT_SECRET || 'SALTANDGLITZ';  // JWT secret

//   if (!token) {
//     return res.status(401).json({ message: 'Token not found' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded.userId;  // Attach user ID to request
//     next();  // Proceed to the next middleware/controller
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };
