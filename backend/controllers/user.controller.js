const { promisePool } = require('../config/database');

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [users] = await promisePool.query(
      `SELECT u.*, a.house, a.street, a.landmark, a.city, a.state, a.country, a.pin_code
       FROM users u
       LEFT JOIN addresses a ON u.id = a.user_id
       WHERE u.id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];
    delete user.password;

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const connection = await promisePool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const userId = req.user.id;
    const {
      title, first_name, surname, mobile, phone, gender, dob,
      house, street, landmark, city, state, country, pin_code
    } = req.body;

    console.log('Updating profile for user:', userId);
    console.log('Update data:', req.body);

    // Update user
    await connection.query(
      `UPDATE users SET 
       title = COALESCE(?, title), 
       first_name = COALESCE(?, first_name), 
       surname = COALESCE(?, surname), 
       mobile = COALESCE(?, mobile), 
       phone = ?, 
       gender = COALESCE(?, gender), 
       dob = ?
       WHERE id = ?`,
      [title, first_name, surname, mobile, phone, gender, dob, userId]
    );

    // Check if address exists
    const [existingAddress] = await connection.query(
      'SELECT id FROM addresses WHERE user_id = ?',
      [userId]
    );

    if (existingAddress.length > 0) {
      // Update existing address
      await connection.query(
        `UPDATE addresses SET 
         house = ?, 
         street = ?, 
         landmark = ?, 
         city = ?, 
         state = ?, 
         country = ?, 
         pin_code = ?
         WHERE user_id = ?`,
        [house || '', street || '', landmark || '', city || '', state || '', country || 'India', pin_code || '000000', userId]
      );
    } else if (city || state) {
      // Insert new address only if at least city or state is provided
      await connection.query(
        `INSERT INTO addresses (user_id, house, street, landmark, city, state, country, pin_code)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, house || '', street || '', landmark || '', city || '', state || '', country || 'India', pin_code || '000000']
      );
    }

    await connection.commit();

    console.log('Profile updated successfully for user:', userId);

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Update profile error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    // Get user with password
    const [users] = await promisePool.query(
      'SELECT id, password FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];

    // Verify current password
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(current_password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await promisePool.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message
    });
  }
};
