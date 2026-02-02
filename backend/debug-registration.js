const { promisePool } = require('./config/database');

async function debugRegistration() {
  try {
    console.log('=== DEBUGGING REGISTRATION ISSUE ===\n');

    // 1. Find the user
    const userEmail = 'modassirmallick@gmail.com';
    const [users] = await promisePool.query(
      'SELECT id, email, first_name, surname, membership_no FROM users WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      console.log('❌ User not found with email:', userEmail);
      process.exit(1);
    }

    const user = users[0];
    console.log('✅ User found:');
    console.log('   ID:', user.id);
    console.log('   Email:', user.email);
    console.log('   Name:', user.first_name, user.surname);
    console.log('   Membership No:', user.membership_no);

    // 2. Check all registrations for this user
    const [allRegs] = await promisePool.query(
      'SELECT * FROM registrations WHERE user_id = ? ORDER BY created_at DESC',
      [user.id]
    );

    console.log('\n=== ALL REGISTRATIONS ===');
    console.log('Total registrations:', allRegs.length);

    if (allRegs.length === 0) {
      console.log('❌ No registrations found for this user');
      
      // Check if there are any registrations with this email in guest fields
      const [guestRegs] = await promisePool.query(
        'SELECT * FROM registrations WHERE guest_email = ? ORDER BY created_at DESC',
        [userEmail]
      );
      
      if (guestRegs.length > 0) {
        console.log('\n⚠️  Found registrations as GUEST (not linked to user_id):');
        guestRegs.forEach((reg, i) => {
          console.log(`\n   Guest Registration ${i + 1}:`);
          console.log('   ID:', reg.id);
          console.log('   Registration No:', reg.registration_no);
          console.log('   Guest Name:', reg.guest_name);
          console.log('   Guest Email:', reg.guest_email);
          console.log('   Status:', reg.status);
          console.log('   Amount:', reg.amount);
          console.log('   Created:', reg.created_at);
        });
        
        console.log('\n💡 SOLUTION: These guest registrations need to be linked to user_id:', user.id);
      }
      
      process.exit(0);
    }

    // 3. Display all registrations
    allRegs.forEach((reg, index) => {
      console.log(`\n--- Registration ${index + 1} ---`);
      console.log('ID:', reg.id);
      console.log('Registration No:', reg.registration_no);
      console.log('User ID:', reg.user_id);
      console.log('Seminar ID:', reg.seminar_id);
      console.log('Status:', reg.status);
      console.log('Amount:', reg.amount);
      console.log('Payment Method:', reg.payment_method);
      console.log('Razorpay Order ID:', reg.razorpay_order_id);
      console.log('Razorpay Payment ID:', reg.razorpay_payment_id);
      console.log('Transaction ID:', reg.transaction_id);
      console.log('Created At:', reg.created_at);
    });

    // 4. Test the exact query used by getUserRegistrations
    console.log('\n=== TESTING getUserRegistrations QUERY ===');
    const [testRegs] = await promisePool.query(
      `SELECT r.*, s.name as seminar_name, s.location, s.start_date, s.end_date,
       fc.name as category_name, fs.label as slab_label
       FROM registrations r
       LEFT JOIN seminars s ON r.seminar_id = s.id
       LEFT JOIN fee_categories fc ON r.category_id = fc.id
       LEFT JOIN fee_slabs fs ON r.slab_id = fs.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [user.id]
    );

    console.log('Query returned:', testRegs.length, 'registrations');
    
    if (testRegs.length > 0) {
      console.log('\n✅ Query works! Registrations found:');
      testRegs.forEach((reg, i) => {
        console.log(`\n   ${i + 1}. ${reg.registration_no}`);
        console.log('      Seminar:', reg.seminar_name || 'NULL');
        console.log('      Category:', reg.category_name || 'NULL');
        console.log('      Slab:', reg.slab_label || 'NULL');
        console.log('      Status:', reg.status);
      });
    } else {
      console.log('❌ Query returned no results - this is the problem!');
    }

    // 5. Check for orphaned registrations (missing foreign keys)
    console.log('\n=== CHECKING DATA INTEGRITY ===');
    
    for (const reg of allRegs) {
      const issues = [];
      
      // Check seminar
      const [seminar] = await promisePool.query('SELECT id, name FROM seminars WHERE id = ?', [reg.seminar_id]);
      if (seminar.length === 0) {
        issues.push(`Seminar ID ${reg.seminar_id} not found`);
      }
      
      // Check category
      const [category] = await promisePool.query('SELECT id, name FROM fee_categories WHERE id = ?', [reg.category_id]);
      if (category.length === 0) {
        issues.push(`Category ID ${reg.category_id} not found`);
      }
      
      // Check slab
      const [slab] = await promisePool.query('SELECT id, label FROM fee_slabs WHERE id = ?', [reg.slab_id]);
      if (slab.length === 0) {
        issues.push(`Slab ID ${reg.slab_id} not found`);
      }
      
      if (issues.length > 0) {
        console.log(`\n⚠️  Registration ${reg.registration_no} has issues:`);
        issues.forEach(issue => console.log('   -', issue));
      }
    }

    console.log('\n=== DEBUG COMPLETE ===');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

debugRegistration();
