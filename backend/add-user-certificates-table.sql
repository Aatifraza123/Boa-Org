-- Create user_certificates table
CREATE TABLE IF NOT EXISTS user_certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  seminar_id INT NULL,
  certificate_name VARCHAR(255) NOT NULL,
  certificate_url VARCHAR(500) NOT NULL,
  issued_date DATE NULL,
  description TEXT NULL,
  uploaded_by INT NULL COMMENT 'Admin user ID who uploaded',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_seminar_id (seminar_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Show table structure
SHOW COLUMNS FROM user_certificates;
