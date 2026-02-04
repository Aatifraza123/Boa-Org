-- Fix committee_members table to add 'seminar' option to page_type
-- Run this query in your MySQL database

USE boa_db;

ALTER TABLE committee_members 
MODIFY COLUMN page_type ENUM('about', 'home', 'seminar') DEFAULT 'about';

-- Verify the change
SHOW COLUMNS FROM committee_members LIKE 'page_type';
