@echo off
echo ========================================
echo    RAZORPAY INTEGRATION SETUP
echo ========================================
echo.
echo This script will help you set up Razorpay integration.
echo.
echo STEP 1: Create Razorpay Account
echo - Go to https://razorpay.com/
echo - Sign up for a business account
echo - Complete KYC verification
echo.
echo STEP 2: Get API Keys
echo - Login to Razorpay Dashboard
echo - Go to Settings ^> API Keys
echo - Generate API Keys (Key ID and Key Secret)
echo.
echo STEP 3: Update Environment Variables
echo - Copy your Razorpay Key ID and Key Secret
echo - Update the .env file with your credentials
echo.
echo STEP 4: Run Database Migration
echo - Run add-payment-orders-table.bat to create required tables
echo.
echo STEP 5: Test Integration
echo - Use test mode first with test credentials
echo - Test Key ID: rzp_test_xxxxxxxxxx
echo - Test Key Secret: xxxxxxxxxx
echo.
echo ========================================
echo.
set /p key_id="Enter your Razorpay Key ID (or press Enter to skip): "
set /p key_secret="Enter your Razorpay Key Secret (or press Enter to skip): "

if "%key_id%"=="" (
    echo.
    echo Skipping automatic setup. Please manually update .env file:
    echo RAZORPAY_KEY_ID=your_razorpay_key_id
    echo RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    echo.
) else (
    echo.
    echo Updating .env file...
    
    REM Check if .env exists, if not copy from .env.example
    if not exist ".env" (
        copy ".env.example" ".env"
        echo Created .env file from .env.example
    )
    
    REM Update Razorpay credentials in .env file
    powershell -Command "(Get-Content .env) -replace 'RAZORPAY_KEY_ID=.*', 'RAZORPAY_KEY_ID=%key_id%' | Set-Content .env"
    powershell -Command "(Get-Content .env) -replace 'RAZORPAY_KEY_SECRET=.*', 'RAZORPAY_KEY_SECRET=%key_secret%' | Set-Content .env"
    
    echo ✅ Razorpay credentials updated in .env file
    echo.
)

echo ========================================
echo    NEXT STEPS
echo ========================================
echo 1. Run: add-payment-orders-table.bat
echo 2. Restart your backend server
echo 3. Test payment integration
echo.
echo For production:
echo - Replace test keys with live keys
echo - Set up webhook endpoints
echo - Configure proper error handling
echo.
pause