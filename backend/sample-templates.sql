-- Sample HTML templates for testing dynamic PDF generation

-- Insert sample membership form template
INSERT INTO offline_forms_config (membership_form_html, seminar_form_html) VALUES (
'<div class="boa-header">
  <div class="boa-title">{{BOA_NAME}}</div>
  <div>MEMBERSHIP APPLICATION FORM</div>
</div>

<div class="form-section">
  <div class="section-title">PERSONAL INFORMATION</div>
  
  <div class="form-field">
    <div class="field-label">Full Name:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Father\'s Name:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Date of Birth:</div>
    <div class="field-line" style="width: 150px;"></div>
    <span style="margin-left: 50px;">Age:</span>
    <div class="field-line" style="width: 100px;"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Gender:</div>
    <div class="field-line" style="width: 150px;"></div>
    <span style="margin-left: 50px;">Mobile:</span>
    <div class="field-line" style="width: 200px;"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Email:</div>
    <div class="field-line"></div>
  </div>
</div>

<div class="form-section">
  <div class="section-title">QUALIFICATION DETAILS</div>
  
  <div class="form-field">
    <div class="field-label">Qualification:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Year of Passing:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Institution:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Current Working Place:</div>
    <div class="field-line"></div>
  </div>
</div>

<div class="form-section">
  <div class="section-title">ADDRESS</div>
  
  <div class="form-field">
    <div class="field-label">Complete Address:</div>
    <div class="field-line"></div>
    <div class="field-line"></div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Pin Code:</div>
    <div class="field-line"></div>
  </div>
</div>

<div class="form-section">
  <div class="section-title">MEMBERSHIP TYPE</div>
  
  <div class="checkbox-group">
    <div>☐ Yearly Membership (₹1,200)</div>
    <div>☐ 5-Year Membership (₹5,000)</div>
    <div>☐ Lifetime Membership (₹8,000)</div>
    <div>☐ Yearly Student (₹600)</div>
    <div>☐ 5-Year Student (₹2,000)</div>
  </div>
</div>

<div class="declaration">
  <div class="section-title">DECLARATION</div>
  <p>I hereby apply for membership of {{BOA_NAME}} and agree to abide by the rules and regulations of the association.</p>
</div>

<div class="signature-section">
  <div>Date: _______________</div>
  <div>Signature: ____________________</div>
</div>

<div class="form-section">
  <div class="section-title">FOR OFFICE USE ONLY</div>
  <div class="form-field">
    <div class="field-label">Application Received:</div>
    <div class="field-line"></div>
  </div>
  <div class="form-field">
    <div class="field-label">Membership No:</div>
    <div class="field-line"></div>
  </div>
  <div class="form-field">
    <div class="field-label">Approved By:</div>
    <div class="field-line"></div>
  </div>
</div>',

'<div class="boa-header">
  <div class="seminar-title">{{SEMINAR_NAME}}</div>
  <div class="seminar-details">{{SEMINAR_VENUE}}, {{SEMINAR_LOCATION}}</div>
  <div class="seminar-details">{{SEMINAR_START_DATE}} - {{SEMINAR_END_DATE}}</div>
  <div style="margin-top: 10px; font-size: 16px;">OFFLINE REGISTRATION FORM</div>
</div>

<div class="form-section">
  <div class="section-title">PERSONAL INFORMATION</div>
  
  <div class="form-field">
    <div class="field-label">Title:</div>
    <div class="field-line" style="width: 100px;"></div>
    <span style="margin-left: 30px;">Full Name:</span>
    <div class="field-line" style="width: 300px;"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Surname:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Date of Birth:</div>
    <div class="field-line" style="width: 150px;"></div>
    <span style="margin-left: 50px;">Gender:</span>
    <div class="field-line" style="width: 150px;"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Email:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Mobile:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Qualification:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Institution:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Working Place:</div>
    <div class="field-line"></div>
  </div>
</div>

<div class="form-section">
  <div class="section-title">ADDRESS DETAILS</div>
  
  <div class="form-field">
    <div class="field-label">House/Building:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Street/Area:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Landmark:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">City:</div>
    <div class="field-line" style="width: 200px;"></div>
    <span style="margin-left: 50px;">State:</span>
    <div class="field-line" style="width: 200px;"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Country:</div>
    <div class="field-line" style="width: 200px;"></div>
    <span style="margin-left: 50px;">Pin Code:</span>
    <div class="field-line" style="width: 150px;"></div>
  </div>
</div>

<div class="form-section">
  <div class="section-title">REGISTRATION DETAILS</div>
  
  <div class="form-field">
    <div class="field-label">Delegate Category:</div>
    <div class="checkbox-group">
      <div>☐ BOA Member (Membership No: ___________________)</div>
      <div>☐ Non-BOA Member</div>
      <div>☐ Student</div>
    </div>
  </div>
</div>

<div class="fee-structure">
  <div class="section-title">FEE STRUCTURE</div>
  <p><strong>BOA Member:</strong></p>
  <div>☐ Early Bird: ₹2,000 | ☐ Regular: ₹2,500 | ☐ Spot: ₹3,000</div>
  
  <p><strong>Non-BOA Member:</strong></p>
  <div>☐ Early Bird: ₹3,000 | ☐ Regular: ₹3,500 | ☐ Spot: ₹4,000</div>
  
  <p><strong>Student:</strong></p>
  <div>☐ Early Bird: ₹1,000 | ☐ Regular: ₹1,200 | ☐ Spot: ₹1,500</div>
</div>

<div class="form-section">
  <div class="section-title">ADDITIONAL PERSONS (Optional)</div>
  
  <div class="form-field">
    <div class="field-label">Person 1 Name:</div>
    <div class="field-line"></div>
  </div>
  <div class="form-field">
    <div class="field-label">Category:</div>
    <div class="field-line" style="width: 200px;"></div>
    <span style="margin-left: 50px;">Fee: ₹</span>
    <div class="field-line" style="width: 150px;"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Person 2 Name:</div>
    <div class="field-line"></div>
  </div>
  <div class="form-field">
    <div class="field-label">Category:</div>
    <div class="field-line" style="width: 200px;"></div>
    <span style="margin-left: 50px;">Fee: ₹</span>
    <div class="field-line" style="width: 150px;"></div>
  </div>
</div>

<div class="form-section">
  <div class="section-title">PAYMENT DETAILS</div>
  
  <div class="form-field">
    <div class="field-label">Main Registration Fee: ₹</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Additional Person Fee: ₹</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Total Amount: ₹</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Payment Mode:</div>
    <div class="checkbox-group">
      <div>☐ Online ☐ Bank Transfer ☐ Cash ☐ Cheque</div>
    </div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Transaction ID/Cheque No:</div>
    <div class="field-line"></div>
  </div>
  
  <div class="form-field">
    <div class="field-label">Payment Date:</div>
    <div class="field-line"></div>
  </div>
</div>

<div class="declaration">
  <div class="section-title">DECLARATION</div>
  <p>I hereby register for {{SEMINAR_NAME}} and agree to abide by the terms and conditions of {{BOA_NAME}}.</p>
  <p>I understand that registration fees are non-refundable except in case of event cancellation.</p>
</div>

<div class="signature-section">
  <div>Date: _______________</div>
  <div>Signature: ________________________</div>
</div>

<div class="form-section">
  <div class="section-title">FOR OFFICE USE ONLY</div>
  <div class="form-field">
    <div class="field-label">Registration No:</div>
    <div class="field-line" style="width: 200px;"></div>
    <span style="margin-left: 50px;">Payment Verified:</span>
    <div class="field-line" style="width: 200px;"></div>
  </div>
  <div class="form-field">
    <div class="field-label">Approved By:</div>
    <div class="field-line" style="width: 200px;"></div>
    <span style="margin-left: 50px;">Date:</span>
    <div class="field-line" style="width: 150px;"></div>
  </div>
</div>'
) ON DUPLICATE KEY UPDATE 
membership_form_html = VALUES(membership_form_html),
seminar_form_html = VALUES(seminar_form_html);