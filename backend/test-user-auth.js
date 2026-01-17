const jwt = require('jsonwebtoken');
require('dotenv').config();

console.log('🔍 Testing User Authentication');
console.log('==============================');

// Test with the known user credentials
const testUserId = 10; // BOA/LM/0002/2023 user ID

// Create a valid user token
const userToken = jwt.sign(
  { id: testUserId }, 
  process.env.JWT_SECRET, 
  { expiresIn: '7d' }
);

console.log('\n🔑 Valid User Token Generated:');
console.log('Token Length:', userToken.length);
console.log('User ID:', testUserId);

console.log('\n📋 Test Commands:');

console.log('\n1. Test Get Profile:');
console.log(`curl -H "Authorization: Bearer ${userToken}" http://localhost:5000/api/users/profile`);

console.log('\n2. Test Update Profile:');
console.log(`curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer ${userToken}" -d '{"first_name": "Updated Name"}' http://localhost:5000/api/users/profile`);

console.log('\n🎯 User Login Instructions:');
console.log('1. Go to: http://localhost:8080/login');
console.log('2. Use Membership Login');
console.log('3. Membership: BOA/LM/0002/2023');
console.log('4. Password: User@123');
console.log('5. After login, try updating profile in Dashboard');

console.log('\n🔧 If error persists:');
console.log('- Clear browser localStorage');
console.log('- Hard refresh (Ctrl+Shift+R)');
console.log('- Check browser console for token issues');