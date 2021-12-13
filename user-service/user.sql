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
(1, '', 'natswarchuan@gmail.com', '43c1d1020f1db8b5c1316631d98af3644eb883ec125235958368058f9ab0be25', 0),
(372, NULL, 'hoanganh00k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 372),
(374, NULL, 'hoanganh-1k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 374),
(376, NULL, 'huyson@gmail.com', '2b766d30a9a4fe4d91de103804987e337428955409ff5c88bb249bc4bf628f2e', 376),
(370, NULL, 'hoanganh10000k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 370),
(124, 'EAAOIQ55b79gBAB9XVy83ljj92PwzgJxdNR5P9BZBIZATRhVtDniPqm8xuhZBxeTZC17ZBn4Xxaen0obkXSr9P0vnm5xvraCoHkynbbfZAIMnDXsBpBUtkcAaJdLUo5C70O8tP8zR1EsBsyOPZBJJH2EQCHqJE2Jw4UCExf1Bs5uicQljWkAaeg1sMb147iDlzBsFoy81HYJDJl3CUrgEX05GYvzXjAvz7nNZBqNOeOFlLgZDZD', 'hoanganh34k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 124),
(414, NULL, 'denvau1@gmail.com', '15bb09147fe81cc9006262b925bbe8b77dd3c89d8220c82a9dee82765feb2440', 414),
(422, NULL, 'hoanganh344k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 422),
(420, NULL, 'hoanganh394k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 420),
(418, NULL, 'son@gmail.com', '15bb09147fe81cc9006262b925bbe8b77dd3c89d8220c82a9dee82765feb2440', 418),
(416, NULL, 'Cccccc@gmail.com', '584dc6ee5eb919d0f2656d35fc307035084206389e986ce5debd7fee245587c4', 416),
(412, 'EAAOIQ55b79gBAGe2P55sqOifZC8EpbPZAq2zTEh2n82wI5qFDZAj9L8jME2WNtdTtsN9oC7zcs0hzAGZAtXwSuh0GcbUrQFssOdYnnEZA9Qz6H0QHFY1h1iBomHPgxwlwvjqL0SaDb0QVxT9oM52HauMwdeO2Lc48McEjpoR7zH36sJ3cWP4chdeE10K06bvMcKN7PYBzSik6EVboga18iYl1tCWjnH3ZA5LmLk9YZAgAZDZD', 'chuanxin1999@gmail.com', 'null', 412),
(410, NULL, 'Chuanxin2909@gmail.com', '43c1d1020f1db8b5c1316631d98af3644eb883ec125235958368058f9ab0be25', 410),
(408, NULL, 'tokiowww112@gmail.com', 'a78abecc26080b8ea636e289d3e8e7a8caff1913a75e91f020c9f359ee6f024d', 408),
(406, NULL, 'duyngu@gmail.com', '49cd5c7b5344d6b74cfdf81f3fc51341d417c6a9067fbacef07cd632ba7ee29b', 406),
(404, NULL, 'denvau@gmail.com', '49cd5c7b5344d6b74cfdf81f3fc51341d417c6a9067fbacef07cd632ba7ee29b', 404),
(402, NULL, 'redropaspe@vusra.com', '49cd5c7b5344d6b74cfdf81f3fc51341d417c6a9067fbacef07cd632ba7ee29b', 402),
(400, NULL, 'goltejemlu@vusra.com', '002a0394de1e41fcbb42303024038ee4a6cf0087d1af5e80c08e39d21a87cfc2', 400),
(398, NULL, 'hoanganh-2k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 398),
(396, NULL, 'bbgk198@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 396),
(394, NULL, 'a@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 394),
(392, NULL, 'oanh1@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 392),
(390, NULL, 'hoanganh1001k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 390),
(388, NULL, 'oanh@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 388),
(387, NULL, 'qh2147135@gmail.com', '3791a490cd06c61e9c192723d38dd8e7cb729d61228a72b591bdf334e6039319', 387),
(384, NULL, 'triettm.40@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 384),
(386, 'EAAOIQ55b79gBANteEmVswninzTXZAnuivJN1NZAvHLWGaMMqriHgBP5URSuDO2hbZAiqXbMoCDMZCxTZC8EZB2ZBWwk9cjKfUyBY1VgRPif50cpawUaRjQc0Np1jTN3A2ZAQss0k9scbdpK3LIwjgmEBmrAAvZBBRnFxU4X5PgK3LaKdEv5uAc9s5hvVsNxuG2QKCZBOLVMb7eZAmEs4IZBjzDIb', 'terminator12988@yahoo.com', 'null', 386),
(383, NULL, 'kuteemoie@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 383),
(382, 'undefined', 'undefined', 'null', 382),
(380, NULL, 'haise@gmail.com', 'd7a9fd7320d80bccfdd83e548b7d841f05ae947f396df6ba417e51ddd43ac21a', 380),
(368, NULL, 'hoanganh1000k@gmail.com', '16d42ffaf7919ff9ca107c02a5bdf53184ec06e74adcb3438748b442501df160', 368),
(378, NULL, 'ndhoang129@gmail.com', 'c1dba764d1828b748d71257d2020b49530f633d7e06c960d29b47b9e2b07a776', 378);

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
(2, 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `profile`
--

INSERT INTO `profile` (`profile_id`, `user_id`, `profile_phone`, `profile_birthday`, `profile_name`, `last_update`) VALUES
(1, 1, '0908713697', '1999-09-29', 'Vũ Minh Chuẩn qq', 1),
(2, 2, '01999401029', NULL, 'Phạm Hoàng Anh', 0),
(46, 124, '0968241064', '1970-01-23', 'Phạm Anh', 124),
(344, 422, NULL, NULL, NULL, 0),
(342, 420, '0968241064', '1989-01-02', 'Phạm Anh 2', 420),
(340, 418, NULL, NULL, NULL, 0),
(338, 416, NULL, NULL, NULL, 0),
(336, 414, '0338324059', '1972-07-10', 'adấ', 414),
(334, 412, NULL, NULL, 'Vũ Minh Chuẩn', 0),
(332, 410, NULL, NULL, NULL, 0),
(330, 408, NULL, NULL, NULL, 0),
(328, 406, NULL, NULL, NULL, 0),
(326, 404, NULL, NULL, NULL, 0),
(324, 402, NULL, NULL, NULL, 0),
(322, 400, NULL, NULL, NULL, 0),
(320, 398, NULL, NULL, NULL, 0),
(318, 396, NULL, NULL, NULL, 0),
(316, 394, NULL, NULL, NULL, 0),
(314, 392, NULL, NULL, NULL, 0),
(312, 390, NULL, NULL, NULL, 0),
(310, 388, NULL, NULL, NULL, 0),
(309, 387, NULL, NULL, NULL, 0),
(308, 386, NULL, NULL, 'Đức Hoàng Nguyễn', 0),
(306, 384, NULL, NULL, NULL, 0),
(305, 383, NULL, NULL, NULL, 0),
(304, 382, NULL, NULL, NULL, 0),
(302, 380, '0868322564', '1970-01-02', 'kakashi', 380),
(300, 378, NULL, NULL, NULL, 0),
(298, 376, NULL, NULL, NULL, 0),
(296, 374, '0968241064', '1970-01-22', 'Pham Anh', 374),
(294, 372, '0968241064', '1970-01-31', 'Phamanh2', 372),
(292, 370, '0968241064', '1970-01-30', 'Phamanh', 370),
(290, 368, '0968241064', '1970-01-30', 'Phạm Hoàng Anh ', 368);

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
) ENGINE=MyISAM AUTO_INCREMENT=423 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `user_key`, `user_name`, `user_avatar`, `last_update`, `status`) VALUES
(1, '3', 'Natswar', '1784', 1, 1),
(368, NULL, 'Phạm Anh', '1706', 368, 1),
(370, NULL, 'Anhpham123', '1708', 370, 1),
(372, NULL, 'Phamanh', '1710', 372, 1),
(374, NULL, 'phâmnh3', '1732', 374, 1),
(376, NULL, 'Huy son', NULL, 0, 1),
(378, NULL, 'ndhoang', NULL, 0, 1),
(380, NULL, 'haise', '0', 380, 0),
(382, NULL, 'undefined', NULL, 0, 1),
(383, NULL, 'kuteemoie', NULL, 0, 1),
(384, NULL, 'triet2k4', NULL, 0, 1),
(386, NULL, '4729017617136771', NULL, 0, 1),
(124, NULL, '2051568581664238', '1710', 124, 1),
(422, NULL, 'Phâmnh23', NULL, 0, 1),
(420, NULL, 'anhyeu123', '1812', 420, 1),
(418, NULL, 'son dieu', NULL, 0, 1),
(416, NULL, 'Cccccvv', NULL, 0, 1),
(414, NULL, 'dden', '1776', 414, 1),
(412, NULL, '1517619531926611', NULL, 0, 1),
(410, NULL, 'Son xui', NULL, 0, 1),
(408, NULL, 'Son Hoi Xui', NULL, 0, 1),
(406, NULL, 'duy shipper', NULL, 0, 1),
(404, NULL, 'xu xu', NULL, 0, 0),
(402, NULL, 'xu', NULL, 0, 1),
(400, NULL, 'son xu', NULL, 0, 1),
(398, NULL, 'PhamAnh22k', NULL, 0, 1),
(396, NULL, 'Brian', NULL, 0, 1),
(394, NULL, 'hihi', NULL, 0, 1),
(392, NULL, 'oanh oanh', NULL, 0, 1),
(390, NULL, 'Vũ Minh Chuẩn', NULL, 0, 1),
(388, NULL, 'Kiều Oanh', NULL, 0, 1),
(387, NULL, 'Hưng Trần', NULL, 0, 1);

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
(1, 370),
(1, 368),
(2, 1),
(1, 400),
(4, 124),
(1, 422),
(1, 420),
(1, 418),
(1, 416),
(1, 414),
(1, 412),
(1, 410),
(1, 408),
(4, 406),
(1, 404),
(1, 402),
(1, 398),
(1, 396),
(1, 394),
(1, 392),
(3, 390),
(1, 388),
(1, 387),
(1, 386),
(1, 384),
(1, 383),
(1, 382),
(1, 380),
(1, 378),
(1, 376),
(3, 1),
(1, 374),
(1, 372);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
