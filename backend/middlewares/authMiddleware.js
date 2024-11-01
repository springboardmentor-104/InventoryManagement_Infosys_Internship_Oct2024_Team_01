const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: 'Access denied. (is not Admin)' });
  next();
};

exports.isUser = (req, res, next) => {
  if (req.userRole !== 'user') return res.status(403).json({ message: 'Access denied.(is not User)' });
  next();
};