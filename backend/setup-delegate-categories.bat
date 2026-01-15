@echo off
echo ========================================
echo Setting up Delegate Categories Table
echo ========================================
echo.
mysql -u root -p boa_connect < config/add-delegate-categories.sql
echo.
echo Delegate categories table created!
echo.
pause
