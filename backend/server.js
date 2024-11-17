const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const imageRoutes = require('./routes/imageRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes, imageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/dashboard', dashboardRoutes)

// Serve the uploaded images as static files
app.use('/uploads', express.static('uploads')); 


// HomePage 
app.get('/', (req, res) => {
    res.send('Hi from team1');
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
