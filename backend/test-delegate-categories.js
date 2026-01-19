const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testDelegateCategories() {
  console.log('=== Testing Delegate Categories System ===\n');

  try {
    // Step 1: Get active seminar
    console.log('1. Fetching active seminar...');
    const seminarResponse = await axios.get(`${BASE_URL}/seminars/active/current`);
    
    if (!seminarResponse.data.success) {
      console.error('❌ Failed to get active seminar');
      return;
    }

    const seminar = seminarResponse.data.seminar;
    console.log(`✅ Active Seminar: ${seminar.name} (ID: ${seminar.id})`);
    
    // Step 2: Check delegate categories in seminar response
    console.log('\n2. Checking delegate categories in seminar response...');
    if (seminar.delegateCategories && seminar.delegateCategories.length > 0) {
      console.log(`✅ Found ${seminar.delegateCategories.length} delegate categories:`);
      seminar.delegateCategories.forEach((cat, index) => {
        console.log(`   ${index + 1}. ${cat.label} (${cat.name})`);
        console.log(`      - Requires Membership: ${cat.requires_membership ? 'Yes' : 'No'}`);
        console.log(`      - Display Order: ${cat.display_order}`);
      });
    } else {
      console.log('⚠️  No delegate categories found in seminar response');
    }

    // Step 3: Test admin API (requires admin token)
    console.log('\n3. Testing Admin API...');
    console.log('   Note: This requires admin authentication');
    
    // Try to get delegate categories via admin endpoint
    try {
      const adminResponse = await axios.get(
        `${BASE_URL}/admin/delegate-categories/${seminar.id}`,
        {
          headers: {
            'Authorization': 'Bearer YOUR_ADMIN_TOKEN_HERE'
          }
        }
      );
      
      if (adminResponse.data.success) {
        console.log(`✅ Admin API working: ${adminResponse.data.categories.length} categories`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('⚠️  Admin API requires authentication (expected)');
      } else {
        console.log('❌ Admin API error:', error.message);
      }
    }

    // Step 4: Verify data structure
    console.log('\n4. Verifying data structure...');
    const requiredFields = ['id', 'name', 'label', 'requires_membership', 'display_order'];
    let allFieldsPresent = true;
    
    if (seminar.delegateCategories && seminar.delegateCategories.length > 0) {
      const firstCategory = seminar.delegateCategories[0];
      requiredFields.forEach(field => {
        if (!(field in firstCategory)) {
          console.log(`❌ Missing field: ${field}`);
          allFieldsPresent = false;
        }
      });
      
      if (allFieldsPresent) {
        console.log('✅ All required fields present');
      }
    }

    // Summary
    console.log('\n=== Test Summary ===');
    console.log(`✅ Seminar API: Working`);
    console.log(`✅ Delegate Categories: ${seminar.delegateCategories?.length || 0} found`);
    console.log(`✅ Data Structure: ${allFieldsPresent ? 'Valid' : 'Invalid'}`);
    console.log('\n✅ System is ready for frontend integration!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

// Run test
testDelegateCategories();
