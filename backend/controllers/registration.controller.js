const { promisePool } = require('../config/database');
const { ACTIVITY_TYPES, createActivityNotification } = require('../utils/activity-logger');

// Generate registration number
const generateRegistrationNo = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REG-${year}-${random}`;
};

// Generate membership number
const generateMembershipNo = async (connection) => {
  const year = new Date().getFullYear();
  
  // Get the last membership number for this year
  const [lastMembership] = await connection.query(
    `SELECT membership_no FROM users 
     WHERE membership_no LIKE ? 
     ORDER BY membership_no DESC LIMIT 1`,
    [`BOA-${year}-%`]
  );

  let serial = 1;
  if (lastMembership.length > 0) {
    // Extract serial number from last membership
    const lastNo = lastMembership[0].membership_no;
    const lastSerial = parseInt(lastNo.split('-')[2]);
    serial = lastSerial + 1;
  }

  return `BOA-${year}-${serial.toString().padStart(4, '0')}`;
};

// Create registration
exports.createRegistration = async (req, res) => {
  const connection = await promisePool.getConnection();
  
  try {
    await connection.beginTransaction();

    const userId = req.user.id;
    const {
      seminar_id,
      category_id,
      slab_id,
      delegate_type,
      amount,
      additional_persons = []
    } = req.body;

    // Convert delegate_type to proper format for ENUM
    // "BOA Member" -> "boa-member", "Non BOA Member" -> "non-boa-member", "Accompanying Person" -> "accompanying-person"
    const normalizedDelegateType = delegate_type
      .toLowerCase()
      .replace(/\s+/g, '-');

    // Generate registration number
    const registration_no = generateRegistrationNo();

    // Calculate total amount
    const additionalAmount = additional_persons.reduce((sum, person) => sum + parseFloat(person.amount), 0);
    const totalAmount = parseFloat(amount) + additionalAmount;

    // Check if user already has membership number
    const [userCheck] = await connection.query(
      'SELECT membership_no FROM users WHERE id = ?',
      [userId]
    );

    console.log('User check result:', userCheck);

    let membershipNo = userCheck[0].membership_no;

    // If user doesn't have membership number, generate one
    if (!membershipNo) {
      membershipNo = await generateMembershipNo(connection);
      
      console.log('Generated membership number:', membershipNo);
      
      // Update user with membership number
      await connection.query(
        'UPDATE users SET membership_no = ?, is_boa_member = TRUE WHERE id = ?',
        [membershipNo, userId]
      );
      
      console.log('Updated user with membership number');
    } else {
      console.log('User already has membership number:', membershipNo);
    }

    // Insert registration
    const [regResult] = await connection.query(
      `INSERT INTO registrations 
       (registration_no, user_id, seminar_id, category_id, slab_id, delegate_type, amount, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [registration_no, userId, seminar_id, category_id, slab_id, normalizedDelegateType, totalAmount]
    );

    const registrationId = regResult.insertId;

    // Insert additional persons
    if (additional_persons.length > 0) {
      const personValues = additional_persons.map(person => [
        registrationId,
        person.name,
        person.category_id,
        person.slab_id,
        person.amount
      ]);

      await connection.query(
        `INSERT INTO additional_persons (registration_id, name, category_id, slab_id, amount)
         VALUES ?`,
        [personValues]
      );
    }

    await connection.commit();

    // Get user and seminar details for notification
    const [userDetails] = await connection.query(
      'SELECT full_name FROM users WHERE id = ?',
      [userId]
    );
    
    const [seminarDetails] = await connection.query(
      'SELECT name FROM seminars WHERE id = ?',
      [seminar_id]
    );

    // Create activity notification for admin
    await createActivityNotification(ACTIVITY_TYPES.NEW_REGISTRATION, {
      name: userDetails[0]?.full_name || 'User',
      seminar_name: seminarDetails[0]?.name || 'Seminar',
      seminar_id: seminar_id
    });

    res.status(201).json({
      success: true,
      message: 'Registration created successfully',
      registration: {
        id: registrationId,
        registration_no,
        membership_no: membershipNo,
        amount: totalAmount,
        status: 'pending'
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Create registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create registration',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// Get user registrations
exports.getUserRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const [registrations] = await promisePool.query(
      `SELECT r.*, s.name as seminar_name, s.location, s.start_date, s.end_date,
       fc.name as category_name, fs.label as slab_label
       FROM registrations r
       JOIN seminars s ON r.seminar_id = s.id
       JOIN fee_categories fc ON r.category_id = fc.id
       JOIN fee_slabs fs ON r.slab_id = fs.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [userId]
    );

    // Get additional persons for each registration
    for (let reg of registrations) {
      const [persons] = await promisePool.query(
        `SELECT ap.*, fc.name as category_name, fs.label as slab_label
         FROM additional_persons ap
         JOIN fee_categories fc ON ap.category_id = fc.id
         JOIN fee_slabs fs ON ap.slab_id = fs.id
         WHERE ap.registration_id = ?`,
        [reg.id]
      );
      reg.additional_persons = persons;
    }

    res.json({
      success: true,
      count: registrations.length,
      registrations
    });

  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message
    });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, transaction_id, payment_method } = req.body;

    await promisePool.query(
      `UPDATE registrations 
       SET status = ?, transaction_id = ?, payment_method = ?, payment_date = NOW()
       WHERE id = ?`,
      [status, transaction_id, payment_method, id]
    );

    // If payment confirmed, create notification
    if (status === 'confirmed') {
      const [regDetails] = await promisePool.query(
        `SELECT r.amount, u.full_name, s.name as seminar_name, s.id as seminar_id
         FROM registrations r
         JOIN users u ON r.user_id = u.id
         JOIN seminars s ON r.seminar_id = s.id
         WHERE r.id = ?`,
        [id]
      );

      if (regDetails.length > 0) {
        await createActivityNotification(ACTIVITY_TYPES.PAYMENT_RECEIVED, {
          name: regDetails[0].full_name,
          amount: regDetails[0].amount,
          seminar_name: regDetails[0].seminar_name,
          seminar_id: regDetails[0].seminar_id
        });
      }
    }

    res.json({
      success: true,
      message: 'Payment status updated successfully'
    });

  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update payment status',
      error: error.message
    });
  }
};
