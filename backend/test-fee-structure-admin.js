const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create admin token
const adminToken = jwt.sign(
  { id: 1, username: 'moddasier', type: 'admin' }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1h' }
);

console.log('🔑 Admin Token for testing:');
console.log(adminToken);
console.log('\n📋 Test Commands:');

console.log('\n1. Get Fee Structure:');
console.log(`curl -H "Authorization: Bearer ${adminToken}" http://localhost:5000/api/admin/fee-structure/4`);

console.log('\n2. Create Fee Category:');
console.log(`curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${adminToken}" -d '{"seminar_id": 4, "name": "Test Category", "description": "Test description", "is_popular": false, "is_enabled": true}' http://localhost:5000/api/admin/fee-categories`);

console.log('\n3. Create Fee Slab:');
console.log(`curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${adminToken}" -d '{"seminar_id": 4, "label": "Test Slab", "date_range": "Test Period", "start_date": "2026-01-01", "end_date": "2026-12-31"}' http://localhost:5000/api/admin/fee-slabs`);

console.log('\n4. Update Fee Amount:');
console.log(`curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${adminToken}" -d '{"category_id": 16, "slab_id": 11, "amount": 5000}' http://localhost:5000/api/admin/fee-amount`);

console.log('\n🎯 Admin Panel Access:');
console.log('1. Login: http://localhost:8080/admin-login');
console.log('2. Username: moddasier');
console.log('3. Password: admin123');
console.log('4. Go to: Seminar Management → Fee Structure');