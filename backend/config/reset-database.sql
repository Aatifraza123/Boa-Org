-- Reset Database - Delete all data and reset AUTO_INCREMENT
USE boa_connect;

-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Delete all data from tables
TRUNCATE TABLE additional_persons;
TRUNCATE TABLE registrations;
TRUNCATE TABLE notifications;
TRUNCATE TABLE fee_structure;
TRUNCATE TABLE fee_slabs;
TRUNCATE TABLE fee_categories;
TRUNCATE TABLE seminars;
TRUNCATE TABLE addresses;
TRUNCATE TABLE users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Verify all tables are empty and AUTO_INCREMENT is reset to 1
SELECT 'Users table reset' as status, COUNT(*) as count FROM users;
SELECT 'Addresses table reset' as status, COUNT(*) as count FROM addresses;
SELECT 'Seminars table reset' as status, COUNT(*) as count FROM seminars;
SELECT 'Fee Categories table reset' as status, COUNT(*) as count FROM fee_categories;
SELECT 'Fee Slabs table reset' as status, COUNT(*) as count FROM fee_slabs;
SELECT 'Registrations table reset' as status, COUNT(*) as count FROM registrations;
SELECT 'Notifications table reset' as status, COUNT(*) as count FROM notifications;

SELECT 'Database reset complete! All tables are empty and IDs will start from 1.' as message;
