@echo off
echo ========================================
echo  BOA Connect - Insert Default Seminar
echo ========================================
echo.

REM Load environment variables
for /f "tokens=1,2 delims==" %%a in (config\.env) do (
    if "%%a"=="DB_HOST" set DB_HOST=%%b
    if "%%a"=="DB_USER" set DB_USER=%%b
    if "%%a"=="DB_PASSWORD" set DB_PASSWORD=%%b
    if "%%a"=="DB_NAME" set DB_NAME=%%b
)

echo Inserting default seminar data...
echo.

mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < config\insert-seminar.sql

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Seminar data inserted successfully!
    echo ========================================
    echo.
    echo You can now:
    echo 1. Login to admin panel
    echo 2. Go to Seminars tab
    echo 3. Edit/Update the seminar details
    echo 4. Add/Remove fee categories
    echo 5. Modify fee amounts
    echo.
) else (
    echo.
    echo ========================================
    echo  Error inserting seminar data!
    echo ========================================
    echo.
)

pause
