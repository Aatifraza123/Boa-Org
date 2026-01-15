-- Create committee members table
CREATE TABLE IF NOT EXISTS committee_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  profession VARCHAR(255) NOT NULL,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add some default members
INSERT INTO committee_members (name, profession, image_url, display_order, is_active) VALUES
('Dr. Pawan Kumar', 'President', '', 1, TRUE),
('Dr. Prem Prakash', 'Secretary', '', 2, TRUE),
('Mr. Raj Roushan', 'Treasurer', '', 3, TRUE);
