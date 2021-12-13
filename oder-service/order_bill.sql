-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th12 13, 2021 lúc 05:27 PM
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
-- Cơ sở dữ liệu: `order_bill`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `oder_id` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `oder_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `oder_customer` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`oder_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11632497116230 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order`
--

INSERT INTO `order` (`oder_id`, `oder_address`, `oder_phone`, `oder_date`, `oder_customer`, `status`) VALUES
('11632500884297', '34k,Phường Phước Nguyên,Thành phố Bà Rịa,Tỉnh Bà Rịa - Vũng Tàu', '0908713697', '2021-09-24 16:28:04', 1, 4),
('11632500884201', '34k,Phường Phước Nguyên,Thành phố Bà Rịa,Tỉnh Bà Rịa - Vũng Tàu', '0908713697', '2021-09-24 16:28:04', 1, 3),
('11632500884299', '34k,Phường Phước Nguyên,Thành phố Bà Rịa,Tỉnh Bà Rịa - Vũng Tàu', '0908713697', '2021-09-24 16:28:04', 1, 2),
('11632500884200', '34k,Phường Phước Nguyên,Thành phố Bà Rịa,Tỉnh Bà Rịa - Vũng Tàu', '0908713697', '2021-09-24 16:28:04', 1, 1),
('11632500884298', '34k,Phường Phước Nguyên,Thành phố Bà Rịa,Tỉnh Bà Rịa - Vũng Tàu', '0908713697', '2021-09-24 16:28:04', 1, 1),
('11636966657075', '34k,Phường Phước Nguyên,Thành phố Bà Rịa,Tỉnh Bà Rịa - Vũng Tàu', '0908713697', '2021-11-15 08:57:37', 1, 4),
('11638975599607', 'Ggggg,Phường 14,Quận Bình Thạnh,Thành phố Hồ Chí Minh', 'Ggggg,Phường 14,Quận Bình Thạnh,Thành phố Hồ Chí Minh', '2021-12-08 14:59:59', 1, 1),
('1241639037674560', 'Pham Anh\n,Xã Hòa Bình Thạnh,Huyện Châu Thành,Tỉnh An Giang', 'Pham Anh\n,Xã Hòa Bình Thạnh,Huyện Châu Thành,Tỉnh An Giang', '2021-12-09 08:14:34', 124, 4),
('3821639203591639', '123 ABC,Phường 02,Quận Bình Thạnh,Thành phố Hồ Chí Minh', '123 ABC,Phường 02,Quận Bình Thạnh,Thành phố Hồ Chí Minh', '2021-12-11 06:19:51', 382, 1),
('3841639203855693', 'dong nai,Phường Linh Tây,Quận Thủ Đức,Thành phố Hồ Chí Minh', 'dong nai,Phường Linh Tây,Quận Thủ Đức,Thành phố Hồ Chí Minh', '2021-12-11 06:24:15', 384, 1),
('11639204075338', '30/3,Phường Hiệp Bình Chánh,Quận Thủ Đức,Thành phố Hồ Chí Minh', '30/3,Phường Hiệp Bình Chánh,Quận Thủ Đức,Thành phố Hồ Chí Minh', '2021-12-11 06:27:55', 1, 0),
('3761639204110159', 'qwewdasd,Xã Cát Tân,Huyện Phù Cát,Tỉnh Bình Định', 'qwewdasd,Xã Cát Tân,Huyện Phù Cát,Tỉnh Bình Định', '2021-12-11 06:28:30', 376, 2),
('3761639204651196', 'dsadasdsa,Xã Kiến An,Huyện Chợ Mới,Tỉnh An Giang', 'dsadasdsa,Xã Kiến An,Huyện Chợ Mới,Tỉnh An Giang', '2021-12-11 06:37:31', 376, 4),
('3801639206189065', '30,Thị trấn Võ Xu,Huyện Đức Linh,Tỉnh Bình Thuận', '30,Thị trấn Võ Xu,Huyện Đức Linh,Tỉnh Bình Thuận', '2021-12-11 07:03:09', 380, 0),
('4001639281143530', 'dđasad,Phường 10,Quận 4,Thành phố Hồ Chí Minh', 'dđasad,Phường 10,Quận 4,Thành phố Hồ Chí Minh', '2021-12-12 03:52:23', 400, 2),
('4001639281266108', 'dsdadsadsadsda,Xã Phú Hưng,Huyện Phú Tân,Tỉnh An Giang', 'dsdadsadsadsda,Xã Phú Hưng,Huyện Phú Tân,Tỉnh An Giang', '2021-12-12 03:54:26', 400, 2),
('4141639392307005', 'dsdsd,Xã Nông Hạ,Huyện Chợ Mới,Tỉnh Bắc Kạn', 'dsdsd,Xã Nông Hạ,Huyện Chợ Mới,Tỉnh Bắc Kạn', '2021-12-13 10:45:07', 414, 0),
('11639409470043', '123,Phường Hiệp Bình Chánh,Quận Thủ Đức,Thành phố Hồ Chí Minh', '123,Phường Hiệp Bình Chánh,Quận Thủ Đức,Thành phố Hồ Chí Minh', '2021-12-13 15:31:10', 1, 1),
('11639409561288', 'Âđ ss,Xã Thạnh Qưới,Huyện Vĩnh Thạnh,Thành phố Cần Thơ', 'Âđ ss,Xã Thạnh Qưới,Huyện Vĩnh Thạnh,Thành phố Cần Thơ', '2021-12-13 15:32:41', 1, 1),
('11639409777343', 'Bbbb,Xã Minh Tân,Huyện Kiến Thuỵ,Thành phố Hải Phòng', 'Bbbb,Xã Minh Tân,Huyện Kiến Thuỵ,Thành phố Hải Phòng', '2021-12-13 15:36:17', 1, 1),
('4161639409870363', ' Bvnvv, ,Quận 5,Thành phố Hồ Chí Minh', ' Bvnvv, ,Quận 5,Thành phố Hồ Chí Minh', '2021-12-13 15:37:50', 416, 1),
('4161639409958472', 'Ggggggg,Xã Hội An,Huyện Chợ Mới,Tỉnh An Giang', 'Ggggggg,Xã Hội An,Huyện Chợ Mới,Tỉnh An Giang', '2021-12-13 15:39:18', 416, 1),
('4161639410037003', 'Vbbbbbbbbb,Xã Tân Phú,Huyện Châu Thành,Tỉnh An Giang', 'Vbbbbbbbbb,Xã Tân Phú,Huyện Châu Thành,Tỉnh An Giang', '2021-12-13 15:40:37', 416, 1),
('4161639410111784', 'Ttggg,Phường 03,Quận 4,Thành phố Hồ Chí Minh', 'Ttggg,Phường 03,Quận 4,Thành phố Hồ Chí Minh', '2021-12-13 15:41:51', 416, 1),
('4161639410163019', 'Gggg,Phường 06,Quận 3,Thành phố Hồ Chí Minh', 'Gggg,Phường 06,Quận 3,Thành phố Hồ Chí Minh', '2021-12-13 15:42:43', 416, 1),
('11639410172566', '12b a ,Phường 14,Quận Bình Thạnh,Thành phố Hồ Chí Minh', '12b a ,Phường 14,Quận Bình Thạnh,Thành phố Hồ Chí Minh', '2021-12-13 15:42:52', 1, 0),
('4161639410202659', 'Ccvv,Phường 09,Quận 4,Thành phố Hồ Chí Minh', 'Ccvv,Phường 09,Quận 4,Thành phố Hồ Chí Minh', '2021-12-13 15:43:22', 416, 3),
('4081639413153896', '123a,Phường 05,Quận 6,Thành phố Hồ Chí Minh', '123a,Phường 05,Quận 6,Thành phố Hồ Chí Minh', '2021-12-13 16:32:33', 408, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_oder`
--

DROP TABLE IF EXISTS `product_oder`;
CREATE TABLE IF NOT EXISTS `product_oder` (
  `oder_id` varchar(249) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `product_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_price` double NOT NULL,
  `product_avatar` int(11) NOT NULL,
  `product_sale` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`,`oder_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_oder`
--

INSERT INTO `product_oder` (`oder_id`, `product_id`, `shop_id`, `product_quantity`, `status`, `product_title`, `product_price`, `product_avatar`, `product_sale`) VALUES
('11632500884299', 1, 1, 2, 2, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 1, 0),
('11632500884299', 21, 2, 4, 2, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 61, 0),
('11632500884298', 21, 2, 4, 1, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 61, 0),
('11632500884298', 1, 1, 2, 1, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 1, 0),
('11632500884297', 1, 1, 2, 4, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 1, 0),
('11632500884297', 21, 2, 4, 4, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 61, 0),
('11632500884201', 1, 1, 2, 3, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 1, 0),
('11632500884201', 21, 2, 4, 3, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 61, 0),
('11632500884200', 1, 1, 2, 1, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 1, 0),
('11632500884200', 21, 2, 4, 1, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 61, 0),
('11636966493359', 3, 1, 3, 1, 'Quần lót nữ thun lạnh đúc su không đường may mặc trong váy dễ thương QL01', 10900, 7, 0),
('11636966657075', 3, 1, 3, 4, 'Quần lót nữ thun lạnh đúc su không đường may mặc trong váy dễ thương QL01', 10900, 7, 0),
('11636966657075', 7, 1, 1, 4, 'Quần ống suông rộng dáng dài loại đẹp Đen - Tím', 99000, 19, 0),
('11638975599607', 38, 2, 1, 1, '?HOT TREND? Đầm ôm body da beo Cao Cấp Màu Sắc Nhã Nhặn Thật Sự Phù Hợp Để Tới Công Sở, Đi Làm Hoặc Đi Chơi', 139000, 112, 0),
('11638975599607', 1, 1, 1, 1, 'Quần lót nữ đúc su thun lạnh cạp ép không viền cao cấp QL16', 10900, 1, 0),
('11638975599607', 30, 2, 1, 0, '?HOT TREND? Đầm Ôm Body REN Cao Cấp Màu Sắc Nhã Nhặn Thật Sự Phù Hợp Để Tới Công Sở, Đi Làm Hoặc Đi Chơi,Free Size<57', 13000, 88, 0),
('1241639037674560', 56, 2, 1, 1, '(50kg-95kg)Thun Lạnh, Co Giãn 4 Chiều, Logo Phản Quang, Áo Thun Nam,', 55000, 166, 0),
('3821639203591639', 167, 2, 4, 1, 'Áo Thun nam nữ loang màu, thời trang hot 2020', 59000, 546, 0),
('3841639203855693', 163, 2, 1, 1, 'Áo Khoác hoodie ( cdk) , Siêu dễ thương , Hàng Cực Chất', 139000, 534, 0),
('11639204075338', 213, 1, 4, 1, 'Kính cường lực iphone 15D REMAX full màn 6/6s/7/7plus/8/8plus/plus/x/xr/xs/11/12/pro/max - case', 74000, 685, 0),
('11639204075338', 161, 2, 1, 1, 'Áo Thun Body Dài Tay Nữ ? Áo Phông Cổ Tròn Dáng Ôm 4 Màu ?', 89000, 528, 0),
('3761639204110159', 161, 2, 70, 1, 'Áo Thun Body Dài Tay Nữ ? Áo Phông Cổ Tròn Dáng Ôm 4 Màu ?', 89000, 528, 0),
('3761639204651196', 162, 1, 300, 4, 'Bộ Quần áo thu đông nam nữ ?FREESHIP? mã TT38  dáng thể dục thể thao hàn quốc đẹp  gồm áo khoác hoodie và quần jogger', 125000, 531, 0),
('3801639206189065', 688, 1, 1, 0, 'Bông tẩy trang 222 miếng Lameila BTT225', 9501.5, 1736, 50),
('4001639281143530', 167, 2, 2, 1, 'Áo Thun nam nữ loang màu, thời trang hot 2020', 59000, 546, 0),
('4001639281143530', 688, 1, 1, 1, 'Bông tẩy trang 222 miếng Lameila BTT225', 9501.5, 1736, 50),
('4001639281266108', 501, 1, 1, 1, 'Combo Camera IP YooSee Tiếng Việt Và Thẻ Nhớ 32Gb Yoosee Chuyên Dụng', 275000, 1084, 0),
('4001639281266108', 500, 2, 1, 1, 'CAMERA IP YOOSEE 360, QUAN SÁT RÕ NGÀY VÀ ĐÊM, KÈM THẺ NHỚ', 269000, 1081, 0),
('4141639392307005', 810, 6, 2, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('11639409470043', 513, 2, 2, 1, 'V -  Camera Wifi dòng P/T EZVIZ CS-C6N (A0-1C2WFR) - Hàng chính hãng', 1950000, 1120, 0),
('11639409470043', 571, 2, 2, 1, 'Ống kính Sony Sonnar T* FE 35mm f/2.8 ZA', 8000000, 1294, 0),
('11639409561288', 161, 2, 1, 1, 'Áo Thun Body Dài Tay Nữ ? Áo Phông Cổ Tròn Dáng Ôm 4 Màu ?', 89000, 528, 0),
('11639409777343', 810, 6, 1, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('4161639409870363', 112, 1, 2, 1, 'Chân váy xếp ly dáng dài (Hàng đẹp)', 107000, 381, 0),
('4161639409958472', 810, 6, 1, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('4161639410037003', 810, 6, 1, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('4161639410111784', 810, 6, 1, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('4161639410163019', 810, 6, 1, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('11639410172566', 810, 6, 1, 0, 'Áo vest đa cấp', 1000, 1750, 0),
('4161639410202659', 810, 6, 1, 1, 'Áo vest đa cấp', 1000, 1750, 0),
('4081639413153896', 812, 1, 1, 1, 'Chó kurama của konoha', 10780000, 1782, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
