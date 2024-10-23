const validateOtpInput = (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }
    next();
};

module.exports = validateOtpInput;