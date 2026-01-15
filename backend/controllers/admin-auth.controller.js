const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminPromisePool } = require('../config/admin-db');

// Admin Login
exports.adminLogin = async (req, res) => {
  console.log('Admin login request received:', req.body);
  
  try {
    const { username, password } = req.body;

    console.log('Looking for admin:', username);
    console.log('Password provided:', password ? 'YES' : 'NO');

    // Find admin by username or email
    const [admins] = await adminPromisePool.query(
      'SELECT * FROM admin_users WHERE (username = ? OR email = ?) AND is_active = TRUE',
      [username, username]
    );

    console.log('Admin found:', admins.length > 0);

    if (admins.length === 0) {
      console.log('Admin not found - returning 401');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const admin = admins[0];
    console.log('Admin data:', { id: admin.id, username: admin.username, email: admin.email });
    console.log('Password hash from DB:', admin.password);

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password - returning 401');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('Password verified successfully!');

    // Update last login
    await adminPromisePool.query(
      'UPDATE admin_users SET last_login = NOW() WHERE id = ?',
      [admin.id]
    );

    // Log activity
    await adminPromisePool.query(
      'INSERT INTO admin_activity_log (admin_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
      [admin.id, 'LOGIN', 'Admin logged in', req.ip]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        role: admin.role,
        type: 'admin'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    delete admin.password;

    console.log('Login successful - sending response');

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// Get Admin Profile
exports.getAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const [admins] = await adminPromisePool.query(
      'SELECT id, username, email, full_name, role, is_active, last_login, created_at FROM admin_users WHERE id = ?',
      [adminId]
    );

    if (admins.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      admin: admins[0]
    });

  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { full_name, email, current_password, new_password } = req.body;

    // If changing password, verify current password
    if (new_password) {
      if (!current_password) {
        return res.status(400).json({
          success: false,
          message: 'Current password is required to change password'
        });
      }

      const [admins] = await adminPromisePool.query(
        'SELECT password FROM admin_users WHERE id = ?',
        [adminId]
      );

      if (admins.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }

      const isValidPassword = await bcrypt.compare(current_password, admins[0].password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(new_password, 10);
      await adminPromisePool.query(
        'UPDATE admin_users SET password = ? WHERE id = ?',
        [hashedPassword, adminId]
      );
    }

    // Update profile info
    await adminPromisePool.query(
      'UPDATE admin_users SET full_name = ?, email = ? WHERE id = ?',
      [full_name, email, adminId]
    );

    // Log activity
    await adminPromisePool.query(
      'INSERT INTO admin_activity_log (admin_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
      [adminId, 'PROFILE_UPDATE', 'Admin updated profile', req.ip]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

// Admin Logout
exports.adminLogout = async (req, res) => {
  try {
    const adminId = req.admin.id;

    // Log activity
    await adminPromisePool.query(
      'INSERT INTO admin_activity_log (admin_id, action, description, ip_address) VALUES (?, ?, ?, ?)',
      [adminId, 'LOGOUT', 'Admin logged out', req.ip]
    );

    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Admin logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
};
