-- Create Database
CREATE DATABASE IF NOT EXISTS boa_connect;
USE boa_connect;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(10),
  first_name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  gender ENUM('male', 'female', 'other'),
  dob DATE,
  membership_no VARCHAR(50) UNIQUE,
  is_boa_member BOOLEAN DEFAULT FALSE,
  role ENUM('user', 'admin') DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_membership (membership_no)
);

-- Address Table
CREATE TABLE IF NOT EXISTS addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  house VARCHAR(100),
  street VARCHAR(255),
  landmark VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'India',
  pin_code VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seminars Table
CREATE TABLE IF NOT EXISTS seminars (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  registration_start DATE NOT NULL,
  registration_end DATE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (is_active),
  INDEX idx_dates (start_date, end_date)
);

-- Fee Categories Table
CREATE TABLE IF NOT EXISTS fee_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seminar_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_popular BOOLEAN DEFAULT FALSE,
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE
);

-- Fee Slabs Table
CREATE TABLE IF NOT EXISTS fee_slabs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seminar_id INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  date_range VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE
);

-- Fee Structure Table (Junction table for categories and slabs)
CREATE TABLE IF NOT EXISTS fee_structure (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  slab_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES fee_categories(id) ON DELETE CASCADE,
  FOREIGN KEY (slab_id) REFERENCES fee_slabs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_category_slab (category_id, slab_id)
);

-- Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  registration_no VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  seminar_id INT NOT NULL,
  category_id INT NOT NULL,
  slab_id INT NOT NULL,
  delegate_type ENUM('boa-member', 'non-boa-member', 'accompanying-person') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  payment_date TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES fee_categories(id),
  FOREIGN KEY (slab_id) REFERENCES fee_slabs(id),
  INDEX idx_user (user_id),
  INDEX idx_seminar (seminar_id),
  INDEX idx_status (status)
);

-- Additional Persons Table
CREATE TABLE IF NOT EXISTS additional_persons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  registration_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  slab_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES fee_categories(id),
  FOREIGN KEY (slab_id) REFERENCES fee_slabs(id)
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  seminar_id INT,
  message TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE SET NULL,
  INDEX idx_active (is_active)
);

-- Insert Sample Data
INSERT INTO seminars (name, location, venue, start_date, end_date, registration_start, registration_end, description, is_active) VALUES
('BOA 2026, Siliguri', 'Siliguri, West Bengal', 'Siliguri Convention Center', '2026-02-15', '2026-02-18', '2025-08-01', '2026-01-31', 'Join us for the most prestigious ophthalmology conference in Bihar.', TRUE);

-- Get the seminar ID
SET @seminar_id = LAST_INSERT_ID();

-- Insert Fee Categories
INSERT INTO fee_categories (seminar_id, name, description, is_popular, is_enabled) VALUES
(@seminar_id, 'Life Members', 'For registered BOA life members with valid membership', TRUE, TRUE),
(@seminar_id, 'Non Members', 'For ophthalmologists not registered with BOA', FALSE, TRUE),
(@seminar_id, 'Student', 'For medical students with valid ID', FALSE, TRUE),
(@seminar_id, 'Spouse', 'For accompanying spouses', FALSE, TRUE),
(@seminar_id, 'Trade', 'For pharmaceutical and equipment representatives', FALSE, TRUE);

-- Insert Fee Slabs
INSERT INTO fee_slabs (seminar_id, label, date_range, start_date, end_date) VALUES
(@seminar_id, 'Early Saver', 'Till 31 Dec', '2025-08-01', '2025-12-31'),
(@seminar_id, '1 Jan - 30 Apr', '1 Jan to 30 Apr', '2026-01-01', '2026-04-30'),
(@seminar_id, '1 May - 15 May', '1 May to 15 May', '2026-05-01', '2026-05-15'),
(@seminar_id, 'Spot Registration', 'On-site', '2026-05-16', '2026-12-31');

-- Insert Fee Structure (amounts for each category-slab combination)
INSERT INTO fee_structure (category_id, slab_id, amount)
SELECT c.id, s.id, 
  CASE 
    WHEN c.name = 'Life Members' AND s.label = 'Early Saver' THEN 3000
    WHEN c.name = 'Life Members' AND s.label = '1 Jan - 30 Apr' THEN 4000
    WHEN c.name = 'Life Members' AND s.label = '1 May - 15 May' THEN 4500
    WHEN c.name = 'Life Members' AND s.label = 'Spot Registration' THEN 5000
    WHEN c.name = 'Non Members' AND s.label = 'Early Saver' THEN 4000
    WHEN c.name = 'Non Members' AND s.label = '1 Jan - 30 Apr' THEN 4500
    WHEN c.name = 'Non Members' AND s.label = '1 May - 15 May' THEN 4800
    WHEN c.name = 'Non Members' AND s.label = 'Spot Registration' THEN 5000
    WHEN c.name = 'Student' AND s.label = 'Early Saver' THEN 2500
    WHEN c.name = 'Student' AND s.label = '1 Jan - 30 Apr' THEN 3200
    WHEN c.name = 'Student' AND s.label = '1 May - 15 May' THEN 3500
    WHEN c.name = 'Student' AND s.label = 'Spot Registration' THEN 4000
    WHEN c.name = 'Spouse' AND s.label = 'Early Saver' THEN 2500
    WHEN c.name = 'Spouse' AND s.label = '1 Jan - 30 Apr' THEN 3000
    WHEN c.name = 'Spouse' AND s.label = '1 May - 15 May' THEN 3200
    WHEN c.name = 'Spouse' AND s.label = 'Spot Registration' THEN 3500
    WHEN c.name = 'Trade' AND s.label = 'Early Saver' THEN 2500
    WHEN c.name = 'Trade' AND s.label = '1 Jan - 30 Apr' THEN 3000
    WHEN c.name = 'Trade' AND s.label = '1 May - 15 May' THEN 4000
    WHEN c.name = 'Trade' AND s.label = 'Spot Registration' THEN 5000
  END
FROM fee_categories c
CROSS JOIN fee_slabs s
WHERE c.seminar_id = @seminar_id AND s.seminar_id = @seminar_id;
