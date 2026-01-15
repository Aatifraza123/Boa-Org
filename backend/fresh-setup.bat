@echo off
echo ========================================
echo  BOA Connect - Fresh Setup
echo ========================================
echo.
echo This will:
echo 1. Reset database (delete all data)
echo 2. Insert default seminar
echo 3. Create admin user
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

echo Step 1: Resetting database...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < config\reset-database.sql

if %errorlevel% neq 0 (
    echo Error resetting database!
    pause
    exit /b 1
)

echo.
echo Step 2: Inserting default seminar...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < config\insert-seminar.sql

if %errorlevel% neq 0 (
    echo Error inserting seminar!
    pause
    exit /b 1
)

echo.
echo Step 3: Creating admin user...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < config\create-admin.sql

if %errorlevel% neq 0 (
    echo Error creating admin!
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Fresh setup complete!
echo ========================================
echo.
echo Database is ready with:
echo - Empty tables (IDs start from 1)
echo - Default seminar (BOA 2026, Siliguri)
echo - Fee structure configured
echo - Admin user created
echo.
echo Admin Login:
echo Email: admin@boa.com
echo Password: admin123
echo.
echo Next steps:
echo 1. Start backend: npm start
echo 2. Login at http://localhost:8080/login
echo 3. Access Admin Panel from avatar menu
echo.

pause
