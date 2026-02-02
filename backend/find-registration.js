const { promisePool } = require('./config/database');

async function findRegistration() {
  try {
    console.log('=== FINDING RECENT REGISTRATIONS ===\n');

    // Find the most recent registration
    const [recentRegs] = await promisePool.query(
      `SELECT r.*, u.email as user_email, u.first_name, u.surname
       FROM registrations r
       LEFT JOIN users u ON r.user_id = u.id
       ORDER BY r.created_at DESC
       LIMIT 5`
    );

    console.log('Recent registrations:');
    recentRegs.forEach((reg, i) => {
      console.log(`\n${i + 1}. Registration ${reg.registration_no}`);
      console.log('   User ID:', reg.user_id || 'NULL (Guest)');
      console.log('   User Email:', reg.user_email || reg.guest_email || 'N/A');
      console.log('   User Name:', reg.first_name ? `${reg.first_name} ${reg.surname}` : reg.guest_name || 'N/A');
      console.log('   Status:', reg.status);
      console.log('   Amount:', reg.amount);
      console.log('   Payment ID:', reg.razorpay_payment_id || 'N/A');
      console.log('   Created:', reg.created_at);
    });

    // Find registrations with email modassirmallick@gmail.com
    console.log('\n=== SEARCHING FOR modassirmallick@gmail.com ===\n');
    
    const [emailRegs] = await promisePool.query(
      `SELECT r.*, u.email as user_email
       FROM registrations r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE u.email = ? OR r.guest_email = ?
       ORDER BY r.created_at DESC`,
      ['modassirmallick@gmail.com', 'modassirmallick@gmail.com']
    );

    if (emailRegs.length === 0) {
      console.log('❌ No registrations found with this email');
    } else {
      console.log(`✅ Found ${emailRegs.length} registration(s):`);
      emailRegs.forEach((reg, i) => {
        console.log(`\n${i + 1}. Registration ${reg.registration_no}`);
        console.log('   User ID:', reg.user_id || 'NULL (Guest)');
        console.log('   Status:', reg.status);
        console.log('   Amount:', reg.amount);
        console.log('   Created:', reg.created_at);
        
        if (reg.user_id === null) {
          console.log('   ⚠️  This is a GUEST registration (user_id is NULL)');
          console.log('   💡 Need to update user_id to 28');
        } else if (reg.user_id !== 28) {
          console.log(`   ⚠️  This registration belongs to user_id ${reg.user_id}, not 28`);
        }
      });

      // Offer to fix
      const guestRegs = emailRegs.filter(r => r.user_id === null);
      if (guestRegs.length > 0) {
        console.log(`\n💡 SOLUTION: Update ${guestRegs.length} guest registration(s) to user_id 28`);
        console.log('\nRun this SQL to fix:');
        guestRegs.forEach(reg => {
          console.log(`UPDATE registrations SET user_id = 28 WHERE id = ${reg.id};`);
        });
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

findRegistration();
