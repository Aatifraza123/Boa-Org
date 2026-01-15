const ExcelJS = require('exceljs');
const { promisePool } = require('../config/database');
const { ACTIVITY_TYPES, createActivityNotification } = require('../utils/activity-logger');

// ============ SEMINARS CRUD ============

// Get all seminars (admin)
exports.getAllSeminarsAdmin = async (req, res) => {
  try {
    const [seminars] = await promisePool.query(
      'SELECT * FROM seminars ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      count: seminars.length,
      seminars
    });
  } catch (error) {
    console.error('Get seminars error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch seminars',
      error: error.message
    });
  }
};

// Create seminar
exports.createSeminar = async (req, res) => {
  const connection = await promisePool.getConnection();
  
  try {
    const {
      name, title, location, venue, start_date, end_date,
      registration_start, registration_end, description, offline_form_html, image_url, is_active
    } = req.body;

    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO seminars (name, title, location, venue, start_date, end_date, 
       registration_start, registration_end, description, offline_form_html, image_url, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, title, location, venue, start_date, end_date, registration_start, 
       registration_end, description, offline_form_html || '', image_url, is_active || true]
    );

    const seminarId = result.insertId;

    // Copy fee structure from the most recent seminar
    const [lastSeminar] = await connection.query(
      'SELECT id FROM seminars WHERE id != ? ORDER BY id DESC LIMIT 1',
      [seminarId]
    );

    if (lastSeminar.length > 0) {
      const lastSeminarId = lastSeminar[0].id;

      // Copy fee categories
      await connection.query(
        `INSERT INTO fee_categories (seminar_id, name, description, is_popular, is_enabled)
         SELECT ?, name, description, is_popular, is_enabled
         FROM fee_categories WHERE seminar_id = ?`,
        [seminarId, lastSeminarId]
      );

      // Copy fee slabs
      await connection.query(
        `INSERT INTO fee_slabs (seminar_id, label, date_range, start_date, end_date)
         SELECT ?, label, date_range, start_date, end_date
         FROM fee_slabs WHERE seminar_id = ?`,
        [seminarId, lastSeminarId]
      );

      // Copy fee structure with mapping
      await connection.query(
        `INSERT INTO fee_structure (category_id, slab_id, amount)
         SELECT 
           new_cat.id,
           new_slab.id,
           old_fee.amount
         FROM fee_structure old_fee
         JOIN fee_categories old_cat ON old_fee.category_id = old_cat.id
         JOIN fee_slabs old_slab ON old_fee.slab_id = old_slab.id
         JOIN fee_categories new_cat ON new_cat.seminar_id = ? AND new_cat.name = old_cat.name
         JOIN fee_slabs new_slab ON new_slab.seminar_id = ? AND new_slab.label = old_slab.label
         WHERE old_cat.seminar_id = ?`,
        [seminarId, seminarId, lastSeminarId]
      );
    }

    // If seminar is active, create notification
    if (is_active) {
      await connection.query(
        'INSERT INTO notifications (title, seminar_id, message, is_active) VALUES (?, ?, ?, ?)',
        [name, seminarId, `New seminar: ${name}`, true]
      );
    }

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Seminar created successfully with fee structure copied from previous seminar',
      seminar_id: seminarId
    });
  } catch (error) {
    await connection.rollback();
    console.error('Create seminar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create seminar',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// Update seminar
exports.updateSeminar = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, title, location, venue, start_date, end_date,
      registration_start, registration_end, description, offline_form_html, image_url, is_active
    } = req.body;

    await promisePool.query(
      `UPDATE seminars SET name = ?, title = ?, location = ?, venue = ?, start_date = ?, 
       end_date = ?, registration_start = ?, registration_end = ?, 
       description = ?, offline_form_html = ?, image_url = ?, is_active = ? WHERE id = ?`,
      [name, title, location, venue, start_date, end_date, registration_start, 
       registration_end, description, offline_form_html || '', image_url, is_active, id]
    );

    // Check if notification exists for this seminar
    const [existingNotif] = await promisePool.query(
      'SELECT id FROM notifications WHERE seminar_id = ?',
      [id]
    );

    if (is_active) {
      // If active and notification exists, update it
      if (existingNotif.length > 0) {
        await promisePool.query(
          'UPDATE notifications SET title = ?, message = ?, is_active = ? WHERE seminar_id = ?',
          [name, `New seminar: ${name}`, true, id]
        );
      } else {
        // If active but no notification, create one
        await promisePool.query(
          'INSERT INTO notifications (title, seminar_id, message, is_active) VALUES (?, ?, ?, ?)',
          [name, id, `New seminar: ${name}`, true]
        );
      }
    } else {
      // If inactive, delete notification
      await promisePool.query('DELETE FROM notifications WHERE seminar_id = ?', [id]);
    }

    res.json({
      success: true,
      message: 'Seminar updated successfully'
    });
  } catch (error) {
    console.error('Update seminar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update seminar',
      error: error.message
    });
  }
};

// Delete seminar
exports.deleteSeminar = async (req, res) => {
  const connection = await promisePool.getConnection();
  
  try {
    const { id } = req.params;

    await connection.beginTransaction();

    // Delete in correct order to avoid foreign key constraints
    
    // 1. Delete additional persons from registrations
    await connection.query(
      `DELETE ap FROM additional_persons ap
       INNER JOIN registrations r ON ap.registration_id = r.id
       WHERE r.seminar_id = ?`,
      [id]
    );

    // 2. Delete registrations
    await connection.query('DELETE FROM registrations WHERE seminar_id = ?', [id]);

    // 3. DO NOT DELETE FEE STRUCTURE - Keep it for reuse with new seminars
    // Fee structure will be updated when new seminar is created

    // 4. Delete delegate categories
    await connection.query('DELETE FROM delegate_categories WHERE seminar_id = ?', [id]);

    // 5. Delete notifications
    await connection.query('DELETE FROM notifications WHERE seminar_id = ?', [id]);

    // 6. Finally delete seminar
    await connection.query('DELETE FROM seminars WHERE id = ?', [id]);

    await connection.commit();

    res.json({
      success: true,
      message: 'Seminar deleted successfully. Fee structure preserved for reuse.'
    });
  } catch (error) {
    await connection.rollback();
    console.error('Delete seminar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete seminar. It may have related data.',
      error: error.message
    });
  } finally {
    connection.release();
  }
};

// ============ USERS CRUD ============

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await promisePool.query(
      `SELECT u.*, a.house, a.street, a.city, a.state, a.country, a.pin_code
       FROM users u
       LEFT JOIN addresses a ON u.id = a.user_id
       ORDER BY u.created_at DESC`
    );

    // Remove passwords
    users.forEach(user => delete user.password);

    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await promisePool.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: error.message
    });
  }
};

// ============ REGISTRATIONS CRUD ============

// Get all registrations (admin)
exports.getAllRegistrations = async (req, res) => {
  try {
    const { seminar_id, status } = req.query;

    let query = `
      SELECT r.*, 
        u.title, u.first_name, u.surname, u.email, u.mobile,
        s.name as seminar_name, s.location as seminar_location,
        fc.name as category_name, fs.label as slab_label
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      JOIN seminars s ON r.seminar_id = s.id
      JOIN fee_categories fc ON r.category_id = fc.id
      JOIN fee_slabs fs ON r.slab_id = fs.id
    `;

    const params = [];
    const conditions = [];

    if (seminar_id) {
      conditions.push('r.seminar_id = ?');
      params.push(seminar_id);
    }

    if (status) {
      conditions.push('r.status = ?');
      params.push(status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY r.created_at DESC';

    const [registrations] = await promisePool.query(query, params);

    // Get additional persons
    for (let reg of registrations) {
      const [persons] = await promisePool.query(
        `SELECT ap.*, fc.name as category_name, fs.label as slab_label
         FROM additional_persons ap
         JOIN fee_categories fc ON ap.category_id = fc.id
         JOIN fee_slabs fs ON ap.slab_id = fs.id
         WHERE ap.registration_id = ?`,
        [reg.id]
      );
      reg.additional_persons = persons;
    }

    res.json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch registrations',
      error: error.message
    });
  }
};

// Update registration status
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await promisePool.query(
      'UPDATE registrations SET status = ? WHERE id = ?',
      [status, id]
    );

    res.json({
      success: true,
      message: 'Registration status updated successfully'
    });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update registration',
      error: error.message
    });
  }
};

// Delete registration
exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Get registration details before deleting
    const [regDetails] = await promisePool.query(
      `SELECT u.full_name, s.name as seminar_name, s.id as seminar_id
       FROM registrations r
       JOIN users u ON r.user_id = u.id
       JOIN seminars s ON r.seminar_id = s.id
       WHERE r.id = ?`,
      [id]
    );

    await promisePool.query('DELETE FROM registrations WHERE id = ?', [id]);

    // Create cancellation notification
    if (regDetails.length > 0) {
      await createActivityNotification(ACTIVITY_TYPES.REGISTRATION_CANCELLED, {
        name: regDetails[0].full_name,
        seminar_name: regDetails[0].seminar_name,
        seminar_id: regDetails[0].seminar_id
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete registration',
      error: error.message
    });
  }
};

// ============ NOTIFICATIONS CRUD ============

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const { title, seminar_id, message, is_active } = req.body;

    // Convert empty string to null for seminar_id
    const seminarIdValue = seminar_id === '' || seminar_id === undefined ? null : seminar_id;

    const [result] = await promisePool.query(
      'INSERT INTO notifications (title, seminar_id, message, is_active) VALUES (?, ?, ?, ?)',
      [title, seminarIdValue, message, is_active !== false]
    );

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      notification_id: result.insertId
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message
    });
  }
};

// Update notification
exports.updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, seminar_id, message, is_active } = req.body;

    // Convert empty string to null for seminar_id
    const seminarIdValue = seminar_id === '' || seminar_id === undefined ? null : seminar_id;

    await promisePool.query(
      'UPDATE notifications SET title = ?, seminar_id = ?, message = ?, is_active = ? WHERE id = ?',
      [title, seminarIdValue, message, is_active, id]
    );

    res.json({
      success: true,
      message: 'Notification updated successfully'
    });
  } catch (error) {
    console.error('Update notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification',
      error: error.message
    });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await promisePool.query('DELETE FROM notifications WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message
    });
  }
};

// ============ EXCEL EXPORT ============

// Export all registrations to Excel
exports.exportRegistrations = async (req, res) => {
  try {
    const { seminar_id } = req.query;

    let query = `
      SELECT 
        r.registration_no,
        r.created_at as registration_date,
        r.status,
        r.amount as total_amount,
        r.transaction_id,
        r.payment_date,
        r.payment_method,
        r.delegate_type,
        u.title,
        u.first_name,
        u.surname,
        u.email,
        u.mobile,
        u.phone,
        u.gender,
        u.dob,
        u.membership_no,
        a.house,
        a.street,
        a.landmark,
        a.city,
        a.state,
        a.country,
        a.pin_code,
        s.name as seminar_name,
        s.location as seminar_location,
        s.start_date as seminar_start_date,
        fc.name as category_name,
        fs.label as fee_slab
      FROM registrations r
      JOIN users u ON r.user_id = u.id
      LEFT JOIN addresses a ON u.id = a.user_id
      JOIN seminars s ON r.seminar_id = s.id
      JOIN fee_categories fc ON r.category_id = fc.id
      JOIN fee_slabs fs ON r.slab_id = fs.id
    `;

    const params = [];
    if (seminar_id) {
      query += ' WHERE r.seminar_id = ?';
      params.push(seminar_id);
    }

    query += ' ORDER BY r.created_at DESC';

    const [registrations] = await promisePool.query(query, params);

    // Get additional persons for each registration
    const [additionalPersons] = await promisePool.query(`
      SELECT 
        ap.registration_id,
        ap.name,
        ap.amount,
        fc.name as category_name,
        fs.label as fee_slab
      FROM additional_persons ap
      JOIN fee_categories fc ON ap.category_id = fc.id
      JOIN fee_slabs fs ON ap.slab_id = fs.id
    `);

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Registrations');

    // Define columns
    worksheet.columns = [
      { header: 'Registration No', key: 'registration_no', width: 20 },
      { header: 'Registration Date', key: 'registration_date', width: 20 },
      { header: 'Status', key: 'status', width: 12 },
      { header: 'Title', key: 'title', width: 8 },
      { header: 'First Name', key: 'first_name', width: 15 },
      { header: 'Surname', key: 'surname', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Date of Birth', key: 'dob', width: 15 },
      { header: 'Membership No', key: 'membership_no', width: 20 },
      { header: 'Delegate Type', key: 'delegate_type', width: 20 },
      { header: 'House/Flat', key: 'house', width: 15 },
      { header: 'Street', key: 'street', width: 20 },
      { header: 'Landmark', key: 'landmark', width: 20 },
      { header: 'City', key: 'city', width: 15 },
      { header: 'State', key: 'state', width: 15 },
      { header: 'Country', key: 'country', width: 12 },
      { header: 'Pin Code', key: 'pin_code', width: 10 },
      { header: 'Seminar Name', key: 'seminar_name', width: 30 },
      { header: 'Seminar Location', key: 'seminar_location', width: 25 },
      { header: 'Seminar Date', key: 'seminar_start_date', width: 15 },
      { header: 'Category', key: 'category_name', width: 20 },
      { header: 'Fee Slab', key: 'fee_slab', width: 20 },
      { header: 'Registration Amount', key: 'total_amount', width: 18 },
      { header: 'Additional Persons', key: 'additional_persons', width: 30 },
      { header: 'Additional Amount', key: 'additional_amount', width: 18 },
      { header: 'Total Amount', key: 'final_amount', width: 15 },
      { header: 'Payment Method', key: 'payment_method', width: 15 },
      { header: 'Transaction ID', key: 'transaction_id', width: 25 },
      { header: 'Payment Date', key: 'payment_date', width: 20 },
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0080808' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Add data rows
    registrations.forEach(reg => {
      // Find additional persons for this registration
      const regId = reg.registration_no;
      const additionalForReg = additionalPersons.filter(ap => {
        // Match by registration_no since we need to join
        const [regData] = registrations.filter(r => r.registration_no === regId);
        return regData && ap.registration_id === regData.id;
      });

      const additionalNames = additionalForReg.map(ap => 
        `${ap.name} (${ap.category_name} - ${ap.fee_slab})`
      ).join(', ');

      const additionalAmount = additionalForReg.reduce((sum, ap) => sum + parseFloat(ap.amount), 0);
      const finalAmount = parseFloat(reg.total_amount);

      const row = worksheet.addRow({
        ...reg,
        registration_date: new Date(reg.registration_date).toLocaleString(),
        dob: reg.dob ? new Date(reg.dob).toLocaleDateString() : '',
        seminar_start_date: new Date(reg.seminar_start_date).toLocaleDateString(),
        payment_date: reg.payment_date ? new Date(reg.payment_date).toLocaleString() : '',
        additional_persons: additionalNames || 'None',
        additional_amount: additionalAmount || 0,
        final_amount: finalAmount
      });

      // Color code by status
      if (reg.status === 'completed') {
        row.getCell('status').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF90EE90' }
        };
      } else if (reg.status === 'pending') {
        row.getCell('status').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFA500' }
        };
      } else if (reg.status === 'failed') {
        row.getCell('status').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFF6B6B' }
        };
      }
    });

    // Add summary row
    const summaryRow = worksheet.addRow({});
    summaryRow.getCell(1).value = 'TOTAL REGISTRATIONS:';
    summaryRow.getCell(2).value = registrations.length;
    summaryRow.font = { bold: true };

    const totalAmount = registrations.reduce((sum, reg) => sum + parseFloat(reg.total_amount), 0);
    summaryRow.getCell(26).value = 'TOTAL REVENUE:';
    summaryRow.getCell(29).value = totalAmount;
    summaryRow.getCell(29).numFmt = '₹#,##0.00';

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=BOA_Registrations_${Date.now()}.xlsx`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export registrations',
      error: error.message
    });
  }
};

// Get registration statistics
exports.getStatistics = async (req, res) => {
  try {
    const { seminar_id } = req.query;

    // Total registrations
    let query = 'SELECT COUNT(*) as total FROM registrations';
    const params = [];
    
    if (seminar_id) {
      query += ' WHERE seminar_id = ?';
      params.push(seminar_id);
    }

    const [totalResult] = await promisePool.query(query, params);

    // By status
    let statusQuery = 'SELECT status, COUNT(*) as count FROM registrations';
    if (seminar_id) {
      statusQuery += ' WHERE seminar_id = ?';
    }
    statusQuery += ' GROUP BY status';

    const [statusResult] = await promisePool.query(statusQuery, params);

    // Total revenue
    let revenueQuery = 'SELECT SUM(amount) as total_revenue FROM registrations WHERE status = "completed"';
    if (seminar_id) {
      revenueQuery += ' AND seminar_id = ?';
    }

    const [revenueResult] = await promisePool.query(revenueQuery, params);

    res.json({
      success: true,
      statistics: {
        total_registrations: totalResult[0].total,
        by_status: statusResult,
        total_revenue: revenueResult[0].total_revenue || 0
      }
    });

  } catch (error) {
    console.error('Statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
};

// ============ COMMITTEE MEMBERS CRUD ============

// Get all committee members
exports.getAllCommitteeMembers = async (req, res) => {
  try {
    const [members] = await promisePool.query(
      'SELECT * FROM committee_members WHERE is_active = TRUE ORDER BY display_order, id'
    );

    res.json({
      success: true,
      members
    });
  } catch (error) {
    console.error('Get committee members error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch committee members',
      error: error.message
    });
  }
};

// Create committee member
exports.createCommitteeMember = async (req, res) => {
  try {
    const { name, profession, image_url, display_order, page_type } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO committee_members (name, profession, image_url, display_order, page_type, is_active)
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      [name, profession, image_url || '', display_order || 0, page_type || 'about']
    );

    res.status(201).json({
      success: true,
      message: 'Committee member added successfully',
      member_id: result.insertId
    });
  } catch (error) {
    console.error('Create committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add committee member',
      error: error.message
    });
  }
};

// Update committee member
exports.updateCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, profession, image_url, display_order, is_active, page_type } = req.body;

    // Get old image URL before updating
    const [oldMember] = await promisePool.query(
      'SELECT image_url FROM committee_members WHERE id = ?',
      [id]
    );

    // If image_url changed and old image exists, delete from Cloudinary
    if (oldMember.length > 0 && oldMember[0].image_url && oldMember[0].image_url !== image_url) {
      const { deleteImageFromCloudinary } = require('../utils/cloudinary-helper');
      await deleteImageFromCloudinary(oldMember[0].image_url);
    }

    await promisePool.query(
      `UPDATE committee_members 
       SET name = ?, profession = ?, image_url = ?, display_order = ?, is_active = ?, page_type = ?
       WHERE id = ?`,
      [name, profession, image_url, display_order, is_active, page_type, id]
    );

    res.json({
      success: true,
      message: 'Committee member updated successfully'
    });
  } catch (error) {
    console.error('Update committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update committee member',
      error: error.message
    });
  }
};

// Delete committee member
exports.deleteCommitteeMember = async (req, res) => {
  try {
    const { id } = req.params;

    await promisePool.query('DELETE FROM committee_members WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Committee member deleted successfully'
    });
  } catch (error) {
    console.error('Delete committee member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete committee member',
      error: error.message
    });
  }
};

// ============ DELEGATE CATEGORIES CRUD ============

// Get delegate categories for a seminar
exports.getDelegateCategories = async (req, res) => {
  try {
    const { seminar_id } = req.params;

    const [categories] = await promisePool.query(
      'SELECT * FROM delegate_categories WHERE seminar_id = ? AND is_enabled = TRUE ORDER BY display_order',
      [seminar_id]
    );

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get delegate categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch delegate categories',
      error: error.message
    });
  }
};

// Create delegate category
exports.createDelegateCategory = async (req, res) => {
  try {
    const { seminar_id, name, label, description, requires_membership, display_order } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO delegate_categories (seminar_id, name, label, description, requires_membership, display_order, is_enabled)
       VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
      [seminar_id, name, label, description, requires_membership || false, display_order || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Delegate category created successfully',
      category_id: result.insertId
    });
  } catch (error) {
    console.error('Create delegate category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create delegate category',
      error: error.message
    });
  }
};

// Update delegate category
exports.updateDelegateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, label, description, requires_membership, display_order, is_enabled } = req.body;

    await promisePool.query(
      `UPDATE delegate_categories 
       SET name = ?, label = ?, description = ?, requires_membership = ?, display_order = ?, is_enabled = ?
       WHERE id = ?`,
      [name, label, description, requires_membership, display_order, is_enabled, id]
    );

    res.json({
      success: true,
      message: 'Delegate category updated successfully'
    });
  } catch (error) {
    console.error('Update delegate category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update delegate category',
      error: error.message
    });
  }
};

// Delete delegate category
exports.deleteDelegateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await promisePool.query('DELETE FROM delegate_categories WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Delegate category deleted successfully'
    });
  } catch (error) {
    console.error('Delete delegate category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete delegate category',
      error: error.message
    });
  }
};

// ============ OFFLINE USER IMPORT ============

// Import single offline user
exports.importOfflineUser = async (req, res) => {
  try {
    const {
      membership_no, title, first_name, surname, email, mobile, password,
      gender, city, state, pin_code
    } = req.body;

    // Check if membership number already exists
    const [existing] = await promisePool.query(
      'SELECT id FROM users WHERE membership_no = ?',
      [membership_no]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Membership number already exists'
      });
    }

    // Hash password
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Auto-generate email if not provided
    const userEmail = email || `${membership_no.toLowerCase().replace(/-/g, '')}@temp.com`;

    // Insert user
    const [userResult] = await promisePool.query(
      `INSERT INTO users (
        title, first_name, surname, email, password, mobile,
        gender, membership_no, is_boa_member, is_active, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, TRUE, TRUE, NOW())`,
      [
        title || 'Dr.',
        first_name,
        surname || '',
        userEmail,
        hashedPassword,
        mobile || '',
        gender || 'male',
        membership_no
      ]
    );

    const userId = userResult.insertId;

    // Insert address if provided
    if (city || state || pin_code) {
      await promisePool.query(
        `INSERT INTO addresses (
          user_id, city, state, country, pin_code
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          city || 'Patna',
          state || 'Bihar',
          'India',
          pin_code || '800001'
        ]
      );
    }

    res.status(201).json({
      success: true,
      message: 'Offline user imported successfully',
      user: {
        id: userId,
        membership_no,
        name: `${title} ${first_name} ${surname}`,
        email: userEmail
      }
    });

  } catch (error) {
    console.error('Import offline user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to import offline user',
      error: error.message
    });
  }
};

// ============ FEE STRUCTURE CRUD ============

// Get fee structure for a seminar
exports.getFeeStructure = async (req, res) => {
  try {
    const { seminar_id } = req.params;

    // Get categories
    const [categories] = await promisePool.query(
      'SELECT * FROM fee_categories WHERE seminar_id = ? ORDER BY id',
      [seminar_id]
    );

    // Get slabs
    const [slabs] = await promisePool.query(
      'SELECT * FROM fee_slabs WHERE seminar_id = ? ORDER BY id',
      [seminar_id]
    );

    // Get fee structure
    const [fees] = await promisePool.query(
      `SELECT fs.* FROM fee_structure fs
       JOIN fee_categories fc ON fs.category_id = fc.id
       WHERE fc.seminar_id = ?`,
      [seminar_id]
    );

    res.json({
      success: true,
      categories,
      slabs,
      fees
    });
  } catch (error) {
    console.error('Get fee structure error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fee structure',
      error: error.message
    });
  }
};

// Create fee category
exports.createFeeCategory = async (req, res) => {
  try {
    const { seminar_id, name, description, is_popular, is_enabled } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO fee_categories (seminar_id, name, description, is_popular, is_enabled)
       VALUES (?, ?, ?, ?, ?)`,
      [seminar_id, name, description, is_popular || false, is_enabled !== false]
    );

    res.status(201).json({
      success: true,
      message: 'Fee category created successfully',
      category_id: result.insertId
    });
  } catch (error) {
    console.error('Create fee category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create fee category',
      error: error.message
    });
  }
};

// Update fee category
exports.updateFeeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, is_popular, is_enabled } = req.body;

    await promisePool.query(
      `UPDATE fee_categories 
       SET name = ?, description = ?, is_popular = ?, is_enabled = ?
       WHERE id = ?`,
      [name, description, is_popular, is_enabled, id]
    );

    res.json({
      success: true,
      message: 'Fee category updated successfully'
    });
  } catch (error) {
    console.error('Update fee category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update fee category',
      error: error.message
    });
  }
};

// Delete fee category
exports.deleteFeeCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete associated fee structure first
    await promisePool.query('DELETE FROM fee_structure WHERE category_id = ?', [id]);
    
    // Delete category
    await promisePool.query('DELETE FROM fee_categories WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Fee category deleted successfully'
    });
  } catch (error) {
    console.error('Delete fee category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete fee category',
      error: error.message
    });
  }
};

// Create fee slab
exports.createFeeSlab = async (req, res) => {
  try {
    const { seminar_id, label, date_range, start_date, end_date } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO fee_slabs (seminar_id, label, date_range, start_date, end_date)
       VALUES (?, ?, ?, ?, ?)`,
      [seminar_id, label, date_range, start_date, end_date]
    );

    res.status(201).json({
      success: true,
      message: 'Fee slab created successfully',
      slab_id: result.insertId
    });
  } catch (error) {
    console.error('Create fee slab error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create fee slab',
      error: error.message
    });
  }
};

// Update fee slab
exports.updateFeeSlab = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, date_range, start_date, end_date } = req.body;

    await promisePool.query(
      `UPDATE fee_slabs 
       SET label = ?, date_range = ?, start_date = ?, end_date = ?
       WHERE id = ?`,
      [label, date_range, start_date, end_date, id]
    );

    res.json({
      success: true,
      message: 'Fee slab updated successfully'
    });
  } catch (error) {
    console.error('Update fee slab error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update fee slab',
      error: error.message
    });
  }
};

// Delete fee slab
exports.deleteFeeSlab = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete associated fee structure first
    await promisePool.query('DELETE FROM fee_structure WHERE slab_id = ?', [id]);
    
    // Delete slab
    await promisePool.query('DELETE FROM fee_slabs WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Fee slab deleted successfully'
    });
  } catch (error) {
    console.error('Delete fee slab error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete fee slab',
      error: error.message
    });
  }
};

// Update fee amount
exports.updateFeeAmount = async (req, res) => {
  try {
    const { category_id, slab_id, amount } = req.body;

    // Check if fee structure exists
    const [existing] = await promisePool.query(
      'SELECT id FROM fee_structure WHERE category_id = ? AND slab_id = ?',
      [category_id, slab_id]
    );

    if (existing.length > 0) {
      // Update existing
      await promisePool.query(
        'UPDATE fee_structure SET amount = ? WHERE category_id = ? AND slab_id = ?',
        [amount, category_id, slab_id]
      );
    } else {
      // Insert new
      await promisePool.query(
        'INSERT INTO fee_structure (category_id, slab_id, amount) VALUES (?, ?, ?)',
        [category_id, slab_id, amount]
      );
    }

    res.json({
      success: true,
      message: 'Fee amount updated successfully'
    });
  } catch (error) {
    console.error('Update fee amount error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update fee amount',
      error: error.message
    });
  }
};

// ============ CERTIFICATION CRUD ============

// Get certification
exports.getCertification = async (req, res) => {
  try {
    const [certification] = await promisePool.query(
      'SELECT * FROM certification LIMIT 1'
    );

    res.json({
      success: true,
      certification: certification[0] || null
    });
  } catch (error) {
    console.error('Get certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certification',
      error: error.message
    });
  }
};

// Update certification
exports.updateCertification = async (req, res) => {
  try {
    const {
      organization_name,
      registration_number,
      certificate_number,
      registration_act,
      registration_date,
      registered_office,
      certificate_image_url
    } = req.body;

    // Check if certification exists
    const [existing] = await promisePool.query('SELECT id, certificate_image_url FROM certification LIMIT 1');

    if (existing.length > 0) {
      // If image_url changed and old image exists, delete from Cloudinary
      if (existing[0].certificate_image_url && existing[0].certificate_image_url !== certificate_image_url) {
        const { deleteImageFromCloudinary } = require('../utils/cloudinary-helper');
        await deleteImageFromCloudinary(existing[0].certificate_image_url);
      }

      // Update existing
      await promisePool.query(
        `UPDATE certification SET 
         organization_name = ?, registration_number = ?, certificate_number = ?,
         registration_act = ?, registration_date = ?, registered_office = ?,
         certificate_image_url = ?
         WHERE id = ?`,
        [
          organization_name,
          registration_number,
          certificate_number,
          registration_act,
          registration_date,
          registered_office,
          certificate_image_url,
          existing[0].id
        ]
      );
    } else {
      // Insert new
      await promisePool.query(
        `INSERT INTO certification (
          organization_name, registration_number, certificate_number,
          registration_act, registration_date, registered_office, certificate_image_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          organization_name,
          registration_number,
          certificate_number,
          registration_act,
          registration_date,
          registered_office,
          certificate_image_url
        ]
      );
    }

    res.json({
      success: true,
      message: 'Certification updated successfully'
    });
  } catch (error) {
    console.error('Update certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update certification',
      error: error.message
    });
  }
};

// Upload certificate image to Cloudinary
exports.uploadCertificateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const cloudinary = require('../config/cloudinary');
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'boa-certificates',
          resource_type: 'image'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image_url: result.secure_url
    });
  } catch (error) {
    console.error('Upload certificate image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
};

// ============ UPCOMING EVENTS CRUD ============

// Get all upcoming events
exports.getAllUpcomingEvents = async (req, res) => {
  try {
    const [events] = await promisePool.query(
      'SELECT * FROM upcoming_events ORDER BY display_order, id'
    );

    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming events',
      error: error.message
    });
  }
};

// Create upcoming event
exports.createUpcomingEvent = async (req, res) => {
  try {
    const { image_url, link_url, display_order } = req.body;

    const [result] = await promisePool.query(
      `INSERT INTO upcoming_events (image_url, link_url, display_order, is_active)
       VALUES (?, ?, ?, TRUE)`,
      [image_url, link_url || '', display_order || 0]
    );

    res.status(201).json({
      success: true,
      message: 'Upcoming event created successfully',
      event_id: result.insertId
    });
  } catch (error) {
    console.error('Create upcoming event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create upcoming event',
      error: error.message
    });
  }
};

// Update upcoming event
exports.updateUpcomingEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, link_url, display_order, is_active } = req.body;

    // Get old image URL before updating
    const [oldEvent] = await promisePool.query(
      'SELECT image_url FROM upcoming_events WHERE id = ?',
      [id]
    );

    // If image_url changed and old image exists, delete from Cloudinary
    if (oldEvent.length > 0 && oldEvent[0].image_url && oldEvent[0].image_url !== image_url) {
      const { deleteImageFromCloudinary } = require('../utils/cloudinary-helper');
      await deleteImageFromCloudinary(oldEvent[0].image_url);
    }

    await promisePool.query(
      `UPDATE upcoming_events 
       SET image_url = ?, link_url = ?, display_order = ?, is_active = ?
       WHERE id = ?`,
      [image_url, link_url, display_order, is_active, id]
    );

    res.json({
      success: true,
      message: 'Upcoming event updated successfully'
    });
  } catch (error) {
    console.error('Update upcoming event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update upcoming event',
      error: error.message
    });
  }
};

// Delete upcoming event
exports.deleteUpcomingEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await promisePool.query('DELETE FROM upcoming_events WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Upcoming event deleted successfully'
    });
  } catch (error) {
    console.error('Delete upcoming event error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete upcoming event',
      error: error.message
    });
  }
};

// ============ CONTACT INFO CRUD ============

// Get contact info
exports.getContactInfo = async (req, res) => {
  try {
    const [contactInfo] = await promisePool.query(
      'SELECT * FROM contact_info LIMIT 1'
    );

    res.json({
      success: true,
      contactInfo: contactInfo[0] || null
    });
  } catch (error) {
    console.error('Get contact info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact info',
      error: error.message
    });
  }
};

// Update contact info
exports.updateContactInfo = async (req, res) => {
  try {
    const {
      organization_name,
      email,
      phone,
      mobile,
      address,
      city,
      state,
      pin_code,
      facebook_url,
      twitter_url,
      linkedin_url,
      instagram_url
    } = req.body;

    // Check if contact info exists
    const [existing] = await promisePool.query('SELECT id FROM contact_info LIMIT 1');

    if (existing.length > 0) {
      // Update existing
      await promisePool.query(
        `UPDATE contact_info SET 
         organization_name = ?, email = ?, phone = ?, mobile = ?,
         address = ?, city = ?, state = ?, pin_code = ?,
         facebook_url = ?, twitter_url = ?, linkedin_url = ?, instagram_url = ?
         WHERE id = ?`,
        [
          organization_name, email, phone, mobile,
          address, city, state, pin_code,
          facebook_url, twitter_url, linkedin_url, instagram_url,
          existing[0].id
        ]
      );
    } else {
      // Insert new
      await promisePool.query(
        `INSERT INTO contact_info (
          organization_name, email, phone, mobile,
          address, city, state, pin_code,
          facebook_url, twitter_url, linkedin_url, instagram_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          organization_name, email, phone, mobile,
          address, city, state, pin_code,
          facebook_url, twitter_url, linkedin_url, instagram_url
        ]
      );
    }

    res.json({
      success: true,
      message: 'Contact info updated successfully'
    });
  } catch (error) {
    console.error('Update contact info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact info',
      error: error.message
    });
  }
};
