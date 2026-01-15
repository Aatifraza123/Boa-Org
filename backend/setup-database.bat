@echo off
echo Setting up BOA Connect Database...
echo.
echo Please enter your MySQL root password when prompted.
echo.
mysql -u root -p < config\database.sql
echo.
echo Database setup complete!
pause
