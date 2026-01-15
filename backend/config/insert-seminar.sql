-- Insert Default Seminar with Complete Fee Structure
-- This seminar can be edited by admin through the admin panel

USE boa_connect;

-- Insert Seminar
INSERT INTO seminars (name, location, venue, start_date, end_date, registration_start, registration_end, description, is_active) VALUES
('BOA 2026, Siliguri', 'Siliguri, West Bengal', 'Siliguri Convention Center', '2026-02-15', '2026-02-18', '2025-08-01', '2026-01-31', 'Join us for the most prestigious ophthalmology conference in Bihar. This annual conference brings together leading ophthalmologists, researchers, and healthcare professionals to share knowledge and advance the field of eye care.', TRUE);

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
    -- Life Members
    WHEN c.name = 'Life Members' AND s.label = 'Early Saver' THEN 3000
    WHEN c.name = 'Life Members' AND s.label = '1 Jan - 30 Apr' THEN 4000
    WHEN c.name = 'Life Members' AND s.label = '1 May - 15 May' THEN 4500
    WHEN c.name = 'Life Members' AND s.label = 'Spot Registration' THEN 5000
    
    -- Non Members
    WHEN c.name = 'Non Members' AND s.label = 'Early Saver' THEN 4000
    WHEN c.name = 'Non Members' AND s.label = '1 Jan - 30 Apr' THEN 4500
    WHEN c.name = 'Non Members' AND s.label = '1 May - 15 May' THEN 4800
    WHEN c.name = 'Non Members' AND s.label = 'Spot Registration' THEN 5000
    
    -- Student
    WHEN c.name = 'Student' AND s.label = 'Early Saver' THEN 2500
    WHEN c.name = 'Student' AND s.label = '1 Jan - 30 Apr' THEN 3200
    WHEN c.name = 'Student' AND s.label = '1 May - 15 May' THEN 3500
    WHEN c.name = 'Student' AND s.label = 'Spot Registration' THEN 4000
    
    -- Spouse
    WHEN c.name = 'Spouse' AND s.label = 'Early Saver' THEN 2500
    WHEN c.name = 'Spouse' AND s.label = '1 Jan - 30 Apr' THEN 3000
    WHEN c.name = 'Spouse' AND s.label = '1 May - 15 May' THEN 3200
    WHEN c.name = 'Spouse' AND s.label = 'Spot Registration' THEN 3500
    
    -- Trade
    WHEN c.name = 'Trade' AND s.label = 'Early Saver' THEN 2500
    WHEN c.name = 'Trade' AND s.label = '1 Jan - 30 Apr' THEN 3000
    WHEN c.name = 'Trade' AND s.label = '1 May - 15 May' THEN 4000
    WHEN c.name = 'Trade' AND s.label = 'Spot Registration' THEN 5000
  END
FROM fee_categories c
CROSS JOIN fee_slabs s
WHERE c.seminar_id = @seminar_id AND s.seminar_id = @seminar_id;

-- Insert Sample Notifications
INSERT INTO notifications (title, seminar_id, message, is_active) VALUES
('Early Bird Registration Open', @seminar_id, 'Register now and save up to 40% on registration fees! Early bird rates valid till 31st December.', TRUE),
('Abstract Submission Deadline', @seminar_id, 'Submit your research abstracts by 15th January. Selected papers will be presented at the conference.', TRUE);

SELECT 'Seminar data inserted successfully!' as message;
SELECT * FROM seminars WHERE id = @seminar_id;
