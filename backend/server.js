const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
const logger=require('./middlewares/logger')
const ordersRoutes=require('./routes/ordersRoutes')
const authRoutes=require('./routes/authRoutes')
const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();

 
// Middlewares
const corsOptions = {
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true,  // Allow cookies to be sent with requests
  };
  app.use(cors(corsOptions));  // Apply CORS to all routes
// 
// app.use(cors());
app.use(express.json());
app.use(logger);
const session = require('express-session');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // set to true if using HTTPS
        httpOnly: true,
        maxAge: 3600000, // 1 hour session expiration
      },
  })
);



app.use('/api', ordersRoutes);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', imageRoutes);
app.use('/api/auth',authRoutes)
app.use('/uploads', express.static('uploads'));
 // Serve the uploaded images as static files
// app.use('/api/dashboard', dashboardRoutes)

// HomePage 
app.get('/', (req, res) => {
    res.send('Hi from team1');
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
