@echo off
echo ========================================
echo  BOA Connect - Setup Admin Database
echo ========================================
echo.

REM Load environment variables
for /f "tokens=1,2 delims==" %%a in (.env) do (
    if "%%a"=="DB_HOST" set DB_HOST=%%b
    if "%%a"=="DB_USER" set DB_USER=%%b
    if "%%a"=="DB_PASSWORD" set DB_PASSWORD=%%b
)

echo Creating admin database and tables...
echo.

mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% < config\admin-database.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Admin database setup complete!
    echo ========================================
    echo.
    echo Admin Login Credentials:
    echo Username: moddasier
    echo Password: admin123
    echo.
    echo Database: boa_admin
    echo Tables: admin_users, admin_sessions, admin_activity_log
    echo.
    echo Login URL: http://localhost:8080/admin-login
    echo.
) else (
    echo.
    echo ========================================
    echo  Error setting up admin database!
    echo ========================================
    echo.
)

pause
