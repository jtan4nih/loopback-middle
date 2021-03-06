-- MySQL dump 10.16  Distrib 10.1.19-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.1.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES UTF8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_achievements`
--

DROP TABLE IF EXISTS `_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_achievements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `awards` varchar(80) DEFAULT NULL,
  `goals` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_audits`
--

DROP TABLE IF EXISTS `_audits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_audits` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(80) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `object` varchar(2000) DEFAULT NULL,
  `service` varchar(2000) DEFAULT NULL,
  `extra` varchar(2000) DEFAULT NULL,
  `owner` varchar(2000) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_awards`
--

DROP TABLE IF EXISTS `_awards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_awards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(80) DEFAULT NULL,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_badges`
--

DROP TABLE IF EXISTS `_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_badges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(80) DEFAULT NULL,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  `assets` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_constructs`
--

DROP TABLE IF EXISTS `_constructs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_constructs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_goals`
--

DROP TABLE IF EXISTS `_goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_goals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(80) NOT NULL,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  `state` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_measures`
--

DROP TABLE IF EXISTS `_measures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_measures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_points`
--

DROP TABLE IF EXISTS `_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(80) DEFAULT NULL,
  `type` varchar(80) NOT NULL,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_results`
--

DROP TABLE IF EXISTS `_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_subjects`
--

DROP TABLE IF EXISTS `_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` varchar(80) DEFAULT NULL,
  `type` varchar(80) NOT NULL,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `flags`
--

DROP TABLE IF EXISTS `flags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(80) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `owner` int(11) DEFAULT NULL,
  `messages` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_flags_owner` (`owner`),
  KEY `fk_flags_messages` (`messages`),
  CONSTRAINT `fk_flags_messages` FOREIGN KEY (`messages`) REFERENCES `messages` (`id`),
  CONSTRAINT `fk_flags_owner` FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(2000) NOT NULL,
  `text` varchar(2000) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` date DEFAULT '0000-00-00',
  `liked` varchar(80) DEFAULT 'Public',
  `state` varchar(80) NOT NULL DEFAULT 'Public',
  `type` varchar(80) NOT NULL DEFAULT 'Topic',
  `owner` int(11) NOT NULL,
  `likecount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_messages_owner` (`owner`),
  CONSTRAINT `fk_messages_owner` FOREIGN KEY (`owner`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `powerups`
--

DROP TABLE IF EXISTS `powerups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `powerups` (
  `id` int(11) NOT NULL,
  `title` varchar(80) NOT NULL,
  `what` varchar(2000) NOT NULL,
  `how` varchar(2000) NOT NULL,
  `category` varchar(80) NOT NULL,
  `subcategory` varchar(80) NOT NULL,
  `state` varchar(80) NOT NULL,
  `point` int(11) NOT NULL,
  `questsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `quests`
--

DROP TABLE IF EXISTS `quests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quests` (
  `id` int(11) NOT NULL,
  `title` varchar(80) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `how` varchar(2000) NOT NULL,
  `threshold` int(11) NOT NULL,
  `state` varchar(80) NOT NULL,
  `point` int(11) NOT NULL,
  `usersId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `questspowerups`
--

DROP TABLE IF EXISTS `questspowerups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questspowerups` (
  `id` int(11) NOT NULL,
  `questsId` int(11) DEFAULT NULL,
  `powerupsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `threads`
--

DROP TABLE IF EXISTS `threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `threads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(2000) DEFAULT NULL,
  `type` varchar(2000) NOT NULL,
  `messages` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_threads_messages` (`messages`),
  CONSTRAINT `fk_threads_messages` FOREIGN KEY (`messages`) REFERENCES `messages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `email` varchar(300) NOT NULL,
  `studyId` varchar(80) NOT NULL,
  `interests` varchar(2000) DEFAULT NULL,
  `transplantDate` date DEFAULT NULL,
  `startDate` date NOT NULL,
  `avatar` varchar(80) DEFAULT 'default.png',
  `state` tinyint(1) DEFAULT '1',
  `powerupsId` int(11) DEFAULT NULL,
  `pointsId` int(11) DEFAULT NULL,
  `achievementsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_powerupsId` (`powerupsId`),
  KEY `fk_users_pointsId` (`pointsId`),
  KEY `fk_users_achievementsId` (`achievementsId`),
  CONSTRAINT `fk_users_achievementsId` FOREIGN KEY (`achievementsId`) REFERENCES `achievements` (`id`),
  CONSTRAINT `fk_users_pointsId` FOREIGN KEY (`pointsId`) REFERENCES `points` (`id`),
  CONSTRAINT `fk_users_powerupsId` FOREIGN KEY (`powerupsId`) REFERENCES `powerups` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usersachievements`
--

DROP TABLE IF EXISTS `usersachievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersachievements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usersId` int(11) DEFAULT NULL,
  `achievementsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usersquests`
--

DROP TABLE IF EXISTS `usersquests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersquests` (
  `id` int(11) NOT NULL,
  `usersId` int(11) DEFAULT NULL,
  `questsId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usersthreads`
--

DROP TABLE IF EXISTS `usersthreads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersthreads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usersId1` int(11) NOT NULL,
  `usersId2` int(11) NOT NULL,
  `threads` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usersthreads_usersId1` (`usersId1`),
  KEY `fk_usersthreads_usersId2` (`usersId2`),
  KEY `fk_usersthreads_threads` (`threads`),
  CONSTRAINT `fk_usersthreads_threads` FOREIGN KEY (`threads`) REFERENCES `threads` (`id`),
  CONSTRAINT `fk_usersthreads_usersId1` FOREIGN KEY (`usersId1`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_usersthreads_usersId2` FOREIGN KEY (`usersId2`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-20 11:45:10
