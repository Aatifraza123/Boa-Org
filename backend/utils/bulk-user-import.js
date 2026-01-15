const bcrypt = require('bcryptjs');
const { promisePool } = require('../config/database');

/**
 * Bulk import offline registered users
 * Users can login with membership_no and password
 */

async function importOfflineUsers(users) {
  const connection = await promisePool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const results = {
      success: [],
      failed: [],
      total: users.length
    };

    for (const user of users) {
      try {
        // Check if membership number already exists
        const [existing] = await connection.query(
          'SELECT id FROM users WHERE membership_no = ?',
          [user.membership_no]
        );

        if (existing.length > 0) {
          results.failed.push({
            membership_no: user.membership_no,
            reason: 'Membership number already exists'
          });
          continue;
        }

        // Hash password (default: membership_no if not provided)
        const password = user.password || user.membership_no;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [userResult] = await connection.query(
          `INSERT INTO users (
            title, first_name, surname, email, password, mobile, phone,
            gender, dob, membership_no, is_boa_member, is_active, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, TRUE, NOW())`,
          [
            user.title || 'Dr.',
            user.first_name,
            user.surname || '',
            user.email || `${user.membership_no}@temp.com`,
            hashedPassword,
            user.mobile || '',
            user.phone || '',
            user.gender || 'male',
            user.dob || '1980-01-01',
            user.membership_no
          ]
        );

        const userId = userResult.insertId;

        // Insert address if provided
        if (user.address) {
          await connection.query(
            `INSERT INTO addresses (
              user_id, house, street, landmark, city, state, country, pin_code
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              userId,
              user.address.house || '',
              user.address.street || '',
              user.address.landmark || '',
              user.address.city || 'Patna',
              user.address.state || 'Bihar',
              user.address.country || 'India',
              user.address.pin_code || '800001'
            ]
          );
        }

        results.success.push({
          membership_no: user.membership_no,
          user_id: userId,
          name: `${user.title} ${user.first_name} ${user.surname}`
        });

      } catch (error) {
        results.failed.push({
          membership_no: user.membership_no,
          reason: error.message
        });
      }
    }

    await connection.commit();
    return results;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { importOfflineUsers };
