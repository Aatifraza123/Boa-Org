-- Create certification table
CREATE TABLE IF NOT EXISTS certification (
  id INT PRIMARY KEY AUTO_INCREMENT,
  organization_name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) NOT NULL,
  certificate_number VARCHAR(100) NOT NULL,
  registration_act VARCHAR(255) NOT NULL,
  registration_date DATE NOT NULL,
  registered_office TEXT NOT NULL,
  certificate_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default certification data
INSERT INTO certification (
  organization_name,
  registration_number,
  certificate_number,
  registration_act,
  registration_date,
  registered_office
) VALUES (
  'Ophthalmic Association of Bihar',
  'S000403',
  'S22104',
  'Societies Registration Act 21, 1860',
  '2022-03-10',
  'Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad, Patna - 800002, Bihar'
);
