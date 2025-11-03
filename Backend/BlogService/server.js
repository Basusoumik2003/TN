const express = require('express');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blogRoutes');

const app = express();

// ✅ CORS Configuration - Allow frontend Render URLs
const allowedOrigins = [
  'https://79145e8bbc1a402b83e7b01884d6c2b9-e7d3808c681146c38bd383fb6.fly.dev',
  'https://frontend-user-etef.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Blog Service',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/blogs', blogRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'CORS policy: Access denied',
      origin: req.get('origin'),
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`
    🚀 Blog Service API is running on port ${PORT}
    📝 Environment: ${process.env.NODE_ENV || 'development'}
    🔗 Base URL: http://localhost:${PORT}
    📚 API Endpoints:
       - GET  /api/blogs          (Fetch all blogs)
       - GET  /api/blogs/:slug    (Fetch single blog)
       - GET  /api/blogs/search   (Search blogs)
       - GET  /health             (Health check)
  `);
});

module.exports = app;
