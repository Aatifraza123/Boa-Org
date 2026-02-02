const mysql = require('mysql2/promise');
require('dotenv').config();

async function createStatsTable() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    console.log('Connected to database');

    // Create stats table
    console.log('\n=== CREATING STATS TABLE ===');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS stats (
        id INT PRIMARY KEY AUTO_INCREMENT,
        stat_key VARCHAR(100) NOT NULL UNIQUE,
        stat_value VARCHAR(50) NOT NULL,
        stat_label VARCHAR(100) NOT NULL,
        stat_icon VARCHAR(50) NOT NULL,
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Stats table created successfully');

    // Insert default stats data
    console.log('\n=== INSERTING DEFAULT STATS DATA ===');
    await connection.query(`
      INSERT INTO stats (stat_key, stat_value, stat_label, stat_icon, display_order) VALUES
      ('total_members', '500', 'Active Members', 'Users', 1),
      ('years_of_service', '3', 'Years of Service', 'Calendar', 2),
      ('seminars_conducted', '25', 'Seminars Conducted', 'Award', 3),
      ('districts_covered', '38', 'Districts Covered', 'MapPin', 4)
      ON DUPLICATE KEY UPDATE 
        stat_value = VALUES(stat_value),
        stat_label = VALUES(stat_label),
        updated_at = CURRENT_TIMESTAMP
    `);
    console.log('✓ Default stats data inserted');

    console.log('\n✅ Stats table created successfully!');

  } catch (error) {
    console.error('❌ Error creating stats table:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

createStatsTable();
