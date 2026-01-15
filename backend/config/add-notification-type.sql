-- Add type column to notifications table for activity tracking
ALTER TABLE notifications 
ADD COLUMN type VARCHAR(50) DEFAULT 'announcement' AFTER message;

-- Update existing notifications to be announcements
UPDATE notifications SET type = 'announcement' WHERE type IS NULL;
