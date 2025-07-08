-- MySQL dump 10.13  Distrib 8.4.3, for Win64 (x86_64)
--
-- Host: vittindo.my.id    Database: maisppnew
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.22-MariaDB

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
-- Table structure for table `tambilform`
--

DROP TABLE IF EXISTS `tambilform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tambilform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tin` int(11) NOT NULL,
  `idta` int(11) NOT NULL,
  `idset` int(11) NOT NULL,
  `nofor` varchar(20) NOT NULL,
  `tgl` date NOT NULL,
  `ids` int(11) NOT NULL DEFAULT 0,
  `nisn` varchar(50) DEFAULT NULL,
  `nam` varchar(50) NOT NULL DEFAULT '',
  `jenkel` char(1) NOT NULL DEFAULT '',
  `temlah` varchar(50) DEFAULT NULL,
  `tgllah` date NOT NULL,
  `aya` varchar(50) DEFAULT NULL,
  `ibu` varchar(50) DEFAULT NULL,
  `ala` varchar(50) NOT NULL,
  `notel` varchar(50) NOT NULL,
  `asasek` varchar(50) DEFAULT NULL,
  `idspd` int(11) NOT NULL DEFAULT 0,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `idkas` int(11) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tambilform`
--

/*!40000 ALTER TABLE `tambilform` DISABLE KEYS */;
INSERT INTO `tambilform` VALUES (1,1,1,3,'AF0001','2024-12-03',0,NULL,'Test','1','Palembang','2024-12-03','budi','ani','Jalan','0898',NULL,1,100000.00,2,0,6,1,1,'2024-12-03 00:12:49','2025-04-04 03:06:06');
/*!40000 ALTER TABLE `tambilform` ENABLE KEYS */;

--
-- Table structure for table `thakakses`
--

DROP TABLE IF EXISTS `thakakses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thakakses` (
  `Kod` varchar(5) NOT NULL DEFAULT '',
  `Nam` varchar(50) NOT NULL,
  `Lev` tinyint(4) NOT NULL DEFAULT 0,
  `Men` varchar(20) NOT NULL,
  `Nil` varchar(20) NOT NULL DEFAULT '1',
  `Tip` tinyint(4) NOT NULL DEFAULT 0,
  `Sta` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thakakses`
--

/*!40000 ALTER TABLE `thakakses` DISABLE KEYS */;
/*!40000 ALTER TABLE `thakakses` ENABLE KEYS */;

--
-- Table structure for table `thakgrup`
--

DROP TABLE IF EXISTS `thakgrup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thakgrup` (
  `Kod` varchar(5) NOT NULL,
  `Nil` varchar(50) DEFAULT NULL,
  `Gru` tinyint(4) NOT NULL,
  `UseID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Kod`,`Gru`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thakgrup`
--

/*!40000 ALTER TABLE `thakgrup` DISABLE KEYS */;
/*!40000 ALTER TABLE `thakgrup` ENABLE KEYS */;

--
-- Table structure for table `thakuser`
--

DROP TABLE IF EXISTS `thakuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thakuser` (
  `Kod` varchar(5) NOT NULL DEFAULT '',
  `Nil` varchar(20) NOT NULL DEFAULT '0',
  `UseId` varchar(20) NOT NULL,
  PRIMARY KEY (`UseId`,`Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thakuser`
--

/*!40000 ALTER TABLE `thakuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `thakuser` ENABLE KEYS */;

--
-- Table structure for table `tjenisppdb`
--

DROP TABLE IF EXISTS `tjenisppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tjenisppdb` (
  `id` int(11) NOT NULL,
  `nam` varchar(50) DEFAULT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tjenisppdb`
--

/*!40000 ALTER TABLE `tjenisppdb` DISABLE KEYS */;
INSERT INTO `tjenisppdb` VALUES (1,'Formulir',0),(2,'SPP',0),(3,'Pangkal',0);
/*!40000 ALTER TABLE `tjenisppdb` ENABLE KEYS */;

--
-- Table structure for table `tjenisspp`
--

DROP TABLE IF EXISTS `tjenisspp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tjenisspp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nam` varchar(20) DEFAULT NULL,
  `tip` tinyint(4) NOT NULL DEFAULT 0,
  `piu` tinyint(4) NOT NULL DEFAULT 0,
  `belter` tinyint(4) NOT NULL DEFAULT 0,
  `jen` tinyint(4) NOT NULL DEFAULT 0,
  `excbul` tinyint(4) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `iduse` int(11) DEFAULT NULL,
  `tglinp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tjenisspp`
--

/*!40000 ALTER TABLE `tjenisspp` DISABLE KEYS */;
INSERT INTO `tjenisspp` VALUES (1,'Spp',0,1,1,0,0,0,NULL,'2021-07-14 01:40:37'),(2,'Tahunan',0,1,1,4,1,0,NULL,'2021-07-14 01:41:02'),(3,'Semester',0,1,1,3,1,0,NULL,'2021-07-14 01:41:45'),(4,'Excul',1,1,1,1,0,0,NULL,'2021-07-14 01:42:05'),(5,'Bimbel',1,1,1,1,0,0,NULL,'2021-07-14 01:42:18'),(6,'Lain-lain',0,1,1,1,0,0,NULL,'2021-07-14 02:16:31');
/*!40000 ALTER TABLE `tjenisspp` ENABLE KEYS */;

--
-- Table structure for table `tlaporan`
--

DROP TABLE IF EXISTS `tlaporan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tlaporan` (
  `kod` int(11) NOT NULL,
  `kodmen` smallint(6) DEFAULT NULL,
  `pro` varchar(10) DEFAULT NULL,
  `nam` varchar(50) DEFAULT NULL,
  `jud` varchar(50) DEFAULT NULL,
  `tip` tinyint(4) NOT NULL DEFAULT 0,
  `ukuker` varchar(50) DEFAULT NULL,
  `namfil` varchar(50) DEFAULT NULL,
  `namtab` varchar(50) DEFAULT NULL,
  `sqlstr` mediumtext DEFAULT NULL,
  `filsql` varchar(50) DEFAULT NULL,
  `koljoin` varchar(50) DEFAULT NULL,
  `sublap` varchar(50) DEFAULT NULL,
  `sqlsub` text DEFAULT NULL,
  `rumus` text DEFAULT NULL,
  `uselim` text DEFAULT NULL,
  `sqllim` text DEFAULT NULL,
  `sqlsta` text DEFAULT NULL,
  `sqlcet` text DEFAULT NULL,
  `xfil` varchar(50) DEFAULT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kod`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tlaporan`
--

/*!40000 ALTER TABLE `tlaporan` DISABLE KEYS */;
INSERT INTO `tlaporan` VALUES (251,251,'Maispp','Voucher','Voucher',1,'A42','Lap251.repx','ttpenrut','select ttp.id, ttp1.ket as ket1, ttp1.jum, ttp.tgl, ttp.nopr, ttp.ket, ts.nis, ts.namlen, ttp1.nmr from \r\nttpenrut as ttp join \r\nttpenrut1 as ttp1 on ttp.id = ttp1.idpr join \r\n{maidatmas}tsiswa as ts on ts.id = ttp.idsis\r\nWhere ttp.id in ({filpr})','filpr',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(65101,651,'Maispp','Penerimaan Rutin','Laporan Penerimaan Rutin',1,'A4','Lap65101.repx','ttpenrut','select tpr.tgl, tpr.ket, ts.nis, ts.namlen, tpr1.nmr, tpr1.ket as ket1, tpr1.jum from ttpenrut as tpr\r\n join {maidatmas}tsiswa as ts on ts.id = tpr.idsis\r\n join ttpenrut1 as tpr1 on tpr.id = tpr1.idpr\r\n join tsalpenrut as tspr on tspr.id = tpr1.idspr\r\n join tsetpenrut as tst on tst.id = tspr.idset\r\n join {Maiadmin}tkelsis as tks on tks.ids = tpr.idsis and tks.tin = tst.tin and tks.idta = tst.idta\r\n where tpr.sta = 0{filpr}{filset}{filks}','filpr;filset;filks',NULL,NULL,NULL,'Periode:3;FilStr:3',NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `tlaporan` ENABLE KEYS */;

--
-- Table structure for table `tlaporan1`
--

DROP TABLE IF EXISTS `tlaporan1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tlaporan1` (
  `kod` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `nam` varchar(50) NOT NULL DEFAULT '',
  `namfil` varchar(50) DEFAULT NULL,
  `namtab` varchar(50) DEFAULT NULL,
  `sqlstr` text DEFAULT NULL,
  `filsql` varchar(50) DEFAULT NULL,
  `koljoin` varchar(50) DEFAULT NULL,
  `rumus` text DEFAULT NULL,
  `sta` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`kod`,`nmr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tlaporan1`
--

/*!40000 ALTER TABLE `tlaporan1` DISABLE KEYS */;
/*!40000 ALTER TABLE `tlaporan1` ENABLE KEYS */;

--
-- Table structure for table `tlaporan2`
--

DROP TABLE IF EXISTS `tlaporan2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tlaporan2` (
  `kod` varchar(50) NOT NULL,
  `tip` tinyint(4) NOT NULL DEFAULT 0,
  `nam` varchar(50) DEFAULT NULL,
  `lay` longtext NOT NULL,
  `ver` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tlaporan2`
--

/*!40000 ALTER TABLE `tlaporan2` DISABLE KEYS */;
INSERT INTO `tlaporan2` VALUES ('251',0,'Lap251','/// <XRTypeInfo>\r\n///   <AssemblyFullName>DevExpress.XtraReports.v17.2, Version=17.2.7.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a</AssemblyFullName>\r\n///   <AssemblyLocation>C:\\Windows\\Microsoft.Net\\assembly\\GAC_MSIL\\DevExpress.XtraReports.v17.2\\v4.0_17.2.7.0__b88d1754d700e49a\\DevExpress.XtraReports.v17.2.dll</AssemblyLocation>\r\n///   <TypeName>DevExpress.XtraReports.UI.XtraReport</TypeName>\r\n///   <Localization>en-US</Localization>\r\n///   <Version>17.2</Version>\r\n///   <Resources>\r\n///     <Resource Name=\"XtraReportSerialization.Lap251\">\r\n/// zsrvvgEAAACRAAAAbFN5c3RlbS5SZXNvdXJjZXMuUmVzb3VyY2VSZWFkZXIsIG1zY29ybGliLCBWZXJzaW9uPTQuMC4wLjAsIEN1bHR1cmU9bmV1dHJhbCwgUHVibGljS2V5VG9rZW49Yjc3YTVjNTYxOTM0ZTA4OSNTeXN0ZW0uUmVzb3VyY2VzLlJ1bnRpbWVSZXNvdXJjZVNldAIAAAACAAAAAAAAAFBBRFBBRFBDhAaQPP9zbkMAAAAAAAAAMgEAAD5NAGEAaQBzAHAAcAAuAFIAZQBzAHUAbAB0AFMAYwBoAGUAbQBhAFMAZQByAGkAYQBsAGkAegBhAGIAbABlAAAAAAAmYwB1AHMAdABvAG0AUwBxAGwAUQB1AGUAcgB5ADEALgBTAHEAbADzAQAAAfADUEVSaGRHRlRaWFFnVG1GdFpUMGlUV0ZwYzNCd0lqNDhWbWxsZHlCT1lXMWxQU0owZEhCbGJuSjFkQ0krUEVacFpX\r\n/// eGtJRTVoYldVOUltbGtJaUJVZVhCbFBTSkpiblF6TWlJZ0x6NDhSbWxsYkdRZ1RtRnRaVDBpYTJWME1TSWdWSGx3WlQwaVUzUnlhVzVuSWlBdlBqeEdhV1ZzWkNCT1lXMWxQU0pxZFcwaUlGUjVjR1U5SWtSdmRXSnNaU0lnTHo0OFJtbGxiR1FnVG1GdFpUMGlkR2RzSWlCVWVYQmxQU0pFWVhSbFZHbHRaU0lnTHo0OFJtbGxiR1FnVG1GdFpUMGlibTl3Y2lJZ1ZIbHdaVDBpVTNSeWFXNW5JaUF2UGp4R2FXVnNaQ0JPWVcxbFBTSnJaWFFpSUZSNWNHVTlJbE4wY21sdVp5SWdMejQ4Um1sbGJHUWdUbUZ0WlQwaWJtbHpJaUJVZVhCbFBTSlRkSEpwYm1jaUlDOCtQRVpwWld4a0lFNWhiV1U5SW01aGJXeGxiaUlnVkhsd1pUMGlVM1J5YVc1bklpQXZQanhHYVdWc1pDQk9Z\r\n/// VzFsUFNKdWJYSWlJRlI1Y0dVOUlsTkNlWFJsSWlBdlBqd3ZWbWxsZHo0OEwwUmhkR0ZUWlhRKwHxAXNlbGVjdCB0dHAuaWQsIHR0cDEua2V0IGFzIGtldDEsIHR0cDEuanVtLCB0dHAudGdsLCB0dHAubm9wciwgdHRwLmtldCwgdHMubmlzLCB0cy5uYW1sZW4sIHR0cDEubm1yIGZyb20gDQp0dHBlbnJ1dCBhcyB0dHAgam9pbiANCnR0cGVucnV0MSBhcyB0dHAxIG9uIHR0cC5pZCA9IHR0cDEuaWRwciBqb2luIA0KbWFpZGF0bWFzLnRzaXN3YSBhcyB0cyBvbiB0cy5pZCA9IHR0cC5pZHNpcw0KV2hlcmUgdHRwLmlkIGluICgxMCk=</Resource>\r\n///   </Resources>\r\n/// </XRTypeInfo>\r\nnamespace XtraReportSerialization {\r\n    \r\n    public class Lap251 : DevExpress.XtraReports.UI.XtraReport {\r\n        private DevExpress.XtraReports.UI.TopMarginBand topMarginBand1;\r\n        private DevExpress.XtraReports.UI.DetailBand detailBand1;\r\n        private DevExpress.XtraReports.UI.XRLabel label10;\r\n        private DevExpress.XtraReports.UI.XRLabel label7;\r\n        private DevExpress.XtraReports.UI.XRLabel label6;\r\n        private DevExpress.XtraReports.UI.BottomMarginBand bottomMarginBand1;\r\n        private DevExpress.XtraReports.UI.GroupHeaderBand GroupHeader1;\r\n        private DevExpress.XtraReports.UI.XRTable table3;\r\n        private DevExpress.XtraReports.UI.XRTableRow tableRow5;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell9;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell10;\r\n        private DevExpress.XtraReports.UI.XRTable table2;\r\n        private DevExpress.XtraReports.UI.XRTableRow tableRow3;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell5;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell6;\r\n        private DevExpress.XtraReports.UI.XRTableRow tableRow4;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell7;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell8;\r\n        private DevExpress.XtraReports.UI.XRTable table1;\r\n        private DevExpress.XtraReports.UI.XRTableRow tableRow1;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell1;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell2;\r\n        private DevExpress.XtraReports.UI.XRTableRow tableRow2;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell3;\r\n        private DevExpress.XtraReports.UI.XRTableCell tableCell4;\r\n        private DevExpress.XtraReports.UI.XRLine line1;\r\n        private DevExpress.XtraReports.UI.XRLabel label4;\r\n        private DevExpress.XtraReports.UI.XRLabel label3;\r\n        private DevExpress.XtraReports.UI.XRLabel label2;\r\n        private DevExpress.XtraReports.UI.XRLabel label1;\r\n        private DevExpress.XtraReports.UI.SubBand SubBand1;\r\n        private DevExpress.XtraReports.UI.XRLine line2;\r\n        private DevExpress.XtraReports.UI.XRLine line3;\r\n        private DevExpress.XtraReports.UI.XRLabel label5;\r\n        private DevExpress.XtraReports.UI.GroupFooterBand GroupFooter1;\r\n        private DevExpress.XtraReports.UI.XRLine line6;\r\n        private DevExpress.XtraReports.UI.XRLabel label16;\r\n        private DevExpress.XtraReports.UI.XRLabel label15;\r\n        private DevExpress.XtraReports.UI.XRLine line5;\r\n        private DevExpress.XtraReports.UI.XRLabel label14;\r\n        private DevExpress.XtraReports.UI.XRLabel label13;\r\n        private DevExpress.XtraReports.UI.XRLine line4;\r\n        private DevExpress.XtraReports.UI.XRLabel label12;\r\n        private DevExpress.XtraReports.UI.XRLabel label11;\r\n        private DevExpress.XtraReports.UI.XRLabel label9;\r\n        private DevExpress.XtraReports.UI.XRLabel label8;\r\n        private DevExpress.XtraReports.UI.PageFooterBand PageFooter;\r\n        private DevExpress.XtraReports.UI.XRLabel label17;\r\n        private DevExpress.DataAccess.Sql.SqlDataSource Maispp;\r\n        private DevExpress.XtraReports.UI.XRCrossBandLine crossBandLine1;\r\n        private DevExpress.XtraReports.UI.XRCrossBandLine crossBandLine3;\r\n        private DevExpress.XtraReports.UI.XRCrossBandLine crossBandLine2;\r\n        private System.Resources.ResourceManager _resources;\r\n        private string _resourceString;\r\n        public Lap251() {\r\n            this._resourceString = DevExpress.XtraReports.Serialization.XRResourceManager.GetResourceFor(\"XtraReportSerialization.Lap251\");\r\n            this.InitializeComponent();\r\n        }\r\n        private System.Resources.ResourceManager resources {\r\n            get {\r\n                if (_resources == null) {\r\n                    this._resources = new DevExpress.XtraReports.Serialization.XRResourceManager(this._resourceString);\r\n                }\r\n                return this._resources;\r\n            }\r\n        }\r\n        private void InitializeComponent() {\r\n            DevExpress.XtraReports.UI.XRSummary summary1 = new DevExpress.XtraReports.UI.XRSummary();\r\n            DevExpress.XtraReports.UI.XRSummary summary2 = new DevExpress.XtraReports.UI.XRSummary();\r\n            DevExpress.XtraReports.UI.XRSummary summary3 = new DevExpress.XtraReports.UI.XRSummary();\r\n            DevExpress.DataAccess.ConnectionParameters.CustomStringConnectionParameters customStringConnectionParameters1 = new DevExpress.DataAccess.ConnectionParameters.CustomStringConnectionParameters();\r\n            DevExpress.DataAccess.Sql.CustomSqlQuery customSqlQuery1 = new DevExpress.DataAccess.Sql.CustomSqlQuery();\r\n            this.topMarginBand1 = new DevExpress.XtraReports.UI.TopMarginBand();\r\n            this.detailBand1 = new DevExpress.XtraReports.UI.DetailBand();\r\n            this.bottomMarginBand1 = new DevExpress.XtraReports.UI.BottomMarginBand();\r\n            this.GroupHeader1 = new DevExpress.XtraReports.UI.GroupHeaderBand();\r\n            this.GroupFooter1 = new DevExpress.XtraReports.UI.GroupFooterBand();\r\n            this.PageFooter = new DevExpress.XtraReports.UI.PageFooterBand();\r\n            this.label10 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label7 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label6 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.table3 = new DevExpress.XtraReports.UI.XRTable();\r\n            this.table2 = new DevExpress.XtraReports.UI.XRTable();\r\n            this.table1 = new DevExpress.XtraReports.UI.XRTable();\r\n            this.line1 = new DevExpress.XtraReports.UI.XRLine();\r\n            this.label4 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label3 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label2 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label1 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.tableRow5 = new DevExpress.XtraReports.UI.XRTableRow();\r\n            this.tableCell9 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell10 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableRow3 = new DevExpress.XtraReports.UI.XRTableRow();\r\n            this.tableRow4 = new DevExpress.XtraReports.UI.XRTableRow();\r\n            this.tableCell5 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell6 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell7 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell8 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableRow1 = new DevExpress.XtraReports.UI.XRTableRow();\r\n            this.tableRow2 = new DevExpress.XtraReports.UI.XRTableRow();\r\n            this.tableCell1 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell2 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell3 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.tableCell4 = new DevExpress.XtraReports.UI.XRTableCell();\r\n            this.SubBand1 = new DevExpress.XtraReports.UI.SubBand();\r\n            this.line2 = new DevExpress.XtraReports.UI.XRLine();\r\n            this.line3 = new DevExpress.XtraReports.UI.XRLine();\r\n            this.label5 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.line6 = new DevExpress.XtraReports.UI.XRLine();\r\n            this.label16 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label15 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.line5 = new DevExpress.XtraReports.UI.XRLine();\r\n            this.label14 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label13 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.line4 = new DevExpress.XtraReports.UI.XRLine();\r\n            this.label12 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label11 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label9 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label8 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.label17 = new DevExpress.XtraReports.UI.XRLabel();\r\n            this.Maispp = new DevExpress.DataAccess.Sql.SqlDataSource();\r\n            this.crossBandLine1 = new DevExpress.XtraReports.UI.XRCrossBandLine();\r\n            this.crossBandLine3 = new DevExpress.XtraReports.UI.XRCrossBandLine();\r\n            this.crossBandLine2 = new DevExpress.XtraReports.UI.XRCrossBandLine();\r\n            ((System.ComponentModel.ISupportInitialize)(this.table3)).BeginInit();\r\n            ((System.ComponentModel.ISupportInitialize)(this.table2)).BeginInit();\r\n            ((System.ComponentModel.ISupportInitialize)(this.table1)).BeginInit();\r\n            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();\r\n            // \r\n            // topMarginBand1\r\n            // \r\n            this.topMarginBand1.Dpi = 254F;\r\n            this.topMarginBand1.HeightF = 75F;\r\n            this.topMarginBand1.Name = \"topMarginBand1\";\r\n            // \r\n            // detailBand1\r\n            // \r\n            this.detailBand1.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {\r\n                        this.label10,\r\n                        this.label7,\r\n                        this.label6});\r\n            this.detailBand1.Dpi = 254F;\r\n            this.detailBand1.HeightF = 62.02123F;\r\n            this.detailBand1.Name = \"detailBand1\";\r\n            // \r\n            // bottomMarginBand1\r\n            // \r\n            this.bottomMarginBand1.Dpi = 254F;\r\n            this.bottomMarginBand1.HeightF = 75F;\r\n            this.bottomMarginBand1.Name = \"bottomMarginBand1\";\r\n            // \r\n            // GroupHeader1\r\n            // \r\n            this.GroupHeader1.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {\r\n                        this.table3,\r\n                        this.table2,\r\n                        this.table1,\r\n                        this.line1,\r\n                        this.label4,\r\n                        this.label3,\r\n                        this.label2,\r\n                        this.label1});\r\n            this.GroupHeader1.Dpi = 254F;\r\n            this.GroupHeader1.GroupFields.AddRange(new DevExpress.XtraReports.UI.GroupField[] {\r\n                        new DevExpress.XtraReports.UI.GroupField(\"id\", DevExpress.XtraReports.UI.XRColumnSortOrder.Ascending)});\r\n            this.GroupHeader1.HeightF = 287.9981F;\r\n            this.GroupHeader1.Name = \"GroupHeader1\";\r\n            this.GroupHeader1.SubBands.AddRange(new DevExpress.XtraReports.UI.SubBand[] {\r\n                        this.SubBand1});\r\n            // \r\n            // GroupFooter1\r\n            // \r\n            this.GroupFooter1.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {\r\n                        this.line6,\r\n                        this.label16,\r\n                        this.label15,\r\n                        this.line5,\r\n                        this.label14,\r\n                        this.label13,\r\n                        this.line4,\r\n                        this.label12,\r\n                        this.label11,\r\n                        this.label9,\r\n                        this.label8});\r\n            this.GroupFooter1.Dpi = 254F;\r\n            this.GroupFooter1.HeightF = 332.9871F;\r\n            this.GroupFooter1.Name = \"GroupFooter1\";\r\n            // \r\n            // PageFooter\r\n            // \r\n            this.PageFooter.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {\r\n                        this.label17});\r\n            this.PageFooter.Dpi = 254F;\r\n            this.PageFooter.HeightF = 111.3367F;\r\n            this.PageFooter.Name = \"PageFooter\";\r\n            // \r\n            // label10\r\n            // \r\n            this.label10.Dpi = 254F;\r\n            this.label10.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[jum]\")});\r\n            this.label10.Font = new System.Drawing.Font(\"Arial\", 9F);\r\n            this.label10.LocationFloat = new DevExpress.Utils.PointFloat(726.278F, 0F);\r\n            this.label10.Name = \"label10\";\r\n            this.label10.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label10.SizeF = new System.Drawing.SizeF(228.2557F, 62.02123F);\r\n            this.label10.StylePriority.UseFont = false;\r\n            this.label10.StylePriority.UseTextAlignment = false;\r\n            this.label10.Text = \"label6\";\r\n            this.label10.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight;\r\n            this.label10.TextFormatString = \"{0:n}\";\r\n            // \r\n            // label7\r\n            // \r\n            this.label7.CanGrow = false;\r\n            this.label7.Dpi = 254F;\r\n            this.label7.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[ket1]\")});\r\n            this.label7.Font = new System.Drawing.Font(\"Times New Roman\", 9.75F);\r\n            this.label7.LocationFloat = new DevExpress.Utils.PointFloat(93.68484F, 0F);\r\n            this.label7.Name = \"label7\";\r\n            this.label7.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label7.SizeF = new System.Drawing.SizeF(632.5931F, 62.02123F);\r\n            this.label7.StylePriority.UseFont = false;\r\n            this.label7.StylePriority.UseTextAlignment = false;\r\n            this.label7.Text = \"label6\";\r\n            this.label7.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopLeft;\r\n            // \r\n            // label6\r\n            // \r\n            this.label6.Dpi = 254F;\r\n            this.label6.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[nmr]\")});\r\n            this.label6.Font = new System.Drawing.Font(\"Arial\", 9.75F);\r\n            this.label6.LocationFloat = new DevExpress.Utils.PointFloat(30.4053F, 0F);\r\n            this.label6.Name = \"label6\";\r\n            this.label6.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label6.SizeF = new System.Drawing.SizeF(63.27953F, 62.02123F);\r\n            this.label6.StylePriority.UseFont = false;\r\n            this.label6.StylePriority.UseTextAlignment = false;\r\n            this.label6.Text = \"label6\";\r\n            this.label6.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight;\r\n            // \r\n            // table3\r\n            // \r\n            this.table3.Dpi = 254F;\r\n            this.table3.LocationFloat = new DevExpress.Utils.PointFloat(1466.12F, 199.2157F);\r\n            this.table3.Name = \"table3\";\r\n            this.table3.Rows.AddRange(new DevExpress.XtraReports.UI.XRTableRow[] {\r\n                        this.tableRow5});\r\n            this.table3.SizeF = new System.Drawing.SizeF(449.792F, 39.98151F);\r\n            // \r\n            // table2\r\n            // \r\n            this.table2.Dpi = 254F;\r\n            this.table2.LocationFloat = new DevExpress.Utils.PointFloat(936.9534F, 199.2157F);\r\n            this.table2.Name = \"table2\";\r\n            this.table2.Rows.AddRange(new DevExpress.XtraReports.UI.XRTableRow[] {\r\n                        this.tableRow3,\r\n                        this.tableRow4});\r\n            this.table2.SizeF = new System.Drawing.SizeF(449.7918F, 79.96297F);\r\n            // \r\n            // table1\r\n            // \r\n            this.table1.Dpi = 254F;\r\n            this.table1.LocationFloat = new DevExpress.Utils.PointFloat(21.49509F, 199.2157F);\r\n            this.table1.Name = \"table1\";\r\n            this.table1.Rows.AddRange(new DevExpress.XtraReports.UI.XRTableRow[] {\r\n                        this.tableRow1,\r\n                        this.tableRow2});\r\n            this.table1.SizeF = new System.Drawing.SizeF(915.4584F, 79.96297F);\r\n            // \r\n            // line1\r\n            // \r\n            this.line1.Dpi = 254F;\r\n            this.line1.LineWidth = 3;\r\n            this.line1.LocationFloat = new DevExpress.Utils.PointFloat(0F, 179.0949F);\r\n            this.line1.Name = \"line1\";\r\n            this.line1.SizeF = new System.Drawing.SizeF(1951F, 5F);\r\n            // \r\n            // label4\r\n            // \r\n            this.label4.Dpi = 254F;\r\n            this.label4.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[nopr]\")});\r\n            this.label4.LocationFloat = new DevExpress.Utils.PointFloat(1548.297F, 36.12743F);\r\n            this.label4.Name = \"label4\";\r\n            this.label4.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label4.SizeF = new System.Drawing.SizeF(390.9802F, 58.42F);\r\n            this.label4.StylePriority.UseTextAlignment = false;\r\n            this.label4.Text = \"label4\";\r\n            this.label4.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopCenter;\r\n            // \r\n            // label3\r\n            // \r\n            this.label3.Dpi = 254F;\r\n            this.label3.LocationFloat = new DevExpress.Utils.PointFloat(1548.297F, 0F);\r\n            this.label3.Name = \"label3\";\r\n            this.label3.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label3.SizeF = new System.Drawing.SizeF(390.9803F, 36.12743F);\r\n            this.label3.StylePriority.UseTextAlignment = false;\r\n            this.label3.Text = \"BUKTI PEMBAYARAN\";\r\n            this.label3.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopCenter;\r\n            // \r\n            // label2\r\n            // \r\n            this.label2.Dpi = 254F;\r\n            this.label2.Font = new System.Drawing.Font(\"Arial\", 8F, System.Drawing.FontStyle.Bold);\r\n            this.label2.LocationFloat = new DevExpress.Utils.PointFloat(250.9044F, 53.7509F);\r\n            this.label2.Multiline = true;\r\n            this.label2.Name = \"label2\";\r\n            this.label2.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label2.SizeF = new System.Drawing.SizeF(588.6201F, 125.344F);\r\n            this.label2.StylePriority.UseFont = false;\r\n            this.label2.Text = \"Jl. Boulevard Utara No. 8\\r\\nKomp. Cemara Asri - Deli Serdang\\r\\nTelp (061) 66 37 111\" +\r\n                \" - 0821 666 37 111\";\r\n            // \r\n            // label1\r\n            // \r\n            this.label1.Dpi = 254F;\r\n            this.label1.Font = new System.Drawing.Font(\"Arial Black\", 10F);\r\n            this.label1.LocationFloat = new DevExpress.Utils.PointFloat(250.9044F, 0F);\r\n            this.label1.Name = \"label1\";\r\n            this.label1.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label1.SizeF = new System.Drawing.SizeF(552.8235F, 53.7509F);\r\n            this.label1.StylePriority.UseFont = false;\r\n            this.label1.Text = \"SEKOLAH MAITREYAWIRA\";\r\n            // \r\n            // tableRow5\r\n            // \r\n            this.tableRow5.Cells.AddRange(new DevExpress.XtraReports.UI.XRTableCell[] {\r\n                        this.tableCell9,\r\n                        this.tableCell10});\r\n            this.tableRow5.Dpi = 254F;\r\n            this.tableRow5.Name = \"tableRow5\";\r\n            this.tableRow5.Weight = 1D;\r\n            // \r\n            // tableCell9\r\n            // \r\n            this.tableCell9.Dpi = 254F;\r\n            this.tableCell9.Name = \"tableCell9\";\r\n            this.tableCell9.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell9.Text = \"Tahun Ajaran\\t:\";\r\n            this.tableCell9.Weight = 0.89583335335799086D;\r\n            // \r\n            // tableCell10\r\n            // \r\n            this.tableCell10.Dpi = 254F;\r\n            this.tableCell10.Name = \"tableCell10\";\r\n            this.tableCell10.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell10.TextFormatString = \"{0:dd/MM/yyyy}\";\r\n            this.tableCell10.Weight = 0.87500054066575417D;\r\n            // \r\n            // tableRow3\r\n            // \r\n            this.tableRow3.Cells.AddRange(new DevExpress.XtraReports.UI.XRTableCell[] {\r\n                        this.tableCell5,\r\n                        this.tableCell6});\r\n            this.tableRow3.Dpi = 254F;\r\n            this.tableRow3.Name = \"tableRow3\";\r\n            this.tableRow3.Weight = 1D;\r\n            // \r\n            // tableRow4\r\n            // \r\n            this.tableRow4.Cells.AddRange(new DevExpress.XtraReports.UI.XRTableCell[] {\r\n                        this.tableCell7,\r\n                        this.tableCell8});\r\n            this.tableRow4.Dpi = 254F;\r\n            this.tableRow4.Name = \"tableRow4\";\r\n            this.tableRow4.Weight = 1D;\r\n            // \r\n            // tableCell5\r\n            // \r\n            this.tableCell5.Dpi = 254F;\r\n            this.tableCell5.Name = \"tableCell5\";\r\n            this.tableCell5.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell5.Text = \"Tanggal\\t:\";\r\n            this.tableCell5.Weight = 0.89583335335799086D;\r\n            // \r\n            // tableCell6\r\n            // \r\n            this.tableCell6.Dpi = 254F;\r\n            this.tableCell6.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[tgl]\")});\r\n            this.tableCell6.Name = \"tableCell6\";\r\n            this.tableCell6.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell6.Text = \"tableCell2\";\r\n            this.tableCell6.TextFormatString = \"{0:dd/MM/yyyy}\";\r\n            this.tableCell6.Weight = 0.87500054066575417D;\r\n            // \r\n            // tableCell7\r\n            // \r\n            this.tableCell7.Dpi = 254F;\r\n            this.tableCell7.Name = \"tableCell7\";\r\n            this.tableCell7.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell7.StylePriority.UsePadding = false;\r\n            this.tableCell7.Text = \"Kelas\\t:\";\r\n            this.tableCell7.Weight = 0.89583335335799086D;\r\n            // \r\n            // tableCell8\r\n            // \r\n            this.tableCell8.Dpi = 254F;\r\n            this.tableCell8.Name = \"tableCell8\";\r\n            this.tableCell8.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell8.StylePriority.UsePadding = false;\r\n            this.tableCell8.Weight = 0.87500054066575417D;\r\n            // \r\n            // tableRow1\r\n            // \r\n            this.tableRow1.Cells.AddRange(new DevExpress.XtraReports.UI.XRTableCell[] {\r\n                        this.tableCell1,\r\n                        this.tableCell2});\r\n            this.tableRow1.Dpi = 254F;\r\n            this.tableRow1.Name = \"tableRow1\";\r\n            this.tableRow1.Weight = 1D;\r\n            // \r\n            // tableRow2\r\n            // \r\n            this.tableRow2.Cells.AddRange(new DevExpress.XtraReports.UI.XRTableCell[] {\r\n                        this.tableCell3,\r\n                        this.tableCell4});\r\n            this.tableRow2.Dpi = 254F;\r\n            this.tableRow2.Name = \"tableRow2\";\r\n            this.tableRow2.Weight = 1D;\r\n            // \r\n            // tableCell1\r\n            // \r\n            this.tableCell1.Dpi = 254F;\r\n            this.tableCell1.Name = \"tableCell1\";\r\n            this.tableCell1.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell1.Text = \"No. VA\\t:\";\r\n            this.tableCell1.Weight = 0.89583335335799086D;\r\n            // \r\n            // tableCell2\r\n            // \r\n            this.tableCell2.Dpi = 254F;\r\n            this.tableCell2.Name = \"tableCell2\";\r\n            this.tableCell2.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell2.Weight = 2.7083332332100456D;\r\n            // \r\n            // tableCell3\r\n            // \r\n            this.tableCell3.Dpi = 254F;\r\n            this.tableCell3.Name = \"tableCell3\";\r\n            this.tableCell3.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell3.StylePriority.UsePadding = false;\r\n            this.tableCell3.Text = \"Nama\\t:\";\r\n            this.tableCell3.Weight = 0.89583335335799086D;\r\n            // \r\n            // tableCell4\r\n            // \r\n            this.tableCell4.Dpi = 254F;\r\n            this.tableCell4.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[namlen]\")});\r\n            this.tableCell4.Name = \"tableCell4\";\r\n            this.tableCell4.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.tableCell4.StylePriority.UsePadding = false;\r\n            this.tableCell4.Text = \"tableCell4\";\r\n            this.tableCell4.Weight = 2.7083332332100456D;\r\n            // \r\n            // SubBand1\r\n            // \r\n            this.SubBand1.Controls.AddRange(new DevExpress.XtraReports.UI.XRControl[] {\r\n                        this.line2,\r\n                        this.line3,\r\n                        this.label5});\r\n            this.SubBand1.Dpi = 254F;\r\n            this.SubBand1.HeightF = 61.01049F;\r\n            this.SubBand1.Name = \"SubBand1\";\r\n            // \r\n            // line2\r\n            // \r\n            this.line2.Dpi = 254F;\r\n            this.line2.LineWidth = 5;\r\n            this.line2.LocationFloat = new DevExpress.Utils.PointFloat(25F, 53.86759F);\r\n            this.line2.Name = \"line2\";\r\n            this.line2.SizeF = new System.Drawing.SizeF(1902.354F, 5F);\r\n            // \r\n            // line3\r\n            // \r\n            this.line3.Dpi = 254F;\r\n            this.line3.LineWidth = 5;\r\n            this.line3.LocationFloat = new DevExpress.Utils.PointFloat(25F, 7.567703F);\r\n            this.line3.Name = \"line3\";\r\n            this.line3.SizeF = new System.Drawing.SizeF(1902.354F, 5F);\r\n            // \r\n            // label5\r\n            // \r\n            this.label5.Dpi = 254F;\r\n            this.label5.LocationFloat = new DevExpress.Utils.PointFloat(30.40531F, 12.56768F);\r\n            this.label5.Name = \"label5\";\r\n            this.label5.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label5.SizeF = new System.Drawing.SizeF(300.6911F, 41.29992F);\r\n            this.label5.Text = \"Rincian Pembayaran\";\r\n            // \r\n            // line6\r\n            // \r\n            this.line6.Dpi = 254F;\r\n            this.line6.LineWidth = 3;\r\n            this.line6.LocationFloat = new DevExpress.Utils.PointFloat(1466.12F, 241.1355F);\r\n            this.line6.Name = \"line6\";\r\n            this.line6.SizeF = new System.Drawing.SizeF(309.0436F, 33.43159F);\r\n            // \r\n            // label16\r\n            // \r\n            this.label16.Dpi = 254F;\r\n            this.label16.LocationFloat = new DevExpress.Utils.PointFloat(1466.12F, 274.5671F);\r\n            this.label16.Name = \"label16\";\r\n            this.label16.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label16.SizeF = new System.Drawing.SizeF(309.0435F, 58.41998F);\r\n            this.label16.StylePriority.UseTextAlignment = false;\r\n            this.label16.Text = \"Orang Tua / Wali\";\r\n            this.label16.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopCenter;\r\n            // \r\n            // label15\r\n            // \r\n            this.label15.Dpi = 254F;\r\n            this.label15.LocationFloat = new DevExpress.Utils.PointFloat(831.9329F, 274.5671F);\r\n            this.label15.Name = \"label15\";\r\n            this.label15.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label15.SizeF = new System.Drawing.SizeF(309.0435F, 58.41998F);\r\n            this.label15.StylePriority.UseTextAlignment = false;\r\n            this.label15.Text = \"Kasir\";\r\n            this.label15.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopCenter;\r\n            // \r\n            // line5\r\n            // \r\n            this.line5.Dpi = 254F;\r\n            this.line5.LineWidth = 3;\r\n            this.line5.LocationFloat = new DevExpress.Utils.PointFloat(831.9329F, 241.1355F);\r\n            this.line5.Name = \"line5\";\r\n            this.line5.SizeF = new System.Drawing.SizeF(309.0436F, 33.43159F);\r\n            // \r\n            // label14\r\n            // \r\n            this.label14.Dpi = 254F;\r\n            this.label14.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"sumSum([jum])\")});\r\n            this.label14.Font = new System.Drawing.Font(\"Times New Roman\", 9.75F, System.Drawing.FontStyle.Bold);\r\n            this.label14.LocationFloat = new DevExpress.Utils.PointFloat(188.8613F, 122.9426F);\r\n            this.label14.Name = \"label14\";\r\n            this.label14.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label14.SizeF = new System.Drawing.SizeF(477.2412F, 57.31752F);\r\n            this.label14.StylePriority.UseFont = false;\r\n            this.label14.StylePriority.UseTextAlignment = false;\r\n            summary1.Running = DevExpress.XtraReports.UI.SummaryRunning.Group;\r\n            this.label14.Summary = summary1;\r\n            this.label14.Text = \"label6\";\r\n            this.label14.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight;\r\n            this.label14.TextFormatString = \"{0:n}\";\r\n            // \r\n            // label13\r\n            // \r\n            this.label13.Dpi = 254F;\r\n            this.label13.Font = new System.Drawing.Font(\"Times New Roman\", 9.75F, System.Drawing.FontStyle.Bold);\r\n            this.label13.LocationFloat = new DevExpress.Utils.PointFloat(30.4053F, 121.84F);\r\n            this.label13.Name = \"label13\";\r\n            this.label13.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label13.SizeF = new System.Drawing.SizeF(158.456F, 58.42F);\r\n            this.label13.StylePriority.UseFont = false;\r\n            this.label13.Text = \"Transfer:\";\r\n            // \r\n            // line4\r\n            // \r\n            this.line4.Dpi = 254F;\r\n            this.line4.LineWidth = 5;\r\n            this.line4.LocationFloat = new DevExpress.Utils.PointFloat(24.9998F, 116.8401F);\r\n            this.line4.Name = \"line4\";\r\n            this.line4.SizeF = new System.Drawing.SizeF(1902.354F, 5F);\r\n            // \r\n            // label12\r\n            // \r\n            this.label12.Dpi = 254F;\r\n            this.label12.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"Concat(\\\'Terbilang : \\\',Terbilang(sumSum([jum])),\\\' Rp.\\\' )\")});\r\n            this.label12.Font = new System.Drawing.Font(\"Times New Roman\", 9F);\r\n            this.label12.LocationFloat = new DevExpress.Utils.PointFloat(959.5337F, 58.42003F);\r\n            this.label12.Name = \"label12\";\r\n            this.label12.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label12.SizeF = new System.Drawing.SizeF(962.8201F, 58.41999F);\r\n            this.label12.StylePriority.UseFont = false;\r\n            summary2.Running = DevExpress.XtraReports.UI.SummaryRunning.Group;\r\n            this.label12.Summary = summary2;\r\n            this.label12.Text = \"TOTAL PEMBAYARAN\";\r\n            // \r\n            // label11\r\n            // \r\n            this.label11.Dpi = 254F;\r\n            this.label11.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"sumSum([jum])\")});\r\n            this.label11.Font = new System.Drawing.Font(\"Times New Roman\", 9.75F, System.Drawing.FontStyle.Bold);\r\n            this.label11.LocationFloat = new DevExpress.Utils.PointFloat(1386.745F, 25F);\r\n            this.label11.Name = \"label11\";\r\n            this.label11.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label11.SizeF = new System.Drawing.SizeF(535.6086F, 32.31751F);\r\n            this.label11.StylePriority.UseFont = false;\r\n            this.label11.StylePriority.UseTextAlignment = false;\r\n            summary3.Running = DevExpress.XtraReports.UI.SummaryRunning.Group;\r\n            this.label11.Summary = summary3;\r\n            this.label11.Text = \"label6\";\r\n            this.label11.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopRight;\r\n            this.label11.TextFormatString = \"{0:n}\";\r\n            // \r\n            // label9\r\n            // \r\n            this.label9.Dpi = 254F;\r\n            this.label9.Font = new System.Drawing.Font(\"Times New Roman\", 9.75F, System.Drawing.FontStyle.Bold);\r\n            this.label9.LocationFloat = new DevExpress.Utils.PointFloat(959.5337F, 25F);\r\n            this.label9.Name = \"label9\";\r\n            this.label9.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label9.SizeF = new System.Drawing.SizeF(427.2115F, 33.42003F);\r\n            this.label9.StylePriority.UseFont = false;\r\n            this.label9.Text = \"TOTAL PEMBAYARAN\";\r\n            // \r\n            // label8\r\n            // \r\n            this.label8.CanGrow = false;\r\n            this.label8.Dpi = 254F;\r\n            this.label8.ExpressionBindings.AddRange(new DevExpress.XtraReports.UI.ExpressionBinding[] {\r\n                        new DevExpress.XtraReports.UI.ExpressionBinding(\"BeforePrint\", \"Text\", \"[ket]\")});\r\n            this.label8.LocationFloat = new DevExpress.Utils.PointFloat(30.4053F, 58.42003F);\r\n            this.label8.Name = \"label8\";\r\n            this.label8.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label8.SizeF = new System.Drawing.SizeF(924.1284F, 58.41999F);\r\n            this.label8.Text = \"label8\";\r\n            // \r\n            // label17\r\n            // \r\n            this.label17.Dpi = 254F;\r\n            this.label17.Font = new System.Drawing.Font(\"Arial\", 8F);\r\n            this.label17.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));\r\n            this.label17.LocationFloat = new DevExpress.Utils.PointFloat(0F, 0F);\r\n            this.label17.Multiline = true;\r\n            this.label17.Name = \"label17\";\r\n            this.label17.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 0, 0, 254F);\r\n            this.label17.SizeF = new System.Drawing.SizeF(975.7589F, 111.3367F);\r\n            this.label17.StylePriority.UseFont = false;\r\n            this.label17.StylePriority.UseForeColor = false;\r\n            this.label17.Text = \"Simpanlah Bukti Pembayaran ini dengan baik. Jika kehilangan dan terdapat\\r\\nperbeda\" +\r\n                \"an data, maka yang berlaku adalah data dari Sekolah Maitreyawira.\\r\\nTerima Kasih\";\r\n            // \r\n            // Maispp\r\n            // \r\n            this.Maispp.ConnectionName = \"Connection\";\r\n            customStringConnectionParameters1.ConnectionString = \"XpoProvider = MySql;server=vittindo.my.id;port=8082;uid=root;pwd=1234;database=ma\" +\r\n                \"isppnew;; Persist Security Info = true; Charset = utf8\";\r\n            this.Maispp.ConnectionParameters = customStringConnectionParameters1;\r\n            this.Maispp.Name = \"Maispp\";\r\n            customSqlQuery1.Name = \"ttpenrut\";\r\n            customSqlQuery1.Sql = resources.GetString(\"customSqlQuery1.Sql\");\r\n            this.Maispp.Queries.AddRange(new DevExpress.DataAccess.Sql.SqlQuery[] {\r\n                        customSqlQuery1});\r\n            this.Maispp.ResultSchemaSerializable = resources.GetString(\"Maispp.ResultSchemaSerializable\");\r\n            // \r\n            // crossBandLine1\r\n            // \r\n            this.crossBandLine1.Dpi = 254F;\r\n            this.crossBandLine1.EndBand = this.GroupFooter1;\r\n            this.crossBandLine1.EndPointFloat = new DevExpress.Utils.PointFloat(25F, 124.392F);\r\n            this.crossBandLine1.LocationFloat = new DevExpress.Utils.PointFloat(25F, 7.567682F);\r\n            this.crossBandLine1.Name = \"crossBandLine1\";\r\n            this.crossBandLine1.StartBand = this.SubBand1;\r\n            this.crossBandLine1.StartPointFloat = new DevExpress.Utils.PointFloat(25F, 7.567682F);\r\n            this.crossBandLine1.WidthF = 4.999996F;\r\n            // \r\n            // crossBandLine3\r\n            // \r\n            this.crossBandLine3.Dpi = 254F;\r\n            this.crossBandLine3.EndBand = this.GroupFooter1;\r\n            this.crossBandLine3.EndPointFloat = new DevExpress.Utils.PointFloat(1922.354F, 124.392F);\r\n            this.crossBandLine3.LocationFloat = new DevExpress.Utils.PointFloat(1922.354F, 7.567727F);\r\n            this.crossBandLine3.Name = \"crossBandLine3\";\r\n            this.crossBandLine3.StartBand = this.SubBand1;\r\n            this.crossBandLine3.StartPointFloat = new DevExpress.Utils.PointFloat(1922.354F, 7.567727F);\r\n            this.crossBandLine3.WidthF = 5F;\r\n            // \r\n            // crossBandLine2\r\n            // \r\n            this.crossBandLine2.Dpi = 254F;\r\n            this.crossBandLine2.EndBand = this.GroupFooter1;\r\n            this.crossBandLine2.EndPointFloat = new DevExpress.Utils.PointFloat(954.5338F, 119.392F);\r\n            this.crossBandLine2.LocationFloat = new DevExpress.Utils.PointFloat(954.5338F, 7.717014F);\r\n            this.crossBandLine2.Name = \"crossBandLine2\";\r\n            this.crossBandLine2.StartBand = this.SubBand1;\r\n            this.crossBandLine2.StartPointFloat = new DevExpress.Utils.PointFloat(954.5338F, 7.717014F);\r\n            this.crossBandLine2.WidthF = 4.999939F;\r\n            // \r\n            // Lap251\r\n            // \r\n            this.Bands.AddRange(new DevExpress.XtraReports.UI.Band[] {\r\n                        this.topMarginBand1,\r\n                        this.detailBand1,\r\n                        this.bottomMarginBand1,\r\n                        this.GroupHeader1,\r\n                        this.GroupFooter1,\r\n                        this.PageFooter});\r\n            this.CrossBandControls.AddRange(new DevExpress.XtraReports.UI.XRCrossBandControl[] {\r\n                        this.crossBandLine1,\r\n                        this.crossBandLine3,\r\n                        this.crossBandLine2});\r\n            this.DataMember = \"ttpenrut\";\r\n            this.DataSource = this.Maispp;\r\n            this.DisplayName = \"Voucher\";\r\n            this.Dpi = 254F;\r\n            this.Margins = new System.Drawing.Printing.Margins(75, 75, 75, 75);\r\n            this.Name = \"Lap251\";\r\n            this.PageHeight = 1486;\r\n            this.PageWidth = 2101;\r\n            this.PaperKind = System.Drawing.Printing.PaperKind.Custom;\r\n            this.ReportUnit = DevExpress.XtraReports.UI.ReportUnit.TenthsOfAMillimeter;\r\n            this.SnapGridSize = 25F;\r\n            this.Tag = \"251\";\r\n            this.Version = \"17.2\";\r\n            ((System.ComponentModel.ISupportInitialize)(this.table3)).EndInit();\r\n            ((System.ComponentModel.ISupportInitialize)(this.table2)).EndInit();\r\n            ((System.ComponentModel.ISupportInitialize)(this.table1)).EndInit();\r\n            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();\r\n        }\r\n    }\r\n}\r\n',6,1,1,'2024-11-22 08:00:24','2024-11-22 08:38:41');
/*!40000 ALTER TABLE `tlaporan2` ENABLE KEYS */;

--
-- Table structure for table `tmenu`
--

DROP TABLE IF EXISTS `tmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmenu` (
  `Kod` varchar(5) NOT NULL DEFAULT '0',
  `Kep` varchar(5) DEFAULT NULL,
  `Uru` tinyint(4) NOT NULL DEFAULT 1,
  `Lev` tinyint(4) NOT NULL DEFAULT 1,
  `Nam` varchar(50) NOT NULL,
  `Nam1` varchar(50) DEFAULT NULL,
  `Judul` varchar(100) DEFAULT NULL,
  `DatMas` tinyint(4) NOT NULL DEFAULT 0,
  `Sta` tinyint(4) unsigned NOT NULL DEFAULT 1,
  PRIMARY KEY (`Kod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmenu`
--

/*!40000 ALTER TABLE `tmenu` DISABLE KEYS */;
INSERT INTO `tmenu` VALUES ('251','A1',1,3,'Input',NULL,'Input Penerimaan',0,1),('351','A3',1,3,'Daftar',NULL,'Daftar Penerimaan',0,1),('451','A1',1,3,'Tampil',NULL,'Tampil Penerimaan',0,1),('651','A4',1,3,'Laporan',NULL,'Laporan Penerimaan Rutin',0,1),('751','A2',1,3,'Setting',NULL,'Setting Penerimaan',0,1),('752','A2',1,3,'Pengurangan',NULL,'Setting Pengurangan Penerimaan',0,1),('754','B2',1,3,'Setting',NULL,'Setting PPDB',0,1),('A',NULL,1,1,'Penerimaan',NULL,'Penerimaan',0,1),('A1','A',1,2,'Input',NULL,'Input Penerimaan',0,1),('A2','A',2,2,'Setting',NULL,'Setting Penerimaan',0,1),('A3','A',3,2,'Daftar',NULL,'Daftar Penerimaan',0,1),('A4','A',4,2,'Laporan',NULL,'LaporanPenerimaan',0,1),('B',NULL,2,1,'PPDB',NULL,'Penerimaan',0,1),('B2','B',2,2,'Setting',NULL,'Input Penerimaan',0,1);
/*!40000 ALTER TABLE `tmenu` ENABLE KEYS */;

--
-- Table structure for table `tmenu2`
--

DROP TABLE IF EXISTS `tmenu2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmenu2` (
  `kod` varchar(5) NOT NULL,
  `Nam` varchar(50) NOT NULL,
  `Lay` longtext DEFAULT NULL,
  `Def` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kod`,`Nam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmenu2`
--

/*!40000 ALTER TABLE `tmenu2` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmenu2` ENABLE KEYS */;

--
-- Table structure for table `tnodoc`
--

DROP TABLE IF EXISTS `tnodoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tnodoc` (
  `doc` char(2) NOT NULL,
  `ket` varchar(4) NOT NULL DEFAULT '',
  `tah` year(4) NOT NULL,
  `bul` tinyint(4) NOT NULL DEFAULT 0,
  `nodoc` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`doc`,`ket`,`tah`,`bul`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tnodoc`
--

/*!40000 ALTER TABLE `tnodoc` DISABLE KEYS */;
INSERT INTO `tnodoc` VALUES ('AF','',2024,0,1),('PD','',2024,0,1),('PR','',2024,0,13);
/*!40000 ALTER TABLE `tnodoc` ENABLE KEYS */;

--
-- Table structure for table `tprosesspp`
--

DROP TABLE IF EXISTS `tprosesspp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tprosesspp` (
  `tip` tinyint(4) NOT NULL DEFAULT 0,
  `bul` tinyint(4) NOT NULL DEFAULT 0,
  `tah` year(4) NOT NULL,
  `coa1` int(11) DEFAULT NULL,
  `coa2` int(11) DEFAULT NULL,
  `idsis` int(11) NOT NULL DEFAULT 0,
  `jum` double NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tprosesspp`
--

/*!40000 ALTER TABLE `tprosesspp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tprosesspp` ENABLE KEYS */;

--
-- Table structure for table `tsalpenrut`
--

DROP TABLE IF EXISTS `tsalpenrut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsalpenrut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idset` int(11) NOT NULL DEFAULT 0,
  `idsis` int(11) NOT NULL DEFAULT 0,
  `bulid` tinyint(4) unsigned NOT NULL DEFAULT 0,
  `tah` year(4) NOT NULL,
  `nmr` tinyint(4) NOT NULL DEFAULT 0,
  `jen` tinyint(4) NOT NULL DEFAULT 0,
  `ket` varchar(80) DEFAULT NULL,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `coapen` int(11) NOT NULL DEFAULT 0,
  `coapiu` int(11) DEFAULT NULL,
  `coapendim` int(11) DEFAULT NULL,
  `coabelter` int(11) DEFAULT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `islock` tinyint(4) NOT NULL DEFAULT 0,
  `idspr1` int(11) NOT NULL DEFAULT 0,
  `idgru` int(11) NOT NULL DEFAULT 0,
  `idpr` int(11) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idset`,`idsis`,`bulid`,`tah`,`nmr`,`jen`) USING BTREE,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4283 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsalpenrut`
--

/*!40000 ALTER TABLE `tsalpenrut` DISABLE KEYS */;
INSERT INTO `tsalpenrut` VALUES (55,1,10,1,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(9,1,10,1,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(56,1,10,2,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(10,1,10,2,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(57,1,10,3,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(11,1,10,3,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(58,1,10,4,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(12,1,10,4,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(59,1,10,5,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(13,1,10,5,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(60,1,10,6,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(1,1,10,6,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(49,1,10,7,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(3,1,10,7,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(50,1,10,8,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(4,1,10,8,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(51,1,10,9,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(5,1,10,9,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(52,1,10,10,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(6,1,10,10,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(53,1,10,11,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(7,1,10,11,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(54,1,10,12,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(8,1,10,12,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(67,1,12,1,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(20,1,12,1,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(68,1,12,2,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(21,1,12,2,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(69,1,12,3,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(22,1,12,3,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(70,1,12,4,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(23,1,12,4,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(71,1,12,5,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(24,1,12,5,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(72,1,12,6,2022,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(2,1,12,6,2022,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(61,1,12,7,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(14,1,12,7,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(62,1,12,8,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(15,1,12,8,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(63,1,12,9,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(16,1,12,9,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(64,1,12,10,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(17,1,12,10,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(65,1,12,11,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(18,1,12,11,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(66,1,12,12,2021,0,0,'SPP SMA TA 2021 - 2022',100000.00,45,9,34,35,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(19,1,12,12,2021,0,1,'BanYas SMA TA 2021 - 2022',10000.00,45,9,34,34,0,0,0,1,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(43,2,2,1,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(44,2,2,2,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(45,2,2,3,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(46,2,2,4,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(47,2,2,5,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(48,2,2,6,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(37,2,2,7,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(38,2,2,8,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(39,2,2,9,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(40,2,2,10,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(41,2,2,11,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(42,2,2,12,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(31,2,11,1,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(32,2,11,2,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(33,2,11,3,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(34,2,11,4,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(35,2,11,5,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(36,2,11,6,2022,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(25,2,11,7,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(26,2,11,8,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(27,2,11,9,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(28,2,11,10,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(29,2,11,11,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(30,2,11,12,2021,0,0,'SPP SMP TA 2021 - 2022',80000.00,45,9,34,35,0,0,0,2,0,0,0,'2024-11-20 23:10:25','2024-11-20 23:10:25'),(3113,2,2258,1,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:12','2024-11-22 00:28:12'),(3114,2,2258,2,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:12','2024-11-22 00:28:12'),(3115,2,2258,3,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:12','2024-11-22 00:28:12'),(3116,2,2258,4,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:13','2024-11-22 00:28:13'),(3117,2,2258,5,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:13','2024-11-22 00:28:13'),(3105,2,2258,6,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,1,'2024-11-22 00:26:48','2024-11-22 00:28:13'),(3107,2,2258,7,2024,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,2,0,0,3,0,1,0,'2024-11-22 00:28:10','2024-11-22 00:28:10'),(3106,2,2258,7,2025,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:26:48','2024-11-22 00:26:48'),(3108,2,2258,8,2024,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:11','2024-11-22 00:28:11'),(3109,2,2258,9,2024,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:11','2024-11-22 00:28:11'),(3110,2,2258,10,2024,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:11','2024-11-22 00:28:11'),(3111,2,2258,11,2024,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:11','2024-11-22 00:28:11'),(3112,2,2258,12,2024,0,1,'Potongan Saudara PG TA 2024/2025',5000.00,62,7,8,126,0,0,0,3,0,1,0,'2024-11-22 00:28:12','2024-11-22 00:28:12'),(79,3,2250,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:45'),(80,3,2250,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:46'),(81,3,2250,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:46'),(82,3,2250,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:46'),(83,3,2250,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:46'),(84,3,2250,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:46'),(73,3,2250,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:44'),(74,3,2250,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:44'),(75,3,2250,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:44'),(76,3,2250,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:45'),(77,3,2250,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:45'),(78,3,2250,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:45'),(91,3,2251,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:49'),(92,3,2251,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:49'),(93,3,2251,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:49'),(94,3,2251,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:50'),(95,3,2251,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:50'),(96,3,2251,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:50'),(85,3,2251,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:47'),(86,3,2251,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:47'),(87,3,2251,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:47'),(88,3,2251,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:47'),(89,3,2251,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:48'),(90,3,2251,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:49'),(103,3,2252,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:52'),(104,3,2252,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:52'),(105,3,2252,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:52'),(106,3,2252,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:53'),(107,3,2252,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:53'),(108,3,2252,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:53'),(97,3,2252,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:50'),(98,3,2252,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:51'),(99,3,2252,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:51'),(100,3,2252,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:51'),(101,3,2252,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:51'),(102,3,2252,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:52'),(115,3,2253,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:55'),(116,3,2253,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:55'),(117,3,2253,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:55'),(118,3,2253,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:56'),(119,3,2253,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:56'),(120,3,2253,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:56'),(109,3,2253,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:53'),(110,3,2253,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:54'),(111,3,2253,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:54'),(112,3,2253,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:54'),(113,3,2253,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:54'),(114,3,2253,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:55'),(127,3,2254,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:58'),(128,3,2254,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:58'),(129,3,2254,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:58'),(130,3,2254,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:59'),(131,3,2254,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:59'),(132,3,2254,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:59'),(121,3,2254,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:56'),(122,3,2254,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:57'),(123,3,2254,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:57'),(124,3,2254,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:57'),(125,3,2254,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:57'),(126,3,2254,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:58'),(139,3,2255,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:01'),(140,3,2255,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:01'),(141,3,2255,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:02'),(142,3,2255,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:02'),(143,3,2255,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:02'),(144,3,2255,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:02'),(133,3,2255,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:41:59'),(134,3,2255,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:00'),(135,3,2255,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:00'),(136,3,2255,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:00'),(137,3,2255,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:01'),(138,3,2255,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:01'),(151,3,2256,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:04'),(152,3,2256,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:04'),(153,3,2256,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:05'),(154,3,2256,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:05'),(155,3,2256,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:05'),(156,3,2256,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:05'),(145,3,2256,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:03'),(146,3,2256,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:03'),(147,3,2256,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:03'),(148,3,2256,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:03'),(149,3,2256,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:04'),(150,3,2256,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:04'),(163,3,2257,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:00'),(164,3,2257,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:00'),(165,3,2257,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:00'),(166,3,2257,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:00'),(167,3,2257,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:01'),(168,3,2257,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:01'),(157,3,2257,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:58'),(158,3,2257,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:58'),(159,3,2257,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:59'),(160,3,2257,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:59'),(161,3,2257,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:59'),(162,3,2257,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:42:59'),(175,3,2258,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:08'),(176,3,2258,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:08'),(177,3,2258,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:09'),(178,3,2258,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:09'),(179,3,2258,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:09'),(180,3,2258,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:09'),(169,3,2258,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:06'),(316,3,2258,7,2024,1,0,'Spp PG TA 2024/2025',50000.00,62,7,8,126,2,0,169,3,1,1,0,'2024-11-21 14:08:54','2024-11-21 14:08:54'),(315,3,2258,7,2024,1,10,'Spp PG TA 2024/2025',-50000.00,62,7,8,126,2,0,169,3,1,1,0,'2024-11-21 14:08:54','2024-11-21 14:08:54'),(318,3,2258,7,2024,2,0,'Spp PG TA 2024/2025',30000.00,62,7,8,126,2,0,316,3,2,1,0,'2024-11-21 14:37:34','2024-11-21 14:37:34'),(317,3,2258,7,2024,2,10,'Spp PG TA 2024/2025',-30000.00,62,7,8,126,2,0,316,3,2,1,0,'2024-11-21 14:37:34','2024-11-21 14:37:34'),(320,3,2258,7,2024,3,0,'Spp PG TA 2024/2025',20000.00,62,7,8,126,2,0,318,3,3,1,0,'2024-11-21 15:06:15','2024-11-21 15:06:15'),(319,3,2258,7,2024,3,10,'Spp PG TA 2024/2025',-20000.00,62,7,8,126,2,0,318,3,3,1,0,'2024-11-21 15:06:15','2024-11-21 15:06:15'),(322,3,2258,7,2024,4,0,'Spp PG TA 2024/2025',10000.00,62,7,8,126,2,0,320,3,4,1,0,'2024-11-21 15:16:13','2024-11-21 15:16:13'),(321,3,2258,7,2024,4,10,'Spp PG TA 2024/2025',-10000.00,62,7,8,126,2,0,320,3,4,1,0,'2024-11-21 15:16:13','2024-11-21 15:16:13'),(324,3,2258,7,2024,5,0,'Spp PG TA 2024/2025',8000.00,62,7,8,126,2,0,322,3,5,1,0,'2024-11-21 15:25:46','2024-11-21 15:25:46'),(323,3,2258,7,2024,5,10,'Spp PG TA 2024/2025',-8000.00,62,7,8,126,2,0,322,3,5,1,0,'2024-11-21 15:25:45','2024-11-21 15:25:45'),(170,3,2258,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,-1,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-22 08:13:39'),(171,3,2258,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,-1,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-22 08:13:42'),(172,3,2258,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,-1,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-22 08:13:45'),(173,3,2258,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:07'),(174,3,2258,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:08'),(187,3,2259,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:11'),(188,3,2259,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:12'),(189,3,2259,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:12'),(190,3,2259,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:12'),(191,3,2259,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:12'),(192,3,2259,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:13'),(181,3,2259,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:10'),(182,3,2259,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:10'),(183,3,2259,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:10'),(184,3,2259,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:10'),(185,3,2259,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:11'),(186,3,2259,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:11'),(199,3,2260,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:15'),(200,3,2260,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:15'),(201,3,2260,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:15'),(202,3,2260,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:15'),(203,3,2260,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:15'),(204,3,2260,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:16'),(193,3,2260,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:13'),(194,3,2260,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:13'),(195,3,2260,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:14'),(196,3,2260,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:14'),(197,3,2260,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:14'),(198,3,2260,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:14'),(211,3,2261,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:17'),(212,3,2261,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:18'),(213,3,2261,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:18'),(214,3,2261,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:18'),(215,3,2261,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:18'),(216,3,2261,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:19'),(205,3,2261,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:16'),(206,3,2261,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:16'),(207,3,2261,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:16'),(208,3,2261,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:17'),(209,3,2261,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:17'),(210,3,2261,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:17'),(223,3,2262,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:21'),(224,3,2262,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:21'),(225,3,2262,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:21'),(226,3,2262,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:21'),(227,3,2262,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:22'),(228,3,2262,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:22'),(217,3,2262,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:19'),(218,3,2262,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:19'),(219,3,2262,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:20'),(220,3,2262,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:20'),(221,3,2262,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:20'),(222,3,2262,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:20'),(235,3,2263,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:23'),(236,3,2263,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:24'),(237,3,2263,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:24'),(238,3,2263,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:24'),(239,3,2263,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:24'),(240,3,2263,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:25'),(229,3,2263,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:22'),(230,3,2263,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:22'),(231,3,2263,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:23'),(232,3,2263,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:23'),(233,3,2263,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:23'),(234,3,2263,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:23'),(247,3,2264,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:26'),(248,3,2264,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:27'),(249,3,2264,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:27'),(250,3,2264,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:27'),(251,3,2264,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:27'),(252,3,2264,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:28'),(241,3,2264,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:25'),(242,3,2264,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:25'),(243,3,2264,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:25'),(244,3,2264,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:26'),(245,3,2264,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:26'),(246,3,2264,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:26'),(259,3,2265,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:29'),(260,3,2265,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:30'),(261,3,2265,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:30'),(262,3,2265,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:30'),(263,3,2265,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:30'),(264,3,2265,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:31'),(253,3,2265,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:28'),(254,3,2265,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:28'),(255,3,2265,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:28'),(256,3,2265,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:29'),(257,3,2265,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:29'),(258,3,2265,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:29'),(271,3,2266,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:32'),(272,3,2266,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:33'),(273,3,2266,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:33'),(274,3,2266,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:33'),(275,3,2266,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:33'),(276,3,2266,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:34'),(265,3,2266,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:31'),(266,3,2266,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:31'),(267,3,2266,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:31'),(268,3,2266,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:32'),(269,3,2266,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:32'),(270,3,2266,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:32'),(283,3,2267,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:35'),(284,3,2267,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:36'),(285,3,2267,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:36'),(286,3,2267,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:36'),(287,3,2267,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:36'),(288,3,2267,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:37'),(277,3,2267,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:34'),(278,3,2267,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:34'),(279,3,2267,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:34'),(280,3,2267,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:35'),(281,3,2267,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:35'),(282,3,2267,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:35'),(295,3,2268,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:38'),(296,3,2268,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:39'),(297,3,2268,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:39'),(298,3,2268,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:39'),(299,3,2268,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:39'),(300,3,2268,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:40'),(289,3,2268,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:37'),(290,3,2268,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:37'),(291,3,2268,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:37'),(292,3,2268,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:38'),(293,3,2268,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:38'),(294,3,2268,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:38'),(307,3,2269,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:41'),(308,3,2269,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:42'),(309,3,2269,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:42'),(310,3,2269,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:42'),(311,3,2269,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:42'),(312,3,2269,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:43'),(301,3,2269,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:40'),(302,3,2269,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:40'),(303,3,2269,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:40'),(304,3,2269,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:41'),(305,3,2269,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:41'),(306,3,2269,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,3,0,0,1,'2024-11-20 23:10:25','2024-11-21 23:43:41'),(571,4,2270,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:09','2024-11-21 23:43:45'),(572,4,2270,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:09','2024-11-21 23:43:45'),(573,4,2270,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:12','2024-11-21 23:43:46'),(574,4,2270,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:13','2024-11-21 23:43:46'),(575,4,2270,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:13','2024-11-21 23:43:46'),(576,4,2270,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:13','2024-11-21 23:43:46'),(565,4,2270,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:08','2024-11-21 23:43:43'),(566,4,2270,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:08','2024-11-21 23:43:44'),(567,4,2270,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:08','2024-11-21 23:43:44'),(568,4,2270,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:08','2024-11-21 23:43:44'),(569,4,2270,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:09','2024-11-21 23:43:45'),(570,4,2270,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:09','2024-11-21 23:43:45'),(583,4,2271,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:15','2024-11-21 23:43:48'),(584,4,2271,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:15','2024-11-21 23:43:48'),(585,4,2271,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:16','2024-11-21 23:43:49'),(586,4,2271,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:16','2024-11-21 23:43:49'),(587,4,2271,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:16','2024-11-21 23:43:49'),(588,4,2271,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:16','2024-11-21 23:43:49'),(577,4,2271,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:13','2024-11-21 23:43:47'),(578,4,2271,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:14','2024-11-21 23:43:47'),(579,4,2271,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:14','2024-11-21 23:43:47'),(580,4,2271,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:14','2024-11-21 23:43:47'),(581,4,2271,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:15','2024-11-21 23:43:48'),(582,4,2271,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:15','2024-11-21 23:43:48'),(1056,4,2272,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:10','2024-11-21 23:43:51'),(1057,4,2272,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:11','2024-11-21 23:43:51'),(1058,4,2272,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:11','2024-11-21 23:43:52'),(1059,4,2272,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:11','2024-11-21 23:43:52'),(1060,4,2272,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:11','2024-11-21 23:43:52'),(1061,4,2272,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:12','2024-11-21 23:43:52'),(589,4,2272,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:17','2024-11-21 23:43:50'),(590,4,2272,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:17','2024-11-21 23:43:50'),(591,4,2272,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:17','2024-11-21 23:43:50'),(592,4,2272,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:17','2024-11-21 23:43:50'),(593,4,2272,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:18','2024-11-21 23:43:51'),(594,4,2272,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:14:18','2024-11-21 23:43:51'),(1068,4,2273,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:13','2024-11-21 23:43:54'),(1069,4,2273,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:14','2024-11-21 23:43:54'),(1070,4,2273,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:14','2024-11-21 23:43:55'),(1071,4,2273,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:14','2024-11-21 23:43:55'),(1072,4,2273,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:14','2024-11-21 23:43:55'),(1073,4,2273,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:15','2024-11-21 23:43:55'),(1062,4,2273,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:12','2024-11-21 23:43:53'),(1063,4,2273,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:12','2024-11-21 23:43:53'),(1064,4,2273,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:12','2024-11-21 23:43:53'),(1065,4,2273,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:13','2024-11-21 23:43:53'),(1066,4,2273,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:13','2024-11-21 23:43:54'),(1067,4,2273,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:13','2024-11-21 23:43:54'),(1080,4,2274,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:17','2024-11-21 23:43:57'),(1081,4,2274,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:17','2024-11-21 23:43:57'),(1082,4,2274,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:17','2024-11-21 23:43:58'),(1083,4,2274,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:17','2024-11-21 23:43:58'),(1084,4,2274,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:18','2024-11-21 23:43:58'),(1085,4,2274,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:18','2024-11-21 23:43:58'),(1074,4,2274,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:15','2024-11-21 23:43:56'),(1075,4,2274,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:15','2024-11-21 23:43:56'),(1076,4,2274,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:16','2024-11-21 23:43:56'),(1077,4,2274,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:16','2024-11-21 23:43:56'),(1078,4,2274,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:16','2024-11-21 23:43:57'),(1079,4,2274,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:16','2024-11-21 23:43:57'),(1092,4,2275,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:20','2024-11-21 23:44:00'),(1093,4,2275,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:20','2024-11-21 23:44:00'),(1094,4,2275,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:20','2024-11-21 23:44:01'),(1095,4,2275,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:20','2024-11-21 23:44:01'),(1096,4,2275,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:21','2024-11-21 23:44:01'),(1097,4,2275,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:21','2024-11-21 23:44:01'),(1086,4,2275,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:18','2024-11-21 23:43:59'),(1087,4,2275,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:18','2024-11-21 23:43:59'),(1088,4,2275,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:19','2024-11-21 23:43:59'),(1089,4,2275,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:19','2024-11-21 23:43:59'),(1090,4,2275,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:19','2024-11-21 23:44:00'),(1091,4,2275,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:19','2024-11-21 23:44:00'),(1104,4,2276,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:22','2024-11-21 23:44:03'),(1105,4,2276,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:23','2024-11-21 23:44:03'),(1106,4,2276,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:23','2024-11-21 23:44:04'),(1107,4,2276,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:23','2024-11-21 23:44:04'),(1108,4,2276,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:24','2024-11-21 23:44:04'),(1109,4,2276,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:24','2024-11-21 23:44:04'),(1098,4,2276,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:21','2024-11-21 23:44:02'),(1099,4,2276,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:21','2024-11-21 23:44:02'),(1100,4,2276,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:21','2024-11-21 23:44:02'),(1101,4,2276,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:22','2024-11-21 23:44:02'),(1102,4,2276,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:22','2024-11-21 23:44:03'),(1103,4,2276,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:22','2024-11-21 23:44:03'),(1116,4,2277,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:25','2024-11-21 23:44:06'),(1117,4,2277,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:26','2024-11-21 23:44:06'),(1118,4,2277,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:26','2024-11-21 23:44:07'),(1119,4,2277,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:26','2024-11-21 23:44:07'),(1120,4,2277,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:26','2024-11-21 23:44:07'),(1121,4,2277,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:27','2024-11-21 23:44:07'),(1110,4,2277,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:24','2024-11-21 23:44:05'),(1111,4,2277,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:24','2024-11-21 23:44:05'),(1112,4,2277,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:24','2024-11-21 23:44:05'),(1113,4,2277,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:25','2024-11-21 23:44:05'),(1114,4,2277,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:25','2024-11-21 23:44:06'),(1115,4,2277,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:25','2024-11-21 23:44:06'),(1128,4,2278,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:28','2024-11-21 23:44:09'),(1129,4,2278,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:29','2024-11-21 23:44:11'),(1130,4,2278,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:29','2024-11-21 23:44:11'),(1131,4,2278,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:29','2024-11-21 23:44:11'),(1132,4,2278,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:29','2024-11-21 23:44:12'),(1133,4,2278,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:30','2024-11-21 23:44:12'),(1122,4,2278,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:27','2024-11-21 23:44:07'),(1123,4,2278,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:27','2024-11-21 23:44:08'),(1124,4,2278,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:27','2024-11-21 23:44:08'),(1125,4,2278,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:28','2024-11-21 23:44:08'),(1126,4,2278,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:28','2024-11-21 23:44:08'),(1127,4,2278,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:28','2024-11-21 23:44:09'),(1140,4,2279,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:31','2024-11-21 23:44:14'),(1141,4,2279,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:32','2024-11-21 23:44:14'),(1142,4,2279,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:32','2024-11-21 23:44:14'),(1143,4,2279,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:32','2024-11-21 23:44:14'),(1144,4,2279,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:32','2024-11-21 23:44:14'),(1145,4,2279,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:33','2024-11-21 23:44:15'),(1134,4,2279,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:30','2024-11-21 23:44:12'),(1135,4,2279,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:30','2024-11-21 23:44:12'),(1136,4,2279,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:30','2024-11-21 23:44:12'),(1137,4,2279,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:31','2024-11-21 23:44:13'),(1138,4,2279,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:31','2024-11-21 23:44:13'),(1139,4,2279,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:31','2024-11-21 23:44:13'),(1152,4,2280,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:34','2024-11-21 23:44:17'),(1153,4,2280,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:35','2024-11-21 23:44:17'),(1154,4,2280,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:35','2024-11-21 23:44:17'),(1155,4,2280,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:35','2024-11-21 23:44:17'),(1156,4,2280,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:36','2024-11-21 23:44:18'),(1157,4,2280,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:36','2024-11-21 23:44:18'),(1146,4,2280,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:33','2024-11-21 23:44:15'),(1147,4,2280,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:33','2024-11-21 23:44:15'),(1148,4,2280,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:33','2024-11-21 23:44:15'),(1149,4,2280,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:34','2024-11-21 23:44:16'),(1150,4,2280,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:34','2024-11-21 23:44:16'),(1151,4,2280,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:34','2024-11-21 23:44:16'),(1164,4,2281,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:38','2024-11-21 23:44:19'),(1165,4,2281,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:38','2024-11-21 23:44:20'),(1166,4,2281,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:38','2024-11-21 23:44:20'),(1167,4,2281,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:38','2024-11-21 23:44:20'),(1168,4,2281,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:39','2024-11-21 23:44:20'),(1169,4,2281,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:39','2024-11-21 23:44:21'),(1158,4,2281,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:36','2024-11-21 23:44:18'),(1159,4,2281,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:36','2024-11-21 23:44:18'),(1160,4,2281,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:36','2024-11-21 23:44:18'),(1161,4,2281,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:37','2024-11-21 23:44:19'),(1162,4,2281,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:37','2024-11-21 23:44:19'),(1163,4,2281,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:37','2024-11-21 23:44:19'),(1176,4,2282,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:41','2024-11-21 23:44:22'),(1177,4,2282,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:41','2024-11-21 23:44:23'),(1178,4,2282,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:41','2024-11-21 23:44:23'),(1179,4,2282,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:41','2024-11-21 23:44:23'),(1180,4,2282,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:42','2024-11-21 23:44:23'),(1181,4,2282,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:42','2024-11-21 23:44:24'),(1170,4,2282,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:39','2024-11-21 23:44:21'),(1171,4,2282,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:39','2024-11-21 23:44:21'),(1172,4,2282,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:40','2024-11-21 23:44:21'),(1173,4,2282,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:40','2024-11-21 23:44:22'),(1174,4,2282,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:40','2024-11-21 23:44:22'),(1175,4,2282,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:40','2024-11-21 23:44:22'),(1188,4,2283,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:44','2024-11-21 23:44:25'),(1189,4,2283,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:44','2024-11-21 23:44:26'),(1190,4,2283,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:44','2024-11-21 23:44:26'),(1191,4,2283,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:44','2024-11-21 23:44:26'),(1192,4,2283,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:45','2024-11-21 23:44:26'),(1193,4,2283,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:45','2024-11-21 23:44:27'),(1182,4,2283,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:42','2024-11-21 23:44:24'),(1183,4,2283,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:42','2024-11-21 23:44:24'),(1184,4,2283,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:43','2024-11-21 23:44:24'),(1185,4,2283,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:43','2024-11-21 23:44:25'),(1186,4,2283,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:43','2024-11-21 23:44:25'),(1187,4,2283,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:43','2024-11-21 23:44:25'),(1200,4,2284,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:47','2024-11-21 23:44:28'),(1201,4,2284,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:47','2024-11-21 23:44:28'),(1202,4,2284,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:47','2024-11-21 23:44:29'),(1203,4,2284,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:47','2024-11-21 23:44:29'),(1204,4,2284,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:47','2024-11-21 23:44:29'),(1205,4,2284,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:48','2024-11-21 23:44:29'),(1194,4,2284,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:45','2024-11-21 23:44:27'),(1195,4,2284,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:45','2024-11-21 23:44:27'),(1196,4,2284,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:46','2024-11-21 23:44:27'),(1197,4,2284,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:46','2024-11-21 23:44:27'),(1198,4,2284,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:46','2024-11-21 23:44:28'),(1199,4,2284,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:46','2024-11-21 23:44:28'),(1212,4,2285,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:49','2024-11-21 23:44:31'),(1213,4,2285,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:50','2024-11-21 23:44:32'),(1214,4,2285,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:50','2024-11-21 23:44:32'),(1215,4,2285,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:50','2024-11-21 23:44:32'),(1216,4,2285,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:50','2024-11-21 23:44:32'),(1217,4,2285,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:51','2024-11-21 23:44:33'),(1206,4,2285,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:48','2024-11-21 23:44:30'),(1207,4,2285,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:48','2024-11-21 23:44:30'),(1208,4,2285,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:48','2024-11-21 23:44:30'),(1209,4,2285,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:49','2024-11-21 23:44:31'),(1210,4,2285,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:49','2024-11-21 23:44:31'),(1211,4,2285,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:49','2024-11-21 23:44:31'),(1659,4,2286,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:03','2024-11-21 23:44:34'),(1660,4,2286,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:03','2024-11-21 23:44:35'),(1661,4,2286,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:04','2024-11-21 23:44:35'),(1662,4,2286,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:04','2024-11-21 23:44:35'),(1663,4,2286,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:04','2024-11-21 23:44:35'),(1664,4,2286,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:04','2024-11-21 23:44:36'),(1218,4,2286,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:51','2024-11-21 23:44:33'),(1219,4,2286,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:51','2024-11-21 23:44:33'),(1220,4,2286,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:38:51','2024-11-21 23:44:33'),(1656,4,2286,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:02','2024-11-21 23:44:34'),(1657,4,2286,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:03','2024-11-21 23:44:34'),(1658,4,2286,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:03','2024-11-21 23:44:34'),(1671,4,2287,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:06','2024-11-21 23:44:37'),(1672,4,2287,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:06','2024-11-21 23:44:37'),(1673,4,2287,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:07','2024-11-21 23:44:38'),(1674,4,2287,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:07','2024-11-21 23:44:38'),(1675,4,2287,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:07','2024-11-21 23:44:38'),(1676,4,2287,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:07','2024-11-21 23:44:38'),(1665,4,2287,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:05','2024-11-21 23:44:36'),(1666,4,2287,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:05','2024-11-21 23:44:36'),(1667,4,2287,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:05','2024-11-21 23:44:36'),(1668,4,2287,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:05','2024-11-21 23:44:36'),(1669,4,2287,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:06','2024-11-21 23:44:37'),(1670,4,2287,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:06','2024-11-21 23:44:37'),(1683,4,2288,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:09','2024-11-21 23:44:40'),(1684,4,2288,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:10','2024-11-21 23:44:40'),(1685,4,2288,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:10','2024-11-21 23:44:40'),(1686,4,2288,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:10','2024-11-21 23:44:41'),(1687,4,2288,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:10','2024-11-21 23:44:41'),(1688,4,2288,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:11','2024-11-21 23:44:41'),(1677,4,2288,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:08','2024-11-21 23:44:39'),(1678,4,2288,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:08','2024-11-21 23:44:39'),(1679,4,2288,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:08','2024-11-21 23:44:39'),(1680,4,2288,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:09','2024-11-21 23:44:39'),(1681,4,2288,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:09','2024-11-21 23:44:40'),(1682,4,2288,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,4,0,1,1,'2024-11-21 16:49:09','2024-11-21 23:44:40'),(3125,5,2250,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:49','2024-11-22 03:44:43'),(3126,5,2250,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:50','2024-11-22 03:44:43'),(3127,5,2250,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:50','2024-11-22 03:44:43'),(3128,5,2250,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:50','2024-11-22 03:44:43'),(3129,5,2250,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:51','2024-11-22 03:44:44'),(3130,5,2250,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:51','2024-11-22 03:44:44'),(3119,5,2250,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,5,0,1,1,'2024-11-22 03:23:48','2024-11-22 03:44:41'),(3120,5,2250,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,5,0,1,1,'2024-11-22 03:23:48','2024-11-22 03:44:41'),(3121,5,2250,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,5,0,1,1,'2024-11-22 03:23:48','2024-11-22 03:44:41'),(3122,5,2250,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,5,0,1,1,'2024-11-22 03:23:49','2024-11-22 03:44:42'),(3123,5,2250,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:49','2024-11-22 03:44:42'),(3124,5,2250,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:49','2024-11-22 03:44:42'),(3137,5,2251,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:53','2024-11-22 03:44:46'),(3138,5,2251,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:53','2024-11-22 03:44:47'),(3139,5,2251,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:54','2024-11-22 03:44:47'),(3140,5,2251,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:54','2024-11-22 03:44:47'),(3141,5,2251,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:54','2024-11-22 03:44:48'),(3142,5,2251,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:55','2024-11-22 03:44:48'),(3131,5,2251,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:51','2024-11-22 03:44:44'),(3132,5,2251,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:51','2024-11-22 03:44:45'),(3133,5,2251,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:52','2024-11-22 03:44:45'),(3134,5,2251,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:52','2024-11-22 03:44:46'),(3135,5,2251,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:52','2024-11-22 03:44:46'),(3136,5,2251,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:53','2024-11-22 03:44:46'),(3149,5,2252,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:57','2024-11-22 03:44:50'),(3150,5,2252,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:58','2024-11-22 03:44:51'),(3151,5,2252,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:58','2024-11-22 03:44:51'),(3152,5,2252,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:58','2024-11-22 03:44:51'),(3153,5,2252,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:59','2024-11-22 03:44:51'),(3154,5,2252,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:00','2024-11-22 03:44:52'),(3143,5,2252,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:55','2024-11-22 03:44:48'),(3144,5,2252,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:55','2024-11-22 03:44:49'),(3145,5,2252,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:56','2024-11-22 03:44:49'),(3146,5,2252,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:56','2024-11-22 03:44:49'),(3147,5,2252,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:57','2024-11-22 03:44:50'),(3148,5,2252,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:23:57','2024-11-22 03:44:50'),(3161,5,2253,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:02','2024-11-22 03:44:54'),(3162,5,2253,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:02','2024-11-22 03:44:55'),(3163,5,2253,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:02','2024-11-22 03:44:55'),(3164,5,2253,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:02','2024-11-22 03:44:56'),(3165,5,2253,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:03','2024-11-22 03:44:56'),(3166,5,2253,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:03','2024-11-22 03:44:56'),(3155,5,2253,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:00','2024-11-22 03:44:52'),(3156,5,2253,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:00','2024-11-22 03:44:52'),(3157,5,2253,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:00','2024-11-22 03:44:53'),(3158,5,2253,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:01','2024-11-22 03:44:53'),(3159,5,2253,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:01','2024-11-22 03:44:54'),(3160,5,2253,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:01','2024-11-22 03:44:54'),(3173,5,2254,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:05','2024-11-22 03:44:58'),(3174,5,2254,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:05','2024-11-22 03:44:59'),(3175,5,2254,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:06','2024-11-22 03:44:59'),(3176,5,2254,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:06','2024-11-22 03:44:59'),(3177,5,2254,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:07','2024-11-22 03:45:00'),(3178,5,2254,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:07','2024-11-22 03:45:00'),(3167,5,2254,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:03','2024-11-22 03:44:56'),(3168,5,2254,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:03','2024-11-22 03:44:57'),(3169,5,2254,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:04','2024-11-22 03:44:57'),(3170,5,2254,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:04','2024-11-22 03:44:58'),(3171,5,2254,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:04','2024-11-22 03:44:58'),(3172,5,2254,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:05','2024-11-22 03:44:58'),(3185,5,2255,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:10','2024-11-22 03:45:02'),(3186,5,2255,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:11','2024-11-22 03:45:02'),(3187,5,2255,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:11','2024-11-22 03:45:03'),(3188,5,2255,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:11','2024-11-22 03:45:03'),(3189,5,2255,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:12','2024-11-22 03:45:03'),(3190,5,2255,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:12','2024-11-22 03:45:04'),(3179,5,2255,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:08','2024-11-22 03:45:00'),(3180,5,2255,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:08','2024-11-22 03:45:01'),(3181,5,2255,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:08','2024-11-22 03:45:01'),(3182,5,2255,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:10','2024-11-22 03:45:01'),(3183,5,2255,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:10','2024-11-22 03:45:01'),(3184,5,2255,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:10','2024-11-22 03:45:02'),(3197,5,2256,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:15','2024-11-22 03:45:06'),(3198,5,2256,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:16','2024-11-22 03:45:07'),(3199,5,2256,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:16','2024-11-22 03:45:07'),(3200,5,2256,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:16','2024-11-22 03:45:07'),(3201,5,2256,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:17','2024-11-22 03:45:08'),(3202,5,2256,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:17','2024-11-22 03:45:08'),(3191,5,2256,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:12','2024-11-22 03:45:04'),(3192,5,2256,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:13','2024-11-22 03:45:04'),(3193,5,2256,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:13','2024-11-22 03:45:05'),(3194,5,2256,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:15','2024-11-22 03:45:05'),(3195,5,2256,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:15','2024-11-22 03:45:05'),(3196,5,2256,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:15','2024-11-22 03:45:06'),(3209,5,2257,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:19','2024-11-22 03:45:10'),(3210,5,2257,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:20','2024-11-22 03:45:10'),(3211,5,2257,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:20','2024-11-22 03:45:11'),(3212,5,2257,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:20','2024-11-22 03:45:11'),(3213,5,2257,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:20','2024-11-22 03:45:11'),(3214,5,2257,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:21','2024-11-22 03:45:11'),(3203,5,2257,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:17','2024-11-22 03:45:08'),(3204,5,2257,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:18','2024-11-22 03:45:08'),(3205,5,2257,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:18','2024-11-22 03:45:09'),(3206,5,2257,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:18','2024-11-22 03:45:09'),(3207,5,2257,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:18','2024-11-22 03:45:09'),(3208,5,2257,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:19','2024-11-22 03:45:10'),(3221,5,2258,1,2025,0,0,'Spp PG TA 2024/2025',105000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:23','2024-11-22 03:45:14'),(3222,5,2258,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:23','2024-11-22 03:45:14'),(3223,5,2258,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:23','2024-11-22 03:45:14'),(3224,5,2258,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:24','2024-11-22 03:45:14'),(3225,5,2258,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:24','2024-11-22 03:45:15'),(3226,5,2258,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:24','2024-11-22 03:45:15'),(3215,5,2258,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,2,0,0,5,0,1,1,'2024-11-22 03:24:21','2024-11-22 03:45:12'),(3216,5,2258,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:21','2024-11-22 03:45:12'),(3217,5,2258,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:22','2024-11-22 03:45:12'),(3218,5,2258,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:22','2024-11-22 03:45:13'),(3219,5,2258,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:22','2024-11-22 03:45:13'),(3220,5,2258,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:22','2024-11-22 03:45:13'),(3233,5,2259,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:27','2024-11-22 03:45:18'),(3234,5,2259,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:27','2024-11-22 03:45:18'),(3235,5,2259,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:27','2024-11-22 03:45:18'),(3236,5,2259,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:28','2024-11-22 03:45:19'),(3237,5,2259,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:28','2024-11-22 03:45:19'),(3238,5,2259,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:28','2024-11-22 03:45:19'),(3227,5,2259,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:25','2024-11-22 03:45:15'),(3228,5,2259,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:25','2024-11-22 03:45:16'),(3229,5,2259,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:25','2024-11-22 03:45:16'),(3230,5,2259,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:26','2024-11-22 03:45:16'),(3231,5,2259,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:26','2024-11-22 03:45:17'),(3232,5,2259,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:27','2024-11-22 03:45:17'),(3245,5,2260,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:31','2024-11-22 03:45:21'),(3246,5,2260,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:32','2024-11-22 03:45:21'),(3247,5,2260,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:33','2024-11-22 03:45:22'),(3248,5,2260,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:33','2024-11-22 03:45:22'),(3249,5,2260,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:33','2024-11-22 03:45:22'),(3250,5,2260,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:33','2024-11-22 03:45:23'),(3239,5,2260,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:29','2024-11-22 03:45:19'),(3240,5,2260,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:29','2024-11-22 03:45:20'),(3241,5,2260,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:29','2024-11-22 03:45:20'),(3242,5,2260,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:30','2024-11-22 03:45:20'),(3243,5,2260,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:30','2024-11-22 03:45:21'),(3244,5,2260,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:30','2024-11-22 03:45:21'),(3257,5,2261,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:36','2024-11-22 03:45:25'),(3258,5,2261,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:37','2024-11-22 03:45:25'),(3259,5,2261,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:37','2024-11-22 03:45:26'),(3260,5,2261,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:37','2024-11-22 03:45:26'),(3261,5,2261,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:38','2024-11-22 03:45:26'),(3262,5,2261,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:38','2024-11-22 03:45:26'),(3251,5,2261,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:34','2024-11-22 03:45:23'),(3252,5,2261,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:34','2024-11-22 03:45:23'),(3253,5,2261,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:34','2024-11-22 03:45:24'),(3254,5,2261,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:35','2024-11-22 03:45:24'),(3255,5,2261,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:35','2024-11-22 03:45:24'),(3256,5,2261,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:36','2024-11-22 03:45:24'),(3269,5,2262,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:42','2024-11-22 03:45:29'),(3270,5,2262,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:42','2024-11-22 03:45:29'),(3271,5,2262,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:45','2024-11-22 03:45:29'),(3272,5,2262,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:46','2024-11-22 03:45:30'),(3273,5,2262,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:46','2024-11-22 03:45:30'),(3274,5,2262,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:46','2024-11-22 03:45:30'),(3263,5,2262,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:39','2024-11-22 03:45:27'),(3264,5,2262,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:39','2024-11-22 03:45:27'),(3265,5,2262,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:40','2024-11-22 03:45:27'),(3266,5,2262,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:41','2024-11-22 03:45:28'),(3267,5,2262,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:41','2024-11-22 03:45:28'),(3268,5,2262,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:41','2024-11-22 03:45:28'),(3281,5,2263,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:49','2024-11-22 03:45:32'),(3282,5,2263,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:49','2024-11-22 03:45:33'),(3283,5,2263,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:49','2024-11-22 03:45:33'),(3284,5,2263,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:50','2024-11-22 03:45:33'),(3285,5,2263,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:50','2024-11-22 03:45:33'),(3286,5,2263,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:50','2024-11-22 03:45:34'),(3275,5,2263,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:47','2024-11-22 03:45:31'),(3276,5,2263,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:47','2024-11-22 03:45:31'),(3277,5,2263,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:47','2024-11-22 03:45:31'),(3278,5,2263,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:48','2024-11-22 03:45:31'),(3279,5,2263,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:48','2024-11-22 03:45:32'),(3280,5,2263,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:48','2024-11-22 03:45:32'),(3293,5,2264,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:53','2024-11-22 03:45:36'),(3294,5,2264,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:53','2024-11-22 03:45:36'),(3295,5,2264,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:53','2024-11-22 03:45:36'),(3296,5,2264,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:54','2024-11-22 03:45:37'),(3297,5,2264,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:54','2024-11-22 03:45:37'),(3298,5,2264,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:55','2024-11-22 03:45:37'),(3287,5,2264,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:51','2024-11-22 03:45:34'),(3288,5,2264,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:51','2024-11-22 03:45:34'),(3289,5,2264,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:51','2024-11-22 03:45:35'),(3290,5,2264,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:52','2024-11-22 03:45:35'),(3291,5,2264,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:52','2024-11-22 03:45:35'),(3292,5,2264,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:52','2024-11-22 03:45:35'),(3305,5,2265,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:57','2024-11-22 03:45:39'),(3306,5,2265,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:57','2024-11-22 03:45:39'),(3307,5,2265,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:58','2024-11-22 03:45:40'),(3308,5,2265,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:59','2024-11-22 03:45:40'),(3309,5,2265,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:59','2024-11-22 03:45:40'),(3310,5,2265,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:01','2024-11-22 03:45:40'),(3299,5,2265,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:55','2024-11-22 03:45:37'),(3300,5,2265,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:56','2024-11-22 03:45:38'),(3301,5,2265,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:56','2024-11-22 03:45:38'),(3302,5,2265,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:56','2024-11-22 03:45:38'),(3303,5,2265,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:57','2024-11-22 03:45:39'),(3304,5,2265,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:24:57','2024-11-22 03:45:39'),(3317,5,2266,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:02','2024-11-22 03:45:43'),(3318,5,2266,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:03','2024-11-22 03:45:43'),(3319,5,2266,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:03','2024-11-22 03:45:43'),(3320,5,2266,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:03','2024-11-22 03:45:44'),(3321,5,2266,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:04','2024-11-22 03:45:44'),(3322,5,2266,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:04','2024-11-22 03:45:44'),(3311,5,2266,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:01','2024-11-22 03:45:41'),(3312,5,2266,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:01','2024-11-22 03:45:41'),(3313,5,2266,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:01','2024-11-22 03:45:42'),(3314,5,2266,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:02','2024-11-22 03:45:42'),(3315,5,2266,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:02','2024-11-22 03:45:42'),(3316,5,2266,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:02','2024-11-22 03:45:43'),(3329,5,2267,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:06','2024-11-22 03:45:46'),(3330,5,2267,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:07','2024-11-22 03:45:47'),(3331,5,2267,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:07','2024-11-22 03:45:47'),(3332,5,2267,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:07','2024-11-22 03:45:47'),(3333,5,2267,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:08','2024-11-22 03:45:48'),(3334,5,2267,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:08','2024-11-22 03:45:48'),(3323,5,2267,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:04','2024-11-22 03:45:45'),(3324,5,2267,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:04','2024-11-22 03:45:45'),(3325,5,2267,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:05','2024-11-22 03:45:45'),(3326,5,2267,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:05','2024-11-22 03:45:46'),(3327,5,2267,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:05','2024-11-22 03:45:46'),(3328,5,2267,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:06','2024-11-22 03:45:46'),(3341,5,2268,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:10','2024-11-22 03:45:50'),(3342,5,2268,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:11','2024-11-22 03:45:50'),(3343,5,2268,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:11','2024-11-22 03:45:51'),(3344,5,2268,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:11','2024-11-22 03:45:51'),(3345,5,2268,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:11','2024-11-22 03:45:51'),(3346,5,2268,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:12','2024-11-22 03:45:52'),(3335,5,2268,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:08','2024-11-22 03:45:48'),(3336,5,2268,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:09','2024-11-22 03:45:49'),(3337,5,2268,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:09','2024-11-22 03:45:49'),(3338,5,2268,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:09','2024-11-22 03:45:49'),(3339,5,2268,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:10','2024-11-22 03:45:49'),(3340,5,2268,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:10','2024-11-22 03:45:50'),(3353,5,2269,1,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:14','2024-11-22 03:45:54'),(3354,5,2269,2,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:14','2024-11-22 03:45:54'),(3355,5,2269,3,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:14','2024-11-22 03:45:54'),(3356,5,2269,4,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:15','2024-11-22 03:45:55'),(3357,5,2269,5,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:15','2024-11-22 03:45:55'),(3358,5,2269,6,2025,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:15','2024-11-22 03:45:55'),(3347,5,2269,7,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:12','2024-11-22 03:45:52'),(3348,5,2269,8,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:12','2024-11-22 03:45:52'),(3349,5,2269,9,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:13','2024-11-22 03:45:53'),(3350,5,2269,10,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:13','2024-11-22 03:45:53'),(3351,5,2269,11,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:13','2024-11-22 03:45:53'),(3352,5,2269,12,2024,0,0,'Spp PG TA 2024/2025',100000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:13','2024-11-22 03:45:53'),(3365,5,2270,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:20','2024-11-22 03:47:13'),(3366,5,2270,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:20','2024-11-22 03:47:13'),(3367,5,2270,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:21','2024-11-22 03:47:13'),(3368,5,2270,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:21','2024-11-22 03:47:14'),(3369,5,2270,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:21','2024-11-22 03:47:14'),(3370,5,2270,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:21','2024-11-22 03:47:15'),(3359,5,2270,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:16','2024-11-22 03:47:11'),(3360,5,2270,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:16','2024-11-22 03:47:11'),(3361,5,2270,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:16','2024-11-22 03:47:11'),(3362,5,2270,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:17','2024-11-22 03:47:12'),(3363,5,2270,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:18','2024-11-22 03:47:12'),(3364,5,2270,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:20','2024-11-22 03:47:12'),(3377,5,2271,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:24','2024-11-22 03:47:18'),(3378,5,2271,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:24','2024-11-22 03:47:18'),(3379,5,2271,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:24','2024-11-22 03:47:18'),(3380,5,2271,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:25','2024-11-22 03:47:18'),(3381,5,2271,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:25','2024-11-22 03:47:19'),(3382,5,2271,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:25','2024-11-22 03:47:19'),(3371,5,2271,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:22','2024-11-22 03:47:15'),(3372,5,2271,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:22','2024-11-22 03:47:15'),(3373,5,2271,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:22','2024-11-22 03:47:16'),(3374,5,2271,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:23','2024-11-22 03:47:17'),(3375,5,2271,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:23','2024-11-22 03:47:17'),(3376,5,2271,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:23','2024-11-22 03:47:17'),(3389,5,2272,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:28','2024-11-22 03:47:21'),(3390,5,2272,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:28','2024-11-22 03:47:22'),(3391,5,2272,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:28','2024-11-22 03:47:22'),(3392,5,2272,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:29','2024-11-22 03:47:22'),(3393,5,2272,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:29','2024-11-22 03:47:23'),(3394,5,2272,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:29','2024-11-22 03:47:23'),(3383,5,2272,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:25','2024-11-22 03:47:19'),(3384,5,2272,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:26','2024-11-22 03:47:20'),(3385,5,2272,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:26','2024-11-22 03:47:20'),(3386,5,2272,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:27','2024-11-22 03:47:20'),(3387,5,2272,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:27','2024-11-22 03:47:21'),(3388,5,2272,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:27','2024-11-22 03:47:21'),(3401,5,2273,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:32','2024-11-22 03:47:25'),(3402,5,2273,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:32','2024-11-22 03:47:26'),(3403,5,2273,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:33','2024-11-22 03:47:26'),(3404,5,2273,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:33','2024-11-22 03:47:26'),(3405,5,2273,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:33','2024-11-22 03:47:27'),(3406,5,2273,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:34','2024-11-22 03:47:27'),(3395,5,2273,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:30','2024-11-22 03:47:23'),(3396,5,2273,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:30','2024-11-22 03:47:24'),(3397,5,2273,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:30','2024-11-22 03:47:24'),(3398,5,2273,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:31','2024-11-22 03:47:24'),(3399,5,2273,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:31','2024-11-22 03:47:25'),(3400,5,2273,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:32','2024-11-22 03:47:25'),(3413,5,2274,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:36','2024-11-22 03:47:29'),(3414,5,2274,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:36','2024-11-22 03:47:29'),(3415,5,2274,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:36','2024-11-22 03:47:29'),(3416,5,2274,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:37','2024-11-22 03:47:30'),(3417,5,2274,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:37','2024-11-22 03:47:30'),(3418,5,2274,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:37','2024-11-22 03:47:30'),(3407,5,2274,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:34','2024-11-22 03:47:27'),(3408,5,2274,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:34','2024-11-22 03:47:27'),(3409,5,2274,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:35','2024-11-22 03:47:28'),(3410,5,2274,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:35','2024-11-22 03:47:28'),(3411,5,2274,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:35','2024-11-22 03:47:28'),(3412,5,2274,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:35','2024-11-22 03:47:29'),(3425,5,2275,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:39','2024-11-22 03:47:32'),(3426,5,2275,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:40','2024-11-22 03:47:33'),(3427,5,2275,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:40','2024-11-22 03:47:33'),(3428,5,2275,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:40','2024-11-22 03:47:33'),(3429,5,2275,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:41','2024-11-22 03:47:34'),(3430,5,2275,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:41','2024-11-22 03:47:34'),(3419,5,2275,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:38','2024-11-22 03:47:31'),(3420,5,2275,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:38','2024-11-22 03:47:31'),(3421,5,2275,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:38','2024-11-22 03:47:31'),(3422,5,2275,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:39','2024-11-22 03:47:31'),(3423,5,2275,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:39','2024-11-22 03:47:32'),(3424,5,2275,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:39','2024-11-22 03:47:32'),(3437,5,2276,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:43','2024-11-22 03:47:38'),(3438,5,2276,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:43','2024-11-22 03:47:38'),(3439,5,2276,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:43','2024-11-22 03:47:39'),(3440,5,2276,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:44','2024-11-22 03:47:39'),(3441,5,2276,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:45','2024-11-22 03:47:39'),(3442,5,2276,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:45','2024-11-22 03:47:40'),(3431,5,2276,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:41','2024-11-22 03:47:34'),(3432,5,2276,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:41','2024-11-22 03:47:35'),(3433,5,2276,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:41','2024-11-22 03:47:35'),(3434,5,2276,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:42','2024-11-22 03:47:35'),(3435,5,2276,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:42','2024-11-22 03:47:37'),(3436,5,2276,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:42','2024-11-22 03:47:37'),(3449,5,2277,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:47','2024-11-22 03:47:42'),(3450,5,2277,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:47','2024-11-22 03:47:42'),(3451,5,2277,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:48','2024-11-22 03:47:42'),(3452,5,2277,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:48','2024-11-22 03:47:43'),(3453,5,2277,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:48','2024-11-22 03:47:43'),(3454,5,2277,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:49','2024-11-22 03:47:43'),(3443,5,2277,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:45','2024-11-22 03:47:40'),(3444,5,2277,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:46','2024-11-22 03:47:40'),(3445,5,2277,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:46','2024-11-22 03:47:41'),(3446,5,2277,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:46','2024-11-22 03:47:41'),(3447,5,2277,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:47','2024-11-22 03:47:41'),(3448,5,2277,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:47','2024-11-22 03:47:41'),(3461,5,2278,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:50','2024-11-22 03:47:45'),(3462,5,2278,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:51','2024-11-22 03:47:46'),(3463,5,2278,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:51','2024-11-22 03:47:46'),(3464,5,2278,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:51','2024-11-22 03:47:46'),(3465,5,2278,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:52','2024-11-22 03:47:47'),(3466,5,2278,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:52','2024-11-22 03:47:47'),(3455,5,2278,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:49','2024-11-22 03:47:43'),(3456,5,2278,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:49','2024-11-22 03:47:44'),(3457,5,2278,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:49','2024-11-22 03:47:44'),(3458,5,2278,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:50','2024-11-22 03:47:44'),(3459,5,2278,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:50','2024-11-22 03:47:45'),(3460,5,2278,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:50','2024-11-22 03:47:45'),(3473,5,2279,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:54','2024-11-22 03:47:49'),(3474,5,2279,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:54','2024-11-22 03:47:50'),(3475,5,2279,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:55','2024-11-22 03:47:50'),(3476,5,2279,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:55','2024-11-22 03:47:50'),(3477,5,2279,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:55','2024-11-22 03:47:51'),(3478,5,2279,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:55','2024-11-22 03:47:51'),(3467,5,2279,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:52','2024-11-22 03:47:47'),(3468,5,2279,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:52','2024-11-22 03:47:48'),(3469,5,2279,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:53','2024-11-22 03:47:48'),(3470,5,2279,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:53','2024-11-22 03:47:48'),(3471,5,2279,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:53','2024-11-22 03:47:49'),(3472,5,2279,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:54','2024-11-22 03:47:49'),(3485,5,2280,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:58','2024-11-22 03:47:53'),(3486,5,2280,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:58','2024-11-22 03:47:53'),(3487,5,2280,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:58','2024-11-22 03:47:54'),(3488,5,2280,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:59','2024-11-22 03:47:54'),(3489,5,2280,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:59','2024-11-22 03:47:54'),(3490,5,2280,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:59','2024-11-22 03:47:55'),(3479,5,2280,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:56','2024-11-22 03:47:51'),(3480,5,2280,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:56','2024-11-22 03:47:52'),(3481,5,2280,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:56','2024-11-22 03:47:52'),(3482,5,2280,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:57','2024-11-22 03:47:52'),(3483,5,2280,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:57','2024-11-22 03:47:53'),(3484,5,2280,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:57','2024-11-22 03:47:53'),(3497,5,2281,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:01','2024-11-22 03:47:57'),(3498,5,2281,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:02','2024-11-22 03:47:57'),(3499,5,2281,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:02','2024-11-22 03:47:57'),(3500,5,2281,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:02','2024-11-22 03:47:57'),(3501,5,2281,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:02','2024-11-22 03:47:58'),(3502,5,2281,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:03','2024-11-22 03:47:58'),(3491,5,2281,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:25:59','2024-11-22 03:47:55'),(3492,5,2281,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:00','2024-11-22 03:47:55'),(3493,5,2281,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:00','2024-11-22 03:47:55'),(3494,5,2281,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:00','2024-11-22 03:47:56'),(3495,5,2281,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:01','2024-11-22 03:47:56'),(3496,5,2281,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:01','2024-11-22 03:47:56'),(3509,5,2282,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:05','2024-11-22 03:48:00'),(3510,5,2282,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:05','2024-11-22 03:48:01'),(3511,5,2282,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:06','2024-11-22 03:48:01'),(3512,5,2282,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:06','2024-11-22 03:48:01'),(3513,5,2282,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:06','2024-11-22 03:48:02'),(3514,5,2282,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:07','2024-11-22 03:48:02'),(3503,5,2282,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:03','2024-11-22 03:47:58'),(3504,5,2282,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:03','2024-11-22 03:47:59'),(3505,5,2282,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:04','2024-11-22 03:47:59'),(3506,5,2282,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:04','2024-11-22 03:47:59'),(3507,5,2282,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:04','2024-11-22 03:48:00'),(3508,5,2282,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:05','2024-11-22 03:48:00'),(3521,5,2283,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:09','2024-11-22 03:48:04'),(3522,5,2283,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:09','2024-11-22 03:48:05'),(3523,5,2283,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:10','2024-11-22 03:48:05'),(3524,5,2283,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:10','2024-11-22 03:48:05'),(3525,5,2283,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:10','2024-11-22 03:48:06'),(3526,5,2283,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:11','2024-11-22 03:48:06'),(3515,5,2283,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:07','2024-11-22 03:48:03'),(3516,5,2283,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:08','2024-11-22 03:48:03'),(3517,5,2283,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:08','2024-11-22 03:48:03'),(3518,5,2283,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:08','2024-11-22 03:48:04'),(3519,5,2283,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:09','2024-11-22 03:48:04'),(3520,5,2283,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:09','2024-11-22 03:48:04'),(3533,5,2284,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:13','2024-11-22 03:48:08'),(3534,5,2284,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:13','2024-11-22 03:48:08'),(3535,5,2284,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:15','2024-11-22 03:48:09'),(3536,5,2284,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:16','2024-11-22 03:48:09'),(3537,5,2284,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:16','2024-11-22 03:48:09'),(3538,5,2284,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:17','2024-11-22 03:48:10'),(3527,5,2284,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:11','2024-11-22 03:48:06'),(3528,5,2284,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:11','2024-11-22 03:48:07'),(3529,5,2284,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:11','2024-11-22 03:48:07'),(3530,5,2284,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:12','2024-11-22 03:48:07'),(3531,5,2284,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:12','2024-11-22 03:48:07'),(3532,5,2284,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:13','2024-11-22 03:48:08'),(3545,5,2285,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:19','2024-11-22 03:48:12'),(3546,5,2285,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:19','2024-11-22 03:48:12'),(3547,5,2285,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:20','2024-11-22 03:48:12'),(3548,5,2285,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:21','2024-11-22 03:48:13'),(3549,5,2285,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:21','2024-11-22 03:48:13'),(3550,5,2285,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:21','2024-11-22 03:48:13'),(3539,5,2285,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:17','2024-11-22 03:48:10'),(3540,5,2285,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:17','2024-11-22 03:48:10'),(3541,5,2285,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:18','2024-11-22 03:48:10'),(3542,5,2285,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:18','2024-11-22 03:48:11'),(3543,5,2285,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:18','2024-11-22 03:48:11'),(3544,5,2285,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:18','2024-11-22 03:48:11'),(3557,5,2286,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:23','2024-11-22 03:48:16'),(3558,5,2286,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:24','2024-11-22 03:48:16'),(3559,5,2286,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:24','2024-11-22 03:48:16'),(3560,5,2286,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:24','2024-11-22 03:48:17'),(3561,5,2286,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:24','2024-11-22 03:48:17'),(3562,5,2286,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:25','2024-11-22 03:48:17'),(3551,5,2286,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:22','2024-11-22 03:48:14'),(3552,5,2286,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:22','2024-11-22 03:48:14'),(3553,5,2286,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:22','2024-11-22 03:48:14'),(3554,5,2286,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:22','2024-11-22 03:48:15'),(3555,5,2286,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:23','2024-11-22 03:48:15'),(3556,5,2286,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:23','2024-11-22 03:48:15'),(3569,5,2287,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:27','2024-11-22 03:48:19'),(3570,5,2287,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:27','2024-11-22 03:48:20'),(3571,5,2287,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:27','2024-11-22 03:48:20'),(3572,5,2287,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:28','2024-11-22 03:48:20'),(3573,5,2287,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:29','2024-11-22 03:48:21'),(3574,5,2287,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:29','2024-11-22 03:48:21'),(3563,5,2287,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:25','2024-11-22 03:48:18'),(3564,5,2287,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:25','2024-11-22 03:48:18'),(3565,5,2287,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:26','2024-11-22 03:48:18'),(3566,5,2287,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:26','2024-11-22 03:48:19'),(3567,5,2287,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:26','2024-11-22 03:48:19'),(3568,5,2287,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:27','2024-11-22 03:48:19'),(3581,5,2288,1,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:33','2024-11-22 03:48:23'),(3582,5,2288,2,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:34','2024-11-22 03:48:23'),(3583,5,2288,3,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:34','2024-11-22 03:48:24'),(3584,5,2288,4,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:34','2024-11-22 03:48:24'),(3585,5,2288,5,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:35','2024-11-22 03:48:25'),(3586,5,2288,6,2025,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:35','2024-11-22 03:48:25'),(3575,5,2288,7,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:30','2024-11-22 03:48:21'),(3576,5,2288,8,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:30','2024-11-22 03:48:22'),(3577,5,2288,9,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:30','2024-11-22 03:48:22'),(3578,5,2288,10,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:31','2024-11-22 03:48:22'),(3579,5,2288,11,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:31','2024-11-22 03:48:23'),(3580,5,2288,12,2024,0,0,'Spp PG TA 2024/2025',120000.00,62,7,8,126,0,0,0,5,0,1,1,'2024-11-22 03:26:32','2024-11-22 03:48:23');
/*!40000 ALTER TABLE `tsalpenrut` ENABLE KEYS */;

--
-- Table structure for table `tsalppdb`
--

DROP TABLE IF EXISTS `tsalppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsalppdb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpsb` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `idfor` int(11) NOT NULL,
  `tip` int(11) NOT NULL,
  `jen` int(11) NOT NULL,
  `idcoa` int(11) NOT NULL,
  `bul` int(11) NOT NULL,
  `ket` varchar(50) DEFAULT NULL,
  `jum` double NOT NULL DEFAULT 0,
  `bay` double NOT NULL DEFAULT 0,
  `idspr` int(11) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `islock` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idpsb`,`nmr`,`idfor`,`tip`) USING BTREE,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsalppdb`
--

/*!40000 ALTER TABLE `tsalppdb` DISABLE KEYS */;
INSERT INTO `tsalppdb` VALUES (1,3,1,1,0,1,62,0,'Formulir SD TA 2024/2025',100000,100000,0,0,0,1,1,'2024-12-03 00:12:49','2025-04-04 03:06:06'),(2,3,2,1,0,3,62,0,'Pangkal SD TA 2024/2025',2000000,0,0,0,0,1,1,'2024-12-03 00:12:49','2025-04-04 03:06:06'),(22,3,2,1,1,3,62,0,'test1',-200000,0,0,0,0,1,0,'2025-04-04 03:06:06','2025-04-04 03:06:06'),(24,3,2,1,2,3,62,0,'Khusus Pangkal SD TA 2024/2025',-270000,0,0,0,0,1,1,'2025-04-11 10:05:40','2025-04-11 11:00:31'),(3,3,3,1,0,2,4,7,'SPP PG TA 2024/2025',500000,0,0,0,0,1,1,'2024-12-03 00:12:49','2025-04-04 03:06:06'),(23,3,3,1,1,2,4,7,'test2',-10000,0,0,0,0,1,0,'2025-04-04 03:06:06','2025-04-04 03:06:06'),(25,3,3,1,2,2,4,7,'Khusus SPP PG TA 2024/2025',-200000,0,0,0,0,1,1,'2025-04-11 10:05:40','2025-04-11 11:00:31');
/*!40000 ALTER TABLE `tsalppdb` ENABLE KEYS */;

--
-- Table structure for table `tsetdendaspp`
--

DROP TABLE IF EXISTS `tsetdendaspp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetdendaspp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tin` int(11) NOT NULL DEFAULT 0,
  `idta` int(11) NOT NULL DEFAULT 0,
  `nam` int(11) NOT NULL DEFAULT 0,
  `idset` int(11) NOT NULL DEFAULT 0,
  `ket` int(11) NOT NULL DEFAULT 0,
  `idcoa` int(11) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetdendaspp`
--

/*!40000 ALTER TABLE `tsetdendaspp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsetdendaspp` ENABLE KEYS */;

--
-- Table structure for table `tsetdendaspp1`
--

DROP TABLE IF EXISTS `tsetdendaspp1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetdendaspp1` (
  `idsds` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `tgl` tinyint(4) NOT NULL DEFAULT 0,
  `exclib` tinyint(4) NOT NULL DEFAULT 0,
  `akhbul` tinyint(4) NOT NULL DEFAULT 0,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `qty` tinyint(4) NOT NULL DEFAULT 0,
  `sat` varchar(5) NOT NULL DEFAULT '0',
  `bul1` tinyint(4) NOT NULL DEFAULT 0,
  `bul2` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idsds`,`nmr`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetdendaspp1`
--

/*!40000 ALTER TABLE `tsetdendaspp1` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsetdendaspp1` ENABLE KEYS */;

--
-- Table structure for table `tsetkurppdb`
--

DROP TABLE IF EXISTS `tsetkurppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetkurppdb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tin` int(11) NOT NULL,
  `idta` int(11) NOT NULL,
  `idsis` int(11) NOT NULL DEFAULT 0,
  `nam` varchar(50) NOT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetkurppdb`
--

/*!40000 ALTER TABLE `tsetkurppdb` DISABLE KEYS */;
INSERT INTO `tsetkurppdb` VALUES (1,1,1,1,'Khusus',0,2,1,1,'2025-04-11 11:00:31','2025-04-11 11:00:31');
/*!40000 ALTER TABLE `tsetkurppdb` ENABLE KEYS */;

--
-- Table structure for table `tsetkurppdb1`
--

DROP TABLE IF EXISTS `tsetkurppdb1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetkurppdb1` (
  `idskp` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `idspd` int(11) NOT NULL,
  `ket` varchar(50) DEFAULT NULL,
  `jum` double NOT NULL DEFAULT 0,
  `nil` varchar(20) DEFAULT NULL,
  `nilpro` double NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `updatedat` datetime DEFAULT NULL,
  PRIMARY KEY (`idskp`,`nmr`) USING BTREE,
  KEY `idspd` (`idspd`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetkurppdb1`
--

/*!40000 ALTER TABLE `tsetkurppdb1` DISABLE KEYS */;
INSERT INTO `tsetkurppdb1` VALUES (1,1,3,'Formulir SD TA 2024/2025',100000,NULL,0,0,1,'2025-04-11 10:05:40',1,'2025-04-11 18:00:31'),(1,2,3,'Pangkal SD TA 2024/2025',1530000,'15%',270000,0,1,'2025-04-11 10:05:40',1,'2025-04-11 18:00:31'),(1,3,3,'SPP PG TA 2024/2025',290000,'200.000',200000,0,1,'2025-04-11 10:05:40',1,'2025-04-11 18:00:31');
/*!40000 ALTER TABLE `tsetkurppdb1` ENABLE KEYS */;

--
-- Table structure for table `tsetkurpr`
--

DROP TABLE IF EXISTS `tsetkurpr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetkurpr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idta` int(11) NOT NULL DEFAULT 0,
  `tin` tinyint(4) NOT NULL,
  `idset` int(11) NOT NULL DEFAULT 0,
  `nam` varchar(20) NOT NULL,
  `kodcoa` varchar(16) DEFAULT NULL,
  `is3nd` tinyint(4) NOT NULL DEFAULT 0,
  `Sta` tinyint(4) NOT NULL DEFAULT 0,
  `iduse` int(11) DEFAULT NULL,
  PRIMARY KEY (`tin`,`nam`,`idset`,`idta`) USING BTREE,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetkurpr`
--

/*!40000 ALTER TABLE `tsetkurpr` DISABLE KEYS */;
INSERT INTO `tsetkurpr` VALUES (0,1,1,5,'Potongan Saudara',NULL,0,2,1),(1,2,5,1,'BanYas',NULL,0,2,1);
/*!40000 ALTER TABLE `tsetkurpr` ENABLE KEYS */;

--
-- Table structure for table `tsetkurpr1`
--

DROP TABLE IF EXISTS `tsetkurpr1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetkurpr1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idkur` int(11) NOT NULL,
  `Nmr` tinyint(4) NOT NULL DEFAULT 1,
  `idset1` int(11) NOT NULL,
  `sis` varchar(100) NOT NULL,
  `nsis` text NOT NULL,
  `ket` varchar(50) NOT NULL,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `bul` tinyint(4) NOT NULL,
  `bul1` tinyint(4) NOT NULL,
  `coapen` varchar(16) NOT NULL,
  `coapiu` varchar(16) DEFAULT NULL,
  `coapendim` varchar(16) DEFAULT NULL,
  `coabelter` varchar(16) DEFAULT NULL,
  `Sta` tinyint(4) NOT NULL DEFAULT 0,
  `iduse` int(11) DEFAULT NULL,
  PRIMARY KEY (`Nmr`,`idkur`) USING BTREE,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetkurpr1`
--

/*!40000 ALTER TABLE `tsetkurpr1` DISABLE KEYS */;
INSERT INTO `tsetkurpr1` VALUES (2,0,1,0,'s2258','Elgant Veer Lie','Potongan Saudara PG TA 2024/2025',5000.00,7,6,'62','7','8','126',0,1),(1,1,1,0,'0','Semua','BanYas SMA TA 2021 - 2022',10000.00,7,6,'45','9','34','34',0,1);
/*!40000 ALTER TABLE `tsetkurpr1` ENABLE KEYS */;

--
-- Table structure for table `tsetkurpr2`
--

DROP TABLE IF EXISTS `tsetkurpr2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetkurpr2` (
  `kurpr` tinyint(4) NOT NULL,
  `nmr` tinyint(4) NOT NULL,
  `Nis` varchar(10) NOT NULL,
  `Nam` varchar(50) NOT NULL,
  PRIMARY KEY (`kurpr`,`Nis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetkurpr2`
--

/*!40000 ALTER TABLE `tsetkurpr2` DISABLE KEYS */;
/*!40000 ALTER TABLE `tsetkurpr2` ENABLE KEYS */;

--
-- Table structure for table `tsetnodoc`
--

DROP TABLE IF EXISTS `tsetnodoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetnodoc` (
  `doc` char(2) NOT NULL,
  `nodoc` varchar(16) NOT NULL,
  `nam` varchar(30) NOT NULL,
  `resno` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`doc`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetnodoc`
--

/*!40000 ALTER TABLE `tsetnodoc` DISABLE KEYS */;
INSERT INTO `tsetnodoc` VALUES ('AF','AF0000','Pengambilan Formulir',0),('IR','IRmmyyyy000','Import Penerimaan Rutin',0),('PD','PDyyyy0000','Penerimaan PSB',0),('PR','PRyyyy0000','Penerimaan Rutin',0);
/*!40000 ALTER TABLE `tsetnodoc` ENABLE KEYS */;

--
-- Table structure for table `tsetpenrut`
--

DROP TABLE IF EXISTS `tsetpenrut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetpenrut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nam` varchar(20) NOT NULL,
  `tin` tinyint(4) NOT NULL,
  `idta` int(11) NOT NULL,
  `jen` int(11) NOT NULL,
  `bydet` tinyint(4) NOT NULL DEFAULT 0,
  `gel` varchar(20) DEFAULT NULL,
  `sta` tinyint(4) unsigned NOT NULL DEFAULT 0,
  `iduse` int(11) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetpenrut`
--

/*!40000 ALTER TABLE `tsetpenrut` DISABLE KEYS */;
INSERT INTO `tsetpenrut` VALUES (1,'SPP',5,2,1,0,'pagi',2,1,0,0,'2024-11-22 05:13:17','2024-11-22 05:13:17'),(2,'SPP',4,2,1,0,NULL,2,1,0,0,'2024-11-22 05:13:17','2024-11-22 05:13:17'),(3,'SPP',2,1,1,0,NULL,1,1,0,0,'2024-11-22 05:13:17','2024-11-22 05:13:17'),(4,'Spp',1,1,1,0,'Gelombang 1',1,1,0,0,'2024-11-22 05:13:17','2024-11-22 05:13:17'),(5,'Spp',1,1,1,0,'Gelombang 1',2,1,0,0,'2024-11-22 05:13:17','2024-11-22 05:13:17');
/*!40000 ALTER TABLE `tsetpenrut` ENABLE KEYS */;

--
-- Table structure for table `tsetpenrut1`
--

DROP TABLE IF EXISTS `tsetpenrut1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetpenrut1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idset` int(11) NOT NULL DEFAULT 0,
  `nmr` int(11) NOT NULL DEFAULT 0,
  `sis` varchar(100) NOT NULL DEFAULT '',
  `nsis` text NOT NULL,
  `ket` varchar(50) NOT NULL,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `bul` tinyint(4) NOT NULL,
  `bul1` tinyint(4) NOT NULL,
  `coapen` int(11) DEFAULT NULL,
  `coapiu` int(11) DEFAULT NULL,
  `coapendim` int(11) DEFAULT NULL,
  `coabelter` int(11) DEFAULT NULL,
  `Sta` tinyint(4) NOT NULL DEFAULT 0,
  `iduse` int(11) DEFAULT NULL,
  PRIMARY KEY (`idset`,`nmr`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetpenrut1`
--

/*!40000 ALTER TABLE `tsetpenrut1` DISABLE KEYS */;
INSERT INTO `tsetpenrut1` VALUES (1,1,1,'0','Semua','SPP SMA TA 2021 - 2022',100000.00,7,6,45,9,34,35,0,1),(2,2,1,'0','Semua','SPP SMP TA 2021 - 2022',80000.00,7,6,45,9,34,35,0,1),(3,5,1,'k6,k7','PG HAPPY; PG SMILE','Spp PG TA 2024/2025',100000.00,7,6,62,7,8,126,0,1),(4,5,2,'k7','PG SMILE','Spp PG TA 2024/2025',120000.00,7,6,62,7,8,126,0,1);
/*!40000 ALTER TABLE `tsetpenrut1` ENABLE KEYS */;

--
-- Table structure for table `tsetppdb`
--

DROP TABLE IF EXISTS `tsetppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetppdb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tin` int(11) NOT NULL,
  `idta` int(11) NOT NULL,
  `nam` varchar(50) NOT NULL,
  `gel` varchar(50) DEFAULT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetppdb`
--

/*!40000 ALTER TABLE `tsetppdb` DISABLE KEYS */;
INSERT INTO `tsetppdb` VALUES (3,1,1,'test','test',0,2,1,1,'2024-11-29 10:04:39','2024-11-29 10:04:39');
/*!40000 ALTER TABLE `tsetppdb` ENABLE KEYS */;

--
-- Table structure for table `tsetppdb1`
--

DROP TABLE IF EXISTS `tsetppdb1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetppdb1` (
  `idpsb` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `jen` int(11) NOT NULL,
  `coa` int(11) NOT NULL,
  `bul` tinyint(4) NOT NULL DEFAULT 0,
  `ket` varchar(50) DEFAULT NULL,
  `jum` double NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idpsb`,`nmr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetppdb1`
--

/*!40000 ALTER TABLE `tsetppdb1` DISABLE KEYS */;
INSERT INTO `tsetppdb1` VALUES (3,1,1,62,0,'Formulir SD TA 2024/2025',100000,0,0),(3,2,3,62,0,'Pangkal SD TA 2024/2025',2000000,0,0),(3,3,2,4,7,'SPP PG TA 2024/2025',500000,0,0);
/*!40000 ALTER TABLE `tsetppdb1` ENABLE KEYS */;

--
-- Table structure for table `tsetpromoppdb`
--

DROP TABLE IF EXISTS `tsetpromoppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetpromoppdb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tin` int(11) NOT NULL,
  `idta` int(11) NOT NULL,
  `idpsb` int(11) NOT NULL DEFAULT 0,
  `nam` varchar(50) NOT NULL,
  `tgl1` date NOT NULL,
  `tgl2` date NOT NULL,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetpromoppdb`
--

/*!40000 ALTER TABLE `tsetpromoppdb` DISABLE KEYS */;
INSERT INTO `tsetpromoppdb` VALUES (8,1,1,3,'Merdeka','2024-01-01','2025-08-17',0,9,1,1,'2025-04-04 02:54:38','2025-04-04 02:54:38');
/*!40000 ALTER TABLE `tsetpromoppdb` ENABLE KEYS */;

--
-- Table structure for table `tsetpromoppdb1`
--

DROP TABLE IF EXISTS `tsetpromoppdb1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsetpromoppdb1` (
  `idpps` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `idspd` int(11) NOT NULL,
  `ket` varchar(50) DEFAULT NULL,
  `jum` double NOT NULL DEFAULT 0,
  `nil` varchar(20) DEFAULT NULL,
  `nilpro` double NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `updatedat` datetime DEFAULT NULL,
  PRIMARY KEY (`idpps`,`nmr`) USING BTREE,
  KEY `idspd` (`idspd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsetpromoppdb1`
--

/*!40000 ALTER TABLE `tsetpromoppdb1` DISABLE KEYS */;
INSERT INTO `tsetpromoppdb1` VALUES (8,1,3,NULL,100000,NULL,0,0,1,'2025-04-01 01:45:38',1,'2025-04-04 09:54:38'),(8,2,3,'test1',2000000,'10%',200000,0,1,'2025-04-01 01:45:38',1,'2025-04-04 09:54:38'),(8,3,3,'test2',500000,'10.000',10000,0,1,'2025-04-01 01:45:39',1,'2025-04-04 09:54:38');
/*!40000 ALTER TABLE `tsetpromoppdb1` ENABLE KEYS */;

--
-- Table structure for table `tsistem`
--

DROP TABLE IF EXISTS `tsistem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tsistem` (
  `ParSet` char(6) NOT NULL,
  `Nam` varchar(50) NOT NULL,
  `NilSet` varchar(100) DEFAULT NULL,
  `Men` int(11) DEFAULT NULL,
  `Tip` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ParSet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tsistem`
--

/*!40000 ALTER TABLE `tsistem` DISABLE KEYS */;
INSERT INTO `tsistem` VALUES ('00AC','Database Akunting','maiace',NULL,0),('00AD','Database Admin Sekolah','maiadmin',NULL,0),('00AT','Token Login','3e0208acaa3ba740b5cc4e19d541fcc56c3f345599952605b602088132f7280f',NULL,0),('00DM','Database Master Data','maidatmas',NULL,0),('00TD','Tipe Delegasi','2',NULL,0),('00TL','Tipe Login','0',0,0),('01AHR','Kode Akun Hutang PR','2001.0000',NULL,0),('11HP','Satu Akun Penerimaan Rutin','1',NULL,0),('11PPR','Tipe Aktivasi Penerimaan Rutin','1',NULL,0),('13PPR','Tipe Aktivasi Tahunan','1',NULL,0),('251BT','Spp Belum diterima','1',251,0);
/*!40000 ALTER TABLE `tsistem` ENABLE KEYS */;

--
-- Table structure for table `ttpenrut`
--

DROP TABLE IF EXISTS `ttpenrut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttpenrut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nopr` varchar(20) DEFAULT NULL,
  `tgl` date DEFAULT NULL,
  `idsis` int(11) NOT NULL DEFAULT 0,
  `via` tinyint(4) NOT NULL DEFAULT 0,
  `idkas` int(11) NOT NULL DEFAULT 0,
  `nova` varchar(30) DEFAULT NULL,
  `ket` varchar(80) DEFAULT NULL,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `cat` varchar(100) DEFAULT NULL,
  `cet` tinyint(4) NOT NULL DEFAULT 0,
  `dar` tinyint(4) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `stapos` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idsis` (`idsis`) USING BTREE,
  KEY `NoPr` (`nopr`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttpenrut`
--

/*!40000 ALTER TABLE `ttpenrut` DISABLE KEYS */;
INSERT INTO `ttpenrut` VALUES (1,'PR20240001','2024-11-21',2258,1,2,NULL,NULL,50000.00,NULL,0,0,0,0,0,1,0,'2024-11-21 14:08:53','2024-11-21 14:08:53'),(2,'PR20240002','2024-11-21',2258,1,2,NULL,NULL,20000.00,NULL,0,0,0,0,0,1,0,'2024-11-21 14:37:33','2024-11-21 14:37:33'),(3,'PR20240003','2024-11-21',2258,1,2,NULL,NULL,10000.00,NULL,0,0,0,0,0,1,0,'2024-11-21 15:06:14','2024-11-21 15:06:14'),(4,'PR20240004','2024-11-21',2258,1,2,NULL,NULL,10000.00,NULL,0,0,0,0,0,1,0,'2024-11-21 15:16:13','2024-11-21 15:16:13'),(5,'PR20240005','2024-11-21',2258,1,2,NULL,NULL,2000.00,NULL,0,0,0,0,0,1,0,'2024-11-21 15:25:45','2024-11-21 15:25:45'),(6,'PR20240006','2024-11-22',2250,1,2,NULL,NULL,100000.00,NULL,0,0,0,0,0,1,0,'2024-11-22 07:17:14','2024-11-22 07:17:14'),(7,'PR20240007','2024-11-22',2250,1,2,NULL,NULL,100000.00,NULL,0,0,0,0,0,1,0,'2024-11-22 07:18:30','2024-11-22 07:18:30'),(8,'PR20240008','2024-11-22',2250,2,4,NULL,NULL,300000.00,NULL,0,0,0,0,0,1,0,'2024-11-22 07:24:34','2024-11-22 07:24:34'),(9,'PR20240009','2024-11-22',2250,2,4,NULL,NULL,100000.00,NULL,0,0,0,0,0,1,0,'2024-11-22 07:27:19','2024-11-22 07:27:19'),(10,'PR20240010','2024-11-22',2250,2,4,NULL,NULL,300000.00,NULL,0,0,0,0,0,1,0,'2024-11-22 07:39:24','2024-11-22 07:39:24'),(11,'PR20240011','2024-11-22',2258,1,2,NULL,NULL,103000.00,NULL,0,0,-1,0,2,1,1,'2024-11-22 07:56:07','2024-11-22 23:06:09'),(12,'PR20240012','2024-11-23',2258,1,2,NULL,NULL,3000.00,NULL,0,0,0,0,0,1,0,'2024-11-23 06:41:12','2024-11-23 06:41:12'),(13,'PR20240013','2024-11-23',2258,1,2,NULL,NULL,100000.00,NULL,0,0,0,0,0,1,0,'2024-11-23 06:59:58','2024-11-23 06:59:58');
/*!40000 ALTER TABLE `ttpenrut` ENABLE KEYS */;

--
-- Table structure for table `ttpenrut1`
--

DROP TABLE IF EXISTS `ttpenrut1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttpenrut1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idpr` int(11) NOT NULL DEFAULT 0,
  `nmr` tinyint(4) NOT NULL DEFAULT 1,
  `idspr` int(11) NOT NULL DEFAULT 0,
  `ket` varchar(100) DEFAULT NULL,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `idcoa` int(11) NOT NULL DEFAULT 0,
  `nolai` varchar(20) DEFAULT NULL,
  `salpr` tinyint(4) NOT NULL DEFAULT 0,
  `sta` tinyint(4) DEFAULT NULL,
  `stapos` tinyint(4) unsigned NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idpr`,`nmr`) USING BTREE,
  UNIQUE KEY `idspr` (`idspr`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttpenrut1`
--

/*!40000 ALTER TABLE `ttpenrut1` DISABLE KEYS */;
INSERT INTO `ttpenrut1` VALUES (3,1,1,169,'Spp PG TA 2024/2025 Juli 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-21 14:08:54','2024-11-21 14:08:54'),(4,1,2,315,'Kurang Bayar Spp PG TA 2024/2025',-50000.00,0,NULL,1,NULL,0,1,0,'2024-11-21 14:08:54','2024-11-21 14:08:54'),(5,2,1,316,'Spp PG TA 2024/2025 Juli 2024',50000.00,0,NULL,0,NULL,0,1,0,'2024-11-21 14:37:34','2024-11-21 14:37:34'),(6,2,2,317,'Kurang Bayar Spp PG TA 2024/2025',-30000.00,0,NULL,1,NULL,0,1,0,'2024-11-21 14:37:34','2024-11-21 14:37:34'),(7,3,1,318,'Spp PG TA 2024/2025 Juli 2024',30000.00,0,NULL,0,NULL,0,1,0,'2024-11-21 15:06:15','2024-11-21 15:06:15'),(8,3,2,319,'Kurang Bayar Spp PG TA 2024/2025',-20000.00,0,NULL,1,NULL,0,1,0,'2024-11-21 15:06:15','2024-11-21 15:06:15'),(9,4,1,320,'Spp PG TA 2024/2025 Juli 2024',20000.00,0,NULL,0,NULL,0,1,0,'2024-11-21 15:16:13','2024-11-21 15:16:13'),(10,4,2,321,'Kurang Bayar Spp PG TA 2024/2025',-10000.00,0,NULL,1,NULL,0,1,0,'2024-11-21 15:16:13','2024-11-21 15:16:13'),(11,5,1,322,'Spp PG TA 2024/2025 Juli 2024',10000.00,0,NULL,0,NULL,0,1,0,'2024-11-21 15:25:45','2024-11-21 15:25:45'),(12,5,2,323,'Kurang Bayar Spp PG TA 2024/2025',-8000.00,0,NULL,1,NULL,0,1,0,'2024-11-21 15:25:46','2024-11-21 15:25:46'),(13,6,1,73,'Spp PG TA 2024/2025 Juli 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:17:14','2024-11-22 07:17:14'),(14,7,1,3119,'Spp PG TA 2024/2025 Juli 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:18:30','2024-11-22 07:18:30'),(15,8,1,74,'Spp PG TA 2024/2025 Agustus 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:24:34','2024-11-22 07:24:34'),(16,8,2,3120,'Spp PG TA 2024/2025 Agustus 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:24:34','2024-11-22 07:24:34'),(17,8,3,75,'Spp PG TA 2024/2025 September 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:24:34','2024-11-22 07:24:34'),(18,9,1,3121,'Spp PG TA 2024/2025 September 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:27:19','2024-11-22 07:27:19'),(19,10,1,76,'Spp PG TA 2024/2025 Oktober 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:39:24','2024-11-22 07:39:24'),(20,10,2,3122,'Spp PG TA 2024/2025 Oktober 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:39:24','2024-11-22 07:39:24'),(21,10,3,77,'Spp PG TA 2024/2025 November 2024',100000.00,0,NULL,0,NULL,0,1,0,'2024-11-22 07:39:24','2024-11-22 07:39:24'),(22,11,1,324,'Spp PG TA 2024/2025 Juli 2024',8000.00,0,NULL,0,NULL,0,1,1,'2024-11-22 07:56:08','2024-11-23 06:41:12'),(23,11,2,3107,'Potongan Saudara PG TA 2024/2025 Juli 2024',-5000.00,0,NULL,0,NULL,0,1,1,'2024-11-22 07:56:08','2024-11-23 06:41:12'),(28,11,3,3215,'Spp PG TA 2024/2025 Juli 2024',100000.00,0,NULL,0,NULL,0,1,1,'2024-11-22 23:06:09','2024-11-23 06:59:58');
/*!40000 ALTER TABLE `ttpenrut1` ENABLE KEYS */;

--
-- Table structure for table `ttppdb`
--

DROP TABLE IF EXISTS `ttppdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttppdb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nopd` varchar(20) NOT NULL DEFAULT '',
  `tgl` date NOT NULL,
  `idfor` int(11) NOT NULL DEFAULT 0,
  `via` tinyint(4) NOT NULL DEFAULT 0,
  `idkas` int(11) NOT NULL DEFAULT 0,
  `nova` varchar(30) DEFAULT NULL,
  `ket` varchar(80) DEFAULT NULL,
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `cat` varchar(100) DEFAULT NULL,
  `cet` tinyint(4) NOT NULL DEFAULT 0,
  `dar` tinyint(4) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `rev` tinyint(4) NOT NULL DEFAULT 0,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttppdb`
--

/*!40000 ALTER TABLE `ttppdb` DISABLE KEYS */;
INSERT INTO `ttppdb` VALUES (3,'PD20240001','2024-12-09',1,1,2,NULL,NULL,400000.00,NULL,0,0,0,1,1,1,'2024-12-09 05:48:54','2024-12-09 10:48:27');
/*!40000 ALTER TABLE `ttppdb` ENABLE KEYS */;

--
-- Table structure for table `ttppdb1`
--

DROP TABLE IF EXISTS `ttppdb1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ttppdb1` (
  `idpsb` int(11) NOT NULL,
  `nmr` int(11) NOT NULL,
  `idspd` int(11) NOT NULL,
  `ket` varchar(50) NOT NULL DEFAULT '',
  `jum` double(24,2) NOT NULL DEFAULT 0.00,
  `bay` double(24,2) NOT NULL DEFAULT 0.00,
  `createdby` int(11) NOT NULL DEFAULT 0,
  `updatedby` int(11) NOT NULL DEFAULT 0,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idpsb`,`nmr`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ttppdb1`
--

/*!40000 ALTER TABLE `ttppdb1` DISABLE KEYS */;
INSERT INTO `ttppdb1` VALUES (3,1,2,'Pangkal SD TA 2024/2025',2000000.00,300000.00,1,1,'2024-12-09 05:48:54','2024-12-09 10:48:27'),(3,2,3,'SPP PG TA 2024/2025',500000.00,100000.00,1,1,'2024-12-09 05:48:54','2024-12-09 10:48:27');
/*!40000 ALTER TABLE `ttppdb1` ENABLE KEYS */;

--
-- Table structure for table `tviabayar`
--

DROP TABLE IF EXISTS `tviabayar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tviabayar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nam` varchar(50) DEFAULT NULL,
  `tip` tinyint(4) DEFAULT NULL,
  `sta` tinyint(4) DEFAULT NULL,
  `tglinp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tviabayar`
--

/*!40000 ALTER TABLE `tviabayar` DISABLE KEYS */;
INSERT INTO `tviabayar` VALUES (1,'Tunai',1,0,'2021-10-30 09:32:52'),(2,'Transfer',2,0,'2021-10-30 09:32:52');
/*!40000 ALTER TABLE `tviabayar` ENABLE KEYS */;

--
-- Table structure for table `tviewgrid`
--

DROP TABLE IF EXISTS `tviewgrid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tviewgrid` (
  `kod` varchar(5) NOT NULL,
  `kol` varchar(150) NOT NULL,
  `kolas` varchar(50) DEFAULT NULL,
  `nam` varchar(50) DEFAULT NULL,
  `leb` smallint(6) NOT NULL DEFAULT 100,
  `tam` tinyint(4) NOT NULL DEFAULT 0,
  `rib` tinyint(4) NOT NULL DEFAULT 0,
  `req` tinyint(4) NOT NULL DEFAULT 0,
  `wrap` tinyint(4) NOT NULL DEFAULT 0,
  `car` tinyint(4) NOT NULL DEFAULT 0,
  `nouru` tinyint(4) NOT NULL DEFAULT 0,
  `bar` tinyint(4) NOT NULL DEFAULT 0,
  `sta` tinyint(4) NOT NULL DEFAULT 0,
  `tipcar` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`kod`,`kol`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tviewgrid`
--

/*!40000 ALTER TABLE `tviewgrid` DISABLE KEYS */;
INSERT INTO `tviewgrid` VALUES ('153A','id',NULL,'ID',50,0,0,1,0,0,1,0,0,0),('153A','idkel',NULL,'ID Kelas',50,0,0,1,0,0,5,0,0,0),('153A','idta',NULL,'ID Tahun Ajaran',50,0,0,1,0,0,7,0,0,0),('153A','kel',NULL,'Kelas',150,1,0,1,0,0,4,0,0,0),('153A','namlen',NULL,'Nama Siswa',300,1,0,1,0,0,3,0,0,0),('153A','nis',NULL,'NIS',100,1,0,1,0,0,2,0,0,0),('153A','tin',NULL,'ID Tingkat',50,0,0,1,0,0,6,0,0,0),('251','bulid',NULL,'Bulan',50,0,0,1,0,0,5,0,0,0),('251','coabelte',NULL,'ID Belum diterima',50,0,0,1,0,0,15,0,0,0),('251','coapen',NULL,'ID Pendapatan',50,0,0,1,0,0,12,0,0,0),('251','coapendim',NULL,'ID Penerimaan dimuka',50,0,0,1,0,0,14,0,0,0),('251','coapiu',NULL,'ID Piutang',50,0,0,1,0,0,13,0,0,0),('251','dar',NULL,'Sumber',50,0,0,1,0,0,9,0,0,0),('251','id',NULL,'ID SPR',50,0,0,1,0,0,3,0,0,0),('251','idgru',NULL,'ID Grup',50,0,0,1,0,0,8,0,0,0),('251','idset',NULL,'ID Setting PR',50,0,0,1,0,0,4,0,0,0),('251','jen',NULL,'Jenis',50,0,0,1,0,0,10,0,0,0),('251','jum',NULL,'Jumlah',200,1,1,1,0,0,2,0,0,0),('251','ket',NULL,'Keterangan',500,1,0,1,0,0,1,0,0,0),('251','ket1',NULL,'Ket1',200,0,0,1,0,0,11,0,0,0),('251','nmr',NULL,'No SPR',50,0,0,1,0,0,7,0,0,0),('251','tah',NULL,'Tahun',100,0,0,1,0,0,6,0,0,0),('253','tpd1.bay',NULL,'Bayar',200,1,1,1,0,0,4,2,0,0),('253','tspd.id',NULL,'ID PSB',50,0,0,1,0,0,1,0,0,0),('253','tspd.jum - sum(ifnull(tby.bay, 0))','jum','Sisa',200,1,1,1,0,0,3,2,0,0),('253','tspd.ket',NULL,'keterangan',500,1,0,1,0,0,2,2,0,0),('353','tk.nam','nkel','Nama Kelas',150,1,0,0,0,0,7,0,0,0),('353','ts.id',NULL,'ID',50,0,0,1,0,0,1,0,0,0),('353','ts.namlen',NULL,'Nama Lengkap',250,1,0,0,0,1,4,0,0,0),('353','ts.nampan',NULL,'Nama Panggilan',150,1,0,0,0,0,5,0,0,0),('353','ts.nisn',NULL,'NISN',100,1,0,1,0,1,3,0,0,0),('353','ts.tel',NULL,'No Telepon',150,1,0,0,0,0,6,0,0,0),('353','ts2.nis',NULL,'NIS',100,1,0,1,0,1,2,0,0,0);
/*!40000 ALTER TABLE `tviewgrid` ENABLE KEYS */;

--
-- Table structure for table `tviewgrid1`
--

DROP TABLE IF EXISTS `tviewgrid1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tviewgrid1` (
  `Kod` varchar(5) NOT NULL,
  `UseID` varchar(20) NOT NULL,
  `Nam` varchar(50) NOT NULL,
  `Lay0` text DEFAULT NULL,
  `Lay1` text DEFAULT NULL,
  `Lay2` text DEFAULT NULL,
  `Lay3` text DEFAULT NULL,
  `Sta` tinyint(4) NOT NULL DEFAULT 0,
  `TglInp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Kod`,`UseID`,`Nam`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tviewgrid1`
--

/*!40000 ALTER TABLE `tviewgrid1` DISABLE KEYS */;
/*!40000 ALTER TABLE `tviewgrid1` ENABLE KEYS */;

--
-- Dumping routines for database 'maisppnew'
--

-- insufficient privileges to SHOW CREATE FUNCTION `ForNoRef`
-- does wahyu have permissions on mysql.proc?

