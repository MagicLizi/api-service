# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 139.196.210.143 (MySQL 5.5.47-0ubuntu0.14.04.1)
# Database: api-service
# Generation Time: 2016-10-20 09:14:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table app
# ------------------------------------------------------------

DROP TABLE IF EXISTS `app`;

CREATE TABLE `app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appId` varchar(45) NOT NULL,
  `appSecret` varchar(128) NOT NULL,
  `appName` varchar(45) NOT NULL,
  `description` varchar(256) NOT NULL,
  `createAt` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table errorlog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `errorlog`;

CREATE TABLE `errorlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fromHost` varchar(128) NOT NULL,
  `api` varchar(45) NOT NULL,
  `params` text NOT NULL,
  `errorMessage` text NOT NULL,
  `createAt` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table mobileVerify
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mobileVerify`;

CREATE TABLE `mobileVerify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appId` varchar(45) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `verifyCode` varchar(6) NOT NULL,
  `isValied` int(11) NOT NULL,
  `createAt` varchar(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table submail
# ------------------------------------------------------------

DROP TABLE IF EXISTS `submail`;

CREATE TABLE `submail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appId` varchar(45) NOT NULL,
  `submailAppId` varchar(128) NOT NULL,
  `appkey` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table uploadLog
# ------------------------------------------------------------

DROP TABLE IF EXISTS `uploadLog`;

CREATE TABLE `uploadLog` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appId` varchar(20) NOT NULL DEFAULT '',
  `fileUrl` varchar(256) NOT NULL DEFAULT '',
  `createAt` int(13) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table upyun
# ------------------------------------------------------------

DROP TABLE IF EXISTS `upyun`;

CREATE TABLE `upyun` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `appId` varchar(32) NOT NULL DEFAULT '',
  `bucket` varchar(128) NOT NULL DEFAULT '',
  `secret` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
