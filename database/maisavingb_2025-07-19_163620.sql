-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: maisavingb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

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
-- Table structure for table `tbank`
--

DROP TABLE IF EXISTS `tbank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbank` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `bank` varchar(255) NOT NULL,
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
INSERT INTO `tbank` VALUES (1,'bca','Bank Central Asia','2025-07-19 09:34:03','2025-07-19 09:34:03'),(2,'bni','Bank Negara Indonesia','2025-07-19 09:34:03','2025-07-19 09:34:03'),(3,'bri','Bank Rakyat Indonesia','2025-07-19 09:34:03','2025-07-19 09:34:03'),(4,'mandiri','Bank Mandiri','2025-07-19 09:34:03','2025-07-19 09:34:03');
/*!40000 ALTER TABLE `tbank` ENABLE KEYS */;

--
-- Table structure for table `timagable`
--

DROP TABLE IF EXISTS `timagable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timagable` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'Nama file (misal: ktp, paspor)',
  `path` varchar(255) NOT NULL COMMENT 'Path penyimpanan relatif di storage',
  `mime_type` varchar(255) DEFAULT NULL COMMENT 'Tipe MIME file',
  `size` bigint(20) unsigned DEFAULT NULL COMMENT 'Ukuran file dalam byte',
  `imagable_type` varchar(255) NOT NULL,
  `imagable_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `timagable_imagable_type_imagable_id_index` (`imagable_type`,`imagable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timagable`
--

/*!40000 ALTER TABLE `timagable` DISABLE KEYS */;
/*!40000 ALTER TABLE `timagable` ENABLE KEYS */;

--
-- Table structure for table `tloggable`
--

DROP TABLE IF EXISTS `tloggable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tloggable` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `loggable_type` varchar(255) NOT NULL,
  `loggable_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `action` varchar(255) NOT NULL,
  `old_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`old_data`)),
  `new_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`new_data`)),
  `sta` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `ip` varchar(45) DEFAULT NULL,
  `ua` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `method` varchar(255) DEFAULT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta`)),
  `log_date` date NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tloggable_loggable_type_loggable_id_created_at_index` (`loggable_type`,`loggable_id`,`created_at`),
  KEY `tloggable_log_date_index` (`log_date`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tloggable`
--

/*!40000 ALTER TABLE `tloggable` DISABLE KEYS */;
INSERT INTO `tloggable` VALUES (1,'App\\Models\\Saving\\Tsnk',1,0,'create','[]','{\"version\":\"v1\",\"title\":\"Ketentuan Kartu Pelajar\",\"summary\":\"Syarat dan Ketentuan penggunaan Kartu Pelajar dan akses SIP.\",\"is_active\":true,\"is_required\":true,\"published_at\":\"2025-07-19 16:34:05\",\"effective_at\":\"2025-07-19 16:34:05\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":1}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(2,'App\\Models\\Saving\\TsnkPoint',1,0,'create','[]','{\"tsnk_id\":1,\"nmr\":1,\"title\":\"KETENTUAN UMUM\",\"content\":\"{\\\"title\\\":\\\"KETENTUAN UMUM\\\",\\\"intro\\\":\\\"Dalam ketentuan ini yang dimaksud dengan:\\\",\\\"items\\\":[{\\\"label\\\":\\\"Penerbit Kartu\\\",\\\"description\\\":\\\"adalah institusi pendidikan dan\\\\\\/atau perusahaan jasa yang bekerja sama dalam menerbitkan Kartu Pelajar.\\\"},{\\\"label\\\":\\\"Kartu Pelajar\\\",\\\"description\\\":\\\"adalah kartu identitas pelajar yang memiliki multi fungsi, yaitu:\\\",\\\"items\\\":[{\\\"description\\\":\\\"Kartu diskon\\\"},{\\\"description\\\":\\\"Akses ke Perpustakaan\\\"},{\\\"description\\\":\\\"Kartu Tabungan pelajar\\\"},{\\\"description\\\":\\\"Kartu pembayaran non-tunai\\\"},{\\\"description\\\":\\\"Akses ke SIP (Student Information & Payment)\\\"}]},{\\\"label\\\":\\\"Pemegang Kartu\\\",\\\"description\\\":\\\"adalah pelajar yang terdaftar secara resmi di institusi pendidikan dan telah diberikan Kartu Pelajar, serta bertanggung jawab penuh atas penggunaan kartu dan segala akibat yang timbul darinya. Kartu ini hanya diperuntukkan kepada pelajar yang tercantum di dalamnya dan tidak untuk dipindahtangankan.\\\"},{\\\"label\\\":\\\"Pemilik Kartu\\\",\\\"description\\\":\\\"adalah ayah\\\\\\/ibu\\\\\\/wali pelajar yang mengisi data dirinya untuk permohonan aktivasi dan mendapatkan PIN (Personal Identification Number) dari Penerbit Kartu untuk akses ke SIP.\\\"},{\\\"label\\\":\\\"PIN (Personal Identification Number)\\\",\\\"description\\\":\\\"adalah kode rahasia berupa angka untuk pengamanan, verifikasi transaksi, atau akses ke suatu sistem\\\\\\/layanan.\\\"},{\\\"label\\\":\\\"Transaksi\\\",\\\"description\\\":\\\"adalah kegiatan pembayaran atau penggunaan dana yang dilakukan melalui Kartu Pelajar.\\\"},{\\\"label\\\":\\\"Saldo Kartu\\\",\\\"description\\\":\\\"adalah dana yang tercatat dalam SIP (Student Information & Payment) yang dapat digunakan untuk bertransaksi.\\\"},{\\\"label\\\":\\\"SIP (Student Information & Payment)\\\",\\\"description\\\":\\\"adalah layanan informasi dan sistem pembayaran serta pendaftaran online untuk memudahkan orang tua\\\\\\/wali mendapatkan informasi dari Sekolah Maitreyawira Deli Serdang secara elektronik.\\\"}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":1}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(3,'App\\Models\\Saving\\TsnkPoint',2,0,'create','[]','{\"tsnk_id\":1,\"nmr\":2,\"title\":\"KETENTUAN PIN\\/KODE AKSES\",\"content\":\"{\\\"title\\\":\\\"KETENTUAN PIN\\\\\\/KODE AKSES\\\",\\\"items\\\":[{\\\"description\\\":\\\"Pemohon kode akses dalam hal ini adalah sebagai Pemilik Kartu yaitu ayah\\\\\\/ibu\\\\\\/wali pelajar yang terdaftar resmi di data Penerbit Kartu, yang mengisi data permohonan dan menerima PIN Akses SIP (Student Information & Payment) saat aktivasi pertama kali.\\\"},{\\\"description\\\":\\\"Pemohon wajib menjaga kerahasiaan PIN dan tidak memberitahukannya kepada pihak lain.\\\"},{\\\"description\\\":\\\"Semua transaksi yang dilakukan dengan PIN yang benar, dianggap sah dan menjadi tanggung jawab Pemilik Kartu.\\\"},{\\\"description\\\":\\\"Kehilangan atau penyalahgunaan akibat kelalaian menjaga PIN adalah tanggung jawab penuh Pemilik Kartu.\\\"}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":2}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(4,'App\\Models\\Saving\\TsnkPoint',3,0,'create','[]','{\"tsnk_id\":1,\"nmr\":3,\"title\":\"KETENTUAN PENGGUNAAN KARTU\",\"content\":\"{\\\"title\\\":\\\"KETENTUAN PENGGUNAAN KARTU\\\",\\\"items\\\":[{\\\"label\\\":\\\"Kartu Pelajar sebagai kartu diskon:\\\",\\\"items\\\":[{\\\"description\\\":\\\"Pemegang Kartu wajib hadir untuk mendapatkan diskon di merchant yang bermitra dengan Sekolah Maitreyawira Deli Serdang.\\\"},{\\\"description\\\":\\\"Sekolah hanya menginformasikan merchant kepada Pemilik Kartu dan tidak bertanggung jawab atas kualitas layanan atau produk merchant.\\\"},{\\\"description\\\":\\\"Penggunaan kartu dibatasi oleh waktu, besaran diskon, dan kebijakan merchant yang dapat berubah sewaktu-waktu.\\\"},{\\\"description\\\":\\\"Kartu yang telah melewati masa berlaku dapat ditolak oleh merchant dan menjadi tanggung jawab Pemilik Kartu.\\\"}]},{\\\"label\\\":\\\"Kartu Pelajar sebagai kartu akses ke Perpustakaan:\\\",\\\"items\\\":[{\\\"description\\\":\\\"Akses ke perpustakaan dari jenjang SD hingga SMA.\\\"},{\\\"description\\\":\\\"Dapat melakukan peminjaman buku.\\\"},{\\\"description\\\":\\\"Wajib mengikuti peraturan perpustakaan Sekolah Maitreyawira Deli Serdang.\\\"}]},{\\\"label\\\":\\\"Kartu Pelajar sebagai Kartu Tabungan:\\\",\\\"items\\\":[{\\\"description\\\":\\\"Mendorong anak belajar menabung sejak dini dan memahami manajemen keuangan.\\\"},{\\\"description\\\":\\\"Pemilik Kartu dapat menitipkan uang jajan, dan pelajar dapat menabung dalam kartu.\\\"},{\\\"description\\\":\\\"Saldo dapat digunakan untuk pembayaran tagihan sekolah dan merchant tertentu.\\\"},{\\\"description\\\":\\\"Tidak ada batas minimum\\\\\\/maksimum saldo.\\\"},{\\\"description\\\":\\\"Pengembalian saldo hanya dapat dilakukan oleh Pemilik Kartu sesuai syarat yang berlaku.\\\"}]},{\\\"label\\\":\\\"Kartu Pelajar sebagai alat pembayaran non-tunai:\\\",\\\"items\\\":[{\\\"description\\\":\\\"Hanya dapat digunakan untuk transaksi di area yang ditentukan oleh sekolah.\\\"},{\\\"description\\\":\\\"Penggunaan kartu bisa dibatasi berdasarkan waktu, nominal, dan jenis transaksi.\\\"},{\\\"description\\\":\\\"Semua transaksi dengan kartu dianggap valid dan menjadi tanggung jawab Pemegang Kartu.\\\"},{\\\"description\\\":\\\"Jatah penggunaan bulanan yang tidak digunakan dapat dibawa ke bulan berikutnya maksimal Rp100.000 dan tidak dapat diakumulasi 2 bulan berturut-turut.\\\"},{\\\"description\\\":\\\"Penerbit tidak bertanggung jawab atas penyalahgunaan oleh pihak ketiga akibat kelalaian pengguna.\\\"},{\\\"description\\\":\\\"Penerbit berhak menangguhkan atau menonaktifkan kartu jika ditemukan pelanggaran.\\\"}]},{\\\"label\\\":\\\"Data akses ke SIP (Student Information & Payment):\\\",\\\"items\\\":[{\\\"description\\\":\\\"Pemilik Kartu dapat menggunakan seluruh layanan SIP sesuai ketentuan.\\\"},{\\\"description\\\":\\\"Semua transaksi dalam SIP dianggap sah dan menjadi tanggung jawab Pemilik Kartu.\\\"},{\\\"description\\\":\\\"Seluruh informasi dalam SIP adalah tanggung jawab Pemilik Kartu.\\\"},{\\\"description\\\":\\\"Setiap perubahan data menjadi tanggung jawab Pemilik Kartu.\\\"},{\\\"description\\\":\\\"Penerbit tidak bertanggung jawab atas kerugian akibat penyalahgunaan kartu karena kelalaian menjaga keamanan atau PIN.\\\"}]}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":3}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(5,'App\\Models\\Saving\\TsnkPoint',4,0,'create','[]','{\"tsnk_id\":1,\"nmr\":4,\"title\":\"MASA BERLAKU KARTU\",\"content\":\"{\\\"title\\\":\\\"MASA BERLAKU KARTU\\\",\\\"items\\\":[{\\\"description\\\":\\\"Masa berlaku kartu ditentukan berdasarkan status peserta didik di Sekolah Maitreyawira Deli Serdang.\\\"},{\\\"description\\\":\\\"Kartu yang telah habis masa berlakunya harus dikembalikan kepada pihak sekolah atau Penerbit Kartu untuk dimusnahkan.\\\"},{\\\"description\\\":\\\"Kartu yang dikembalikan sebelum masa berlaku berakhir akan dinonaktifkan dan dimusnahkan guna mencegah penyalahgunaan.\\\"},{\\\"description\\\":\\\"Kartu Pelajar wajib dikembalikan ke Penerbit Kartu apabila diminta atau jika pelajar tidak lagi terdaftar sebagai peserta didik Sekolah Maitreyawira.\\\"}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":4}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(6,'App\\Models\\Saving\\TsnkPoint',5,0,'create','[]','{\"tsnk_id\":1,\"nmr\":5,\"title\":\"KETENTUAN DARI PENERBIT KARTU DAN LEMBAGA KEUANGAN\",\"content\":\"{\\\"title\\\":\\\"KETENTUAN DARI PENERBIT KARTU DAN LEMBAGA KEUANGAN\\\",\\\"items\\\":[{\\\"label\\\":\\\"Penerimaan dan Aktivasi Kartu\\\",\\\"items\\\":[{\\\"description\\\":\\\"Pemilik Kartu wajib melakukan aktivasi kartu sesuai prosedur yang ditetapkan oleh Penerbit Kartu sebelum dapat digunakan untuk akses ke SIP dan melakukan transaksi pembayaran.\\\"},{\\\"description\\\":\\\"Aktivasi kartu dapat dilakukan melalui scan QR-code yang tertera pada kartu dengan mengisi data dengan lengkap dan benar.\\\"},{\\\"description\\\":\\\"Nomor PIN sementara (First-PIN) akan dikirimkan kepada Pemilik Kartu melalui metode komunikasi aman setelah melalui proses validasi data oleh Penerbit Kartu. PIN wajib diubah oleh Pemilik Kartu saat aktivasi.\\\"}]},{\\\"label\\\":\\\"Penggantian Kartu dan Biaya\\\",\\\"items\\\":[{\\\"description\\\":\\\"Apabila kartu hilang, rusak, atau dicuri, Pemegang Kartu wajib segera melapor kepada Pemilik Kartu untuk segera melakukan pemblokiran dan penggantian kartu.\\\"},{\\\"description\\\":\\\"Pemilik Kartu wajib melapor kepada pihak Sekolah (Penerbit Kartu) atas pemblokiran kartu.\\\"},{\\\"description\\\":\\\"Pemegang Kartu bertanggung jawab sepenuhnya atas semua transaksi yang terjadi sebelum laporan kehilangan atau pencurian diterima secara resmi dan sebelum dilakukan pemblokiran kartu.\\\"},{\\\"description\\\":\\\"Penerbit Kartu dapat mengenakan biaya administrasi penggantian kartu yang besarnya dapat berubah sewaktu-waktu.\\\"},{\\\"description\\\":\\\"Kartu yang sudah diblokir atau tidak berlaku harus dikembalikan ke Penerbit Kartu untuk dimusnahkan agar tidak disalahgunakan.\\\"}]},{\\\"label\\\":\\\"Pemblokiran dan Penonaktifan Kartu\\\",\\\"items\\\":[{\\\"description\\\":\\\"Penerbit Kartu berhak memblokir atau menonaktifkan kartu secara sementara atau permanen dalam hal:\\\",\\\"items\\\":[{\\\"description\\\":\\\"Terjadi indikasi penyalahgunaan atau kecurangan\\\"},{\\\"description\\\":\\\"Kartu sudah habis masa berlakunya atau dinyatakan batal\\\"},{\\\"description\\\":\\\"Pelanggaran ketentuan yang ditetapkan.\\\"}]},{\\\"description\\\":\\\"Penerbit Kartu wajib memberitahukan pemblokiran kepada Pemegang Kartu melalui saluran komunikasi resmi.\\\"}]},{\\\"label\\\":\\\"Penanganan Masalah Transaksi\\\",\\\"items\\\":[{\\\"description\\\":\\\"Jika terjadi kegagalan transaksi akibat gangguan sistem Penerbit Kartu, maka upaya pengembalian saldo akan dilakukan sesuai prosedur.\\\"},{\\\"description\\\":\\\"Penerbit Kartu tidak bertanggung jawab atas kerugian yang disebabkan oleh kesalahan sistem pihak ketiga di luar kendali mereka.\\\"}]},{\\\"label\\\":\\\"Perubahan Ketentuan\\\",\\\"items\\\":[{\\\"description\\\":\\\"Penerbit Kartu berhak mengubah syarat dan ketentuan ini dengan pemberitahuan terlebih dahulu kepada Pemilik Kartu melalui media yang dianggap efektif.\\\"}]}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":5}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(7,'App\\Models\\Saving\\TsnkPoint',6,0,'create','[]','{\"tsnk_id\":1,\"nmr\":6,\"title\":\"KETENTUAN LAIN-LAIN\",\"content\":\"{\\\"title\\\":\\\"KETENTUAN LAIN-LAIN\\\",\\\"items\\\":[{\\\"description\\\":\\\"Pemegang Kartu dapat dikenakan biaya administrasi, dan\\\\\\/atau denda sesuai kebijakan Penerbit Kartu yang bekerja sama dalam penyediaan fasilitas ini.\\\"},{\\\"description\\\":\\\"Seluruh biaya yang dikenakan akan diinformasikan terlebih dahulu kepada Pemilik Kartu dan dapat berubah sewaktu-waktu sesuai kebijakan Penerbit Kartu.\\\"},{\\\"description\\\":\\\"Kartu Pelajar tidak diberikan untuk rekening gabungan atau digunakan secara kolektif. Setiap kartu bersifat personal dan hanya dapat digunakan oleh pelajar yang namanya tercantum pada kartu tersebut.\\\"}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":6}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05'),(8,'App\\Models\\Saving\\TsnkPoint',7,0,'create','[]','{\"tsnk_id\":1,\"nmr\":7,\"title\":\"PERNYATAAN PEMILIK KARTU\\/DISCLAIMER\",\"content\":\"{\\\"title\\\":\\\"PERNYATAAN PEMILIK KARTU\\\\\\/DISCLAIMER\\\",\\\"items\\\":[{\\\"description\\\":\\\"Saya yang bertanda tangan di bawah ini {{nama_ortu}} menyatakan telah membaca, memahami, dan menyetujui seluruh Ketentuan Kartu Pelajar dan akses SIP yang tercantum di atas.\\\"},{\\\"description\\\":\\\"Saya bersedia menaati seluruh syarat dan ketentuan penggunaan yang telah ditetapkan oleh lembaga pendidikan terkait, termasuk setiap perubahan yang mungkin dilakukan di kemudian hari.\\\"},{\\\"description\\\":\\\"Saya menyadari bahwa pelanggaran terhadap ketentuan ini dapat menyebabkan akses ke SIP akan dinonaktifkan dan\\\\\\/atau Kartu Pelajar anak saya ditarik kembali tanpa pemberitahuan terlebih dahulu.\\\"},{\\\"description\\\":\\\"Pemakaian kartu pelajar sebagai kartu diskon, akses ke perpustakaan, Tabungan pelajar, kartu pembayaran non-tunai, dan akses ke SIP (Student Information & Payment) adalah merupakan tanggung jawab saya {{nama_ortu}} dan anak saya {{nama_siswa}} sepenuhnya.\\\"},{\\\"description\\\":\\\"Saya membebaskan pihak Sekolah atas kelalaian atau penyalahgunaan kartu baik oleh saya {{nama_ortu}} atau anak saya {{nama_ortu}}.\\\"}]}\",\"created_at\":\"2025-07-19 16:34:05\",\"updated_at\":\"2025-07-19 16:34:05\",\"id\":7}',0,'127.0.0.1','Symfony','http://siswa.test','GET','{\"locale\":\"id\",\"agent\":{\"browser\":{\"name\":false,\"version\":false},\"platform\":{\"name\":false,\"version\":false},\"device\":{\"type\":\"desktop\",\"model\":false},\"is_robot\":false,\"robot_name\":false},\"extra\":[]}','2025-07-19',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05');
/*!40000 ALTER TABLE `tloggable` ENABLE KEYS */;

--
-- Table structure for table `tpaidbill`
--

DROP TABLE IF EXISTS `tpaidbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpaidbill` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `trx_id` bigint(20) unsigned NOT NULL,
  `nouid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nmr` bigint(20) NOT NULL,
  `spr_id` bigint(20) NOT NULL,
  `jum` decimal(16,2) NOT NULL,
  `ket` text DEFAULT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `created_by` tinyint(4) NOT NULL DEFAULT 0,
  `paid_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tpaidbill_spr_id_unique` (`spr_id`),
  KEY `tpaidbill_trx_id_foreign` (`trx_id`),
  KEY `tpaidbill_nouid_index` (`nouid`),
  CONSTRAINT `tpaidbill_trx_id_foreign` FOREIGN KEY (`trx_id`) REFERENCES `ttrx` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tpaidbill`
--

/*!40000 ALTER TABLE `tpaidbill` DISABLE KEYS */;
/*!40000 ALTER TABLE `tpaidbill` ENABLE KEYS */;

--
-- Table structure for table `tpt`
--

DROP TABLE IF EXISTS `tpt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tpt` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `pt` varchar(255) NOT NULL,
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
INSERT INTO `tpt` VALUES (1,'va','Virtual Account','2025-07-19 09:34:04','2025-07-19 09:34:04'),(2,'cash','Pembayaran Tunai / Kasir','2025-07-19 09:34:04','2025-07-19 09:34:04'),(3,'wallet','Saldo Dompet','2025-07-19 09:34:04','2025-07-19 09:34:04');
/*!40000 ALTER TABLE `tpt` ENABLE KEYS */;

--
-- Table structure for table `tregistrasi`
--

DROP TABLE IF EXISTS `tregistrasi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tregistrasi` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nouid` varchar(255) NOT NULL COMMENT 'Nomor UID unik pendaftar',
  `nama` varchar(100) NOT NULL COMMENT 'Nama lengkap sesuai KTP',
  `warneg` char(2) NOT NULL COMMENT 'Kode negara ISO 2-digit (contoh: ID)',
  `warneg_name` varchar(100) NOT NULL COMMENT 'Nama negara lengkap',
  `nik` varchar(16) DEFAULT NULL COMMENT 'NIK (16 digit untuk WNI)',
  `kk` varchar(16) DEFAULT NULL COMMENT 'Nomor KK (16 digit untuk WNI)',
  `paspor` varchar(20) DEFAULT NULL COMMENT 'Nomor Paspor (WNA)',
  `alamat1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Alamat sesuai KTP (format JSON terstruktur)' CHECK (json_valid(`alamat1`)),
  `alamat2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Alamat domisili jika berbeda' CHECK (json_valid(`alamat2`)),
  `temtin` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Tinggal tidak sesuai KTP (0=alamat1, 1=alamat2)',
  `hub` enum('0','1','2') NOT NULL COMMENT '0=Ayah, 1=Ibu, 2=Wali',
  `tel` varchar(15) NOT NULL COMMENT 'Nomor telepon/WhatsApp',
  `email` varchar(100) NOT NULL COMMENT 'Email aktif',
  `sta` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=pending, 1=acc, -1=rejected, -2=blocked',
  `updated_by` varchar(50) DEFAULT NULL COMMENT 'ID user yang melakukan update',
  `reject_reason` text DEFAULT NULL COMMENT 'Alasan penolakan jika sta=-1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'Untuk arsip data',
  PRIMARY KEY (`id`),
  KEY `tregistrasi_warneg_sta_index` (`warneg`,`sta`),
  KEY `tregistrasi_email_tel_index` (`email`,`tel`),
  KEY `tregistrasi_nouid_index` (`nouid`),
  KEY `tregistrasi_nik_index` (`nik`),
  KEY `tregistrasi_kk_index` (`kk`),
  KEY `tregistrasi_paspor_index` (`paspor`),
  KEY `tregistrasi_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tregistrasi`
--

/*!40000 ALTER TABLE `tregistrasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `tregistrasi` ENABLE KEYS */;

--
-- Table structure for table `tsignsnks`
--

DROP TABLE IF EXISTS `tsignsnks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsignsnks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nouid` varchar(255) NOT NULL COMMENT 'Referensi ke tregistrasi.nouid',
  `sign` varchar(255) NOT NULL COMMENT 'Tanda tangan digital (enkripsi/hash)',
  `payload` text NOT NULL COMMENT 'signature payload',
  `snk_version` varchar(20) NOT NULL COMMENT 'Versi Syarat dan Ketentuan',
  `ip_address` varchar(45) DEFAULT NULL COMMENT 'IP saat menyetujui',
  `user_agent` varchar(255) DEFAULT NULL COMMENT 'Device user saat menyetujui',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_snk_index` (`nouid`,`snk_version`),
  KEY `tsignsnks_nouid_index` (`nouid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsignsnks`
--

/*!40000 ALTER TABLE `tsignsnks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsignsnks` ENABLE KEYS */;

--
-- Table structure for table `tsisreqdata`
--

DROP TABLE IF EXISTS `tsisreqdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsisreqdata` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `idsis` bigint(20) NOT NULL COMMENT 'ID Siswa',
  `old_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Data siswa sebelum perubahan' CHECK (json_valid(`old_data`)),
  `new_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Data perubahan yang diminta' CHECK (json_valid(`new_data`)),
  `status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=pending, 1=approved, -1=rejected',
  `rejection_reason` text DEFAULT NULL COMMENT 'Alasan penolakan jika status rejected',
  `updated_by` bigint(20) DEFAULT NULL COMMENT 'User yang menyetujui/menolak',
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tsisreqdata_idsis_index` (`idsis`),
  KEY `tsisreqdata_status_index` (`status`),
  KEY `tsisreqdata_created_at_index` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsisreqdata`
--

/*!40000 ALTER TABLE `tsisreqdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsisreqdata` ENABLE KEYS */;

--
-- Table structure for table `tsnk`
--

DROP TABLE IF EXISTS `tsnk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsnk` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `version` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `summary` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `is_required` tinyint(1) NOT NULL DEFAULT 1,
  `published_at` timestamp NULL DEFAULT NULL,
  `effective_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tsnk_version_unique` (`version`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsnk`
--

/*!40000 ALTER TABLE `tsnk` DISABLE KEYS */;
INSERT INTO `tsnk` VALUES (1,'v1','Ketentuan Kartu Pelajar','Syarat dan Ketentuan penggunaan Kartu Pelajar dan akses SIP.',1,1,'2025-07-19 09:34:05','2025-07-19 09:34:05',NULL,'2025-07-19 09:34:05','2025-07-19 09:34:05');
/*!40000 ALTER TABLE `tsnk` ENABLE KEYS */;

--
-- Table structure for table `tsnk_points`
--

DROP TABLE IF EXISTS `tsnk_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsnk_points` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tsnk_id` bigint(20) unsigned NOT NULL,
  `nmr` smallint(5) unsigned NOT NULL COMMENT 'Urutan point',
  `title` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Format konten dalam json' CHECK (json_valid(`content`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tsnk_points_tsnk_id_foreign` (`tsnk_id`),
  CONSTRAINT `tsnk_points_tsnk_id_foreign` FOREIGN KEY (`tsnk_id`) REFERENCES `tsnk` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsnk_points`
--

/*!40000 ALTER TABLE `tsnk_points` DISABLE KEYS */;
INSERT INTO `tsnk_points` VALUES (1,1,1,'KETENTUAN UMUM','{\"title\":\"KETENTUAN UMUM\",\"intro\":\"Dalam ketentuan ini yang dimaksud dengan:\",\"items\":[{\"label\":\"Penerbit Kartu\",\"description\":\"adalah institusi pendidikan dan\\/atau perusahaan jasa yang bekerja sama dalam menerbitkan Kartu Pelajar.\"},{\"label\":\"Kartu Pelajar\",\"description\":\"adalah kartu identitas pelajar yang memiliki multi fungsi, yaitu:\",\"items\":[{\"description\":\"Kartu diskon\"},{\"description\":\"Akses ke Perpustakaan\"},{\"description\":\"Kartu Tabungan pelajar\"},{\"description\":\"Kartu pembayaran non-tunai\"},{\"description\":\"Akses ke SIP (Student Information & Payment)\"}]},{\"label\":\"Pemegang Kartu\",\"description\":\"adalah pelajar yang terdaftar secara resmi di institusi pendidikan dan telah diberikan Kartu Pelajar, serta bertanggung jawab penuh atas penggunaan kartu dan segala akibat yang timbul darinya. Kartu ini hanya diperuntukkan kepada pelajar yang tercantum di dalamnya dan tidak untuk dipindahtangankan.\"},{\"label\":\"Pemilik Kartu\",\"description\":\"adalah ayah\\/ibu\\/wali pelajar yang mengisi data dirinya untuk permohonan aktivasi dan mendapatkan PIN (Personal Identification Number) dari Penerbit Kartu untuk akses ke SIP.\"},{\"label\":\"PIN (Personal Identification Number)\",\"description\":\"adalah kode rahasia berupa angka untuk pengamanan, verifikasi transaksi, atau akses ke suatu sistem\\/layanan.\"},{\"label\":\"Transaksi\",\"description\":\"adalah kegiatan pembayaran atau penggunaan dana yang dilakukan melalui Kartu Pelajar.\"},{\"label\":\"Saldo Kartu\",\"description\":\"adalah dana yang tercatat dalam SIP (Student Information & Payment) yang dapat digunakan untuk bertransaksi.\"},{\"label\":\"SIP (Student Information & Payment)\",\"description\":\"adalah layanan informasi dan sistem pembayaran serta pendaftaran online untuk memudahkan orang tua\\/wali mendapatkan informasi dari Sekolah Maitreyawira Deli Serdang secara elektronik.\"}]}','2025-07-19 09:34:05','2025-07-19 09:34:05'),(2,1,2,'KETENTUAN PIN/KODE AKSES','{\"title\":\"KETENTUAN PIN\\/KODE AKSES\",\"items\":[{\"description\":\"Pemohon kode akses dalam hal ini adalah sebagai Pemilik Kartu yaitu ayah\\/ibu\\/wali pelajar yang terdaftar resmi di data Penerbit Kartu, yang mengisi data permohonan dan menerima PIN Akses SIP (Student Information & Payment) saat aktivasi pertama kali.\"},{\"description\":\"Pemohon wajib menjaga kerahasiaan PIN dan tidak memberitahukannya kepada pihak lain.\"},{\"description\":\"Semua transaksi yang dilakukan dengan PIN yang benar, dianggap sah dan menjadi tanggung jawab Pemilik Kartu.\"},{\"description\":\"Kehilangan atau penyalahgunaan akibat kelalaian menjaga PIN adalah tanggung jawab penuh Pemilik Kartu.\"}]}','2025-07-19 09:34:05','2025-07-19 09:34:05'),(3,1,3,'KETENTUAN PENGGUNAAN KARTU','{\"title\":\"KETENTUAN PENGGUNAAN KARTU\",\"items\":[{\"label\":\"Kartu Pelajar sebagai kartu diskon:\",\"items\":[{\"description\":\"Pemegang Kartu wajib hadir untuk mendapatkan diskon di merchant yang bermitra dengan Sekolah Maitreyawira Deli Serdang.\"},{\"description\":\"Sekolah hanya menginformasikan merchant kepada Pemilik Kartu dan tidak bertanggung jawab atas kualitas layanan atau produk merchant.\"},{\"description\":\"Penggunaan kartu dibatasi oleh waktu, besaran diskon, dan kebijakan merchant yang dapat berubah sewaktu-waktu.\"},{\"description\":\"Kartu yang telah melewati masa berlaku dapat ditolak oleh merchant dan menjadi tanggung jawab Pemilik Kartu.\"}]},{\"label\":\"Kartu Pelajar sebagai kartu akses ke Perpustakaan:\",\"items\":[{\"description\":\"Akses ke perpustakaan dari jenjang SD hingga SMA.\"},{\"description\":\"Dapat melakukan peminjaman buku.\"},{\"description\":\"Wajib mengikuti peraturan perpustakaan Sekolah Maitreyawira Deli Serdang.\"}]},{\"label\":\"Kartu Pelajar sebagai Kartu Tabungan:\",\"items\":[{\"description\":\"Mendorong anak belajar menabung sejak dini dan memahami manajemen keuangan.\"},{\"description\":\"Pemilik Kartu dapat menitipkan uang jajan, dan pelajar dapat menabung dalam kartu.\"},{\"description\":\"Saldo dapat digunakan untuk pembayaran tagihan sekolah dan merchant tertentu.\"},{\"description\":\"Tidak ada batas minimum\\/maksimum saldo.\"},{\"description\":\"Pengembalian saldo hanya dapat dilakukan oleh Pemilik Kartu sesuai syarat yang berlaku.\"}]},{\"label\":\"Kartu Pelajar sebagai alat pembayaran non-tunai:\",\"items\":[{\"description\":\"Hanya dapat digunakan untuk transaksi di area yang ditentukan oleh sekolah.\"},{\"description\":\"Penggunaan kartu bisa dibatasi berdasarkan waktu, nominal, dan jenis transaksi.\"},{\"description\":\"Semua transaksi dengan kartu dianggap valid dan menjadi tanggung jawab Pemegang Kartu.\"},{\"description\":\"Jatah penggunaan bulanan yang tidak digunakan dapat dibawa ke bulan berikutnya maksimal Rp100.000 dan tidak dapat diakumulasi 2 bulan berturut-turut.\"},{\"description\":\"Penerbit tidak bertanggung jawab atas penyalahgunaan oleh pihak ketiga akibat kelalaian pengguna.\"},{\"description\":\"Penerbit berhak menangguhkan atau menonaktifkan kartu jika ditemukan pelanggaran.\"}]},{\"label\":\"Data akses ke SIP (Student Information & Payment):\",\"items\":[{\"description\":\"Pemilik Kartu dapat menggunakan seluruh layanan SIP sesuai ketentuan.\"},{\"description\":\"Semua transaksi dalam SIP dianggap sah dan menjadi tanggung jawab Pemilik Kartu.\"},{\"description\":\"Seluruh informasi dalam SIP adalah tanggung jawab Pemilik Kartu.\"},{\"description\":\"Setiap perubahan data menjadi tanggung jawab Pemilik Kartu.\"},{\"description\":\"Penerbit tidak bertanggung jawab atas kerugian akibat penyalahgunaan kartu karena kelalaian menjaga keamanan atau PIN.\"}]}]}','2025-07-19 09:34:05','2025-07-19 09:34:05'),(4,1,4,'MASA BERLAKU KARTU','{\"title\":\"MASA BERLAKU KARTU\",\"items\":[{\"description\":\"Masa berlaku kartu ditentukan berdasarkan status peserta didik di Sekolah Maitreyawira Deli Serdang.\"},{\"description\":\"Kartu yang telah habis masa berlakunya harus dikembalikan kepada pihak sekolah atau Penerbit Kartu untuk dimusnahkan.\"},{\"description\":\"Kartu yang dikembalikan sebelum masa berlaku berakhir akan dinonaktifkan dan dimusnahkan guna mencegah penyalahgunaan.\"},{\"description\":\"Kartu Pelajar wajib dikembalikan ke Penerbit Kartu apabila diminta atau jika pelajar tidak lagi terdaftar sebagai peserta didik Sekolah Maitreyawira.\"}]}','2025-07-19 09:34:05','2025-07-19 09:34:05'),(5,1,5,'KETENTUAN DARI PENERBIT KARTU DAN LEMBAGA KEUANGAN','{\"title\":\"KETENTUAN DARI PENERBIT KARTU DAN LEMBAGA KEUANGAN\",\"items\":[{\"label\":\"Penerimaan dan Aktivasi Kartu\",\"items\":[{\"description\":\"Pemilik Kartu wajib melakukan aktivasi kartu sesuai prosedur yang ditetapkan oleh Penerbit Kartu sebelum dapat digunakan untuk akses ke SIP dan melakukan transaksi pembayaran.\"},{\"description\":\"Aktivasi kartu dapat dilakukan melalui scan QR-code yang tertera pada kartu dengan mengisi data dengan lengkap dan benar.\"},{\"description\":\"Nomor PIN sementara (First-PIN) akan dikirimkan kepada Pemilik Kartu melalui metode komunikasi aman setelah melalui proses validasi data oleh Penerbit Kartu. PIN wajib diubah oleh Pemilik Kartu saat aktivasi.\"}]},{\"label\":\"Penggantian Kartu dan Biaya\",\"items\":[{\"description\":\"Apabila kartu hilang, rusak, atau dicuri, Pemegang Kartu wajib segera melapor kepada Pemilik Kartu untuk segera melakukan pemblokiran dan penggantian kartu.\"},{\"description\":\"Pemilik Kartu wajib melapor kepada pihak Sekolah (Penerbit Kartu) atas pemblokiran kartu.\"},{\"description\":\"Pemegang Kartu bertanggung jawab sepenuhnya atas semua transaksi yang terjadi sebelum laporan kehilangan atau pencurian diterima secara resmi dan sebelum dilakukan pemblokiran kartu.\"},{\"description\":\"Penerbit Kartu dapat mengenakan biaya administrasi penggantian kartu yang besarnya dapat berubah sewaktu-waktu.\"},{\"description\":\"Kartu yang sudah diblokir atau tidak berlaku harus dikembalikan ke Penerbit Kartu untuk dimusnahkan agar tidak disalahgunakan.\"}]},{\"label\":\"Pemblokiran dan Penonaktifan Kartu\",\"items\":[{\"description\":\"Penerbit Kartu berhak memblokir atau menonaktifkan kartu secara sementara atau permanen dalam hal:\",\"items\":[{\"description\":\"Terjadi indikasi penyalahgunaan atau kecurangan\"},{\"description\":\"Kartu sudah habis masa berlakunya atau dinyatakan batal\"},{\"description\":\"Pelanggaran ketentuan yang ditetapkan.\"}]},{\"description\":\"Penerbit Kartu wajib memberitahukan pemblokiran kepada Pemegang Kartu melalui saluran komunikasi resmi.\"}]},{\"label\":\"Penanganan Masalah Transaksi\",\"items\":[{\"description\":\"Jika terjadi kegagalan transaksi akibat gangguan sistem Penerbit Kartu, maka upaya pengembalian saldo akan dilakukan sesuai prosedur.\"},{\"description\":\"Penerbit Kartu tidak bertanggung jawab atas kerugian yang disebabkan oleh kesalahan sistem pihak ketiga di luar kendali mereka.\"}]},{\"label\":\"Perubahan Ketentuan\",\"items\":[{\"description\":\"Penerbit Kartu berhak mengubah syarat dan ketentuan ini dengan pemberitahuan terlebih dahulu kepada Pemilik Kartu melalui media yang dianggap efektif.\"}]}]}','2025-07-19 09:34:05','2025-07-19 09:34:05'),(6,1,6,'KETENTUAN LAIN-LAIN','{\"title\":\"KETENTUAN LAIN-LAIN\",\"items\":[{\"description\":\"Pemegang Kartu dapat dikenakan biaya administrasi, dan\\/atau denda sesuai kebijakan Penerbit Kartu yang bekerja sama dalam penyediaan fasilitas ini.\"},{\"description\":\"Seluruh biaya yang dikenakan akan diinformasikan terlebih dahulu kepada Pemilik Kartu dan dapat berubah sewaktu-waktu sesuai kebijakan Penerbit Kartu.\"},{\"description\":\"Kartu Pelajar tidak diberikan untuk rekening gabungan atau digunakan secara kolektif. Setiap kartu bersifat personal dan hanya dapat digunakan oleh pelajar yang namanya tercantum pada kartu tersebut.\"}]}','2025-07-19 09:34:05','2025-07-19 09:34:05'),(7,1,7,'PERNYATAAN PEMILIK KARTU/DISCLAIMER','{\"title\":\"PERNYATAAN PEMILIK KARTU\\/DISCLAIMER\",\"items\":[{\"description\":\"Saya yang bertanda tangan di bawah ini {{nama_ortu}} menyatakan telah membaca, memahami, dan menyetujui seluruh Ketentuan Kartu Pelajar dan akses SIP yang tercantum di atas.\"},{\"description\":\"Saya bersedia menaati seluruh syarat dan ketentuan penggunaan yang telah ditetapkan oleh lembaga pendidikan terkait, termasuk setiap perubahan yang mungkin dilakukan di kemudian hari.\"},{\"description\":\"Saya menyadari bahwa pelanggaran terhadap ketentuan ini dapat menyebabkan akses ke SIP akan dinonaktifkan dan\\/atau Kartu Pelajar anak saya ditarik kembali tanpa pemberitahuan terlebih dahulu.\"},{\"description\":\"Pemakaian kartu pelajar sebagai kartu diskon, akses ke perpustakaan, Tabungan pelajar, kartu pembayaran non-tunai, dan akses ke SIP (Student Information & Payment) adalah merupakan tanggung jawab saya {{nama_ortu}} dan anak saya {{nama_siswa}} sepenuhnya.\"},{\"description\":\"Saya membebaskan pihak Sekolah atas kelalaian atau penyalahgunaan kartu baik oleh saya {{nama_ortu}} atau anak saya {{nama_ortu}}.\"}]}','2025-07-19 09:34:05','2025-07-19 09:34:05');
/*!40000 ALTER TABLE `tsnk_points` ENABLE KEYS */;

--
-- Table structure for table `ttrx`
--

DROP TABLE IF EXISTS `ttrx`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttrx` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nouid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `amount` decimal(16,2) NOT NULL,
  `bank_id` bigint(20) unsigned DEFAULT NULL,
  `pt_id` bigint(20) unsigned DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `va_number` varchar(255) DEFAULT NULL,
  `status` enum('pending','success','failed','canceled') NOT NULL DEFAULT 'pending',
  `type` enum('topup','payment','withdraw','refund') NOT NULL DEFAULT 'topup',
  `spr_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`spr_id`)),
  `note` text DEFAULT NULL,
  `pay_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pay_data`)),
  `failure_message` text DEFAULT NULL,
  `expiry_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_by` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttrx`
--

/*!40000 ALTER TABLE `ttrx` DISABLE KEYS */;
/*!40000 ALTER TABLE `ttrx` ENABLE KEYS */;

--
-- Table structure for table `ttrxlog`
--

DROP TABLE IF EXISTS `ttrxlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttrxlog` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nouid` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `nis` varchar(50) NOT NULL,
  `bb` decimal(16,2) NOT NULL,
  `ab` decimal(16,2) NOT NULL,
  `trx_id` bigint(20) unsigned NOT NULL,
  `amount` decimal(16,2) NOT NULL,
  `action` enum('increase','decrease') NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ttrxlog_trx_id_unique` (`trx_id`),
  KEY `ttrxlog_nouid_index` (`nouid`),
  KEY `ttrxlog_nis_index` (`nis`),
  CONSTRAINT `ttrxlog_trx_id_foreign` FOREIGN KEY (`trx_id`) REFERENCES `ttrx` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
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

-- Dump completed on 2025-07-19 16:36:48
