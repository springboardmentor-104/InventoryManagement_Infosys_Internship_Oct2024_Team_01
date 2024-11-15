// middlewares/logger.js

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware in the stack
  };
  
  module.exports = logger;
  