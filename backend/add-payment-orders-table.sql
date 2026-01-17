-- Create payment_orders table for tracking Razorpay orders
CREATE TABLE IF NOT EXISTS payment_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL UNIQUE,
    payment_id VARCHAR(255) NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status ENUM('created', 'paid', 'captured', 'failed', 'cancelled') DEFAULT 'created',
    payment_method VARCHAR(50) NULL,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order_id (order_id),
    INDEX idx_payment_id (payment_id),
    INDEX idx_status (status)
);

-- Add Razorpay columns to existing registrations table
ALTER TABLE registrations 
ADD COLUMN razorpay_order_id VARCHAR(255) NULL AFTER transaction_id,
ADD COLUMN razorpay_payment_id VARCHAR(255) NULL AFTER razorpay_order_id,
ADD INDEX idx_razorpay_order_id (razorpay_order_id),
ADD INDEX idx_razorpay_payment_id (razorpay_payment_id);

-- Add Razorpay columns to membership_registrations table
ALTER TABLE membership_registrations 
ADD COLUMN razorpay_order_id VARCHAR(255) NULL AFTER transaction_id,
ADD COLUMN razorpay_payment_id VARCHAR(255) NULL AFTER razorpay_order_id,
ADD COLUMN amount DECIMAL(10,2) NULL AFTER razorpay_payment_id,
ADD INDEX idx_razorpay_order_id (razorpay_order_id),
ADD INDEX idx_razorpay_payment_id (razorpay_payment_id);