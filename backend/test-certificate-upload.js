const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testCertificateUpload() {
  try {
    // Login as admin first
    const loginResponse = await axios.post('http://localhost:5000/api/admin-auth/login', {
      email: 'admin@boabihar.org',
      password: 'admin123'
    });
    
    const token = loginResponse.data.token;
    console.log('✓ Admin logged in');
    
    // Create a test file
    const testContent = 'Test certificate content';
    fs.writeFileSync('test-cert.txt', testContent);
    
    // Upload certificate
    const formData = new FormData();
    formData.append('user_id', '1');
    formData.append('certificate_name', 'Test Certificate');
    formData.append('issued_date', '2024-01-01');
    formData.append('description', 'Test description');
    formData.append('certificate', fs.createReadStream('test-cert.txt'));
    
    const uploadResponse = await axios.post('http://localhost:5000/api/certificates/add', formData, {
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✓ Upload successful:', uploadResponse.data);
    
    // Cleanup
    fs.unlinkSync('test-cert.txt');
    
  } catch (error) {
    if (error.response) {
      console.log('✗ API Error:', error.response.status);
      console.log('Error data:', error.response.data);
    } else {
      console.log('✗ Error:', error.message);
    }
  }
}

testCertificateUpload();
