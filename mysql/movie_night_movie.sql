-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: movie_night
-- ------------------------------------------------------
-- Server version	9.0.0

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
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_fk` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `id_tmdb` int NOT NULL,
  `image_tmdb` varchar(255) DEFAULT NULL,
  `details` varchar(300) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `favorite` tinyint NOT NULL DEFAULT '0',
  `like` tinyint NOT NULL DEFAULT '0',
  `dislike` tinyint NOT NULL DEFAULT '0',
  `hate` tinyint NOT NULL DEFAULT '0',
  `wish_to_watch` tinyint NOT NULL DEFAULT '0',
  `category_fk_list` varchar(45) DEFAULT NULL,
  `sub_category_fk` int DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `vote_average` decimal(10,2) DEFAULT NULL,
  `vote_count` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,0,'The Substance',933260,'/lqoMzCcZYEFK729d6qzt349fB4o.jpg',NULL,NULL,0,0,0,0,1,'18,27,53',NULL,'2024-09-07',7.30,1147,'2024-11-02 02:04:30','2024-11-02 02:04:30'),(2,0,'Joker',475557,'/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',NULL,NULL,1,0,0,0,0,'80,53,18',NULL,'2019-10-01',8.15,25567,'2024-11-02 05:00:13','2024-11-02 05:00:13'),(3,0,'Joker: Folie à Deux',889737,'/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg',NULL,NULL,0,0,1,0,0,'18,80,53',NULL,'2024-10-01',5.71,1206,'2024-11-02 05:15:51','2024-11-02 05:15:51');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-02 12:53:14
