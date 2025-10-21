require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
// For authentication (to be used in routes):
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:5173'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(helmet());

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/google-forms';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Example validation middleware for form creation
const validateForm = [
  body('title').notEmpty().withMessage('Title is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
];

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
const formRoutes = require('./routes/forms');
const responseRoutes = require('./routes/responses');
const templateRoutes = require('./routes/templates');
app.use('/api/forms', formRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/templates', templateRoutes);

// Example protected route (for future authentication)
// app.get('/api/protected', (req, res) => {
//   // Authentication logic here
// });

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
