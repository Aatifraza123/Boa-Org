-- Add missing columns to membership_registrations table for membership management
ALTER TABLE membership_registrations 
ADD COLUMN status VARCHAR(50) DEFAULT 'active',
ADD COLUMN valid_from DATE NULL,
ADD COLUMN valid_until DATE NULL,
ADD COLUMN notes TEXT NULL;

-- Update existing records to have active status
UPDATE membership_registrations 
SET status = CASE 
    WHEN payment_status = 'completed' THEN 'active'
    WHEN payment_status = 'pending' THEN 'pending'
    ELSE 'active'
END
WHERE status IS NULL;

-- Show updated table structure
SHOW COLUMNS FROM membership_registrations;