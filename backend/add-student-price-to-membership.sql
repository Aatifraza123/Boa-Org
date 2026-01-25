-- Add student_price column to membership_categories table
ALTER TABLE membership_categories 
ADD COLUMN student_price DECIMAL(10,2) DEFAULT 0 AFTER price;

-- Update existing records with student prices (example values)
UPDATE membership_categories SET student_price = 600 WHERE title = 'Yearly';
UPDATE membership_categories SET student_price = 2000 WHERE title = '5-Yearly';
UPDATE membership_categories SET student_price = 0 WHERE title = 'Lifetime';

SELECT * FROM membership_categories;
