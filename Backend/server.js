// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const rateLimiter = require('./src/middleware/rateLimiter');

// Route imports
const authRoutes = require('./src/routes/authRoutes');
const pokemonRoutes = require('./src/routes/pokemonRoutes');
const teamRoutes = require('./src/routes/teamRoutes');

const app = express();

// Database Connection
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middlewares
app.set('trust proxy', 1);
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/teams', teamRoutes);


// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// Start Server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
