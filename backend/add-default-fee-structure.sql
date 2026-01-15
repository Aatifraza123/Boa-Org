-- Add default fee structure for active seminar
SET @seminar_id = 2;

-- Add Fee Categories
INSERT INTO fee_categories (seminar_id, name, description, is_popular, is_enabled) VALUES
(@seminar_id, 'BOA Member', 'For registered BOA members', TRUE, TRUE),
(@seminar_id, 'Non BOA Member', 'For non-members', FALSE, TRUE),
(@seminar_id, 'Accompanying Person', 'For spouse/family members', FALSE, TRUE),
(@seminar_id, 'PG Student', 'For postgraduate students', FALSE, TRUE),
(@seminar_id, 'Delegate', 'General delegate category', FALSE, TRUE);

-- Add Fee Slabs
INSERT INTO fee_slabs (seminar_id, label, date_range, start_date, end_date) VALUES
(@seminar_id, 'Early Bird', 'Till 31 Dec 2025', '2025-01-01', '2025-12-31'),
(@seminar_id, 'Regular', '1 Jan - 31 Mar 2026', '2026-01-01', '2026-03-31'),
(@seminar_id, 'Late', 'After 1 Apr 2026', '2026-04-01', '2026-12-31');

-- Get IDs
SET @cat_boa = (SELECT id FROM fee_categories WHERE seminar_id = @seminar_id AND name = 'BOA Member');
SET @cat_non_boa = (SELECT id FROM fee_categories WHERE seminar_id = @seminar_id AND name = 'Non BOA Member');
SET @cat_accompanying = (SELECT id FROM fee_categories WHERE seminar_id = @seminar_id AND name = 'Accompanying Person');
SET @cat_pg = (SELECT id FROM fee_categories WHERE seminar_id = @seminar_id AND name = 'PG Student');
SET @cat_delegate = (SELECT id FROM fee_categories WHERE seminar_id = @seminar_id AND name = 'Delegate');

SET @slab_early = (SELECT id FROM fee_slabs WHERE seminar_id = @seminar_id AND label = 'Early Bird');
SET @slab_regular = (SELECT id FROM fee_slabs WHERE seminar_id = @seminar_id AND label = 'Regular');
SET @slab_late = (SELECT id FROM fee_slabs WHERE seminar_id = @seminar_id AND label = 'Late');

-- Add Fee Structure (Category x Slab matrix)
INSERT INTO fee_structure (category_id, slab_id, amount) VALUES
-- BOA Member
(@cat_boa, @slab_early, 3000.00),
(@cat_boa, @slab_regular, 3500.00),
(@cat_boa, @slab_late, 4000.00),

-- Non BOA Member
(@cat_non_boa, @slab_early, 4000.00),
(@cat_non_boa, @slab_regular, 4500.00),
(@cat_non_boa, @slab_late, 5000.00),

-- Accompanying Person
(@cat_accompanying, @slab_early, 2000.00),
(@cat_accompanying, @slab_regular, 2500.00),
(@cat_accompanying, @slab_late, 3000.00),

-- PG Student
(@cat_pg, @slab_early, 2500.00),
(@cat_pg, @slab_regular, 3000.00),
(@cat_pg, @slab_late, 3500.00),

-- Delegate
(@cat_delegate, @slab_early, 3500.00),
(@cat_delegate, @slab_regular, 4000.00),
(@cat_delegate, @slab_late, 4500.00);

SELECT 'Fee structure added successfully!' as message;
