const crypto = require('crypto');

exports.generateResetToken = () => {
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpires = Date.now() + 3600000; // 1-hour expiry 
    return { resetToken, resetExpires };
}