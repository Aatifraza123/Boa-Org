const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a proper admin token
const adminToken = jwt.sign(
  { id: 1, username: 'moddasier', type: 'admin' }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1h' }
);

console.log('🎯 Final Admin API Test');
console.log('======================');

console.log('\n🔑 Admin Token Generated');
console.log('Token Length:', adminToken.length);

console.log('\n📋 Test Commands:');
console.log('\n1. Test Fee Structure API:');
console.log(`curl -H "Authorization: Bearer ${adminToken}" http://localhost:5000/api/admin/fee-structure/4`);

console.log('\n2. Test Create Category:');
console.log(`curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer ${adminToken}" -d '{"seminar_id": 4, "name": "Test Category", "description": "Test", "is_popular": false, "is_enabled": true}' http://localhost:5000/api/admin/fee-categories`);

console.log('\n🎯 Admin Panel Instructions:');
console.log('1. Open: http://localhost:8080/admin-login');
console.log('2. Login: moddasier / admin123');
console.log('3. Go to: Seminar Management → Fee Structure');
console.log('4. Select: BOA Siligori 2026');
console.log('5. The fee structure should load automatically');

console.log('\n✅ Expected Result:');
console.log('- Categories: BOA Member, Non BOA Member, Accompanying Person, PG Student');
console.log('- Slabs: Early Bird, Regular, Late, Spot');
console.log('- Complete fee matrix with all amounts');

console.log('\n🔧 If adminAPI.get error persists:');
console.log('- Clear browser cache (Ctrl+Shift+R)');
console.log('- Check browser console for detailed errors');
console.log('- Verify admin login status');