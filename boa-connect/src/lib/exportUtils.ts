// Utility functions for exporting data to CSV

export const exportToCSV = (data: any[], filename: string, headers?: string[]) => {
  if (!data || data.length === 0) {
    return;
  }

  // Get headers from first object if not provided
  const csvHeaders = headers || Object.keys(data[0]);
  
  // Create CSV content
  const csvRows = [
    csvHeaders.join(','), // Header row
    ...data.map(row => 
      csvHeaders.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ];

  const csvContent = csvRows.join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const formatPaymentForExport = (payments: any[]) => {
  return payments.map(payment => ({
    'Payment ID': payment.id,
    'User Name': payment.user_name,
    'Email': payment.user_email,
    'Mobile': payment.user_mobile,
    'Payment Type': payment.payment_type,
    'Payment For': payment.payment_for,
    'Amount': payment.amount,
    'Status': payment.status,
    'Transaction ID': payment.transaction_id || '',
    'Payment Method': payment.payment_method || '',
    'Date': new Date(payment.created_at).toLocaleString('en-GB'),
  }));
};

export const formatMembershipForExport = (memberships: any[]) => {
  return memberships.map(membership => ({
    'Membership Number': membership.membership_no || 'Not Assigned',
    'Title': membership.title || '',
    'First Name': membership.first_name || '',
    'Surname': membership.surname || '',
    'Email': membership.email || '',
    'Mobile': membership.mobile || '',
    'Membership Type': membership.membership_type || 'Standard',
    'Status': membership.status || 'Active',
    'Valid From': membership.valid_from ? new Date(membership.valid_from).toLocaleDateString('en-GB') : '',
    'Valid Until': membership.valid_until ? new Date(membership.valid_until).toLocaleDateString('en-GB') : 'Lifetime',
    'Notes': membership.notes || '',
  }));
};

export const formatRegistrationForExport = (registrations: any[]) => {
  return registrations.map(reg => ({
    'Registration Number': reg.registration_no || '',
    'Title': reg.title || '',
    'First Name': reg.first_name || '',
    'Surname': reg.surname || '',
    'Email': reg.email || '',
    'Mobile': reg.mobile || '',
    'Seminar': reg.seminar_name || '',
    'Category': reg.category_name || '',
    'Delegate Type': reg.delegate_type || 'Self',
    'Amount': reg.amount || 0,
    'Status': reg.status || '',
    'Payment Method': reg.payment_method || '',
    'Registration Date': reg.created_at ? new Date(reg.created_at).toLocaleString('en-GB') : '',
  }));
};
