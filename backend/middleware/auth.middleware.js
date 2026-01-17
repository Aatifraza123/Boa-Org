const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log('=== AUTH MIDDLEWARE ===');
    console.log('Path:', req.path);
    console.log('Method:', req.method);
    
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token present:', !!token);

    if (!token) {
      console.log('No token provided');
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded, user ID:', decoded.id);
    req.user = decoded;
    console.log('Auth successful');
    console.log('======================');
    next();

  } catch (error) {
    console.error('Auth error:', error.message);
    console.log('======================');
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};
