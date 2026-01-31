-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: boa_connect
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `additional_persons`
--

DROP TABLE IF EXISTS `additional_persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `additional_persons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registration_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `slab_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `registration_id` (`registration_id`),
  KEY `category_id` (`category_id`),
  KEY `slab_id` (`slab_id`),
  CONSTRAINT `additional_persons_ibfk_1` FOREIGN KEY (`registration_id`) REFERENCES `registrations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `additional_persons_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `fee_categories` (`id`),
  CONSTRAINT `additional_persons_ibfk_3` FOREIGN KEY (`slab_id`) REFERENCES `fee_slabs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `additional_persons`
--

LOCK TABLES `additional_persons` WRITE;
/*!40000 ALTER TABLE `additional_persons` DISABLE KEYS */;
/*!40000 ALTER TABLE `additional_persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `house` varchar(100) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) DEFAULT 'India',
  `pin_code` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (8,23,'17','Isapur Road Islamia B.ed College Phulwari Sharif, Patna','','Patna','Bihar','India','801505','2026-01-27 12:22:21','2026-01-27 12:22:21');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certification`
--

DROP TABLE IF EXISTS `certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(255) NOT NULL,
  `registration_number` varchar(100) NOT NULL,
  `certificate_number` varchar(100) NOT NULL,
  `registration_act` varchar(255) NOT NULL,
  `registration_date` date NOT NULL,
  `registered_office` text NOT NULL,
  `certificate_image_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certification`
--

LOCK TABLES `certification` WRITE;
/*!40000 ALTER TABLE `certification` DISABLE KEYS */;
INSERT INTO `certification` VALUES (1,'Ophthalmic Association of Bihar','S000403','S22104','Societies Registration Act 21, 1860','2022-03-06','Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad, Patna - 800002, Bihar','https://res.cloudinary.com/derzj7d4u/image/upload/v1768744448/boa-certificates/lbrntaet1cqe6jb2fn4x.jpg','2026-01-13 11:17:55','2026-01-18 13:54:13');
/*!40000 ALTER TABLE `certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committee_members`
--

DROP TABLE IF EXISTS `committee_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committee_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  `image_url` text,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `page_type` enum('about','home') DEFAULT 'about',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committee_members`
--

LOCK TABLES `committee_members` WRITE;
/*!40000 ALTER TABLE `committee_members` DISABLE KEYS */;
INSERT INTO `committee_members` VALUES (1,'Dr. Ajeet Kumar','Chairman','https://res.cloudinary.com/derzj7d4u/image/upload/v1768314169/boa-certificates/oytdrusz0gjhdhqrv8bs.jpg',1,1,'about','2026-01-13 10:33:40','2026-01-13 14:22:52'),(2,'Dr. Pawan Kumar','President','https://res.cloudinary.com/derzj7d4u/image/upload/v1768470993/boa-certificates/nyewnljmuhdx4cplk34l.jpg',2,1,'about','2026-01-13 10:33:40','2026-01-15 09:56:36'),(3,'Prem Prakash','Organizing Secretary','https://res.cloudinary.com/derzj7d4u/image/upload/v1768471232/boa-certificates/uvyk1og6yuloarqluf5i.jpg',3,1,'about','2026-01-13 10:33:40','2026-01-15 10:00:36'),(5,'Dr. Avinash Prasad','Jt Organizing Secretary','https://res.cloudinary.com/derzj7d4u/image/upload/v1768477918/boa-certificates/pkdtdykyeagrdfytvr7z.jpg',5,1,'about','2026-01-13 10:57:47','2026-01-15 11:52:00'),(6,'Dr. Ajeet Kumar','Chairman','https://res.cloudinary.com/derzj7d4u/image/upload/v1768314184/boa-certificates/s3bwjrcsfiqos4twngeq.jpg',1,1,'home','2026-01-13 12:49:51','2026-01-13 15:16:07'),(7,'Dr. Pawan Kumar','President','https://res.cloudinary.com/derzj7d4u/image/upload/v1768470974/boa-certificates/cboug0t0fxn4scnn1fgd.jpg',2,1,'home','2026-01-13 12:50:21','2026-01-15 09:56:19'),(8,'Prem Prakash','Organizing Secretary','https://res.cloudinary.com/derzj7d4u/image/upload/v1768313771/boa-certificates/e6gksutwihxht6wucevt.jpg',3,1,'home','2026-01-13 12:50:58','2026-01-15 10:00:07'),(9,'Dr Krishna Narayan','Vice President','https://res.cloudinary.com/derzj7d4u/image/upload/v1768471080/boa-certificates/ntxjeb2d8soht1r1qkdx.jpg',4,1,'home','2026-01-15 09:58:19','2026-01-15 09:58:38'),(10,'Dr Naveen Kumar','Petron','https://res.cloudinary.com/derzj7d4u/image/upload/v1768471306/boa-certificates/umryapassqytrah7nq7b.jpg',5,1,'home','2026-01-15 10:02:17','2026-01-15 10:03:30'),(11,'Raj Raushan','Trasurar','https://res.cloudinary.com/derzj7d4u/image/upload/v1768471752/boa-certificates/c0f1x3srbma6dm8bgcxd.jpg',6,1,'home','2026-01-15 10:09:56','2026-01-15 10:09:56'),(12,'Dr Santhosh Kumar','Organising Secretary','https://res.cloudinary.com/derzj7d4u/image/upload/v1768472762/boa-certificates/msff6voehyvuo5414wzw.jpg',7,1,'about','2026-01-15 10:26:39','2026-01-15 10:26:39'),(13,'Dr Sundarkant','Organising','https://res.cloudinary.com/derzj7d4u/image/upload/v1768472915/boa-certificates/sucw2eupgvhqblirbwl5.jpg',8,1,'about','2026-01-15 10:29:05','2026-01-15 10:29:05'),(14,'Dr Rupesh','Organisng Secretary','https://res.cloudinary.com/derzj7d4u/image/upload/v1768473001/boa-certificates/l5lir4ssqdq1w14lojkp.jpg',9,1,'about','2026-01-15 10:31:10','2026-01-15 10:31:10'),(15,'Dr Kumar Neeraj','Trasurar','https://res.cloudinary.com/derzj7d4u/image/upload/v1768473296/boa-certificates/v29mtdzuumgpxw0kcrca.jpg',10,1,'about','2026-01-15 10:35:06','2026-01-15 10:35:06'),(16,'Ravi Kumar','Accomodation','https://res.cloudinary.com/derzj7d4u/image/upload/v1769593683/seminars/rrfzlp0fcwugwpgdyou4.jpg',0,1,'about','2026-01-28 09:48:13','2026-01-28 09:48:13'),(17,'Nagendar Kumar','Accomodation','https://res.cloudinary.com/derzj7d4u/image/upload/v1769593809/seminars/qu6ylcxriyr63dxysudj.jpg',0,1,'about','2026-01-28 09:50:13','2026-01-28 09:50:13'),(18,'Dr. Sanjay Kumar','Vice Chairman','https://res.cloudinary.com/derzj7d4u/image/upload/v1769597941/seminars/mjabfmccfdfi4cynznyt.jpg',0,1,'about','2026-01-28 10:59:05','2026-01-28 10:59:05');
/*!40000 ALTER TABLE `committee_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_info`
--

DROP TABLE IF EXISTS `contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `organization_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `address` text,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `facebook_url` varchar(255) DEFAULT NULL,
  `twitter_url` varchar(255) DEFAULT NULL,
  `linkedin_url` varchar(255) DEFAULT NULL,
  `instagram_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_info`
--

LOCK TABLES `contact_info` WRITE;
/*!40000 ALTER TABLE `contact_info` DISABLE KEYS */;
INSERT INTO `contact_info` VALUES (1,'Ophthalmic Association of Bihar','info@boabihar.org','0612-2345678','+91-9876543210','Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad','Patna','Bihar','800002',NULL,NULL,NULL,NULL,'2026-01-13 14:45:42','2026-01-13 14:45:42'),(2,'Ophthalmic Association of Bihar','info@boabihar.org','0612-2345678','+91-9876543210','Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad','Patna','Bihar','800002',NULL,NULL,NULL,NULL,'2026-01-13 14:58:45','2026-01-13 14:58:45');
/*!40000 ALTER TABLE `contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(500) NOT NULL,
  `message` text NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `status` enum('new','read','replied','archived') DEFAULT 'new',
  `admin_notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delegate_categories`
--

DROP TABLE IF EXISTS `delegate_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delegate_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seminar_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `label` varchar(100) NOT NULL,
  `description` text,
  `requires_membership` tinyint(1) DEFAULT '0',
  `display_order` int DEFAULT '0',
  `is_enabled` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_category_per_seminar` (`seminar_id`,`name`),
  CONSTRAINT `delegate_categories_ibfk_1` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delegate_categories`
--

LOCK TABLES `delegate_categories` WRITE;
/*!40000 ALTER TABLE `delegate_categories` DISABLE KEYS */;
INSERT INTO `delegate_categories` VALUES (7,4,'life member','LIFE MEMBER','For registered BOA members with valid membership',1,1,1,'2026-01-13 15:11:32'),(8,4,'non-boa-member','NON BOA MEMBER','For non-members or general participants',0,2,1,'2026-01-13 15:11:32'),(9,4,'Student','Student','For accompanying persons (spouse, family, etc.)',0,3,1,'2026-01-13 15:11:32'),(11,4,'Trade','Trade','',0,3,1,'2026-01-18 17:39:57'),(15,4,'Spouse','Spouse','',0,4,1,'2026-01-27 11:08:33');
/*!40000 ALTER TABLE `delegate_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_categories`
--

DROP TABLE IF EXISTS `fee_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seminar_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `is_popular` tinyint(1) DEFAULT '0',
  `is_enabled` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `seminar_id` (`seminar_id`),
  CONSTRAINT `fee_categories_ibfk_1` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_categories`
--

LOCK TABLES `fee_categories` WRITE;
/*!40000 ALTER TABLE `fee_categories` DISABLE KEYS */;
INSERT INTO `fee_categories` VALUES (16,4,'Life Member','For registered BOA members',1,1,'2026-01-13 15:02:38'),(17,4,'Non Boa Member','For non-members',0,1,'2026-01-13 15:02:38'),(19,4,'Student','For postgraduate students',0,1,'2026-01-13 15:02:38'),(36,4,'Spouse','',0,1,'2026-01-25 18:38:10'),(37,4,'Trade','',0,1,'2026-01-25 18:38:45'),(38,8,'Boa Member','For registered BOA members',1,1,'2026-01-27 14:44:38'),(39,8,'Non Boa Member','For non-members',0,1,'2026-01-27 14:44:38'),(40,8,'Student','For postgraduate students',0,1,'2026-01-27 14:44:38'),(41,8,'Spouse','',0,1,'2026-01-27 14:44:38'),(42,8,'Trade','',0,1,'2026-01-27 14:44:38');
/*!40000 ALTER TABLE `fee_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_slabs`
--

DROP TABLE IF EXISTS `fee_slabs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_slabs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seminar_id` int NOT NULL,
  `label` varchar(100) NOT NULL,
  `date_range` varchar(100) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `seminar_id` (`seminar_id`),
  CONSTRAINT `fee_slabs_ibfk_1` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_slabs`
--

LOCK TABLES `fee_slabs` WRITE;
/*!40000 ALTER TABLE `fee_slabs` DISABLE KEYS */;
INSERT INTO `fee_slabs` VALUES (11,4,'Early Bird','1 Feb - 20 Mar','2026-02-01','2026-03-20','2026-01-13 15:02:38'),(12,4,'Regular','21 Mar - 15 May','2026-03-21','2026-05-15','2026-01-13 15:02:38'),(14,4,'Spot','16 May - 5 Jun','2026-05-16','2026-06-05','2026-01-13 15:02:38'),(27,8,'Early Bird','1 Feb - 20 Mar','2026-02-01','2026-03-20','2026-01-27 14:44:38'),(28,8,'Regular','21 Mar - 15 May','2026-03-21','2026-05-15','2026-01-27 14:44:38'),(30,8,'Spot','16 May - 5 Jun','2026-05-16','2026-06-05','2026-01-27 14:44:38');
/*!40000 ALTER TABLE `fee_slabs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_structure`
--

DROP TABLE IF EXISTS `fee_structure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_structure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `slab_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_category_slab` (`category_id`,`slab_id`),
  KEY `slab_id` (`slab_id`),
  CONSTRAINT `fee_structure_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `fee_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fee_structure_ibfk_2` FOREIGN KEY (`slab_id`) REFERENCES `fee_slabs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_structure`
--

LOCK TABLES `fee_structure` WRITE;
/*!40000 ALTER TABLE `fee_structure` DISABLE KEYS */;
INSERT INTO `fee_structure` VALUES (66,17,11,4500.00),(67,17,12,5300.00),(69,17,14,5500.00),(140,16,11,3500.00),(141,16,12,4500.00),(143,16,14,5500.00),(145,19,11,3000.00),(146,19,12,4000.00),(147,19,14,4500.00),(148,36,12,3700.00),(149,36,11,3000.00),(151,36,14,4000.00),(152,37,11,1.00),(153,37,12,4500.00),(155,37,14,5500.00),(156,38,27,3500.00),(157,39,27,4500.00),(158,40,27,2500.00),(159,41,27,2500.00),(160,42,27,2500.00),(161,38,28,4500.00),(162,39,28,5000.00),(163,40,28,3200.00),(164,41,28,3000.00),(165,42,28,1.00),(171,38,30,5500.00),(172,39,30,5500.00),(173,40,30,4000.00),(174,41,30,3500.00),(175,42,30,5000.00);
/*!40000 ALTER TABLE `fee_structure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` text NOT NULL,
  `type` enum('image','video') DEFAULT 'image',
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery_images`
--

DROP TABLE IF EXISTS `gallery_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery_images`
--

LOCK TABLES `gallery_images` WRITE;
/*!40000 ALTER TABLE `gallery_images` DISABLE KEYS */;
INSERT INTO `gallery_images` VALUES (3,'First Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874514/boa-gallery/mizwy2ym42ly7du7scnd.jpg','active','2026-01-31 15:48:35','2026-01-31 15:48:35'),(4,'Second',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874571/boa-gallery/wq4szlnlkhn4ym2pherc.jpg','active','2026-01-31 15:49:32','2026-01-31 15:49:32'),(5,'Third',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874613/boa-gallery/diyn3xc6oodflllqruqr.jpg','active','2026-01-31 15:50:14','2026-01-31 15:50:14'),(7,'Forth Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874672/boa-gallery/rrihw2zi98bjfcebhpir.jpg','active','2026-01-31 15:51:16','2026-01-31 15:51:16'),(8,'Fifth Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874707/boa-gallery/jmairxj0eusfvl9meyps.jpg','active','2026-01-31 15:51:48','2026-01-31 15:51:48'),(9,'Sixth Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874727/boa-gallery/tchoecrggy8jtgwkrfgb.jpg','active','2026-01-31 15:52:07','2026-01-31 15:52:07'),(11,'Seventh Imgae',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874851/boa-gallery/wlzgeymps51tp0uional.jpg','active','2026-01-31 15:54:12','2026-01-31 15:54:12'),(12,'Eight Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874877/boa-gallery/wesodrx1icow0m7ks7o4.jpg','active','2026-01-31 15:54:37','2026-01-31 15:54:37'),(13,'Ninth Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874909/boa-gallery/pue0xojgq6bvo2ais4b7.jpg','active','2026-01-31 15:55:10','2026-01-31 15:55:10'),(14,'Tenth Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874932/boa-gallery/nxlilxg4mgfzsyi58ytx.jpg','active','2026-01-31 15:55:32','2026-01-31 15:55:32'),(15,'Eleventh Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874959/boa-gallery/xmch0pt0z3kopkrfsxhu.jpg','active','2026-01-31 15:56:00','2026-01-31 15:56:00'),(16,'Twelve Image',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769874986/boa-gallery/yygc9klamqcc6ftgkmdq.jpg','active','2026-01-31 15:56:27','2026-01-31 15:56:27'),(17,'Thirteen IMage',NULL,'https://res.cloudinary.com/derzj7d4u/image/upload/v1769875003/boa-gallery/r95xkyqa6ypoh161kqle.jpg','active','2026-01-31 15:56:44','2026-01-31 15:56:44');
/*!40000 ALTER TABLE `gallery_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_categories`
--

DROP TABLE IF EXISTS `membership_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `icon` varchar(50) DEFAULT 'Briefcase',
  `category` enum('passout_fee','student_fee') DEFAULT 'passout_fee',
  `price` decimal(10,2) NOT NULL,
  `student_price` decimal(10,2) DEFAULT '0.00',
  `duration` varchar(50) NOT NULL,
  `features` text NOT NULL,
  `is_recommended` tinyint(1) DEFAULT '0',
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_categories`
--

LOCK TABLES `membership_categories` WRITE;
/*!40000 ALTER TABLE `membership_categories` DISABLE KEYS */;
INSERT INTO `membership_categories` VALUES (8,'Yearly','Briefcase','passout_fee',1200.00,600.00,'One-time','[]',0,0,1,'2026-01-24 18:15:12','2026-01-24 18:15:12'),(9,'5-Yearly','Briefcase','passout_fee',5000.00,2000.00,'One-time','[]',0,0,1,'2026-01-24 18:15:37','2026-01-30 20:37:03'),(10,'Lifetime','Briefcase','passout_fee',8000.00,0.00,'One-time','[]',0,0,1,'2026-01-24 18:15:54','2026-01-30 20:36:00');
/*!40000 ALTER TABLE `membership_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_form_config`
--

DROP TABLE IF EXISTS `membership_form_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership_form_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `form_html` longtext,
  `offline_form_html` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_form_config`
--

LOCK TABLES `membership_form_config` WRITE;
/*!40000 ALTER TABLE `membership_form_config` DISABLE KEYS */;
INSERT INTO `membership_form_config` VALUES (1,'','<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>MEMBERSHIP FORM - OPHTHALMIC ASSOCIATION OF BIHAR</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            padding: 20px;\n            line-height: 1.6;\n        }\n        .header {\n            text-align: center;\n            margin-bottom: 30px;\n        }\n        .header h1 {\n            font-size: 16px;\n            margin: 5px 0;\n            text-decoration: underline;\n        }\n        .header h2 {\n            font-size: 14px;\n            margin: 5px 0;\n        }\n        .header p {\n            font-size: 12px;\n            margin: 3px 0;\n        }\n        .form-row {\n            margin: 15px 0;\n            border-bottom: 1px dotted #000;\n            padding-bottom: 5px;\n        }\n        .form-row label {\n            font-size: 12px;\n            font-weight: normal;\n        }\n        .inline-fields {\n            display: flex;\n            gap: 20px;\n        }\n        .inline-fields .form-row {\n            flex: 1;\n        }\n        .declaration {\n            margin: 30px 0;\n            padding: 15px;\n            border: 1px solid #000;\n            background: #f9f9f9;\n        }\n        .declaration h3 {\n            text-align: center;\n            font-size: 14px;\n            margin-bottom: 15px;\n            text-decoration: underline;\n        }\n        .declaration p {\n            font-size: 11px;\n            margin: 8px 0;\n            text-align: justify;\n        }\n        .signature-section {\n            margin-top: 30px;\n            display: flex;\n            justify-content: space-between;\n        }\n        .enclosures {\n            margin-top: 30px;\n            font-size: 11px;\n        }\n        .enclosures h4 {\n            font-size: 12px;\n            margin-bottom: 10px;\n        }\n        .notes {\n            margin-top: 20px;\n            font-size: 11px;\n            font-weight: bold;\n        }\n        @media print {\n            body {\n                margin: 0;\n                padding: 15px;\n                max-width: 800px;\n                margin: 0 auto;\n            }\n        }\n    </style>\n</head>\n<body>\n    <div class=\"header\">\n        <h1>MEMBERSHIP FORM</h1>\n        <h2>OPHTHALMIC ASSOCIATION OF BIHAR(Reg.no.-S00403/21-22)</h2>\n        <p>Shivpuri Road,Anishabad,Patna 800002</p>\n        <p>Email:biharophthalmic2022@gmail.com</p>\n        <p>Contact no :9334332714/7903220742/9572212739</p>\n    </div>\n\n    <hr>\n\n    <div class=\"form-row\">\n        <label>NAME....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"form-row\">\n        <label>FATHER\'S/HUSBAND NAME....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"form-row\">\n        <label>ACADEMIC QUALIFICATION....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"form-row\">\n        <label>....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label>YEAR OF PASSING........................</label>\n        </div>\n        <div class=\"form-row\">\n            <label>DOB....................................................</label>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <label>NAME OF INSTITUTION....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"form-row\">\n        <label>WORKING PLACE....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label>SEX..............................................</label>\n        </div>\n        <div class=\"form-row\">\n            <label>AGE ON 1st APR 22....................................................</label>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <label>ADDRESS....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"form-row\">\n        <label>....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"form-row\">\n        <label>....................................................................................................................................................</label>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label>MOB..............................................</label>\n        </div>\n        <div class=\"form-row\">\n            <label>EMAIL....................................................</label>\n        </div>\n    </div>\n\n    <div class=\"declaration\">\n        <h3>SELF DECLARATION</h3>\n        <p>I Smt/Sri/Kumari .................................................. Son/Daughter/wife of Mr. .........................................................................Age...................Sex.................</p>\n        <p>Do hereby declare that,the information given above and enclosed documents are true to the best of my knowledge and belief.I am well aware of the fact that If the information given by me is proved false/not true ,I will be liable for action as per the law of association.</p>\n        <p>I also declare that after getting membership of association</p>\n        <p>Never violate the rule & regulation of association or never jeopardizes the objective of association & never discloses the matter which were bring in notice directly or indirectly affect the objective of association.I will always try to my best for getting the Objectives/goal of association.</p>\n    </div>\n\n    <div class=\"signature-section\">\n        <div>\n            <p>PLACE................................................</p>\n            <p>DATE................................................</p>\n        </div>\n        <div>\n            <p>SIGNATURE</p>\n        </div>\n    </div>\n\n    <div class=\"enclosures\">\n        <h4>Enclosures</h4>\n        <p>1. Self attested copy of marksheet of diploma in ophthalmic assistant/para ophthalmology<br>\n           &nbsp;&nbsp;&nbsp;Or bachelor in ophthalmic technology/technique ,/for student ID card</p>\n        <p>2. Two passport size colour photo.</p>\n        <p>3. Self attested copy of AADHAR</p>\n        <p><strong>NOTE-FOR ANY PAYMENT A/C NO(current) 40983059661  IFSC CODE SBIN0000152</strong></p>\n        <p><strong>OPTHALMIC ASSOCIATION OF BIHAR (SBI MAIN BRANCH GANDHI MAIDAN PATNA)</strong></p>\n    </div>\n\n    <div class=\"notes\">\n        <p>NOTES  1.For student Rs 300/half yearly /500 yearly</p>\n        <p>2. For passport/professionals  600/half yearly or 1000 /yearly or 5000/10 yearly or 10000/for lifetime.</p>\n    </div>\n</body>\n</html>\n','2026-01-15 12:55:59','2026-01-15 13:06:58');
/*!40000 ALTER TABLE `membership_form_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_registrations`
--

DROP TABLE IF EXISTS `membership_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membership_registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membership_no` varchar(50) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `father_name` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `year_passing` varchar(10) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `working_place` varchar(255) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `address` text,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `membership_type` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT 'active',
  `valid_from` date DEFAULT NULL,
  `valid_until` date DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `membership_no` (`membership_no`),
  KEY `idx_razorpay_order_id` (`razorpay_order_id`),
  KEY `idx_razorpay_payment_id` (`razorpay_payment_id`),
  KEY `idx_membership_no` (`membership_no`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_registrations`
--

LOCK TABLES `membership_registrations` WRITE;
/*!40000 ALTER TABLE `membership_registrations` DISABLE KEYS */;
INSERT INTO `membership_registrations` VALUES (1,NULL,NULL,NULL,'Aatif Raza','Mushtaque Ahmad','B.Tech','2026','2002-04-20','Rungta College ','Delhi','Male',21,'new patliputra colony','08804819102','razaaatif658@gmail.com','lifetime','pay_S52dG4OdtqMnyf','order_S52cdT7eCKNf9Q','pay_S52dG4OdtqMnyf',1.00,'completed','razorpay','2026-01-17 18:16:52','2026-01-17 18:16:52','active',NULL,NULL,''),(2,NULL,NULL,NULL,'dr Krishna Narayan',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BOA/LM/0002/2023@temp.com','lifetime',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-17 18:50:02','active','2026-01-01',NULL,'Updated via admin panel test'),(3,NULL,NULL,NULL,'Dr. Sanjay Kumar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'BOA/LM/0003/2023@temp.com','standard',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-18 07:52:13','active',NULL,NULL,''),(4,NULL,NULL,NULL,'dr Anuj Kumar',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'anuj@gmail.com','lifetime',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-18 14:41:53','active',NULL,NULL,''),(5,'BOA/LM/0001/2024','Test','Member',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'test@example.com','Life Member',NULL,NULL,NULL,NULL,'completed',NULL,NULL,'2026-01-18 15:45:09','active','2024-01-01','2099-12-31',NULL),(6,NULL,NULL,NULL,'dr Modassir Imam',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'modassir12@gmail.com','standard',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-18 16:47:19','active',NULL,NULL,''),(7,NULL,NULL,NULL,'dr Modassir Imam',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'modassir@gmail.com','standard',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-18 16:55:43','active',NULL,NULL,'');
/*!40000 ALTER TABLE `membership_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (4,'Annual Conference 2024: Advancing Ophthalmic Care in Bihar','The Ophthalmic Association Of Bihar successfully organized its Annual Conference 2024, bringing together leading ophthalmologists from across the state. The conference featured cutting-edge research presentations, surgical demonstrations, and workshops on the latest treatment modalities. Over 500 medical professionals participated in this landmark event, sharing knowledge and best practices to enhance eye care services in Bihar. The conference highlighted breakthrough treatments in retinal diseases, cataract surgery innovations, and pediatric ophthalmology advancements.\r\n','https://res.cloudinary.com/derzj7d4u/image/upload/v1769876374/boa-news/xsuvcmn6ti6zobzhkdqu.jpg','active','2026-01-31 16:19:34','2026-01-31 16:19:34'),(5,'Free Eye Screening Camp: Serving Rural Communities','A comprehensive free eye screening camp was organized in rural areas of Bihar, providing essential eye care services to underserved communities. The camp examined over 1,200 patients, identifying various eye conditions including cataracts, glaucoma, and refractive errors. Free medications were distributed, and patients requiring surgery were referred to partner hospitals. This initiative demonstrates our commitment to making quality eye care accessible to all sections of society, particularly in remote areas where specialized medical services are limited.\r\n','https://res.cloudinary.com/derzj7d4u/image/upload/v1769876475/boa-news/dntidf0hdevvikfpoydr.jpg','active','2026-01-31 16:21:15','2026-01-31 16:21:15'),(6,'World Sight Day 2024: Raising Awareness About Preventable Blindness','On World Sight Day 2024, the Ophthalmic Association Of Bihar launched a state-wide awareness campaign focusing on preventable blindness. The campaign emphasized the importance of regular eye examinations, early detection of eye diseases, and proper eye care hygiene. Educational materials were distributed in local languages, and community health workers were trained to identify common eye problems. The initiative aims to reduce the burden of avoidable blindness in Bihar through education and early intervention.\r\n','https://res.cloudinary.com/derzj7d4u/image/upload/v1769876530/boa-news/k1gb5tdp4sw9itjik7nm.jpg','active','2026-01-31 16:22:11','2026-01-31 16:22:11'),(7,'Advanced Surgical Training Program: Building Expertise','The association launched an advanced surgical training program for young ophthalmologists, focusing on modern microsurgical techniques. The program includes hands-on training in phacoemulsification, vitreoretinal surgery, and corneal transplantation procedures. Experienced surgeons from leading eye institutes are serving as faculty members, ensuring high-quality training standards. This initiative aims to build local expertise and reduce the need for patients to travel outside Bihar for specialized eye surgeries.\r\n','https://res.cloudinary.com/derzj7d4u/image/upload/v1769876693/boa-news/i1i0gts9pjcie9mdqzhi.jpg','active','2026-01-31 16:24:54','2026-01-31 16:24:54'),(8,'Telemedicine Initiative: Connecting Remote Areas','A groundbreaking telemedicine initiative was launched to connect remote healthcare centers with specialist ophthalmologists. This technology-driven approach enables real-time consultation and diagnosis for patients in distant areas. The program utilizes high-resolution imaging equipment and secure communication platforms to provide expert opinions on complex cases. Initial pilot results show significant improvement in diagnostic accuracy and treatment outcomes for patients who previously had limited access to specialized eye care.\r\n','https://res.cloudinary.com/derzj7d4u/image/upload/v1769876769/boa-news/zujkfkih2eboxl6fer20.jpg','active','2026-01-31 16:26:10','2026-01-31 16:26:10');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `seminar_id` int DEFAULT NULL,
  `message` text,
  `type` varchar(50) DEFAULT 'announcement',
  `is_active` tinyint(1) DEFAULT '1',
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `seminar_id` (`seminar_id`),
  KEY `idx_active` (`is_active`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (61,'? New User Signup',NULL,'dr Anuj Kumar (anuj@gmail.com) joined the platform','activity',1,0,'2026-01-18 14:29:45','2026-01-18 14:29:45'),(63,'? New User Signup',NULL,'dr Modassir Imam (modassir12@gmail.com) joined the platform','activity',1,0,'2026-01-18 15:05:53','2026-01-18 15:05:53'),(69,'? New User Signup',NULL,'dr Modassir Imam (modassirmallick285@gmail.com) joined the platform','activity',1,0,'2026-01-24 14:43:30','2026-01-24 14:43:30'),(70,'BOA Siligori 2026',4,'New seminar: BOA Siligori 2026','announcement',1,0,'2026-01-25 18:23:11','2026-01-25 18:23:11'),(71,'BOA Siligori 2026',4,'New seminar: BOA Siligori 2026','activity',1,0,'2026-01-27 11:42:12','2026-01-27 14:31:17'),(72,'BOA Siligori 2026',4,'New seminar: BOA Siligori 2026','activity',1,0,'2026-01-27 11:42:15','2026-01-27 14:31:17'),(73,'? New User Signup',NULL,'dr Modassir Imam (modassirmallick285@gmail.com) joined the platform','activity',1,0,'2026-01-27 12:22:21','2026-01-27 12:22:21'),(74,'Election',8,'New seminar: Election','announcement',1,0,'2026-01-27 14:44:38','2026-01-27 14:44:38'),(75,'Certificate Uploaded',NULL,'A membership certificate \"Test Certificate\" has been uploaded for a member.','certificate',1,0,'2026-01-28 11:57:11','2026-01-28 11:57:11'),(76,'Certificate Uploaded',NULL,'A membership certificate \"boa\" has been uploaded for a member.','certificate',1,0,'2026-01-28 12:12:35','2026-01-28 12:12:35'),(77,'Certificate Uploaded',NULL,'A membership certificate \"boa\" has been uploaded for a member.','certificate',1,0,'2026-01-28 12:33:08','2026-01-28 12:33:08'),(78,'Certificate Uploaded',NULL,'A membership certificate \"Test Certificate After Table Recreation\" has been uploaded for a member.','certificate',1,0,'2026-01-28 12:33:40','2026-01-28 12:33:40');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offline_forms_config`
--

DROP TABLE IF EXISTS `offline_forms_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offline_forms_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `membership_form_html` longtext,
  `seminar_form_html` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offline_forms_config`
--

LOCK TABLES `offline_forms_config` WRITE;
/*!40000 ALTER TABLE `offline_forms_config` DISABLE KEYS */;
INSERT INTO `offline_forms_config` VALUES (2,'<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>MEMBERSHIP FORM - OPHTHALMIC ASSOCIATION OF BIHAR</title>\n    <style>\n        * {margin: 0; padding: 0; box-sizing: border-box;}\n        body {\n            font-family: \'Times New Roman\', Times, serif; \n            padding: 15px; \n            line-height: 1.3; \n            background: #fff;\n            max-width: 210mm;\n            margin: 0 auto;\n        }\n        .main-title {\n            text-align: center;\n            margin-bottom: 10px;\n            border-bottom: 2px solid #000;\n            padding-bottom: 8px;\n        }\n        .main-title h1 {\n            font-size: 18px; \n            font-weight: bold; \n            margin: 0;\n            text-decoration: underline;\n        }\n        .header {\n            display:flex;\n            align-items:center;\n            justify-content:space-evenly;\n            border-bottom: 2px solid #000; \n            padding-bottom: 10px;\n        }\n        .logo-section {\n            flex-shrink: 0;\n        }\n        .logo-section img {\n            max-width: 200px; \n            height: auto;\n        }\n        .header-text {\n            text-align: center;\n            flex: 1;\n            max-width: 500px;\n        }\n        .header-text h2 {\n            font-size: 14px; \n            font-weight: bold; \n            margin: 3px 0;\n        }\n        .header-text .reg-no {\n            font-size: 10px; \n            margin: 2px 0; \n            font-style: italic;\n        }\n        .header-text p {\n            font-size: 9px; \n            margin: 1px 0;\n        }\n        \n        .form-section {margin: 12px 0;}\n        .form-row {\n            margin: 6px 0; \n            display: flex; \n            align-items: center;\n        }\n        .form-row label {\n            font-size: 10px; \n            font-weight: 500;\n            white-space: nowrap; \n            margin-right: 3px;\n        }\n        .form-row .line {\n            flex: 1; \n            border-bottom: 1px solid #000; \n            height: 18px;\n        }\n        \n        .inline-fields {\n            display: flex; \n            gap: 15px; \n            margin: 6px 0;\n        }\n        .inline-fields .form-row {flex: 1; margin: 0;}\n        \n        .declaration {\n            margin: 12px 0; \n            padding: 10px; \n            border: 2px solid #000; \n            background: #f9f9f9;\n        }\n        .declaration h3 {\n            text-align: center; \n            font-size: 12px; \n            font-weight: bold; \n            margin-bottom: 8px; \n            text-decoration: underline;\n        }\n        .declaration p {\n            font-size: 9px; \n            margin: 5px 0; \n            text-align: justify; \n            line-height: 1.4;\n        }\n        .declaration .fill-line {\n            display: inline-block; \n            border-bottom: 1px dotted #000; \n            min-width: 100px; \n            margin: 0 3px;\n        }\n        \n        .signature-section {\n            margin-top: 15px; \n            display: flex; \n            justify-content: space-between; \n            align-items: flex-end;\n        }\n        .signature-section div {font-size: 9px;}\n        .signature-section .left-side p {margin: 3px 0;}\n        .signature-section .signature-box {\n            text-align: center; \n            min-width: 140px;\n        }\n        .signature-section .signature-box .sig-line {\n            border-top: 1px solid #000; \n            margin-top: 30px; \n            padding-top: 4px;\n            font-size: 9px;\n        }\n        \n        .enclosures {margin-top: 12px; font-size: 9px;}\n        .enclosures h4 {\n            font-size: 11px; \n            font-weight: bold; \n            margin-bottom: 6px; \n            text-decoration: underline;\n        }\n        .enclosures ol {margin-left: 18px; line-height: 1.5;}\n        .enclosures li {margin: 4px 0;}\n        \n        .page-break {\n            page-break-before: always; \n            margin-top: 25px;\n        }\n        \n        .section-title {\n            text-align: center; \n            margin: 15px 0 10px 0; \n            text-decoration: underline; \n            font-size: 13px;\n            font-weight: bold;\n        }\n        \n        .membership-table {\n            width: 100%; \n            border-collapse: collapse; \n            margin: 10px 0; \n            font-size: 10px;\n        }\n        .membership-table th, .membership-table td {\n            border: 1px solid #000; \n            padding: 6px 8px; \n            text-align: left;\n        }\n        .membership-table th {\n            background: #e0e0e0; \n            font-weight: bold;\n            text-align: center;\n        }\n        .membership-table td {text-align: center;}\n        .membership-table td:first-child {text-align: left;}\n        \n        .bank-details {\n            margin: 12px 0; \n            padding: 10px; \n            border: 2px solid #000; \n            background: #f5f5f5;\n        }\n        .bank-details h4 {\n            font-size: 11px; \n            font-weight: bold; \n            margin-bottom: 8px; \n            text-align: center; \n            text-decoration: underline;\n        }\n        .bank-details p {\n            font-size: 9px; \n            margin: 4px 0;\n            line-height: 1.4;\n        }\n        \n        .qr-section {\n            text-align: center; \n            margin: 12px 0;\n        }\n        .qr-section h4 {\n            font-size: 10px; \n            margin-bottom: 8px;\n            font-weight: bold;\n        }\n        .qr-section img {\n            max-width: 120px; \n            height: auto; \n            border: 2px solid #000; \n            padding: 6px;\n        }\n        .qr-section p {\n            font-size: 9px; \n            margin: 4px 0; \n            font-weight: bold;\n        }\n        \n        .committee-section {margin-top: 15px;}\n        .committee-section h3 {\n            text-align: center; \n            font-size: 13px; \n            font-weight: bold; \n            margin-bottom: 12px; \n            text-decoration: underline;\n        }\n        .committee-grid {\n            display: grid; \n            grid-template-columns: repeat(3, 1fr); \n            gap: 15px; \n            margin: 10px 0;\n        }\n        .committee-member {\n            text-align: center; \n            padding: 8px; \n            border: 1px solid #ccc; \n            border-radius: 5px;\n            background: #fafafa;\n        }\n        .committee-member img {\n            width: 70px; \n            height: 70px; \n            border-radius: 50%; \n            object-fit: cover; \n            margin-bottom: 6px; \n            border: 2px solid #0B3C5D;\n        }\n        .committee-member h4 {\n            font-size: 10px; \n            font-weight: bold; \n            margin: 3px 0;\n        }\n        .committee-member p {\n            font-size: 8px; \n            color: #666;\n            font-style: italic;\n        }\n        \n        .notes {\n            margin-top: 10px; \n            padding: 8px; \n            background: #fff3cd; \n            border: 1px solid #ffc107; \n            border-radius: 4px;\n        }\n        .notes h4 {\n            font-size: 10px; \n            font-weight: bold; \n            margin-bottom: 5px;\n        }\n        .notes p {\n            font-size: 8px; \n            margin: 3px 0;\n            line-height: 1.3;\n        }\n        \n        @media print {\n            body {margin: 0; padding: 10mm;}\n            .page-break {page-break-before: always;}\n        }\n    </style>\n</head>\n<body>\n    <!-- PAGE 1: MAIN FORM -->\n    <div class=\"main-title\">\n        <h1>MEMBERSHIP FORM</h1>\n    </div>\n    \n    <div class=\"header\">\n        <div class=\"logo-section\">\n            <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768477374/boa-certificates/pjm2se9296raotekzmrc.png\" alt=\"BOA Logo\">\n        </div>\n        <div class=\"header-text\">\n            <h2>OPHTHALMIC ASSOCIATION OF BIHAR</h2>\n            <p class=\"reg-no\">(Reg. No. - S00403/21-22)</p>\n            <p>Shivpuri Road, Anishabad, Patna 800002</p>\n            <p>Email: biharophthalmic2022@gmail.com | Contact: 9334332714 / 7903220742 / 9572212739</p>\n        </div>\n            </div>\n    \n    <div class=\"form-section\">\n        <div class=\"form-row\">\n            <label>NAME:</label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"form-row\">\n            <label>FATHER\'S/HUSBAND NAME:</label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"form-row\">\n            <label>ACADEMIC QUALIFICATION:</label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"inline-fields\">\n            <div class=\"form-row\">\n                <label>YEAR OF PASSING:</label>\n                <div class=\"line\"></div>\n            </div>\n            <div class=\"form-row\" style=\"flex: 1.5;\">\n                <label>DATE OF BIRTH:</label>\n                <span style=\"border-bottom: 1px solid #000; width: 35px; display: inline-block; margin: 0 2px;\"></span>\n                <span style=\"font-size: 8px;\">/</span>\n                <span style=\"border-bottom: 1px solid #000; width: 35px; display: inline-block; margin: 0 2px;\"></span>\n                <span style=\"font-size: 8px;\">/</span>\n                <span style=\"border-bottom: 1px solid #000; width: 50px; display: inline-block; margin: 0 2px;\"></span>\n                <span style=\"font-size: 7px; margin-left: 3px; color: #666;\">(DD/MM/YYYY)</span>\n            </div>\n        </div>\n        \n        <div class=\"form-row\">\n            <label>NAME OF INSTITUTION:</label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"form-row\">\n            <label>WORKING PLACE:</label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"inline-fields\">\n            <div class=\"form-row\">\n                <label>SEX:</label>\n                <div class=\"line\"></div>\n            </div>\n            <div class=\"form-row\">\n                <label>AGE ON 1st APR 2022:</label>\n                <div class=\"line\"></div>\n            </div>\n        </div>\n        \n        <div class=\"form-row\">\n            <label>CORRESPONDENCE ADDRESS:</label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"form-row\">\n            <label></label>\n            <div class=\"line\"></div>\n        </div>\n        \n        <div class=\"inline-fields\">\n            <div class=\"form-row\">\n                <label>MOBILE NO.:</label>\n                <div class=\"line\"></div>\n            </div>\n            <div class=\"form-row\">\n                <label>EMAIL ID:</label>\n                <div class=\"line\"></div>\n            </div>\n        </div>\n    </div>\n    \n    <div class=\"declaration\">\n        <h3>SELF DECLARATION</h3>\n        <p>I Smt/Sri/Kumari <span class=\"fill-line\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Son/Daughter/Wife of Mr. <span class=\"fill-line\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Age <span class=\"fill-line\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Sex <span class=\"fill-line\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>\n        \n        <p>Do hereby declare that, the information given above and enclosed documents are true to the best of my knowledge and belief. I am well aware of the fact that if the information given by me is proved false/not true, I will be liable for action as per the law of association.</p>\n        \n        <p>I also declare that after getting membership of association: Never violate the rule & regulation of association or never jeopardizes the objective of association & never discloses the matter which were bring in notice directly or indirectly affect the objective of association. I will always try to my best for getting the Objectives/goal of association.</p>\n    </div>\n    \n    <div class=\"signature-section\">\n        <div class=\"left-side\">\n            <p>PLACE: <span class=\"fill-line\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>\n            <p>DATE: <span class=\"fill-line\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>\n        </div>\n        <div class=\"signature-box\">\n            <p>SIGNATURE</p>\n            <div class=\"sig-line\">Applicant\'s Signature</div>\n        </div>\n    </div>\n    \n    <div class=\"enclosures\">\n        <h4>Enclosures:</h4>\n        <ol>\n            <li>Self attested copy of marksheet of diploma in ophthalmic assistant/para ophthalmology OR bachelor in ophthalmic technology/technique (for student ID card)</li>\n            <li>Two passport size colour photographs</li>\n            <li>Self attested copy of AADHAR Card</li>\n        </ol>\n    </div>\n    \n    <!-- PAGE 2: MEMBERSHIP DETAILS -->\n    <div class=\"page-break\"></div>\n    \n    <h3 class=\"section-title\">Membership Details & Payment Information</h3>\n    \n    <table class=\"membership-table\">\n        <thead>\n            <tr>\n                <th>Membership Type</th>\n                <th>Passout Fee</th>\n                <th>Student Fee</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Yearly Membership</td>\n                <td>₹1,200</td>\n                <td>₹600</td>\n            </tr>\n            <tr>\n                <td>5-Year Membership</td>\n                <td>₹5,000</td>\n                <td>₹2,000</td>\n            </tr>\n            <tr>\n                <td>Lifetime Membership</td>\n                <td>₹8,000</td>\n                <td>Not Available</td>\n            </tr>\n        </tbody>\n    </table>\n     <p><b>Special Offer :</b> Pay membership fees with conference registration or before the conference date to receive 20% discount. </p>\n    <div class=\"bank-details\">\n        <h4>Bank Account Details for Payment</h4>\n        <p><strong>Account Name:</strong> Ophthalmic Association of Bihar</p>\n        <p><strong>Account Number:</strong> 40983059661</p>\n        <p><strong>IFSC Code:</strong> SBIN0000152</p>\n        <p><strong>Bank Name:</strong> State Bank of India (SBI), Main Branch</p>\n        <p><strong>Branch:</strong> Gandhi Maidan, Patna</p>\n    </div>\n    \n    \n    <div class=\"committee-section\">\n        <h3>Committee Members</h3>\n        <div class=\"committee-grid\">\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768470993/boa-certificates/nyewnljmuhdx4cplk34l.jpg\" alt=\"Dr. Pawan Kumar\">\n                <h4>Dr. Pawan Kumar</h4>\n                <p>President</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768471232/boa-certificates/uvyk1og6yuloarqluf5i.jpg\" alt=\"Prem Prakash\">\n                <h4>Prem Prakash</h4>\n                <p>Organizing Secretary</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768471752/boa-certificates/c0f1x3srbma6dm8bgcxd.jpg\" alt=\"Raj Raushan\">\n                <h4>Raj Raushan</h4>\n                <p>Treasurer</p>\n            </div>\n        </div>\n    </div>\n</body>\n</html>','','2026-01-17 16:44:58','2026-01-28 09:35:26');
/*!40000 ALTER TABLE `offline_forms_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_orders`
--

DROP TABLE IF EXISTS `payment_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) NOT NULL,
  `payment_id` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'INR',
  `status` enum('created','paid','captured','failed','cancelled') DEFAULT 'created',
  `payment_method` varchar(50) DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_payment_id` (`payment_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_orders`
--

LOCK TABLES `payment_orders` WRITE;
/*!40000 ALTER TABLE `payment_orders` DISABLE KEYS */;
INSERT INTO `payment_orders` VALUES (1,'order_S51EoYZnMUCqxd',NULL,100.00,'INR','created',NULL,'{}','2026-01-17 16:54:46','2026-01-17 16:54:46'),(2,'order_S51HADhVHVXa48',NULL,1000.00,'INR','created',NULL,'{}','2026-01-17 16:57:00','2026-01-17 16:57:00'),(3,'order_S51ICBcwLNAmSs',NULL,1000.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 1, \"seminar_id\": 1}','2026-01-17 16:57:58','2026-01-17 16:57:58'),(4,'order_S51Ks5REFcP8Z0',NULL,1000.00,'INR','created',NULL,'{}','2026-01-17 17:00:30','2026-01-17 17:00:30'),(5,'order_S51NWvVM90Jbhn',NULL,1000.00,'INR','created',NULL,'{}','2026-01-17 17:03:01','2026-01-17 17:03:01'),(6,'order_S51NsGMAUFGLh8',NULL,1000.00,'INR','created',NULL,'{\"type\": \"seminar\"}','2026-01-17 17:03:21','2026-01-17 17:03:21'),(7,'order_S51P396cYigDQW',NULL,1000.00,'INR','created',NULL,'{}','2026-01-17 17:04:28','2026-01-17 17:04:28'),(8,'order_S51QHHwIl0fHxU',NULL,1000.00,'INR','created',NULL,'{\"type\": \"seminar\"}','2026-01-17 17:05:38','2026-01-17 17:05:38'),(9,'order_S51QvJiYutogSx',NULL,1500.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 1, \"seminar_id\": 1}','2026-01-17 17:06:14','2026-01-17 17:06:14'),(10,'order_S51UcZ0iK5ls18',NULL,1000.00,'INR','created',NULL,'{}','2026-01-17 17:09:44','2026-01-17 17:09:44'),(11,'order_S51Y3xEFTksm0n',NULL,1500.00,'INR','created',NULL,'{}','2026-01-17 17:13:00','2026-01-17 17:13:00'),(12,'order_S51cM4IkmvBlfB',NULL,3200.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:17:04','2026-01-17 17:17:04'),(13,'order_S51g45OeviZBKa','pay_S51gpqdEJAAzM6',5.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:20:34','2026-01-17 17:21:32'),(14,'order_S51nkTsgdgyrXG','pay_S51oGbqREtvOzk',5.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:27:51','2026-01-17 17:28:36'),(15,'order_S51wh5DARLCAp4','pay_S51x4Zt6z8s4x3',2.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:36:19','2026-01-17 17:36:56'),(16,'order_S522UcCIJYVyd0','pay_S52354w5ZDVC7x',1.00,'INR','paid','upi','{\"type\": \"membership\", \"membership_type\": \"yearly_student\"}','2026-01-17 17:41:48','2026-01-17 17:42:36'),(17,'order_S527vdF7D9yRaX','pay_S528Cuw64tIM4L',3.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:46:57','2026-01-17 17:47:27'),(18,'order_S52CGnJF3dwzHd','pay_S52CWI0AHxwBwU',3.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:51:03','2026-01-17 17:51:34'),(19,'order_S52Fv32uBbZ3hy','pay_S52GGtEQ2G6wgm',2.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 10, \"seminar_id\": 4}','2026-01-17 17:54:31','2026-01-17 17:55:06'),(20,'order_S52cdT7eCKNf9Q','pay_S52dG4OdtqMnyf',1.00,'INR','paid','upi','{\"type\": \"membership\", \"membership_type\": \"lifetime\"}','2026-01-17 18:16:01','2026-01-17 18:16:52'),(21,'order_S5NP6fe6IU7td8','pay_S5NQ8r12S6VuSC',6.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 4}','2026-01-18 14:35:47','2026-01-18 14:37:03'),(22,'order_S5Ol9QJLnA81Xw',NULL,8000.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 20, \"seminar_id\": 4}','2026-01-18 15:55:21','2026-01-18 15:55:21'),(23,'order_S5oflI4PbjyQjR',NULL,1.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 6}','2026-01-19 17:16:17','2026-01-19 17:16:17'),(24,'order_S5ourVnXneb8aq','pay_S5ovKUwHxlKHY3',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 6}','2026-01-19 17:30:34','2026-01-19 17:31:16'),(25,'order_S5ozkQ0jtPNEEf','pay_S5p0IrbyIkSqJh',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 6}','2026-01-19 17:35:12','2026-01-19 17:35:58'),(26,'order_S5p50qILh4UDw1',NULL,1.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 6}','2026-01-19 17:40:11','2026-01-19 17:40:11'),(27,'order_S5p6MODsYyxDnJ','pay_S5p6b281WTJZff',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 6}','2026-01-19 17:41:27','2026-01-19 17:41:57'),(28,'order_S6yJ5UO9a4Y4Kz',NULL,1.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 19, \"seminar_id\": 6}','2026-01-22 15:20:45','2026-01-22 15:20:45'),(29,'order_S8siRzze3k5VVn',NULL,7200.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 22, \"seminar_id\": 4}','2026-01-27 11:10:36','2026-01-27 11:10:36'),(30,'order_S8yNgcAUYf7W7p',NULL,4000.00,'INR','created',NULL,'{\"type\": \"seminar\", \"user_id\": 23, \"seminar_id\": 4}','2026-01-27 16:43:06','2026-01-27 16:43:06'),(31,'order_S9GssVxxXbGtCT','pay_S9GtKdCprLlxZB',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 23, \"seminar_id\": 4}','2026-01-28 10:49:07','2026-01-28 10:49:48'),(32,'order_S9HDuXT8uJj7D4','pay_S9HEdd35ihnFOl',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 23, \"seminar_id\": 4}','2026-01-28 11:09:01','2026-01-28 11:09:57'),(33,'order_S9HTjarbSPueXt','pay_S9HUH134Mo1yYH',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"user_id\": 23, \"seminar_id\": 4}','2026-01-28 11:24:00','2026-01-28 11:24:46'),(34,'order_SASeNag2914rg3','pay_SASedsetECs5u9',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 10:58:43','2026-01-31 10:59:14'),(35,'order_SASlpHoYo45Klt','pay_SASmMBGCq44HoT',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 11:05:46','2026-01-31 11:06:31'),(36,'order_SASpE3xhOfS238',NULL,1200.00,'INR','created',NULL,'{\"type\": \"membership\"}','2026-01-31 11:08:59','2026-01-31 11:08:59'),(37,'order_SASv6ALpenvPQ5','pay_SASvZiZsDJ3Dxl',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 11:14:32','2026-01-31 11:15:14'),(38,'order_SAT09c8dxzADoe','pay_SAT0UTlUk2qVZL',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 11:19:19','2026-01-31 11:19:56'),(39,'order_SAT9wKjOycDnzR','pay_SATA9OHF0AYsNe',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 11:28:35','2026-01-31 11:29:02'),(40,'order_SATGPXQcs2g3l4','pay_SATGkP8rjs4DlH',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 11:34:43','2026-01-31 11:35:16'),(41,'order_SATltjcYmxMADS','pay_SATmRAEiEU77DO',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 12:04:31','2026-01-31 12:05:23'),(42,'order_SATqho94MOPxg7','pay_SATqxEjtszX8jl',1.00,'INR','paid','upi','{\"type\": \"seminar\", \"seminar_id\": 4}','2026-01-31 12:09:04','2026-01-31 12:09:35');
/*!40000 ALTER TABLE `payment_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registration_no` varchar(50) NOT NULL,
  `user_id` int DEFAULT NULL,
  `seminar_id` int NOT NULL,
  `category_id` int NOT NULL,
  `slab_id` int NOT NULL,
  `delegate_type` enum('life-member','non-boa-member','accompanying-person') NOT NULL,
  `category_name` varchar(100) DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed','cancelled') DEFAULT 'pending',
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  `payment_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `guest_name` varchar(255) DEFAULT NULL,
  `guest_email` varchar(255) DEFAULT NULL,
  `guest_mobile` varchar(20) DEFAULT NULL,
  `guest_address` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_no` (`registration_no`),
  KEY `category_id` (`category_id`),
  KEY `slab_id` (`slab_id`),
  KEY `idx_user` (`user_id`),
  KEY `idx_seminar` (`seminar_id`),
  KEY `idx_status` (`status`),
  KEY `idx_razorpay_order_id` (`razorpay_order_id`),
  KEY `idx_razorpay_payment_id` (`razorpay_payment_id`),
  KEY `idx_guest_email` (`guest_email`),
  CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE CASCADE,
  CONSTRAINT `registrations_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `fee_categories` (`id`),
  CONSTRAINT `registrations_ibfk_4` FOREIGN KEY (`slab_id`) REFERENCES `fee_slabs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registrations`
--

LOCK TABLES `registrations` WRITE;
/*!40000 ALTER TABLE `registrations` DISABLE KEYS */;
INSERT INTO `registrations` VALUES (56,'REG-2026-3807',23,4,37,12,'non-boa-member',NULL,1.00,'completed','razorpay','pay_S9HUH134Mo1yYH','order_S9HTjarbSPueXt','pay_S9HUH134Mo1yYH','2026-01-28 11:24:46','2026-01-28 11:24:46','2026-01-28 11:24:46',NULL,NULL,NULL,NULL),(57,'REG-2026-9977',NULL,4,37,11,'non-boa-member','Trade',1.00,'completed','razorpay','pay_SASmMBGCq44HoT','order_SASlpHoYo45Klt','pay_SASmMBGCq44HoT','2026-01-31 11:06:31','2026-01-31 11:06:31','2026-01-31 11:06:31',NULL,NULL,NULL,NULL),(58,'REG-2026-7026',24,4,37,11,'non-boa-member','Trade',1.00,'completed','razorpay','pay_SATqxEjtszX8jl','order_SATqho94MOPxg7','pay_SATqxEjtszX8jl','2026-01-31 12:09:35','2026-01-31 12:09:35','2026-01-31 12:09:35',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `category` enum('guidelines','forms','presentations','publications') NOT NULL,
  `file_url` varchar(500) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `file_size` varchar(50) DEFAULT NULL,
  `downloads_count` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'Cataract Surgery Guidelines 2024','Comprehensive guidelines for modern cataract surgery techniques','guidelines','https://example.com/cataract-guidelines.pdf','PDF','2.5 MB',0,0,1,'2026-01-16 15:21:51','2026-01-16 16:10:34'),(2,'Diabetic Retinopathy Management Protocol','Evidence-based protocol for diabetic retinopathy screening and treatment','guidelines','https://example.com/diabetic-retinopathy.pdf','PDF','1.8 MB',0,0,2,'2026-01-16 15:21:51','2026-01-16 16:10:34'),(10,'Annual Report 2023','BOA Annual Report for the year 2023','publications','https://example.com/annual-report-2023.pdf','PDF','4.8 MB',0,0,10,'2026-01-16 15:21:51','2026-01-31 17:43:53');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seminars`
--

DROP TABLE IF EXISTS `seminars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seminars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `registration_start` date NOT NULL,
  `registration_end` date NOT NULL,
  `description` text,
  `offline_form_html` longtext,
  `image_url` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `status` varchar(20) DEFAULT 'active' COMMENT 'Event status: active (upcoming) or previous (completed)',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `color` varchar(20) DEFAULT '#0B3C5D',
  `online_registration_enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_active` (`is_active`),
  KEY `idx_dates` (`start_date`,`end_date`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seminars`
--

LOCK TABLES `seminars` WRITE;
/*!40000 ALTER TABLE `seminars` DISABLE KEYS */;
INSERT INTO `seminars` VALUES (4,'BOA Siligori 2026','','Siligori','Sivok Road','2026-06-06','2026-06-07','2026-01-30','2026-06-03','','<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Bihar Ophthalmic Association 2026, Siliguri - Registration Form</title>\n    <style>\n        * {margin: 0; padding: 0; box-sizing: border-box;}\n        body {\n            font-family: Arial, sans-serif;\n            padding: 20px;\n            background: #fff;\n            max-width: 210mm;\n            margin: 0 auto;\n            line-height: 1.4;\n        }\n        .header {\n            text-align: center;\n            margin-bottom: 15px;\n            border-bottom: 3px solid #000;\n            padding-bottom: 10px;\n        }\n        .header h1 {\n            font-size: 22px;\n            font-weight: bold;\n            margin: 5px 0;\n        }\n        .header h2 {\n            font-size: 16px;\n            font-weight: bold;\n            margin: 3px 0;\n        }\n        .header p {\n            font-size: 12px;\n            margin: 3px 0;\n        }\n        .section-title {\n            background: #000;\n            color: #fff;\n            padding: 6px 10px;\n            font-size: 12px;\n            font-weight: bold;\n            margin: 15px 0 10px 0;\n        }\n        .form-row {\n            margin: 8px 0;\n            display: flex;\n            align-items: center;\n        }\n        .form-row label {\n            font-size: 11px;\n            font-weight: 500;\n            margin-right: 5px;\n        }\n        .form-row label.required:after {\n            content: \" *\";\n            color: red;\n        }\n        .form-row .line {\n            flex: 1;\n            border-bottom: 1px solid #000;\n            height: 20px;\n        }\n        .inline-fields {\n            display: flex;\n            gap: 15px;\n            margin: 8px 0;\n        }\n        .inline-fields .form-row {\n            flex: 1;\n            margin: 0;\n        }\n        .checkbox-group {\n            display: flex;\n            gap: 20px;\n            margin: 8px 0;\n            align-items: center;\n        }\n        .checkbox-group label {\n            font-size: 11px;\n            display: flex;\n            align-items: center;\n            gap: 5px;\n        }\n        .checkbox-group input[type=\"checkbox\"] {\n            width: 14px;\n            height: 14px;\n        }\n        .dob-field {\n            display: flex;\n            align-items: center;\n            gap: 3px;\n        }\n        .dob-field .small-line {\n            border-bottom: 1px solid #000;\n            width: 35px;\n            display: inline-block;\n            height: 18px;\n        }\n        .dob-field .medium-line {\n            border-bottom: 1px solid #000;\n            width: 50px;\n            display: inline-block;\n            height: 18px;\n        }\n        .dob-field span {\n            font-size: 11px;\n        }\n        .fee-table {\n            width: 100%;\n            border-collapse: collapse;\n            margin: 10px 0;\n            font-size: 11px;\n        }\n        .fee-table th,\n        .fee-table td {\n            border: 1px solid #000;\n            padding: 6px 8px;\n            text-align: left;\n        }\n        .fee-table th {\n            background: #e0e0e0;\n            font-weight: bold;\n            text-align: center;\n        }\n        .fee-table td {\n            text-align: center;\n        }\n        .fee-table td:first-child {\n            text-align: left;\n            font-weight: 500;\n        }\n        .bank-details {\n            margin: 15px 0;\n            padding: 10px;\n            border: 2px solid #000;\n            background: #f5f5f5;\n        }\n        .bank-details h3 {\n            font-size: 12px;\n            font-weight: bold;\n            margin-bottom: 8px;\n            text-align: center;\n        }\n        .bank-details p {\n            font-size: 10px;\n            margin: 4px 0;\n        }\n        .note {\n            margin: 10px 0;\n            padding: 8px;\n            background: #fff3cd;\n            border: 1px solid #ffc107;\n            font-size: 10px;\n            line-height: 1.4;\n        }\n        .note strong {\n            font-weight: bold;\n        }\n        .declaration {\n            margin: 15px 0;\n            padding: 10px;\n            border: 2px solid #000;\n            background: #f9f9f9;\n        }\n        .declaration h3 {\n            font-size: 12px;\n            font-weight: bold;\n            margin-bottom: 8px;\n            text-align: center;\n        }\n        .declaration p {\n            font-size: 10px;\n            margin: 5px 0;\n            text-align: justify;\n            line-height: 1.4;\n        }\n        .signature-section {\n            margin-top: 20px;\n            display: flex;\n            justify-content: space-between;\n            align-items: flex-end;\n        }\n        .signature-box {\n            text-align: center;\n            min-width: 150px;\n        }\n        .signature-box p {\n            font-size: 10px;\n            font-weight: bold;\n        }\n        .signature-box .sig-line {\n            border-top: 1px solid #000;\n            margin-top: 35px;\n            padding-top: 5px;\n            font-size: 10px;\n        }\n        .committee-section {\n            margin-top: 20px;\n            padding: 10px;\n            background: #f0f0f0;\n            border: 1px solid #ccc;\n        }\n        .committee-section h3 {\n            font-size: 12px;\n            font-weight: bold;\n            margin-bottom: 10px;\n            text-align: center;\n        }\n        .committee-grid {\n            display: grid;\n            grid-template-columns: repeat(4, 1fr);\n            gap: 10px;\n            margin: 8px 0;\n        }\n        .committee-member {\n            text-align: center;\n            font-size: 9px;\n        }\n        .committee-member img {\n            width: 80px;\n            height: 80px;\n            border-radius: 50%;\n            object-fit: cover;\n            margin-bottom: 5px;\n            border: 2px solid #0B3C5D;\n        }\n        .committee-member h4 {\n            font-weight: bold;\n            margin: 3px 0;\n            font-size: 9px;\n        }\n        .committee-member p {\n            font-size: 8px;\n            color: #666;\n        }\n        .footer {\n            margin-top: 15px;\n            text-align: center;\n            padding-top: 10px;\n            border-top: 2px solid #000;\n            font-size: 10px;\n        }\n        .footer p {\n            margin: 3px 0;\n        }\n        @media print {\n            body {margin: 0; padding: 10mm;}\n        }\n    </style>\n</head>\n<body>\n    <div class=\"header\">\n        <div style=\"text-align: center; margin-bottom: 10px;\">\n            <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768480910/boa-certificates/bj4ka2iihfrzkevnw7bk.png\" alt=\"BOA Logo\" style=\"max-width: 100px; height: auto;\">\n        </div>\n        <h1>10th Annual Conference</h1>\n        <h1>Bihar Ophthalmic Association 2026, Siliguri</h1>\n        <h2>Registration Form</h2>\n        <p>6 - 7 june 2026 | Hotel Milestone, Sevok Road, Siliguri</p>\n    </div>\n\n    <div class=\"section-title\">PERSONAL INFORMATION</div>\n    \n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label class=\"required\">Surname</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\">\n            <label class=\"required\">First Name</label>\n            <div class=\"line\"></div>\n        </div>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label class=\"required\">Date of Birth</label>\n            <div class=\"dob-field\">\n                <span class=\"small-line\"></span>\n                <span>/</span>\n                <span class=\"small-line\"></span>\n                <span>/</span>\n                <span class=\"medium-line\"></span>\n                <span style=\"font-size: 8px; color: #666; margin-left: 3px;\">(DD/MM/YYYY)</span>\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <label class=\"required\">Gender</label>\n            <div class=\"checkbox-group\" style=\"margin: 0;\">\n                <label><input type=\"checkbox\"> Male</label>\n                <label><input type=\"checkbox\"> Female</label>\n                <label><input type=\"checkbox\"> Other</label>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label class=\"required\">Mobile</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\">\n            <label>Phone (Optional)</label>\n            <div class=\"line\"></div>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <label class=\"required\">Email</label>\n        <div class=\"line\"></div>\n    </div>\n\n    <div class=\"section-title\">ADDRESS</div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label class=\"required\">House / Flat No.</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\">\n            <label class=\"required\">Street / Locality</label>\n            <div class=\"line\"></div>\n        </div>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label class=\"required\">City</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\">\n            <label class=\"required\">State</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\" style=\"flex: 0.5;\">\n            <label class=\"required\">Pin Code</label>\n            <div class=\"line\"></div>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <label class=\"required\">Country</label>\n        <div class=\"line\"></div>\n    </div>\n\n    <div class=\"section-title\">REGISTRATION DETAILS</div>\n\n    <div class=\"form-row\">\n        <label class=\"required\">Delegate Category</label>\n        <div class=\"checkbox-group\" style=\"margin-left: 10px;\">\n            <label><input type=\"checkbox\"> BOA Member</label>\n            <label><input type=\"checkbox\"> Non-BOA Member</label>\n            <label><input type=\"checkbox\"> Accompanying Person</label>\n        </div>\n    </div>\n\n    <div class=\"form-row\">\n        <label>BOA Membership No. (Required for BOA Members)</label>\n        <div class=\"line\"></div>\n    </div>\n\n    <div class=\"section-title\">REGISTRATION FEE PAID DETAILS</div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label>Amount Paid (₹)</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\">\n            <label>Date of Payment</label>\n            <div class=\"line\"></div>\n        </div>\n    </div>\n\n    <div class=\"inline-fields\">\n        <div class=\"form-row\">\n            <label>Transaction / DD / Cheque No.</label>\n            <div class=\"line\"></div>\n        </div>\n        <div class=\"form-row\">\n            <label>Bank Name</label>\n            <div class=\"line\"></div>\n        </div>\n    </div>\n\n    <div class=\"declaration\">\n        <h3>CONSENT & DECLARATION</h3>\n        <p>I hereby declare that the information provided above is true and correct. I agree to abide by the rules and regulations of Bihar Ophthalmic Association.</p>\n    </div>\n\n    <div class=\"signature-section\">\n        <div class=\"signature-box\">\n            <p>Signature</p>\n            <div class=\"sig-line\">Applicant\'s Signature</div>\n        </div>\n        <div class=\"signature-box\">\n            <p>Date</p>\n            <div class=\"sig-line\">DD/MM/YYYY</div>\n        </div>\n    </div>\n\n    <div style=\"page-break-before: always; margin-top: 30px;\"></div>\n\n    <h3 style=\"text-align: center; margin: 15px 0; font-size: 14px; text-decoration: underline;\">REGISTRATION FEE STRUCTURE</h3>\n\n    <table class=\"fee-table\">\n        <thead>\n            <tr>\n                <th>Category</th>\n                <th>Early Saver with Accomodation 25 Deligates<br><span style=\"font-size: 9px; font-weight: normal;\">1 feb - 28 feb</span></th>\n                <th>Regular<br><span style=\"font-size: 9px; font-weight: normal;\">1 Mar - 15 May</span></th>\n                <th>Spot Registration</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>Life Members</td>\n                <td>₹3,500</td>\n                <td>₹4,500</td>\n                <td>₹5,500</td>\n            </tr>\n            <tr>\n                <td>Non Members</td>\n                <td>₹4,500</td>\n                <td>₹5,300</td>\n                <td>₹5,500</td>\n            </tr>\n            <tr>\n                <td>Student</td>\n                <td>₹3,000</td>\n                <td>₹4,000</td>\n                <td>₹4,500</td>\n            </tr>\n            <tr>\n                <td>Spouse</td>\n                <td>₹3,000</td>\n                <td>₹3,700</td>\n                <td>₹4,000</td>\n            </tr>\n            <tr>\n                <td>Trade</td>\n                <td>₹3,000</td>\n                <td>₹4,500</td>\n                <td>₹5,500</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <div class=\"bank-details\">\n        <h3>Bank Details for Payment</h3>\n        <p><strong>Account Name:</strong> Ophthalmic Association of Bihar</p>\n        <p><strong>Account Number:</strong> 40983059661</p>\n        <p><strong>IFSC Code:</strong> SBIN0000152</p>\n        <p><strong>Bank Name:</strong> SBI Main Branch, Patna</p>\n    </div>\n\n    <div class=\"note\">\n        <strong>Note:</strong> Please make payment to the above bank account and mention your name and mobile number in the transaction remarks. Keep the transaction receipt for verification.\n    </div>\n\n    <div class=\"committee-section\">\n        <h3>Organising Committee</h3>\n        <div class=\"committee-grid\">\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768314169/boa-certificates/oytdrusz0gjhdhqrv8bs.jpg\" alt=\"Dr. Ajeet Kumar\">\n                <h4>Dr. Ajeet Kumar</h4>\n                <p>Chairman</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768472762/boa-certificates/msff6voehyvuo5414wzw.jpg\" alt=\"Dr. Santosh Kumar\">\n                <h4>Dr. Santosh Kumar</h4>\n                <p>Organising Secretary</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768472915/boa-certificates/sucw2eupgvhqblirbwl5.jpg\" alt=\"Dr. Sundarkant\">\n                <h4>Dr. Sundarkant</h4>\n                <p>Organising Secretary</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768473001/boa-certificates/l5lir4ssqdq1w14lojkp.jpg\" alt=\"Dr. Rupesh\">\n                <h4>Dr. Rupesh</h4>\n                <p>Organising Secretary</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768473296/boa-certificates/v29mtdzuumgpxw0kcrca.jpg\" alt=\"Dr. Kumar Neeraj\">\n                <h4>Dr. Kumar Neeraj</h4>\n                <p>Treasurer</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1769593683/seminars/rrfzlp0fcwugwpgdyou4.jpg\" alt=\"Ravi Kumar\">\n                <h4>Ravi Kumar</h4>\n                <p>Accomodation</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1769593809/seminars/qu6ylcxriyr63dxysudj.jpg\" alt=\"Nagendar Kumar\">\n                <h4>Nagendar Kumar</h4>\n                <p>Accomodation</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1769597941/seminars/mjabfmccfdfi4cynznyt.jpg\" alt=\"Dr. Sanjay Kumar\">\n                <h4>Dr. Sanjay Kumar</h4>\n                <p>Accomodation</p>\n            </div>\n            <div class=\"committee-member\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768477918/boa-certificates/pkdtdykyeagrdfytvr7z.jpg\" alt=\"Dr. Avinash Prasad\">\n                <h4>Dr. Avinash Prasad</h4>\n                <p>Treasurer</p>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"footer\">\n        <p><strong>Bihar Ophthalmic Association</strong></p>\n        <p>Ved Vani, East Shivpuri, Chitkohara Bypass Road, Po-Anishabad, Patna - 800002</p>\n        <p>www.boabihar.org | Email: info@boabihar.org</p>\n        <p>Mobile no: +91-9334332714 | +91-9431282768 | +91-9572188936</p>\n    </div>\n</body>\n</html>','https://res.cloudinary.com/derzj7d4u/image/upload/v1768313220/boa-certificates/u9wvdph0efiwxtmtlsi2.png',1,'active','2026-01-13 13:45:28','2026-01-31 10:52:15','#1166d4',1),(8,'Election','','Sevok Road','Hotel Milestone','2026-01-25','2026-01-25','2025-12-30','2026-01-24','','<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>BOA Election 2026 - Nomination Form</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n\n        body {\n            font-family: \'Arial\', sans-serif;\n            padding: 20px;\n            background: #fff;\n        }\n\n        .container {\n            max-width: 900px;\n            margin: 0 auto;\n            border: 2px solid #000;\n            padding: 20px;\n        }\n\n        /* Header with Logo and Title */\n        .header {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 30px;\n            margin-bottom: 15px;\n            padding-bottom: 12px;\n            border-bottom: 2px solid #000;\n        }\n\n        .logo {\n            width: 170px;\n            height: auto;\n        }\n\n        .logo img {\n            width: 100%;\n            height: 100%;\n            object-fit: contain;\n        }\n\n        .title {\n            font-size: 30px;\n            font-weight: bold;\n            color: #333;\n        }\n\n        /* Info Section */\n        .info-section {\n            margin-bottom: 15px;\n            padding: 12px;\n            background: #f5f5f5;\n            border: 2px solid #000;\n        }\n\n        .info-row {\n            display: flex;\n            align-items: center;\n            justify-content: space-between;\n            margin-bottom: 8px;\n            gap: 15px;\n        }\n\n        .info-row:last-child {\n            margin-bottom: 0;\n        }\n\n        .info-item {\n            display: flex;\n            align-items: center;\n            gap: 6px;\n        }\n\n        .info-label {\n            font-weight: bold;\n            font-size: 13px;\n        }\n\n        .info-value {\n            font-size: 13px;\n        }\n\n        .deadline-box {\n            display: inline-block;\n            border: 3px solid #000;\n            padding: 8px 20px;\n            min-width: 150px;\n            text-align: center;\n            font-weight: bold;\n            font-size: 14px;\n            background: #fff;\n        }\n\n        /* Positions Section */\n        .positions-section {\n            margin-bottom: 15px;\n        }\n\n        .section-title {\n            font-size: 14px;\n            font-weight: bold;\n            margin-bottom: 10px;\n            text-align: center;\n            text-decoration: underline;\n        }\n\n        .position-item {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n            gap: 15px;\n        }\n\n        .position-label {\n            font-size: 13px;\n            font-weight: 600;\n            min-width: 120px;\n        }\n\n        .position-checkbox {\n            width: 20px;\n            height: 20px;\n            border: 2px solid #000;\n            cursor: pointer;\n        }\n\n        /* Form Fields */\n        .form-section {\n            margin-top: 15px;\n        }\n\n        .form-row {\n            display: flex;\n            margin-bottom: 12px;\n            gap: 20px;\n        }\n\n        .form-group {\n            flex: 1;\n        }\n\n        .form-label {\n            font-size: 12px;\n            font-weight: 600;\n            margin-bottom: 5px;\n            display: block;\n        }\n\n        .form-input {\n            width: 100%;\n            padding: 6px 8px;\n            border: 1px solid #000;\n            border-bottom: 2px solid #000;\n            font-size: 12px;\n            background: #fff;\n        }\n\n        .form-input:focus {\n            outline: none;\n            background: #f9f9f9;\n        }\n\n        /* Note */\n        .note {\n            margin-top: 15px;\n            padding: 10px;\n            background: #fffbea;\n            border-left: 4px solid #f59e0b;\n            font-size: 11px;\n            font-style: italic;\n            line-height: 1.4;\n        }\n\n        /* Print Styles */\n        @media print {\n            body {\n                padding: 20px;\n            }\n\n            .container {\n                border: 2px solid #000;\n            }\n        }\n    </style>\n</head>\n\n<body>\n    <div class=\"container\">\n        <!-- Header -->\n        <div class=\"header\">\n            <div class=\"logo\">\n                <img src=\"https://res.cloudinary.com/derzj7d4u/image/upload/v1768477374/boa-certificates/pjm2se9296raotekzmrc.png\"\n                    alt=\"BOA Logo\">\n            </div>\n<div>\n            <div class=\"title\">BOA Election 2026</div>\n<div class=\"title-bottom\" style=\"margin-top:5px;\"><strong>Only for Life Member</strong></div>\n<p style=\"margin-top:5px;\">Mobile no: +91-7004259876 </p>\n</div>\n        </div>\n\n        <!-- Info Section -->\n        <div class=\"info-section\">\n            <div class=\"info-row\">\n                <div class=\"info-item\">\n                    <span class=\"info-label\">Only for:</span>\n                    <span class=\"info-value\">Life Member</span>\n                </div>\n                <div class=\"info-item\">\n                    <span class=\"info-label\">Form Type:</span>\n                    <span class=\"info-value\">Nomination Form</span>\n                </div>\n            </div>\n            <div class=\"info-row\">\n                <div class=\"info-item\">\n                    <span class=\"info-label\">Deadline:</span>\n                    <span class=\"deadline-box\">Till 15 May</span>\n                </div>\n            </div>\n            <div class=\"info-row\">\n                <div class=\"info-item\">\n                    <span class=\"info-label\">Voting Date:</span>\n                    <span class=\"info-value\">7 May</span>\n                </div>\n                <div class=\"info-item\">\n                    <span class=\"info-label\">Voting Time:</span>\n                    <span class=\"info-value\">9am to 11am in venue, Siliguri</span>\n                </div>\n            </div>\n        </div>\n\n        <!-- Positions Section -->\n        <div class=\"positions-section\">\n            <div class=\"section-title\">Select Position (Tick One)</div>\n\n            <div class=\"position-item\">\n                <input type=\"checkbox\" class=\"position-checkbox\" id=\"president\" name=\"position\" value=\"president\">\n                <label for=\"president\" class=\"position-label\">President</label>\n            </div>\n\n             <div class=\"position-item\">\n                <input type=\"checkbox\" class=\"position-checkbox\" id=\"vice-president\" name=\"position\" value=\"vice-president\">\n                <label for=\"vice-president\" class=\"position-label\">Vice President</label>\n            </div>\n\n            <div class=\"position-item\">\n                <input type=\"checkbox\" class=\"position-checkbox\" id=\"secretary\" name=\"position\" value=\"secretary\">\n                <label for=\"secretary\" class=\"position-label\">Secretary</label>\n            </div>\n\n            <div class=\"position-item\">\n                <input type=\"checkbox\" class=\"position-checkbox\" id=\"treasurer\" name=\"position\" value=\"treasurer\">\n                <label for=\"treasurer\" class=\"position-label\">Treasurer</label>\n            </div>\n        </div>\n\n        <!-- Form Fields -->\n        <div class=\"form-section\">\n            <div class=\"form-row\">\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Name</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Life Membership No</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n            </div>\n\n            <div class=\"form-row\">\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Designation</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n            </div>\n\n            <div class=\"form-row\">\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Qualification</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Working Place</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n            </div>\n\n            <div class=\"form-row\">\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Age</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Sex</label>\n                    <input type=\"text\" class=\"form-input\" >\n                </div>\n            </div>\n\n            <div class=\"form-row\">\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Mobile No</label>\n                    <input type=\"text\" class=\"form-input\" >\n                </div>\n            </div>\n\n            <div class=\"form-row\">\n                <div class=\"form-group\">\n                    <label class=\"form-label\">Address</label>\n                    <input type=\"text\" class=\"form-input\">\n                </div>\n            </div>\n        </div>\n\n        <!-- Note -->\n        <div class=\"note\">\n            <strong>Note:</strong> This nomination form must be submitted by the deadline mentioned above. Only Life Members\n            are eligible to nominate and vote. Please ensure all details are filled correctly.\n        </div>\n    </div>\n\n</body>\n\n</html>','',1,'active','2026-01-27 14:44:38','2026-01-31 10:14:40','#f77c08',0);
/*!40000 ALTER TABLE `seminars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_config`
--

DROP TABLE IF EXISTS `site_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `favicon_url` varchar(500) DEFAULT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `hero_circle_image_url` varchar(500) DEFAULT NULL,
  `site_title` varchar(255) DEFAULT 'Bihar Ophthalmic Association',
  `site_description` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_config`
--

LOCK TABLES `site_config` WRITE;
/*!40000 ALTER TABLE `site_config` DISABLE KEYS */;
INSERT INTO `site_config` VALUES (1,'https://res.cloudinary.com/derzj7d4u/image/upload/v1768477374/boa-certificates/pjm2se9296raotekzmrc.png','https://res.cloudinary.com/derzj7d4u/image/upload/v1768480910/boa-certificates/bj4ka2iihfrzkevnw7bk.png','https://res.cloudinary.com/derzj7d4u/image/upload/v1768477388/boa-certificates/fdjr6ylncdihtkkvrr5h.png','Bihar Ophthalmic Association','Leading organization for ophthalmology professionals in Bihar','2026-01-15 12:41:55','2026-01-15 11:32:55');
/*!40000 ALTER TABLE `site_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stats`
--

DROP TABLE IF EXISTS `stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stat_key` varchar(100) NOT NULL,
  `stat_value` varchar(50) NOT NULL,
  `stat_label` varchar(100) NOT NULL,
  `stat_icon` varchar(50) NOT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stat_key` (`stat_key`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stats`
--

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
INSERT INTO `stats` VALUES (1,'total_members','2','Active Members','Users',1,1,'2026-01-31 17:41:00','2026-01-31 17:58:28'),(2,'years_of_service','3','Years of Service','Calendar',2,1,'2026-01-31 17:41:00','2026-01-31 17:41:00'),(3,'seminars_conducted','25','Seminars Conducted','Award',3,1,'2026-01-31 17:41:00','2026-01-31 17:41:00'),(4,'districts_covered','38','Districts Covered','MapPin',4,1,'2026-01-31 17:41:00','2026-01-31 17:41:00');
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `image_url` text,
  `testimonial` text NOT NULL,
  `rating` int DEFAULT '5',
  `is_active` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (3,'Dr. Amit Singh','Consultant Ophthalmologist','Gaya Eye Care Center',NULL,'The networking opportunities and knowledge sharing at BOA events are invaluable for professional growth.',5,1,3,'2026-01-22 14:42:41','2026-01-22 14:42:41');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `upcoming_events`
--

DROP TABLE IF EXISTS `upcoming_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upcoming_events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seminar_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT '',
  `description` text,
  `location` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `image_url` text NOT NULL,
  `link_url` text,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `color` varchar(20) DEFAULT '#0B3C5D',
  PRIMARY KEY (`id`),
  KEY `seminar_id` (`seminar_id`),
  CONSTRAINT `upcoming_events_ibfk_1` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upcoming_events`
--

LOCK TABLES `upcoming_events` WRITE;
/*!40000 ALTER TABLE `upcoming_events` DISABLE KEYS */;
INSERT INTO `upcoming_events` VALUES (1,4,'10th annual','','Siligori','2026-06-06','2026-06-07','https://res.cloudinary.com/derzj7d4u/image/upload/v1768475083/boa-certificates/szjx7j7ndi7so9cx1u0q.png','',1,1,'2026-01-13 12:30:23','2026-01-28 16:18:16','#0B3C5D');
/*!40000 ALTER TABLE `upcoming_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_certificates`
--

DROP TABLE IF EXISTS `user_certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `seminar_id` int DEFAULT NULL,
  `certificate_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `certificate_url` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issued_date` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `certificate_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'membership',
  `uploaded_by` int DEFAULT NULL COMMENT 'Admin user ID who uploaded',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_seminar_id` (`seminar_id`),
  CONSTRAINT `user_certificates_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_certificates_ibfk_2` FOREIGN KEY (`seminar_id`) REFERENCES `seminars` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_certificates`
--

LOCK TABLES `user_certificates` WRITE;
/*!40000 ALTER TABLE `user_certificates` DISABLE KEYS */;
INSERT INTO `user_certificates` VALUES (1,23,NULL,'boa','https://res.cloudinary.com/derzj7d4u/image/upload/v1769603588/certificates/e58sbp0xisch76olvlaa.jpg','2026-01-01','2026-01-12',NULL,'membership',1,'2026-01-28 12:33:08','2026-01-28 12:33:08'),(2,23,NULL,'Test Certificate After Table Recreation','https://res.cloudinary.com/derzj7d4u/image/upload/v1769603619/certificates/sjyhw7jycbtdgicvmplu.jpg','2024-01-28',NULL,'Testing certificate upload after recreating table','membership',1,'2026-01-28 12:33:40','2026-01-28 12:33:40');
/*!40000 ALTER TABLE `user_certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(10) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `membership_no` varchar(50) DEFAULT NULL,
  `is_boa_member` tinyint(1) DEFAULT '0',
  `role` enum('user','admin') DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `address` text,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pincode` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `membership_no` (`membership_no`),
  KEY `idx_email` (`email`),
  KEY `idx_membership` (`membership_no`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (23,'dr','Modassir','Imam','modassirmallick285@gmail.com','$2b$10$7eWhWOfUIz2gYXnLNnw1PuR.2iAuQYxJ2ayHnCRNUZO9/lhlNeTBS','7484993431','','male','2026-01-15',NULL,0,'user',1,'2026-01-27 12:22:21','2026-01-27 12:22:21',NULL,NULL,NULL,NULL),(24,'dr','Modassir','Imam','ddd@',NULL,'7484993431',NULL,NULL,NULL,NULL,0,'user',1,'2026-01-31 12:09:35','2026-01-31 12:09:35','17 PHULWARI SHARIF','Patna','Bihar','801505');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-01  0:31:07
