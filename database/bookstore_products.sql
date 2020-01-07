-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookstore
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Picture` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `View` int(11) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Sale` int(11) DEFAULT NULL,
  `Price` int(11) DEFAULT NULL,
  `Category` int(11) DEFAULT NULL,
  `Brand` int(11) DEFAULT NULL,
  `Author` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Origin` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Creator` int(11) DEFAULT NULL,
  `Sell` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Cat_idx` (`Category`),
  KEY `FK_Brand_idx` (`Brand`),
  KEY `FK_Creator_idx` (`Creator`),
  CONSTRAINT `FK_Brand` FOREIGN KEY (`Brand`) REFERENCES `brands` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_Cat` FOREIGN KEY (`Category`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Creator` FOREIGN KEY (`Creator`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Bé Trổ Tài Tô Màu','be-tro-tai-to-mau.jpg','Mùa hè trời trong x anh thật dễ chịu, ai cũng muốn đi dã ngoại, tắm biển, trồng cây, tung tăng cùng bạn bè. Bé hãy thêm màu sắc vào trang bên cạnh theo ý thích của mình nhé!','2018-06-07 00:00:00',14,20,20,80000,1,1,'','Việt Nam',1,12),(4,'Chuyện Ông Gióng','chuyen-ong-giong.jpg','Chuyện ông Gióng được nhà văn Tô Hoài viết lời và họa sĩ Mai Long vẽ đã dựng một tượng đài nghệ thuật về người anh hùng làng Phù Đổng đẹp đẽ và hào sảng trong lòng bạn đọc. Ấn bản này được phục dựng từ hình ảnh, nội dung của bản in 1974.','2018-06-07 00:00:00',4,25,39,105000,1,4,'Tô Hoài','Việt Nam',1,15),(5,'Kính Vạn Hoa','kinh-van-hoa.jpg','\"Đọc Kính vạn hoa, tôi cảm ơn Nguyễn Nhật Ánh đã dày công phản ánh những sinh hoạt muôn mặt của lứa tuổi học trò. Từ cách học với các thủ thuật “phổ thơ” để ghi nhớ thuộc lòng các công thức Toán, Lý, Hoá, Anh văn... đến lối làm thơ, kể vè, dựng hoạt cảnh để học tập các môn Văn, Sử. Từ trò chơi bóng đá, thi giải câu đố... ở sân trường đến những chuyến đi nghỉ hè khám phá các vùng xa','2018-06-07 00:00:00',11,33,35,85000,1,2,'Nguyễn Nhật Ánh','Việt Nam',1,1),(6,'Nàng Lọ Lem Trong Ngày Cưới','nang-lo-lem-trong-ngay-cuoi.jpg','Hãy làm cho hình ảnh các nàng công chúa trở nên tuyệt vời bằng bút màu của em nhé! Tất cả các nàng công chúa xinh đẹp nhất đều có mặt trong bộ sách \"Tô màu cùng công chúa\"','2018-06-07 00:00:00',9,12,15,95000,1,3,'','Việt Nam',1,78),(7,'Sự Tích Hồ Gươm','su-tich-ho-guom.jpg','Sự Tích Hồ Gươm - Tủ Sách Truyện Tranh Cổ Tích Việt Nam','2018-06-07 00:00:00',4,12,15,73000,1,1,'','Việt Nam',1,19),(8,'Anh Chàng Nhanh Trí','anh-chang-nhanh-tri.jpg','Những câu chuyện dân gian nuôi dưỡng tâm hồn các em, giúp các em biết học điều hay lẽ phải, yêu cái thiện, ghét cái xấu và trân trọng truyền thống cha ông.','2018-06-08 00:00:00',21,25,25,105000,1,4,'Dân Gian Việt Nam','Việt Nam',1,32),(10,'Cây Tre Trăm Đốt','cay-tre-tram-dot.jpg','Truyện Tranh (8856), Việt Nam (9140), Văn Học Thiếu Nhi (9280), Sách Thiếu Nhi (2501).','2018-06-08 00:00:00',35,55,0,73000,1,4,'Truyện Cổ Tích Việt Nam','Việt Nam',1,45),(11,'Có Công Mài Sắt Có Ngày Nên Kim','co-cong-mai-sat-co-ngay-nen-kim.jpg','Những câu chuyện dân gian nuôi dưỡng tâm hồn các em, giúp các em biết học điều hay lẽ phải, yêu cái thiện, ghét cái xấu và trân trọng truyền thống cha ông. Bộ sách Tranh truyện dân gian Việt Nam là món quà ý nghĩa với những câu chuyện được tuyển chọn và biên soạn kĩ lưỡng.','2018-06-08 00:00:00',15,29,20,105000,1,1,'Tranh Truyện Dân Gian Việt Nam','Việt Nam',1,23),(12,'Mật Thư Trên Ngọn Đa','mat-thu-tren-ngon-da.jpg','Một câu chuyện mang sắc màu cổ tích dành cho tuổi thần tiên được kể trong khung cảnh êm đềm của làng quê Việt.\r\n“Nếu bạn đứng trên ngọn cây đa cổ thụ, nhìn thấy ông mặt trời sau dãy núi phía xa đang từ từ nhô lên như quả bóng lửa, tỏa tia nắng rẻ quạt rọi xuống cánh đồng. Làng mạc, bụi tre, dòng sông… \"','2018-06-08 00:00:00',5,23,38,95000,1,2,'Tuổi Thần Tiên','Việt Nam',1,26),(13,'Ngủ Ngon Nào Cừu Non','ngu-ngon-nao-cuu-non.jpg','Cừu con bị mất ngủ rồi, bạn ấy phải làm sao đây? Bé hãy theo dõi câu chuyện được minh họa vô cùng sinh động, đẹp mắt này và cùng đếm với bạn Cừu con nhé!\r\nNhờ sự giúp đỡ của những người bạn yêu quý trong nông trại, bé đoán xem điều gì giúp Cừu con ngủ ngoan nào?','2018-06-08 00:00:00',13,45,15,73000,1,3,'','Việt Nam',1,19),(14,'Cậu Bé Tích Chu','cau-be-tich-chu.jpg','Cùng với những lời ru ngọt ngào của mẹ, những câu chuyện cổ tích của bà đã góp phần nuôi dưỡng tâm hồn trẻ thơ.','2018-06-08 00:00:00',5,35,38,72000,1,5,'','Việt Nam',1,16);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-21 20:15:59
