-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: maisavingb
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `paidbill`
--

DROP TABLE IF EXISTS `paidbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paidbill` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `trx_id` bigint unsigned NOT NULL,
  `nouid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `spr_id` int DEFAULT NULL,
  `jen1` json DEFAULT NULL,
  `amount` decimal(16,2) NOT NULL,
  `paid_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sta` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `paidbill_trx_id_unique` (`trx_id`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `paidbill_nouid_index` (`nouid`),
  CONSTRAINT `paidbill_trx_id_foreign` FOREIGN KEY (`trx_id`) REFERENCES `ttrx` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paidbill`
--

/*!40000 ALTER TABLE `paidbill` DISABLE KEYS */;
INSERT INTO `paidbill` VALUES (7,44,'a70c621c',66,'[19]',90000.00,'2025-06-29 21:46:57','SPP SMA TA 2021 - 2022','1','2025-06-29 21:46:57','2025-06-29 21:46:57','pay-PR20216604000589',1);
/*!40000 ALTER TABLE `paidbill` ENABLE KEYS */;

--
-- Table structure for table `tbank`
--

DROP TABLE IF EXISTS `tbank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbank` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbank_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbank`
--

/*!40000 ALTER TABLE `tbank` DISABLE KEYS */;
INSERT INTO `tbank` VALUES (1,'bca','Bank Central Asia','2025-06-29 03:03:00','2025-06-29 03:03:00'),(2,'bni','Bank Negara Indonesia','2025-06-29 03:03:00','2025-06-29 03:03:00'),(3,'bri','Bank Rakyat Indonesia','2025-06-29 03:03:00','2025-06-29 03:03:00'),(4,'mandiri','Bank Mandiri','2025-06-29 03:03:00','2025-06-29 03:03:00');
/*!40000 ALTER TABLE `tbank` ENABLE KEYS */;

--
-- Table structure for table `tpt`
--

DROP TABLE IF EXISTS `tpt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpt` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpt_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpt`
--

/*!40000 ALTER TABLE `tpt` DISABLE KEYS */;
INSERT INTO `tpt` VALUES (1,'va','Virtual Account','2025-06-29 03:03:00','2025-06-29 03:03:00'),(2,'cash','Pembayaran Tunai / Kasir','2025-06-29 03:03:00','2025-06-29 03:03:00'),(3,'wallet','Saldo Dompet','2025-06-29 03:03:00','2025-06-29 03:03:00');
/*!40000 ALTER TABLE `tpt` ENABLE KEYS */;

--
-- Table structure for table `ttrx`
--

DROP TABLE IF EXISTS `ttrx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttrx` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nouid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(16,2) NOT NULL,
  `bank_id` bigint unsigned DEFAULT NULL,
  `pt_id` bigint unsigned DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `va_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','success','failed','canceled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `type` enum('topup','payment','withdraw','refund') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'topup',
  `spr_id` int DEFAULT NULL,
  `jen1` json DEFAULT NULL,
  `note` text COLLATE utf8mb4_unicode_ci,
  `pay_data` json DEFAULT NULL,
  `failure_message` text COLLATE utf8mb4_unicode_ci,
  `expiry_time` timestamp NOT NULL,
  `created_by` int NOT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ttrx_order_id_unique` (`order_id`),
  KEY `ttrx_bank_id_foreign` (`bank_id`),
  KEY `ttrx_pt_id_foreign` (`pt_id`),
  KEY `ttrx_nouid_index` (`nouid`),
  KEY `ttrx_order_id_index` (`order_id`),
  KEY `ttrx_status_index` (`status`),
  CONSTRAINT `ttrx_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `tbank` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ttrx_pt_id_foreign` FOREIGN KEY (`pt_id`) REFERENCES `tpt` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttrx`
--

/*!40000 ALTER TABLE `ttrx` DISABLE KEYS */;
INSERT INTO `ttrx` VALUES (44,'a70c621c','pay-PR20216604000589',90000.00,NULL,1,'6281808856626','685210208246935','success','payment',66,'[19]','SPP SMA TA 2021 - 2022',NULL,NULL,'2025-06-30 03:23:25',1,NULL,'2025-06-29 21:23:25','2025-06-29 21:46:57');
/*!40000 ALTER TABLE `ttrx` ENABLE KEYS */;

--
-- Table structure for table `ttrxlog`
--

DROP TABLE IF EXISTS `ttrxlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttrxlog` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nouid` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nis` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bb` decimal(16,2) NOT NULL,
  `ab` decimal(16,2) NOT NULL,
  `trx_id` bigint unsigned NOT NULL,
  `amount` decimal(16,2) NOT NULL,
  `action` enum('increase','decrease') COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trx_id` (`trx_id`),
  KEY `ttrxlog_nouid_index` (`nouid`),
  KEY `ttrxlog_nis_index` (`nis`),
  CONSTRAINT `ttrxlog_trx_id_foreign` FOREIGN KEY (`trx_id`) REFERENCES `ttrx` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttrxlog`
--

/*!40000 ALTER TABLE `ttrxlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `ttrxlog` ENABLE KEYS */;

--
-- Dumping routines for database 'maisavingb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-01  8:16:49
