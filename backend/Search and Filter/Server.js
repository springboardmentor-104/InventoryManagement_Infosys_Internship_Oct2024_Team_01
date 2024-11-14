const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const searchRoutes = require('./routes/search');

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log(error));

// Routes
app.use('/api', searchRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
