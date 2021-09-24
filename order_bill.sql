-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th9 24, 2021 lúc 04:53 PM
-- Phiên bản máy phục vụ: 8.0.21
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `order_bill`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `oder_id` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_phone` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `oder_customer` int NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`oder_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11632497116230 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`oder_id`, `oder_address`, `oder_phone`, `oder_date`, `oder_customer`, `status`) VALUES
('11632500884297', '45/21A', '0908713697', '2021-09-24 16:28:04', 1, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_oder`
--

DROP TABLE IF EXISTS `product_oder`;
CREATE TABLE IF NOT EXISTS `product_oder` (
  `oder_id` varchar(249) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL,
  `product_quantity` int NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`,`oder_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_oder`
--

INSERT INTO `product_oder` (`oder_id`, `product_id`, `product_quantity`, `status`) VALUES
('11632500884297', 1, 2, 0),
('11632500884297', 2, 4, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
