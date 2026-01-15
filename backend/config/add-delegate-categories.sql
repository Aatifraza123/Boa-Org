-- Create delegate categories table
CREATE TABLE IF NOT EXISTS delegate_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  seminar_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  description TEXT,
  requires_membership BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seminar_id) REFERENCES seminars(id) ON DELETE CASCADE,
  UNIQUE KEY unique_category_per_seminar (seminar_id, name)
);

-- Insert default delegate categories for existing seminars
INSERT INTO delegate_categories (seminar_id, name, label, description, requires_membership, display_order, is_enabled)
SELECT 
  id as seminar_id,
  'BOA Member' as name,
  'BOA MEMBER' as label,
  'For registered BOA members with valid membership' as description,
  TRUE as requires_membership,
  1 as display_order,
  TRUE as is_enabled
FROM seminars
WHERE NOT EXISTS (
  SELECT 1 FROM delegate_categories dc WHERE dc.seminar_id = seminars.id AND dc.name = 'BOA Member'
);

INSERT INTO delegate_categories (seminar_id, name, label, description, requires_membership, display_order, is_enabled)
SELECT 
  id as seminar_id,
  'Non BOA Member' as name,
  'NON BOA MEMBER' as label,
  'For non-members or general participants' as description,
  FALSE as requires_membership,
  2 as display_order,
  TRUE as is_enabled
FROM seminars
WHERE NOT EXISTS (
  SELECT 1 FROM delegate_categories dc WHERE dc.seminar_id = seminars.id AND dc.name = 'Non BOA Member'
);

INSERT INTO delegate_categories (seminar_id, name, label, description, requires_membership, display_order, is_enabled)
SELECT 
  id as seminar_id,
  'Accompanying Person' as name,
  'ACCOMPANYING PERSON' as label,
  'For accompanying persons (spouse, family, etc.)' as description,
  FALSE as requires_membership,
  3 as display_order,
  TRUE as is_enabled
FROM seminars
WHERE NOT EXISTS (
  SELECT 1 FROM delegate_categories dc WHERE dc.seminar_id = seminars.id AND dc.name = 'Accompanying Person'
);
