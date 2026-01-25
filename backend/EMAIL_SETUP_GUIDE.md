# Email Service Setup Guide

## Gmail Configuration for Password Reset Emails

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click on **2-Step Verification**
4. Follow the steps to enable 2-factor authentication

### Step 2: Generate App Password

1. After enabling 2-factor authentication, go back to **Security**
2. Under "Signing in to Google", click on **App passwords**
3. Select app: **Mail**
4. Select device: **Other (Custom name)**
5. Enter name: **BOA Password Reset**
6. Click **Generate**
7. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Configure Environment Variables

1. Create a `.env` file in the `backend` folder (if it doesn't exist)
2. Add these lines:

```env
EMAIL_USER=biharophthalmic2022@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

Replace `abcdefghijklmnop` with your actual 16-character app password (remove spaces).

### Step 4: Test Email Service

1. Restart your backend server
2. Check the console for: `✓ Email service is ready`
3. Try the forgot password feature
4. Check your email inbox (and spam folder)

## Troubleshooting

### "Invalid login" error
- Make sure 2-factor authentication is enabled
- Use the App Password, not your regular Gmail password
- Remove any spaces from the app password

### "Connection timeout" error
- Check your internet connection
- Make sure Gmail SMTP is not blocked by firewall
- Try using a different network

### Email not received
- Check spam/junk folder
- Wait a few minutes (sometimes delayed)
- Verify the email address is correct
- Check Gmail account quota (not full)

### Test Mode Fallback
If email service is unavailable, the system will automatically fall back to test mode and display the OTP on screen.

## Email Template

The password reset email includes:
- Professional BOA branding
- 6-digit verification code
- 10-minute expiry notice
- Security warnings
- Contact information

## Security Notes

- OTPs expire after 10 minutes
- Each OTP can only be used once
- Never share app passwords in code repositories
- Use environment variables for sensitive data
- Consider using a dedicated email service (SendGrid, AWS SES) for production

## Alternative Email Services

If you want to use a different email service:

1. **SendGrid**: More reliable for production
2. **AWS SES**: Good for high volume
3. **Mailgun**: Easy to set up
4. **Postmark**: Great deliverability

Update `config/email.config.js` accordingly.
