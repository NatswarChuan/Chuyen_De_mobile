-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 27, 2021 at 05:36 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `information`
--

DROP TABLE IF EXISTS `information`;
CREATE TABLE IF NOT EXISTS `information` (
  `user_id` int(11) NOT NULL,
  `information_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`information_email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `information`
--

INSERT INTO `information` (`user_id`, `information_email`, `information_password`, `last_update`) VALUES
(1, 'natswarchuan@gmail.com', '02d731b00fd230c715a2da8e18b04db1', 0),
(2, 'hoanganh34k@gmail.com', '45cf370a98ab9c501f1aae17007565a8', 0),
(3, 'anhsonxui@gmail.com', 'd660d76ca3f2be604a2ccf9bcc54f95e', 0),
(75, 'hoanganh60k@gmail.com', 'hoanganh11k', 75),
(74, 'hoanganh59k@gmail.com', '123', 74),
(73, 'hoanganh58k@gmail.com', '123', 73),
(72, 'hoanganh57k@gmail.com', '123', 72),
(71, 'hoanganh56k@gmail.com', '123', 71),
(69, 'hoanganh32k@gmail.com', '123', 69),
(78, 'hoanganh63k@gmail.com', '123', 78),
(79, 'hoanganh64k@gmail.com', '123', 79),
(80, 'hoanganh65k@gmail.com', '123', 80),
(81, 'hoanganh66k@gmail.com', '123', 81),
(82, 'hoanganh67k@gmail.com', '123', 82),
(83, 'hoanganh300k@gmail.com', '123', 83);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `notification_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_date` date DEFAULT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `notification_description`, `notification_date`) VALUES
(1, 'Cái này là thông báo', '2021-09-19');

-- --------------------------------------------------------

--
-- Table structure for table `notification_user`
--

DROP TABLE IF EXISTS `notification_user`;
CREATE TABLE IF NOT EXISTS `notification_user` (
  `user_id` int(11) NOT NULL,
  `notification_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`notification_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notification_user`
--

INSERT INTO `notification_user` (`user_id`, `notification_id`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`permission_id`, `permission_name`) VALUES
(1, 'Người mua'),
(2, 'Người bán'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `profile_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_birthday` date DEFAULT NULL,
  `profile_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_update` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`profile_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `profile_phone`, `profile_birthday`, `profile_name`, `last_update`) VALUES
(1, 1, '0968241064', '1999-09-29', 'anh', 1),
(2, 2, '01999401029', NULL, 'Phạm Hoàng Anh', 0),
(3, 3, '01213448582', NULL, 'Đào Xuân Sơn', 0),
(5, 83, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_key` text COLLATE utf8mb4_unicode_ci,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_avatar` text COLLATE utf8mb4_unicode_ci,
  `last_update` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_key`, `user_name`, `user_avatar`, `last_update`, `status`) VALUES
(1, NULL, 'Natswar', '1', 0, 1),
(2, NULL, 'hoanganh34k', '2', 0, 1),
(3, NULL, 'WhiteKing', '3', 0, 1),
(83, NULL, 'hoanganh35k', NULL, 0, 1),
(82, NULL, 'hoanganh67k', NULL, 0, 1),
(81, 'null', 'phamanh', '1,2,3', 81, 1),
(80, NULL, 'hoanganh65k', NULL, 0, 1),
(79, NULL, 'hoanganh64k', NULL, 0, 1),
(78, NULL, 'hoanganh63k', NULL, 0, 1),
(77, NULL, 'hoanganh62k', NULL, 0, 1),
(76, NULL, 'hoanganh61k', NULL, 0, 1),
(75, NULL, 'hoanganh60k', NULL, 0, 1),
(74, NULL, 'hoanganh59k', NULL, 0, 1),
(73, NULL, 'hoanganh58k', NULL, 0, 1),
(72, NULL, 'hoanganh57k', NULL, 0, 1),
(71, NULL, 'hoanganh56k', NULL, 0, 1),
(70, NULL, 'hoanganh55k', NULL, 0, 1),
(69, NULL, 'hoanganh11k', NULL, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE IF NOT EXISTS `user_permission` (
  `permission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_permission`
--

INSERT INTO `user_permission` (`permission_id`, `user_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 2),
(2, 1),
(19, 22),
(19, 23),
(2, 26),
(2, 27),
(2, 28),
(2, 29),
(2, 30),
(2, 31),
(2, 32),
(2, 33),
(2, 34),
(2, 35),
(2, 36),
(2, 37),
(2, 38),
(2, 39),
(2, 40),
(2, 47),
(2, 61),
(2, 62),
(2, 63),
(2, 64),
(2, 65),
(2, 66),
(2, 67),
(2, 68),
(2, 69),
(2, 71),
(2, 72),
(2, 73),
(2, 74),
(2, 75),
(2, 76),
(2, 78),
(2, 79),
(2, 80),
(2, 81),
(2, 82),
(2, 83);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
