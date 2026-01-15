const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { testConnection } = require('./config/database');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'BOA Connect API Server',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes
try {
  const authRoutes = require('./routes/auth.routes');
  app.use('/api/auth', authRoutes);
  console.log('✓ Auth routes loaded');

  const adminAuthRoutes = require('./routes/admin-auth.routes');
  app.use('/api/admin-auth', adminAuthRoutes);
  console.log('✓ Admin auth routes loaded at /api/admin-auth');

  const userRoutes = require('./routes/user.routes');
  app.use('/api/users', userRoutes);
  console.log('✓ User routes loaded');

  const seminarRoutes = require('./routes/seminar.routes');
  app.use('/api/seminars', seminarRoutes);
  console.log('✓ Seminar routes loaded');

  const registrationRoutes = require('./routes/registration.routes');
  app.use('/api/registrations', registrationRoutes);
  console.log('✓ Registration routes loaded');

  const notificationRoutes = require('./routes/notification.routes');
  app.use('/api/notifications', notificationRoutes);
  console.log('✓ Notification routes loaded');

  const adminRoutes = require('./routes/admin.routes');
  app.use('/api/admin', adminRoutes);
  console.log('✓ Admin routes loaded');

  // Public committee members route
  app.get('/api/committee-members', async (req, res) => {
    try {
      const { promisePool } = require('./config/database');
      const { page_type } = req.query;
      
      let query = 'SELECT * FROM committee_members WHERE is_active = TRUE';
      const params = [];
      
      if (page_type) {
        query += ' AND page_type = ?';
        params.push(page_type);
      }
      
      query += ' ORDER BY display_order, id';
      
      const [members] = await promisePool.query(query, params);
      res.json({ success: true, members });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch committee members' });
    }
  });

  // Public certification route
  app.get('/api/certification', async (req, res) => {
    try {
      const { promisePool } = require('./config/database');
      const [certification] = await promisePool.query('SELECT * FROM certification LIMIT 1');
      res.json({ success: true, certification: certification[0] || null });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch certification' });
    }
  });

  // Public upcoming events route
  app.get('/api/upcoming-events', async (req, res) => {
    try {
      const { promisePool } = require('./config/database');
      const [events] = await promisePool.query(
        'SELECT * FROM upcoming_events WHERE is_active = TRUE ORDER BY display_order, id'
      );
      res.json({ success: true, events });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch upcoming events' });
    }
  });

  // Public contact info route
  app.get('/api/contact-info', async (req, res) => {
    try {
      const { promisePool } = require('./config/database');
      const [contactInfo] = await promisePool.query('SELECT * FROM contact_info LIMIT 1');
      res.json({ success: true, contactInfo: contactInfo[0] || null });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch contact info' });
    }
  });
  
} catch (error) {
  console.error('Error loading routes:', error);
  console.error(error.stack);
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
