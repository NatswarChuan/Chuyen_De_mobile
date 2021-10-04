-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th10 04, 2021 lúc 04:38 AM
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
-- Cơ sở dữ liệu: `product`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_image` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `category_view` int NOT NULL DEFAULT '0',
  `category_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_category` int DEFAULT NULL,
  `last_update` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`category_id`, `category_image`, `category_view`, `category_name`, `category_category`, `last_update`, `status`) VALUES
(1, '7401633320689314', 0, 'Ốp lưng REAL', 3, 0, 1),
(2, '7401633320689314', 0, 'Ốp lưng FAKE', 3, 0, 1),
(3, '7401633320689314', 0, 'Ốp lưng', NULL, 0, 1),
(4, '7401633320689314', 0, 'a', NULL, 0, 1),
(5, '7401633320689314', 0, 'b', 4, 0, 1),
(6, '7401633320689314', 0, 'c', 4, 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_product`
--

DROP TABLE IF EXISTS `category_product`;
CREATE TABLE IF NOT EXISTS `category_product` (
  `category_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category_product`
--

INSERT INTO `category_product` (`category_id`, `product_id`) VALUES
(1, 1),
(1, 3),
(2, 2),
(2, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `comment_rating` int NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`comment_id`, `user_id`, `comment_rating`, `comment_date`, `comment_content`, `product_id`) VALUES
(1, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 1),
(2, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 2),
(3, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 3),
(4, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 4),
(5, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 1),
(6, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 2),
(7, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 3),
(8, 1, 5, '2021-09-18 17:00:00', 'cái này là comment', 4),
(9, 1, 5, '2021-09-22 08:10:17', 'thêm comment', 2),
(10, 1, 5, '2021-09-22 08:10:17', 'thêm comment', 2),
(11, 1, 5, '2021-09-22 08:10:53', 'thêm comment', 2),
(12, 1, 5, '2021-09-22 08:10:53', 'thêm comment', 2),
(13, 1, 5, '2021-09-22 08:11:26', 'thêm comment', 2),
(14, 1, 5, '2021-09-22 08:11:26', 'thêm comment', 2),
(15, 1, 5, '2021-09-22 08:11:27', 'thêm comment', 2),
(16, 1, 5, '2021-09-22 08:11:29', 'thêm comment', 2),
(17, 1, 5, '2021-09-22 08:11:36', 'thêm comment', 2),
(18, 1, 5, '2021-09-22 08:11:38', 'thêm comment', 2),
(19, 1, 5, '2021-09-22 08:11:39', 'thêm comment', 2),
(20, 1, 5, '2021-09-22 08:11:59', 'thêm comment', 2),
(21, 1, 5, '2021-09-22 08:12:00', 'thêm comment', 2),
(22, 1, 5, '2021-09-22 08:12:02', 'thêm comment', 2),
(23, 1, 5, '2021-09-22 08:12:21', 'thêm comment', 2),
(24, 1, 5, '2021-09-22 08:12:47', 'thêm comment', 2),
(25, 1, 5, '2021-09-27 15:37:34', 'thêm comment cc', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `complaint`
--

DROP TABLE IF EXISTS `complaint`;
CREATE TABLE IF NOT EXISTS `complaint` (
  `complaint_id` int NOT NULL AUTO_INCREMENT,
  `complaint_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`complaint_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `complaint`
--

INSERT INTO `complaint` (`complaint_id`, `complaint_content`, `product_id`) VALUES
(1, 'Cái này là complaint, lời phàn nàn về sản phẩm', 1),
(2, 'Cái này là complaint, lời phàn nàn về sản phẩm', 1),
(3, 'Cái này là complaint, lời phàn nàn về sản phẩm', 2),
(4, 'Cái này là complaint, lời phàn nàn về sản phẩm', 2),
(5, 'Cái này là complaint, lời phàn nàn về sản phẩm', 3),
(6, 'Cái này là complaint, lời phàn nàn về sản phẩm', 3),
(7, 'Cái này là complaint, lời phàn nàn về sản phẩm', 4),
(8, 'Cái này là complaint, lời phàn nàn về sản phẩm', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shop_id` int NOT NULL,
  `product_avatar` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_quantity` int DEFAULT NULL,
  `product_view` double NOT NULL DEFAULT '0',
  `product_price` double NOT NULL,
  `product_sale` int NOT NULL DEFAULT '0',
  `product_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`product_id`, `product_date`, `shop_id`, `product_avatar`, `product_quantity`, `product_view`, `product_price`, `product_sale`, `product_title`, `product_image`, `product_description`, `last_update`, `status`) VALUES
(1, '2021-09-24 08:10:19', 1, '7251633320683170', NULL, 1, 50000, 50, 'Ốp lưng Iphone 14', '7401633320689314,7251633320683170,9191633320677214,7841633320674058,3071633320399941', 'Cái này là ốp lưng', 0, 1),
(2, '2021-09-24 08:10:19', 1, '9191633320677214', 100, 3, 50000, 0, 'Ốp lưng Iphone 15', '7401633320689314,7251633320683170,9191633320677214,7841633320674058,3071633320399941', 'Cái này là ốp lưng', 0, 1),
(3, '2021-09-24 08:10:19', 2, '7841633320674058', NULL, 0, 50000, 0, 'Ốp lưng Iphone 16', '7401633320689314,7251633320683170,9191633320677214,7841633320674058,3071633320399941', 'Cái này là ốp lưng', 0, 1),
(4, '2021-09-24 08:10:19', 2, '3071633320399941', 100, 0, 50000, 0, 'Ốp lưng Iphone 17', '7401633320689314,7251633320683170,9191633320677214,7841633320674058,3071633320399941', 'Cái này là ốp lưng', 0, 1),
(9, '2021-09-28 00:17:42', 1, '7401633320689314', NULL, 0, 1, 0, 'ádasdas', '7401633320689314,7251633320683170,9191633320677214,7841633320674058,3071633320399941', 'ádasdasdasd', 0, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
