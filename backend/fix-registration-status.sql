-- Fix registration status from 'confirmed' to 'completed' for paid registrations
-- This script updates registrations that have razorpay_payment_id but status is still 'confirmed'

UPDATE registrations 
SET status = 'completed'
WHERE razorpay_payment_id IS NOT NULL 
  AND razorpay_payment_id != ''
  AND status = 'confirmed';

-- Check the results
SELECT 
  id,
  registration_no,
  user_id,
  status,
  payment_method,
  razorpay_payment_id,
  created_at
FROM registrations
WHERE razorpay_payment_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;
