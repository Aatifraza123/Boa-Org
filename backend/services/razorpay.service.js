const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

class RazorpayService {
  // Create Razorpay order
  async createOrder(amount, currency = 'INR', receipt = null) {
    try {
      if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay credentials not configured');
      }

      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        payment_capture: 1, // Auto capture payment
      };

      const order = await razorpay.orders.create(options);
      
      return {
        success: true,
        order,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Verify payment signature
  verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    try {
      const body = razorpayOrderId + '|' + razorpayPaymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === razorpaySignature;
    } catch (error) {
      console.error('Signature verification error:', error);
      return false;
    }
  }

  // Get payment details
  async getPaymentDetails(paymentId) {
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      return {
        success: true,
        payment,
      };
    } catch (error) {
      console.error('Get payment details error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Refund payment
  async refundPayment(paymentId, amount = null) {
    try {
      const refundOptions = {
        payment_id: paymentId,
      };

      if (amount) {
        refundOptions.amount = amount * 100; // Convert to paise
      }

      const refund = await razorpay.payments.refund(paymentId, refundOptions);
      return {
        success: true,
        refund,
      };
    } catch (error) {
      console.error('Refund payment error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get order details
  async getOrderDetails(orderId) {
    try {
      const order = await razorpay.orders.fetch(orderId);
      return {
        success: true,
        order,
      };
    } catch (error) {
      console.error('Get order details error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new RazorpayService();