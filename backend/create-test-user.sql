-- Create Test User for BOA Connect
USE boa_connect;

-- Insert test user
-- Email: test@boa.org
-- Password: test123
INSERT INTO users (
  title, 
  first_name, 
  surname, 
  email, 
  password, 
  mobile, 
  gender, 
  dob,
  role, 
  is_active
) VALUES (
  'dr',
  'Test',
  'User',
  'test@boa.org',
  '$2b$10$V6ceA53/WUJU1HbCw3wMGOd4ajXj4rzTbCC7DHtOz7q/Mu2XxBvXy',
  '9876543210',
  'male',
  '1990-01-01',
  'user',
  TRUE
);

-- Get the user ID
SET @user_id = LAST_INSERT_ID();

-- Insert address for test user
INSERT INTO addresses (
  user_id,
  house,
  street,
  city,
  state,
  country,
  pin_code
) VALUES (
  @user_id,
  'Test House',
  'Test Street',
  'Patna',
  'Bihar',
  'India',
  '800001'
);

-- Display test user credentials
SELECT 
  'Test user created successfully!' as message,
  'test@boa.org' as email,
  'test123' as password,
  'Login at http://localhost:8080/login' as login_url;

SELECT id, email, first_name, surname, role FROM users WHERE email = 'test@boa.org';
