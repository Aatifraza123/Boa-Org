import jsPDF from 'jspdf';
import { getOfflineFormConfig, OfflineFormConfig } from './offlineFormConfig';

export const generateOfflineRegistrationPdf = (): void => {
  const config = getOfflineFormConfig();
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 15;

  // Header
  doc.setFillColor(0, 128, 128); // Teal color
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(config.seminarName, pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Registration Form', pageWidth / 2, 23, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`${config.seminarDates} | ${config.seminarVenue}`, pageWidth / 2, 30, { align: 'center' });

  yPos = 45;
  doc.setTextColor(0, 0, 0);

  // Draw sections
  config.sections.forEach((section) => {
    if (!section.enabled) return;

    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    // Section title
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPos, contentWidth, 8, 'F');
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 128, 128);
    doc.text(section.title.toUpperCase(), margin + 3, yPos + 5.5);
    yPos += 12;

    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);

    // Draw fields
    const enabledFields = section.fields.filter(f => f.enabled);
    let xPos = margin;
    let rowHeight = 0;

    enabledFields.forEach((field, index) => {
      const fieldWidth = field.width === 'full' ? contentWidth : 
                        field.width === 'half' ? (contentWidth - 5) / 2 :
                        (contentWidth - 10) / 3;

      // Check if we need to move to next row
      if (xPos + fieldWidth > pageWidth - margin + 1) {
        yPos += rowHeight + 3;
        xPos = margin;
        rowHeight = 0;
      }

      // Check for page break
      if (yPos > 265) {
        doc.addPage();
        yPos = 20;
        xPos = margin;
      }

      // Draw field label
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      const labelText = field.required ? `${field.label} *` : field.label;
      doc.text(labelText, xPos, yPos);

      // Draw field box
      doc.setDrawColor(180, 180, 180);
      doc.setFillColor(255, 255, 255);
      
      if (field.type === 'select' && field.options) {
        // Draw checkbox options for select
        const optionY = yPos + 2;
        field.options.forEach((opt, optIndex) => {
          const optX = xPos + (optIndex * (fieldWidth / field.options!.length));
          doc.rect(optX, optionY, 4, 4);
          doc.setFontSize(7);
          doc.text(opt.label, optX + 6, optionY + 3);
        });
        rowHeight = Math.max(rowHeight, 12);
      } else {
        // Draw text input box
        doc.rect(xPos, yPos + 2, fieldWidth - 3, 7);
        if (field.placeholder) {
          doc.setFontSize(7);
          doc.setTextColor(150, 150, 150);
          doc.text(field.placeholder, xPos + 2, yPos + 6.5);
          doc.setTextColor(0, 0, 0);
        }
        rowHeight = Math.max(rowHeight, 12);
      }

      xPos += fieldWidth + (field.width === 'full' ? 0 : 5);
    });

    yPos += rowHeight + 8;
  });

  // Registration Details (where user fills based on fee structure)
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 128, 128);
  doc.text('REGISTRATION DETAILS', margin + 3, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  // Registration fields
  const registrationFields = [
    { label: 'Selected Category', width: 'half' },
    { label: 'Registration Fee (₹)', width: 'half' },
    { label: 'Amount Paid (₹)', width: 'half' },
    { label: 'Transaction/DD/Cheque No.', width: 'half' },
    { label: 'Bank Name', width: 'half' },
    { label: 'Date of Payment', width: 'half' },
  ];

  let rxPos = margin;
  registrationFields.forEach((field, index) => {
    if (index % 2 === 0 && index > 0) {
      yPos += 14;
      rxPos = margin;
    }
    const fieldWidth = (contentWidth - 5) / 2;
    
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(field.label, rxPos, yPos);
    doc.setDrawColor(180, 180, 180);
    doc.rect(rxPos, yPos + 2, fieldWidth - 3, 7);
    
    rxPos += fieldWidth + 5;
  });

  yPos += 20;

  // Consent Section
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 128, 128);
  doc.text('CONSENT & DECLARATION', margin + 3, yPos + 5.5);
  yPos += 14;

  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  
  // Checkbox for consent
  doc.rect(margin, yPos, 4, 4);
  const consentLines = doc.splitTextToSize(config.consentText, contentWidth - 10);
  doc.text(consentLines, margin + 7, yPos + 3);
  yPos += (consentLines.length * 4) + 10;

  // Signature section
  doc.setFontSize(9);
  doc.text('Signature:', margin, yPos);
  doc.line(margin + 20, yPos, margin + 80, yPos);
  
  doc.text('Date:', margin + 100, yPos);
  doc.line(margin + 115, yPos, margin + 165, yPos);

  yPos += 15;

  // Registration Fee Structure (at the end)
  if (yPos > 180) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos, contentWidth, 8, 'F');
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 128, 128);
  doc.text('REGISTRATION FEE STRUCTURE (FOR REFERENCE)', margin + 3, yPos + 5.5);
  yPos += 14;

  // Fee table header
  const slabCount = config.feeSlabs.length;
  const categoryColWidth = 50;
  const slabColWidth = (contentWidth - categoryColWidth) / slabCount;

  doc.setFillColor(0, 128, 128);
  doc.rect(margin, yPos, contentWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('Category', margin + 3, yPos + 6);
  
  let headerX = margin + categoryColWidth;
  config.feeSlabs.forEach((slab) => {
    doc.text(slab.label, headerX + slabColWidth/2, yPos + 6, { align: 'center' });
    headerX += slabColWidth;
  });
  yPos += 10;

  // Fee rows
  doc.setTextColor(0, 0, 0);
  const enabledFees = config.feeCategories.filter(f => f.enabled);
  enabledFees.forEach((fee, index) => {
    const rowColor = index % 2 === 0 ? 255 : 248;
    doc.setFillColor(rowColor, rowColor, rowColor);
    doc.rect(margin, yPos, contentWidth, 8, 'F');
    doc.setDrawColor(220, 220, 220);
    doc.rect(margin, yPos, contentWidth, 8);
    
    doc.setFontSize(8);
    doc.text(fee.name, margin + 3, yPos + 5.5);
    
    let cellX = margin + categoryColWidth;
    config.feeSlabs.forEach((slab) => {
      const amount = fee.fees[slab.id] || 0;
      doc.text(`₹${amount.toLocaleString('en-IN')}`, cellX + slabColWidth/2, yPos + 5.5, { align: 'center' });
      cellX += slabColWidth;
    });
    
    yPos += 8;
  });

  // Bank details and conference info
  yPos += 5;
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(`Bank Details: ${config.bankDetails}`, margin, yPos);
  yPos += 5;
  doc.text(config.conferenceInfo, margin + contentWidth - 50, yPos);

  // Footer
  doc.setFillColor(0, 128, 128);
  doc.rect(0, doc.internal.pageSize.getHeight() - 15, pageWidth, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('Ophthalmic Association Of Bihar | www.boabihar.org', pageWidth / 2, doc.internal.pageSize.getHeight() - 7, { align: 'center' });

  // Save the PDF
  doc.save(`${config.seminarName.replace(/[^a-zA-Z0-9]/g, '_')}_Registration_Form.pdf`);
};
