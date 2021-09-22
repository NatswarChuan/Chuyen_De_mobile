-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 22, 2021 at 09:10 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `image`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_title` int NOT NULL,
  `image_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`image_id`, `image_title`, `image_name`) VALUES
(1, 1, '1.png?alt=media&token=cf84f08d-b73e-40b2-9789-409ebb225250'),
(2, 2, '2.png?alt=media&token=f664e5d0-4cb2-42a6-b342-c9ae5cdeecbf'),
(3, 3, '3.png?alt=media&token=8cb52d4d-fcfb-41a9-bc64-429b65b1ea2a'),
(4, 4, '4.png?alt=media&token=8454a0c4-53e4-4652-bb9a-cc7c077653af'),
(5, 5, '5.png?alt=media&token=fb912791-36f7-40bf-a5f7-9c3c5403e70b'),
(6, 6, '6.png?alt=media&token=32b23d38-06db-4652-8889-8310028b259b'),
(7, 7, '7.png?alt=media&token=b7bea77b-36d3-4ce5-9ae8-d480b452b7e0'),
(8, 8, '8.png?alt=media&token=8628635b-5795-4f84-ae92-55d52748fd40'),
(9, 9, '9.png?alt=media&token=41620420-1b8d-4998-9227-1d898c70c827'),
(10, 10, '10.png?alt=media&token=7439e78f-085e-4455-9b44-92aee6610535'),
(11, 11, '11.png?alt=media&token=1f74e412-53ec-49a5-805e-c8f26e1e2165'),
(12, 12, '12.png?alt=media&token=7487b316-37cd-4c04-946b-a9fa866e00d8'),
(13, 13, '13.png?alt=media&token=69881f87-6793-4428-90d7-b9cb703f7a94'),
(14, 14, '14.png?alt=media&token=71b1d6fb-5a9d-44fa-b945-744e8acf892f'),
(15, 15, '15.png?alt=media&token=7cd8643f-be0a-49b0-a838-e9cb09745d37'),
(16, 16, '16.png?alt=media&token=e60695ba-926f-4653-9da3-3b14e8d0bdae'),
(17, 17, '17.png?alt=media&token=44eaca57-72c2-41a6-a1b5-36aa67962a61'),
(18, 18, '18.png?alt=media&token=79218977-051b-4a07-8ed1-16f90cb5e68c');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

DROP TABLE IF EXISTS `slider`;
CREATE TABLE IF NOT EXISTS `slider` (
  `slider_id` int NOT NULL AUTO_INCREMENT,
  `slider_image` int NOT NULL,
  PRIMARY KEY (`slider_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`slider_id`, `slider_image`) VALUES
(1, 1),
(2, 2),
(3, 3);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
