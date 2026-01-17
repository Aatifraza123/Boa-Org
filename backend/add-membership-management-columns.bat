@echo off
echo Adding membership management columns to database...
mysql -u root -p boa_db < add-membership-management-columns.sql
echo.
echo Membership management columns added successfully!
pause