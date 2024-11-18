const jwt = require('jsonwebtoken');

const createToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role: role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

// Decode Token Without Verifying
const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = { createToken, verifyToken, decodeToken };
