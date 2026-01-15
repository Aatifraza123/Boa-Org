@echo off
echo ========================================
echo  BOA Connect - Reset Database
echo ========================================
echo.
echo WARNING: This will DELETE ALL DATA!
echo All tables will be emptied and IDs will reset to 1.
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

echo Resetting database...
echo.

mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < config\reset-database.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Database reset successfully!
    echo ========================================
    echo.
    echo All data deleted and IDs reset to 1.
    echo You can now:
    echo 1. Insert seminar data: insert-seminar.bat
    echo 2. Register new users (IDs will start from 1)
    echo.
) else (
    echo.
    echo ========================================
    echo  Error resetting database!
    echo ========================================
    echo.
)

pause
