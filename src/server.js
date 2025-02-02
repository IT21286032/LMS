require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path'); // Import path module
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const gptRoutes = require('./routes/gpt');
const userRoutes = require('./routes/users');
const enrollmentRoutes = require('./routes/enrollment');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/users', userRoutes);
app.use('/api', enrollmentRoutes);

// Serve index.html for all other routes to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
