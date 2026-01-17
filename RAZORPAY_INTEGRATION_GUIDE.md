# Razorpay Integration Guide

## Overview

This guide explains the complete Razorpay integration implemented across all payment methods in the BOA Connect application. The integration provides secure, real-time payment processing with automatic status updates.

## Features Implemented

### ✅ Complete Razorpay Integration
- **Seminar Registration Payments**: Full Razorpay checkout integration
- **Membership Form Payments**: Direct Razorpay payment processing
- **Real-time Payment Verification**: Automatic signature verification
- **Database Integration**: Payment tracking with order and payment IDs
- **Auto Status Updates**: Automatic payment status updates in admin panel
- **Webhook Support**: Ready for production webhook integration

### ✅ Payment Methods Supported
- Credit/Debit Cards
- UPI (PhonePe, Google Pay, Paytm, etc.)
- Net Banking
- Wallets
- EMI Options (available through Razorpay)

## Setup Instructions

### 1. Install Dependencies
Dependencies are already installed:
- Backend: `razorpay` package
- Frontend: `razorpay` package

### 2. Database Setup
Run the database migration:
```bash
cd backend
add-payment-orders-table.bat
```

This creates:
- `payment_orders` table for tracking Razorpay orders
- Adds Razorpay columns to existing tables

### 3. Razorpay Account Setup
1. **Create Account**: Go to [Razorpay.com](https://razorpay.com/)
2. **Get API Keys**: 
   - Login to Dashboard
   - Go to Settings > API Keys
   - Generate Key ID and Key Secret
3. **Test Mode**: Start with test credentials

### 4. Environment Configuration
Run the setup script:
```bash
cd backend
setup-razorpay.bat
```

Or manually update `.env`:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
```

### 5. Start Servers
```bash
# Backend
cd backend
npm run dev

# Frontend  
cd boa-connect
npm run dev
```

## How It Works

### Seminar Registration Flow
1. **User fills registration form** → Personal, Address, Registration, Fee details
2. **Clicks "Pay Now"** → Creates Razorpay order via API
3. **Razorpay Checkout opens** → User completes payment
4. **Payment verification** → Backend verifies signature
5. **Registration created** → Stored with payment details
6. **Success page shown** → With receipt download option

### Membership Form Flow
1. **User fills membership form** → Personal details and membership type
2. **Clicks "Pay Now"** → Direct Razorpay checkout
3. **Payment processing** → Real-time verification
4. **Membership created** → Stored in database
5. **Confirmation** → Success message and email notification

### Payment Verification Process
1. **Order Creation**: Backend creates Razorpay order
2. **Checkout**: Frontend opens Razorpay checkout
3. **Payment**: User completes payment
4. **Callback**: Razorpay returns payment details
5. **Verification**: Backend verifies signature using webhook secret
6. **Database Update**: Payment status updated automatically

## API Endpoints

### Payment Routes (`/api/payment/`)

#### Create Order
```http
POST /api/payment/create-order
Content-Type: application/json
Authorization: Bearer <token>

{
  "amount": 1500,
  "currency": "INR",
  "receipt": "seminar_123",
  "metadata": {
    "type": "seminar",
    "seminar_id": 1
  }
}
```

#### Verify Payment
```http
POST /api/payment/verify-payment
Content-Type: application/json
Authorization: Bearer <token>

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx", 
  "razorpay_signature": "signature_xxx",
  "registration_data": {...},
  "payment_type": "seminar"
}
```

#### Webhook (Production)
```http
POST /api/payment/webhook
X-Razorpay-Signature: <signature>

{
  "event": "payment.captured",
  "payload": {
    "payment": {
      "entity": {...}
    }
  }
}
```

## Database Schema

### payment_orders Table
```sql
CREATE TABLE payment_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(255) NOT NULL UNIQUE,
    payment_id VARCHAR(255) NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    status ENUM('created', 'paid', 'captured', 'failed', 'cancelled'),
    payment_method VARCHAR(50) NULL,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Updated Tables
- `registrations`: Added `razorpay_order_id`, `razorpay_payment_id`
- `membership_registrations`: Added Razorpay columns and `amount`

## Frontend Integration

### Razorpay Service (`/src/lib/razorpay.ts`)
```typescript
// Create order and process payment
const result = await razorpayService.processSeminarPayment(
  totalAmount,
  registrationData,
  userDetails
);
```

### Key Features
- **Script Loading**: Automatic Razorpay script loading
- **Order Creation**: Backend API integration
- **Checkout Handling**: Razorpay checkout management
- **Payment Verification**: Automatic signature verification
- **Error Handling**: Comprehensive error management

## Admin Panel Integration

### Real-time Updates
- **Payment Status**: Automatically updated (pending → confirmed)
- **Registration Details**: Include Razorpay transaction IDs
- **Payment History**: Complete payment tracking
- **Notifications**: Activity notifications for new payments

### Payment Status Display
- ✅ **Confirmed**: Payment successful and verified
- ⏳ **Pending**: Payment initiated but not completed
- ❌ **Failed**: Payment failed or cancelled

## Testing

### Test Credentials
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
```

### Test Cards
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI
- **Success**: success@razorpay
- **Failure**: failure@razorpay

## Production Deployment

### 1. Live Credentials
Replace test credentials with live ones:
```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxx
```

### 2. Webhook Configuration
1. **Create Webhook**: In Razorpay Dashboard
2. **URL**: `https://yourdomain.com/api/payment/webhook`
3. **Events**: `payment.captured`, `payment.failed`
4. **Secret**: Add to environment variables

### 3. Security Considerations
- ✅ **HTTPS Required**: All production endpoints must use HTTPS
- ✅ **Signature Verification**: All payments verified server-side
- ✅ **Environment Variables**: Secrets stored securely
- ✅ **Input Validation**: All inputs validated and sanitized

## Troubleshooting

### Common Issues

#### 1. "Razorpay is not available"
- **Cause**: Script loading failed
- **Solution**: Check internet connection, try again

#### 2. "Invalid payment signature"
- **Cause**: Wrong key secret or corrupted data
- **Solution**: Verify RAZORPAY_KEY_SECRET in .env

#### 3. "Payment verification failed"
- **Cause**: Network issues or server error
- **Solution**: Check backend logs, retry payment

#### 4. Database errors
- **Cause**: Missing tables or columns
- **Solution**: Run `add-payment-orders-table.bat`

### Debug Mode
Enable detailed logging:
```javascript
// In razorpay.service.js
console.log('Payment verification:', {
  order_id,
  payment_id,
  signature,
  expected_signature
});
```

## Support

### Razorpay Documentation
- [Integration Guide](https://razorpay.com/docs/payments/payment-gateway/web-integration/)
- [API Reference](https://razorpay.com/docs/api/)
- [Webhooks](https://razorpay.com/docs/webhooks/)

### BOA Connect Support
- Check backend logs for payment errors
- Verify database schema is up to date
- Test with Razorpay test credentials first
- Contact Razorpay support for payment gateway issues

## Summary

The Razorpay integration is now complete across all payment methods:

✅ **Seminar Registration**: Full Razorpay checkout integration  
✅ **Membership Forms**: Direct payment processing  
✅ **Real-time Verification**: Automatic signature verification  
✅ **Database Integration**: Complete payment tracking  
✅ **Admin Panel Updates**: Automatic status updates  
✅ **Production Ready**: Webhook support and security measures  

Users can now make secure payments using any method supported by Razorpay, with automatic status updates visible in both user dashboard and admin panel.