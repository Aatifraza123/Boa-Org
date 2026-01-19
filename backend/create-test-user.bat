@echo off
echo ========================================
echo  BOA Connect - Create Test User
echo ========================================
echo.
echo Creating test user...
echo Email: test@boa.org
echo Password: test123
echo.

mysql -u Modassir -padmin123 boa_connect < create-test-user.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Test user created successfully!
    echo ========================================
    echo.
    echo Login Credentials:
    echo Email: test@boa.org
    echo Password: test123
    echo.
    echo Login URL: http://localhost:8080/login
    echo.
) else (
    echo.
    echo ========================================
    echo  Error creating test user!
    echo ========================================
    echo.
    echo Please check:
    echo 1. MySQL is running
    echo 2. Database credentials are correct
    echo 3. Database 'boa_connect' exists
    echo.
)

pause
