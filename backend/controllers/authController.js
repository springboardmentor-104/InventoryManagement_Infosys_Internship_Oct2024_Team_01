// controllers/authController.js
const logoutUser = (req, res) => {
    // Clear the session or token (depends on how you authenticate)
    // If using session cookies
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      return res.status(200).json({ message: 'Successfully logged out' });
    });
  
    // If using JWT tokens, clear the token in client-side (done in frontend)
  };
  
  module.exports = { logoutUser };
  