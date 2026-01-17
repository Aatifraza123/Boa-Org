@echo off
echo Adding payment_orders table and Razorpay columns...
mysql -u root -p boa_connect < add-payment-orders-table.sql
echo Payment tables updated successfully!
pause