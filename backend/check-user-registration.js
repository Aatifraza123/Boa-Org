const { promisePool } = require('./config/database');

async function checkUserRegistration() {
  try {
    // Check for user with email modassirmallick@gmail.com
    const [users] = await promisePool.query(
      'SELECT id, email, first_name, surname, membership_no FROM users WHERE email = ?',
      ['modassirmallick@gmail.com']
    );

    if (users.length === 0) {
      console.log('User not found with email: modassirmallick@gmail.com');
      return;
    }

    const user = users[0];
    console.log('\n=== USER DETAILS ===');
    console.log('ID:', user.id);
    console.log('Email:', user.email);
    console.log('Name:', user.first_name, user.surname);
    console.log('Membership No:', user.membership_no);

    // Check all registrations for this user
    const [registrations] = await promisePool.query(
      `SELECT r.*, s.name as seminar_name
       FROM registrations r
       LEFT JOIN seminars s ON r.seminar_id = s.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [user.id]
    );

    console.log('\n=== REGISTRATIONS ===');
    console.log('Total registrations found:', registrations.length);
    
    if (registrations.length > 0) {
      registrations.forEach((reg, index) => {
        console.log(`\n--- Registration ${index + 1} ---`);
        console.log('ID:', reg.id);
        console.log('Registration No:', reg.registration_no);
        console.log('Seminar:', reg.seminar_name);
        console.log('Status:', reg.status);
        console.log('Amount:', reg.amount);
        console.log('Payment Method:', reg.payment_method);
        console.log('Razorpay Order ID:', reg.razorpay_order_id);
        console.log('Razorpay Payment ID:', reg.razorpay_payment_id);
        console.log('Created At:', reg.created_at);
      });
    } else {
      console.log('No registrations found for this user');
    }

    // Check if there are any registrations with status 'confirmed' that should be 'completed'
    const [confirmedRegs] = await promisePool.query(
      `SELECT * FROM registrations 
       WHERE user_id = ? AND status = 'confirmed' AND razorpay_payment_id IS NOT NULL`,
      [user.id]
    );

    if (confirmedRegs.length > 0) {
      console.log('\n=== ISSUE FOUND ===');
      console.log(`Found ${confirmedRegs.length} registration(s) with status 'confirmed' but has payment_id`);
      console.log('These should be updated to status "completed"');
      
      // Fix them
      const [result] = await promisePool.query(
        `UPDATE registrations 
         SET status = 'completed'
         WHERE user_id = ? AND status = 'confirmed' AND razorpay_payment_id IS NOT NULL`,
        [user.id]
      );
      
      console.log(`Updated ${result.affectedRows} registration(s) to status "completed"`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkUserRegistration();
