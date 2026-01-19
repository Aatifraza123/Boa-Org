@echo off
echo ========================================
echo  Adding Status Column to Seminars
echo ========================================
echo.

cd /d "%~dp0"

echo Running migration script...
node add-status-column.js

echo.
echo ========================================
echo  Done!
echo ========================================
echo.
pause
