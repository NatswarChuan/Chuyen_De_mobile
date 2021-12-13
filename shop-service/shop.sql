-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th12 13, 2021 lúc 05:28 PM
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
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `revenue`
--

INSERT INTO `revenue` (`revenue_id`, `revenue_month`, `revenue_year`, `revenue_seasion`, `revenue_money`, `shop_id`) VALUES
(1, 9, 2021, 3, 990750, 1),
(2, 10, 2021, 4, 0, 1),
(3, 9, 2021, 3, 114450, 2),
(4, 10, 2021, 4, 114450, 2),
(5, 11, 2021, 4, 1109280, 1),
(6, 11, 2021, 4, 114450, 2),
(8, 12, 2021, 5, 33868530, 1);

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
  `last_update` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`shop_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_name`, `shop_description`, `shop_owner`, `shop_avatar`, `last_update`, `status`) VALUES
(1, 'Buta 34k', 'Chuyên vẽ bản đồ và in ấn đường đi nước bước', 1, '1738', 3, 1),
(2, 'Kush-shop', 'Deal Cam Kush các loại', 2, '370', 0, 1),
(4, 'Hoàng Anh bư ta', 'Piccasso Việt Nam', 124, '1740', 0, 0),
(6, 'Quang Hưng Shop', 'Chuyên cung cấp', 387, '1742', 0, 1),
(8, 'shop top top', 'game dákdsdsadasddasadsadá', 402, '1754', 0, 0),
(10, 'dasad', 'aáđâsđâsdâsdádâsdâsdâsdâsd', 404, '1760', 1, 1),
(12, 'Bán thằng chuẩn', 'Thằng Chuẩn như cẹc vậy ', 410, '1768', 0, 1),
(14, '234324324', '2423432432423423423423423423432', 414, '1770', 0, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
