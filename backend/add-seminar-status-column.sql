-- Add status column to seminars table
ALTER TABLE seminars 
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER is_active;

-- Update existing seminars to have 'active' status
UPDATE seminars SET status = 'active' WHERE status IS NULL;

-- Add comment
ALTER TABLE seminars 
MODIFY COLUMN status VARCHAR(20) DEFAULT 'active' COMMENT 'Event status: active (upcoming) or previous (completed)';
