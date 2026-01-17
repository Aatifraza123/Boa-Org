const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function addStudentCategories() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('🎯 Adding Missing Student Membership Categories');
  console.log('===============================================');

  try {
    // Add Yearly Student
    await connection.query(
      `INSERT INTO membership_categories (title, icon, category, price, duration, features, is_recommended, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Yearly Student',
        'GraduationCap', 
        'student_fee',
        600.00,
        'Per year',
        JSON.stringify(['Student access to BOA benefits', 'Discounted event registration', 'Educational resources access']),
        false,
        4,
        true
      ]
    );
    console.log('✅ Added: Yearly Student - ₹600');

    // Add 5-Yearly Student
    await connection.query(
      `INSERT INTO membership_categories (title, icon, category, price, duration, features, is_recommended, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        '5-Yearly Student',
        'GraduationCap',
        'student_fee', 
        2000.00,
        '5 years',
        JSON.stringify(['Extended student benefits', 'Long-term educational access', 'Discounted events for 5 years']),
        false,
        5,
        true
      ]
    );
    console.log('✅ Added: 5-Yearly Student - ₹2,000');

    // Show updated categories
    console.log('\n📋 Updated Membership Categories:');
    const [categories] = await connection.query('SELECT * FROM membership_categories ORDER BY display_order');
    categories.forEach(cat => {
      console.log(`- ${cat.title}: ₹${cat.price} (${cat.duration})`);
    });

    console.log('\n🎯 Complete Membership Fee Structure:');
    console.log('=====================================');
    console.log('Passout Categories:');
    console.log('- Yearly: ₹1,200');
    console.log('- 5-Yearly: ₹5,000'); 
    console.log('- Lifetime: ₹8,000');
    console.log('\nStudent Categories:');
    console.log('- Yearly Student: ₹600');
    console.log('- 5-Yearly Student: ₹2,000');

    console.log('\n✅ All categories are now dynamic and manageable via Admin Panel!');
    console.log('🎯 Access: Admin Panel → Membership → Membership Plans');

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('⚠️ Student categories already exist');
    } else {
      console.error('❌ Error:', error.message);
    }
  } finally {
    await connection.end();
  }
}

addStudentCategories();