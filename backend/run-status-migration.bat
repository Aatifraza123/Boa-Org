@echo off
echo Running seminar status migration...
echo.

REM Update these with your MySQL credentials
set DB_USER=root
set DB_NAME=boa_db

REM Run the migration
mysql -u %DB_USER% -p %DB_NAME% < add-seminar-status-column.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Migration completed successfully!
    echo Status column has been added to seminars table.
) else (
    echo.
    echo Migration failed! Please check your MySQL credentials and database name.
)

echo.
pause
