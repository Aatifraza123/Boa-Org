-- Create Separate Admin Database
CREATE DATABASE IF NOT EXISTS boa_admin;
USE boa_admin;

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- Admin Sessions Table (for tracking logins)
CREATE TABLE IF NOT EXISTS admin_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id INT NOT NULL,
  token VARCHAR(500) NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  INDEX idx_token (token(255)),
  INDEX idx_admin (admin_id)
);

-- Admin Activity Log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  description TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE CASCADE,
  INDEX idx_admin (admin_id),
  INDEX idx_action (action)
);

-- Insert default admin user
-- Username: moddasier
-- Password: admin123
INSERT INTO admin_users (username, email, password, full_name, role) VALUES
('moddasier', 'moddasier@boa.com', '$2b$10$V6ceA53/WUJU1HbCw3wMGOd4ajXj4rzTbCC7DHtOz7q/Mu2XxBvXy', 'Moddasier Admin', 'super_admin');

SELECT 'Admin database created successfully!' as message;
SELECT 'Login Credentials:' as info, 'Username: moddasier' as username, 'Password: admin123' as password;
SELECT * FROM admin_users;
