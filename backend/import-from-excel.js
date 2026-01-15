require('dotenv').config();
const ExcelJS = require('exceljs');
const { importOfflineUsers } = require('./utils/bulk-user-import');

/**
 * IMPORT USERS FROM EXCEL FILE
 * 
 * How to use:
 * 1. Create Excel file with columns: membership_no, title, first_name, surname, email, mobile, password
 * 2. Save as: offline-users.xlsx
 * 3. Run: node import-from-excel.js
 */

async function importFromExcel() {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('offline-users.xlsx');
    
    const worksheet = workbook.getWorksheet(1);
    const users = [];

    // Skip header row, start from row 2
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header

      const user = {
        membership_no: row.getCell(1).value,
        title: row.getCell(2).value || 'Dr.',
        first_name: row.getCell(3).value,
        surname: row.getCell(4).value || '',
        email: row.getCell(5).value || `${row.getCell(1).value}@temp.com`,
        mobile: row.getCell(6).value || '',
        password: row.getCell(7).value || row.getCell(1).value, // Default: membership_no
        gender: row.getCell(8).value || 'male',
        address: {
          city: row.getCell(9).value || 'Patna',
          state: row.getCell(10).value || 'Bihar',
          pin_code: row.getCell(11).value || '800001'
        }
      };

      if (user.membership_no) {
        users.push(user);
      }
    });

    console.log(`Found ${users.length} users in Excel file\n`);

    const results = await importOfflineUsers(users);

    console.log('\n=== IMPORT RESULTS ===');
    console.log(`Total: ${results.total}`);
    console.log(`Success: ${results.success.length}`);
    console.log(`Failed: ${results.failed.length}\n`);

    if (results.success.length > 0) {
      console.log('✅ Successfully imported:');
      results.success.forEach(user => {
        console.log(`  - ${user.membership_no}: ${user.name}`);
      });
    }

    if (results.failed.length > 0) {
      console.log('\n❌ Failed:');
      results.failed.forEach(fail => {
        console.log(`  - ${fail.membership_no}: ${fail.reason}`);
      });
    }

    console.log('\n✅ Import completed!\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nMake sure offline-users.xlsx exists in backend folder');
    console.log('Excel format: membership_no | title | first_name | surname | email | mobile | password | gender | city | state | pin_code');
    process.exit(1);
  }
}

importFromExcel();
