-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th12 13, 2021 lúc 05:26 PM
-- Phiên bản máy phục vụ: 10.6.4-MariaDB-log
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `admin_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `access`
--

DROP TABLE IF EXISTS `access`;
CREATE TABLE IF NOT EXISTS `access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_times` int(11) NOT NULL DEFAULT 1,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `season` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `access`
--

INSERT INTO `access` (`id`, `access_times`, `year`, `month`, `season`) VALUES
(2, 12, 2021, 10, 4),
(4, 1516, 2021, 11, 4),
(6, 100, 2021, 12, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `revenue`
--

DROP TABLE IF EXISTS `revenue`;
CREATE TABLE IF NOT EXISTS `revenue` (
  `revenue_id` int(11) NOT NULL AUTO_INCREMENT,
  `revenue_month` int(11) NOT NULL,
  `revenue_year` int(11) NOT NULL,
  `revenue_seasion` int(11) NOT NULL,
  `revenue_money` double NOT NULL,
  PRIMARY KEY (`revenue_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `revenue`
--

INSERT INTO `revenue` (`revenue_id`, `revenue_month`, `revenue_year`, `revenue_seasion`, `revenue_money`) VALUES
(1, 10, 2021, 4, 99999999),
(2, 11, 2021, 4, 256770),
(4, 12, 2021, 5, 3763170);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ship`
--

DROP TABLE IF EXISTS `ship`;
CREATE TABLE IF NOT EXISTS `ship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` double NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `ship`
--

INSERT INTO `ship` (`id`, `value`, `title`, `last_update`) VALUES
(1, 10000, 'Tiền ship', 15),
(2, 5, 'Tiền hoa hồng', 15);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
