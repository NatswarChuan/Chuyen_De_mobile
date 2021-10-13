-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th10 13, 2021 lúc 03:59 AM
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
-- Cơ sở dữ liệu: `user`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `information`
--

DROP TABLE IF EXISTS `information`;
CREATE TABLE IF NOT EXISTS `information` (
  `user_id` int(11) NOT NULL,
  `api_key` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `information_email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information_password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_update` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`information_email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `information`
--

INSERT INTO `information` (`user_id`, `api_key`, `information_email`, `information_password`, `last_update`) VALUES
(1, '', 'natswarchuan@gmail.com', 'c2991999', 0),
(84, '', 'hoanganhk@gmail.com', '123456789', 84),
(3, '', 'anhsonxui@gmail.com', 'd660d76ca3f2be604a2ccf9bcc54f95e', 0),
(75, '', 'hoanganh60k@gmail.com', 'hoanganh11k', 75),
(74, '', 'hoanganh59k@gmail.com', '123', 74),
(73, '', 'hoanganh58k@gmail.com', '123', 73),
(72, '', 'hoanganh57k@gmail.com', '123', 72),
(71, '', 'hoanganh56k@gmail.com', '123', 71),
(69, '', 'hoanganh32k@gmail.com', '123', 69),
(78, '', 'hoanganh63k@gmail.com', '123', 78),
(79, '', 'hoanganh64k@gmail.com', '123', 79),
(80, '', 'hoanganh65k@gmail.com', '123', 80),
(81, '', 'hoanganh66k@gmail.com', '123', 81),
(82, '', 'hoanganh67k@gmail.com', '123', 82),
(83, '', 'hoanganh300k@gmail.com', NULL, 83),
(90, 'EAAOIQ55b79gBAHrqqm79TbWe0sAu6ZCeuvTYcx6TWmKB8L4ZAQpP5RfOZAGSNPbONDG1uiLkrLYfNc5jVwEEuEXK2mo9rrE72nK3POUUjkbQoz3lqFZBntSgZCLAscxTwuo2jsGAhzTJAuk5ujkaU21ymbtZC0QHl0fIbQZCsBmPFbARMR9njVznMVBTajwyhZCYdZCtZCS3mjEKKJXa2Mcx1evFPXk7owH8j1NkSrbB6QEgZDZD', 'hoanganh34k@gmail.com', 'Hoanganh22k', 90),
(92, 'EAAOIQ55b79gBAGBRlZACZBD35PYgyZB5BU2Wo4TABL02LnsP1DamkZAmjaXO36WMFJzOFcX99XAnGZCIjNOdeU08naYDcBkFSaFfZALhvETu2nLXxm0MiTewdwdLrz4DvHUyyFbQ1bwqzBfBJQ6eAWLlsbO9muk4GijZCu50Wmlrxj8cWrbRf8R03UE01bjera7SZCLv8vuW9jKBZBXUzGZCWl2hUHyg3fJMBNlmqXBiWk6AZDZD', 'chuanxin1999@gmail.com', 'null', 92);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `notification_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `notification_date` date DEFAULT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notification`
--

INSERT INTO `notification` (`notification_id`, `notification_description`, `notification_date`) VALUES
(1, 'Cái này là thông báo', '2021-09-19');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification_user`
--

DROP TABLE IF EXISTS `notification_user`;
CREATE TABLE IF NOT EXISTS `notification_user` (
  `user_id` int(11) NOT NULL,
  `notification_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`notification_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notification_user`
--

INSERT INTO `notification_user` (`user_id`, `notification_id`) VALUES
(1, 1),
(2, 1),
(3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permission`
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `permission`
--

INSERT INTO `permission` (`permission_id`, `permission_name`) VALUES
(1, 'Người mua'),
(2, 'Người bán'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `profile_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_birthday` date DEFAULT NULL,
  `profile_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_update` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`profile_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `profile_phone`, `profile_birthday`, `profile_name`, `last_update`) VALUES
(1, 1, '0968241064', '1999-09-29', 'Vũ Minh Chuẩn', 1),
(2, 2, '01999401029', NULL, 'Phạm Hoàng Anh', 0),
(3, 3, '01213448582', NULL, 'Đào Xuân Sơn', 0),
(5, 83, NULL, NULL, NULL, 0),
(6, 84, NULL, NULL, NULL, 0),
(8, 86, '0968241064', NULL, 'Pham Hoang Anh', 0),
(12, 90, '01693444666', '1999-09-28', 'Phạm Anh', 90),
(14, 92, '0968241064', '1999-09-29', 'Vũ Minh Chuẩn', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_key` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_avatar` varchar(249) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_update` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_key`, `user_name`, `user_avatar`, `last_update`, `status`) VALUES
(1, '3', 'Natswar', '661634095886863', 1, 1),
(3, NULL, 'WhiteKing', '7401633320689314', 0, 1),
(83, NULL, 'hoanganh35k', '7401633320689314', 0, 1),
(82, NULL, 'hoanganh67k', NULL, 0, 1),
(81, 'null', 'hoanganh', '123', 81, 81),
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
(69, NULL, 'hoanganh11k', NULL, 0, 1),
(90, NULL, '2051568581664238', NULL, 0, 1),
(92, NULL, '1517619531926611', NULL, 0, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_permission`
--

DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE IF NOT EXISTS `user_permission` (
  `permission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_permission`
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
(2, 83),
(2, 84),
(2, 86),
(1, 88),
(1, 89),
(1, 90),
(1, 92);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
