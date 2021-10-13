const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
var productModel = require('../Model/ProductModel');
const axios = require('axios');

/**
 * trả về thông tin 1 sản phẩm theo option
 */
router.get('/get/:product_id/:option/:key', async (req, res) => {
    let id = req.params.product_id;
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product`.*,AVG(`comment`.`comment_rating`) AS `product_rating` FROM `product` JOIN `comment` ON `comment`.`product_id` = `product`.`product_id` WHERE `product`.`product_id`=  ? AND status = 1';
                break;
            case '1':
                sql = 'SELECT `product`.*,AVG(`comment`.`comment_rating`) AS `product_rating` FROM `product` JOIN `comment` ON `comment`.`product_id` = `product`.`product_id` WHERE `product`.`product_id`= ?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }

        dbConn.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                let arrImages = results[0].product_image.split(",");
                results[0].product_image = [];
                let i = 0;

                //gọi API image lấy đường dẫn Avatar
                axios.get(process.env.IMG_URL + `/api/image/get/` + results[0].product_avatar + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        results[0].product_avatar = data;
                    })
                    .catch(error => console.log(error));

                //gọi API image lấy đường dẫn các hình ảnh sản phẩm
                arrImages.map(item => {
                    axios.get(process.env.IMG_URL + `/api/image/get/` + item + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            results[0].product_image.push(data);
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            i++;
                            if (i === arrImages.length) {
                                return res.send({ status: "success", data: results[0], message: 'sản phẩm có id=' + id });
                            }
                        });
                });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy nhiều sản phẩm theo option
 */
router.get('/all/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT product_id FROM product WHERE status = 1 ORDER BY `product_date` DESC';
                break;
            case '1':
                sql = 'SELECT product_id FROM product ORDER BY `product_date` DESC';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        dbConn.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                productModel.getProducts(results, option, req, res);
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy nhiều sản phẩm theo từ khóa và option
 */
router.get('/search/:page/:key_search/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    let page = 12 * req.params.page;
    let key_search = '%' + req.params.key_search + '%';
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product_id` FROM `product` WHERE `product_title` LIKE ? AND `status` = 1 ORDER BY `product_date` DESC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product_id` FROM `product` WHERE `product_title` LIKE ? ORDER BY `product_date` DESC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        dbConn.query(sql, [key_search,page], function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                productModel.getProducts(results, option, req, res);
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * cập nhật lượt xem của sản phẩm và trả về thông tin sản phẩm
 */
router.get('/view/:product_id/:option/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        let cookies_view = [];
        //kiểm tra đã tồn tại cookie chưa
        if (req.cookies.view_product) {
            let cookies_view = req.cookies.view_product;
            let view_product = cookies_view.find(function (element) {
                return element.product_id == req.params.product_id;
            });

            //kiểm tra sản phẩm đã tăng view chưa
            if (typeof view_product == 'undefined') {
                cookies_view.push(
                    {
                        product_id: req.params.product_id,
                        expires: Number(new Date(Date.now() + 86400000)),
                    }
                );
                res.cookie('view_product', cookies_view);
                setView(req, res);
            }
            //kiểm tra cookie của sản phẩm đã hết hạn chưa
            else if (view_product.expires <= Number(new Date(Date.now()))) {
                cookies_view.find(element => element.product_id == req.params.product_id).expires = Number(new Date(Date.now() + 86400000));
                res.cookie('view_product', cookies_view);
                setView(req, res);
            } else {
                let product;
                let id = req.params.product_id;
                let option = req.params.option;
                axios.get(process.env.BASE_URL + `/api/product/get/` + id + `/` + option + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        product = data;
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        if (product == null || product.length === 0) {
                            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                        }
                        return res.send({ status: "fail", data: product, message: 'sản phẩm đã không cập nhật lượt xem' });
                    })
            }
        }
        else {
            cookies_view.push(
                {
                    product_id: req.params.product_id,
                    expires: Number(new Date(Date.now() + 86400000)),
                }
            );
            res.cookie('view_product', cookies_view);
            setView(req, res);
        }

        function setView(req, res) {
            let id = req.params.product_id;
            let option = req.params.option;
            let view = 0;
            let product;
            axios.get(process.env.BASE_URL + `/api/product/get/` + id + `/` + option + `/` + req.params.key)
                .then(res => {
                    const { data } = res.data;
                    product = data;
                    if (product == null || product.length === 0) {
                        return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                    }
                    product.product_view++;
                    dbConn.query('UPDATE `product` SET `product_view`= `product_view`+1 WHERE `product_id` = ?', id, function (error, results, fields) {
                        if (error) throw error;
                    });
                })
                .catch(error => console.log(error))
                .finally(() => {
                    if (product == null || product.length === 0) {
                        return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                    }
                    axios.get(process.env.BASE_URL + `/api/product/get/` + id + `/` + option + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            product = data
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            if (product == null || product.length === 0) {
                                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                            }
                            return res.send({ status: "success", data: product, message: 'sản phẩm đã cập nhật lượt xem' });
                        });
                });
        }

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy tất cả sản phẩm thuộc 1 shop
 */
router.get('/shop/:page/:shop_id/:option/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.shop_id;
    let option = req.params.option;
    let page = 12 * req.params.page;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product_id` FROM `product` WHERE `shop_id` = ? AND status = 1 ORDER BY `product_date` DESC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product_id` FROM `product` WHERE `shop_id` = ? ORDER BY `product_date` DESC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }

        dbConn.query(sql, [id,page], function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                productModel.getProducts(results, option, req, res);
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy sản phẩm theo trang
 */
router.get('/page/:page/:type/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    let page = 12 * req.params.page;
    let type = req.params.type;
    if (key == process.env.KEY) {
        let sql = '';
        switch (type) {
            case 'hot':
                type = "`product_view`";
                break;
            case 'new':
                type = "`product_date`";
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        switch (option) {
            case '0':
                sql = 'SELECT product_id FROM product WHERE status = 1 ORDER BY `product`.' + type + ' DESC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT product_id FROM product ORDER BY `product`.' + type + ' DESC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        dbConn.query(sql, page, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                productModel.getProducts(results, option, req, res);
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;