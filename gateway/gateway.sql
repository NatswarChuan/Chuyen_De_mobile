-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3308
-- Thời gian đã tạo: Th10 19, 2021 lúc 03:20 AM
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
-- Cơ sở dữ liệu: `gateway`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `api`
--

DROP TABLE IF EXISTS `api`;
CREATE TABLE IF NOT EXISTS `api` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `api`
--

INSERT INTO `api` (`id`, `url`, `type`, `description`, `service_id`) VALUES
(1, '/api/image/get/:image_id/:key', 1, '', 1),
(3, '/api/slider/all/:key', 1, '', 1),
(18, '/api/user/loginUser', 1, '//lấy thông tin tài khoản khi đã xác thực\r\n', 4),
(6, '/api/image/save/:key', 0, 'Lưu hình', 1),
(8, '/api/image/photo/:photo/:key', 1, 'Trả về hình ảnh', 1),
(10, '/api/image/remove/:photo/:key', 1, 'Xóa hình', 1),
(12, '/api/image/update/:image_id/:key', 0, 'sửa hình', 1),
(14, '/api/user/create/:user_permission/:user_name/:user_password/:user_email/:key', 1, '1.Thêm user trên app người dùng\r\n', 4),
(16, '/api/user/login/:user_email/:user_password/:key', 1, '//Xác thực login trên hệ thống', 4),
(20, '/api/user/logout', 1, '//Hàm đăng xuất\r\n', 4),
(22, '/api/user/get/profile', 1, '//Hàm lấy thông tin người dùng\r\n', 4),
(24, '/api/user/check/login', 1, '//Hàm Kiểm tra trạng thái login\r\n', 4),
(26, '/api/user/get/user', 1, '//Hàm lấy thông tin user\r\n', 4),
(28, '/api/user/get/user/by/:id', 1, '//Hàm lấy thông tin user theo id\r\n', 4),
(30, '/api/user/update/user/:user_key/:user_name/:user_avatar/:status', 1, '//Hàm Update user\r\n', 4),
(32, '/api/user/update/profile/:profile_name/:profile_phone/:profile_birthday', 1, '//Hàm update profile\r\n', 4),
(34, '/api/product/get/:product_id/:option/:key', 1, 'trả về thông tin 1 sản phẩm theo option', 2),
(36, '/api/product/all/:option/:key', 1, 'lấy nhiều sản phẩm theo option', 2),
(38, '/api/product/search/:page/:key_search/:option/:key', 1, 'lấy nhiều sản phẩm theo từ khóa và option', 2),
(40, '/api/product/view/:product_id/:option/:key', 1, 'cập nhật lượt xem của sản phẩm và trả về thông tin sản phẩm', 2),
(42, '/api/product/shop/:page/:shop_id/:option/:key', 1, 'lấy tất cả sản phẩm thuộc 1 shop', 2),
(44, '/api/product/page/:page/:type/:option/:key', 1, 'lấy sản phẩm theo trang', 2),
(46, '/api/user/forgot/password/:email', 1, '//Hàm đặt lại mật khẩu gửi mail code\r\n', 4),
(48, '/api/user/forgot/password/checkPin/:email/:codePin', 1, '//Hàm check codePin\r\n', 4),
(50, '/api/user/forgot/password/center/:email/:password', 1, '//Hàm đổi mật khẩu\r\n', 4),
(52, '/api/complaint/insert/:key', 0, 'thêm complaint của người dùng', 2),
(54, '/api/comment/all/:product_id/:key', 1, 'lấy comment của sản phẩm', 2),
(56, '/api/comment/insert/:key', 0, 'thêm comment của người dùng', 2),
(58, '/api/category/all/:option/:key', 1, 'lấy danh sách danh mục ', 2),
(60, '/api/category/get/:category_id/:option/:key', 1, 'lấy các sản phẩm thuộc danh mục', 2),
(62, '/api/category/page/:page/:category_id/:option/:key', 1, 'lấy các sản phẩm thuộc danh mục theo trang', 2),
(64, '/api/shop/info/:shop_id/:option/:key', 1, 'lấy thông tin shop', 3),
(66, '/api/oder/all/:user_id/:option/:key', 1, 'Lấy tất cả đơn hàng theo option', 6),
(68, '/api/oder/save/:user_id/:key', 0, 'Lưu đơn hàng từ giỏ hàng', 6),
(70, '/api/oder/change/:user_id/:key', 0, 'Cập nhật trạng thái đơn hàng', 6),
(72, '/api/cart/add/:product_id/:key', 1, 'Thêm sản phẩm vào giỏ hàng', 6),
(74, '/api/cart/all/:key', 1, 'Lấy tất cả sản phẩm trong giỏ hàng', 6),
(76, '/api/cart/update/:product_id/:qty/:key', 1, 'cập nhật giỏ hàng', 6),
(78, '/api/user/login/facebook/:user_permission/:api_key/:user_email/:user_name/:full_name/:key', 1, '//1.Login facebook trên app người dùng\r\n', 4),
(80, '/api/access/update/:key', 1, 'cập nhật lượt truy cập vào App', 8),
(81, '/api/product/insert/:shop_id/:key', 0, 'thêm sản phẩm', 2),
(82, '/api/product/delete/:shop_id/:key', 0, 'xóa sản phẩm', 2),
(83, '/api/product/update/:shop_id/:key', 0, 'sửa sản phẩm', 2),
(84, '/api/oder/change_product/:key', 0, 'Cập nhật trạng thái sản phẩm trong giỏ hàng giỏ hàng', 6),
(85, '/api/oder/get/:oder_id/:key', 0, 'Lấy đơn hàng theo id', 6),
(86, '/api/oder/get_shop/:shop_id/:key', 0, 'Lấy đơn hàng theo shop id', 6),
(88, '/api/address/city/:key', 1, 'Lấy danh sách thành phố', 10),
(90, '/api/address/district/:id/:key', 1, 'Lấy danh sách quận huyện theo thành phố', 10),
(92, '/api/address/ward/:id/:key', 1, 'Lấy danh sách phường xã theo quận huyện', 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_ip` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `service`
--

INSERT INTO `service` (`id`, `service_name`, `service_ip`) VALUES
(8, 'Admin', '127.0.0.1:3005'),
(2, 'Product', '127.0.0.1:3001'),
(4, 'User', '127.0.0.1:3000'),
(3, 'Shop', '127.0.0.1:3003'),
(6, 'Oder', '127.0.0.1:3004'),
(10, 'Address', '127.0.0.1:3006');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
