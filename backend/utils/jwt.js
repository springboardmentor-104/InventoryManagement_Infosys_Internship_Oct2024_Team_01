const jwt = require('jsonwebtoken');

const createToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role: role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createToken, verifyToken };
