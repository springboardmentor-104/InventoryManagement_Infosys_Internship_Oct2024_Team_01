const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = async () => {
    try {
      const con = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        autoIndex: false,
        maxPoolSize: 10,
        socketTimeoutMS: 45000,
        family: 4,
      });
      console.log(`MongoDB connected: ${con.connection.host}`); // This logs the MongoDB connection status
    } catch (error) {
      console.log(`Error in MongoDB connection: ${error.message}`);
      process.exit(1);
    }
  };

module.exports = connectDB;
