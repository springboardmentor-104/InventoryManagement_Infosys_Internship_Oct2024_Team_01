const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZR_KEY_SECRET,
});

module.exports = razorpayInstance;