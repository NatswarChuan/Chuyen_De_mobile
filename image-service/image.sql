-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th10 15, 2021 lúc 02:13 AM
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
-- Cơ sở dữ liệu: `image`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `image_id` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `image`
--

INSERT INTO `image` (`image_id`, `image_title`, `image_name`) VALUES
('7401633320689314', '0', '7401633320689314.png'),
('7251633320683170', '0', '7251633320683170.png'),
('401634101513277', NULL, '401634101513277.png'),
('7841633320674058', '0', '7841633320674058.png'),
('3071633320399941', '0', '3071633320399941.png'),
('8411633338946097', NULL, '8411633338946097.png'),
('2871633342401924', NULL, '2871633342401924.png'),
('5471633342460129', NULL, '5471633342460129.png'),
('2851634110329223', NULL, '2851634110329223.png'),
('3901634059922549', NULL, '3901634059922549.png'),
('8281634059972816', NULL, '8281634059972816.png'),
('4011634060440845', NULL, '4011634060440845.png'),
('2471634061759200', NULL, '2471634061759200.png'),
('5301634061932637', NULL, '5301634061932637.png');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `slider`
--

DROP TABLE IF EXISTS `slider`;
CREATE TABLE IF NOT EXISTS `slider` (
  `slider_id` int(11) NOT NULL AUTO_INCREMENT,
  `slider_image` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slider_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`slider_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `slider`
--

INSERT INTO `slider` (`slider_id`, `slider_image`, `slider_title`) VALUES
(1, '7401633320689314', 'Slider 1 nè'),
(2, '7401633320689314', 'Slider 2 nè'),
(3, '7401633320689314', 'Slider 3 nè');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
