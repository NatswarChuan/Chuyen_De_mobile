-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3307
-- Thời gian đã tạo: Th9 19, 2021 lúc 08:10 AM
-- Phiên bản máy phục vụ: 10.4.13-MariaDB
-- Phiên bản PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `oder_bill`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `oder_id` int(11) NOT NULL AUTO_INCREMENT,
  `oder_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_date` date NOT NULL,
  `oder_customer` int(11) NOT NULL,
  `oder_total_price` double NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`oder_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`oder_id`, `oder_address`, `oder_date`, `oder_customer`, `oder_total_price`, `status`) VALUES
(1, '45/21A Bình Đường 1, An Bình, Dĩ An, Bình Dương', '2021-09-19', 1, 300000, 1),
(2, '720A Điện Biên Phủ, Phường 22,Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh', '2021-09-19', 2, 1000000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_oder`
--

DROP TABLE IF EXISTS `product_oder`;
CREATE TABLE IF NOT EXISTS `product_oder` (
  `oder_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`oder_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_oder`
--

INSERT INTO `product_oder` (`oder_id`, `product_id`, `product_quantity`) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 1),
(2, 1, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
