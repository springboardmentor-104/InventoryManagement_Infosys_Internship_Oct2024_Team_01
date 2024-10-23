const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,    
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
