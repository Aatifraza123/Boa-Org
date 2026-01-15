@echo off
echo ========================================
echo  BOA Connect - Create Admin User
echo ========================================
echo.
echo Admin Credentials:
echo Email: admin@boa.com
echo Password: admin123
echo.
pause
echo.

REM Load environment variables
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DB_HOST" set DB_HOST=%%b
    if "%%a"=="DB_USER" set DB_USER=%%b
    if "%%a"=="DB_PASSWORD" set DB_PASSWORD=%%b
    if "%%a"=="DB_NAME" set DB_NAME=%%b
)

echo Creating admin user...
echo.

mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < config\create-admin.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Admin user created successfully!
    echo ========================================
    echo.
    echo Login Credentials:
    echo Email: admin@boa.com
    echo Password: admin123
    echo.
    echo Access admin panel:
    echo 1. Go to http://localhost:8080/login
    echo 2. Login with above credentials
    echo 3. Click on avatar (top right)
    echo 4. Select "Admin Panel"
    echo.
) else (
    echo.
    echo ========================================
    echo  Error creating admin user!
    echo ========================================
    echo.
    echo Note: If user already exists, you can update:
    echo UPDATE users SET role='admin' WHERE email='admin@boa.com';
    echo.
)

pause
