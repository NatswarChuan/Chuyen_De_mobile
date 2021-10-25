-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th10 15, 2021 lúc 03:46 AM
-- Phiên bản máy phục vụ: 5.7.31
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop`
--

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
  `shop_id` int(11) NOT NULL,
  PRIMARY KEY (`revenue_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `revenue`
--

INSERT INTO `revenue` (`revenue_id`, `revenue_month`, `revenue_year`, `revenue_seasion`, `revenue_money`, `shop_id`) VALUES
(1, 9, 2021, 3, 300000000, 1),
(2, 10, 2021, 4, 0, 1),
(3, 9, 2021, 3, 500000000, 2),
(4, 10, 2021, 4, 0, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shop`
--

DROP TABLE IF EXISTS `shop`;
CREATE TABLE IF NOT EXISTS `shop` (
  `shop_id` int(11) NOT NULL AUTO_INCREMENT,
  `shop_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shop_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shop_owner` int(11) NOT NULL,
  `shop_avatar` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`shop_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_name`, `shop_description`, `shop_owner`, `shop_avatar`, `last_update`, `status`) VALUES
(1, 'Cansa-shop', 'shop này chuyên bán cần sa', 1, '7841633320674058', 0, 1),
(2, 'Kush-shop', 'Deal Cam Kush các loại', 2, '3071633320399941', 0, 1),
(3, 'Cansa-shopaaa', 'ád', 3, '7841633320674058', 0, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
