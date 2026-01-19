const mysql = require('mysql2/promise');
require('dotenv').config();

async function addStatusColumn() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'boa_db'
    });

    console.log('Connected to database...');

    // Check if column already exists
    const [columns] = await connection.query(
      `SHOW COLUMNS FROM seminars LIKE 'status'`
    );

    if (columns.length > 0) {
      console.log('✓ Status column already exists!');
      
      // Update existing seminars to have 'active' status if null
      await connection.query(
        `UPDATE seminars SET status = 'active' WHERE status IS NULL OR status = ''`
      );
      console.log('✓ Updated existing seminars to have active status');
      
    } else {
      // Add status column
      await connection.query(
        `ALTER TABLE seminars 
         ADD COLUMN status VARCHAR(20) DEFAULT 'active' 
         COMMENT 'Event status: active (upcoming) or previous (completed)' 
         AFTER is_active`
      );
      console.log('✓ Status column added successfully!');

      // Update existing seminars
      await connection.query(
        `UPDATE seminars SET status = 'active' WHERE status IS NULL`
      );
      console.log('✓ Updated existing seminars to have active status');
    }

    // Show current seminars
    const [seminars] = await connection.query(
      `SELECT id, name, status, is_active FROM seminars`
    );
    
    console.log('\nCurrent Seminars:');
    console.table(seminars);

    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

addStatusColumn();
