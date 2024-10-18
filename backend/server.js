const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 


const app = express();
const port = process.env.PORT || 4000;

// Connect to the database
connectDB();



// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

// HomePage 
app.get('/', (req, res) => {
    res.send('Hi from team1');
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
