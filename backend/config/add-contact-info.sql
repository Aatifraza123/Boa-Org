-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  organization_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  pin_code VARCHAR(20),
  facebook_url VARCHAR(255),
  twitter_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  instagram_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default contact info
INSERT INTO contact_info (
  organization_name,
  email,
  phone,
  mobile,
  address,
  city,
  state,
  pin_code
) VALUES (
  'Ophthalmic Association of Bihar',
  'info@boabihar.org',
  '0612-2345678',
  '+91-9876543210',
  'Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad',
  'Patna',
  'Bihar',
  '800002'
);
