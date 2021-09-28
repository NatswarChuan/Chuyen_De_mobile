const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
var productModel = require('../Model/ProductModel');
const axios = require('axios');
const { response } = require('express');

/**
 *  lấy danh sách danh mục 
 */
router.get('/all/:option/:key', async (req, res) => {
    let id = req.params.product_id;
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `category` WHERE `status` = 1';
                break;
            case '1':
                sql = 'SELECT * FROM `category`';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) throw error;

            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                let i = 0;
                let length = results.length;
                let n = 0;

                results.map(item => {
                    axios.get(process.env.IMG_URL + `/api/image/get/` + item.category_image + `/` + req.params.key)
                        .then(response => {
                            const { data } = response.data;
                            item.category_image = data;
                        })
                        .catch(error => console.log(error)).finally(() => {
                            i++;
                            if (i === results.length) {
                                let temp = [];
                                for (const element of results) {
                                    dbConn.query('SELECT * FROM `category` WHERE `category_category` = ?', element.category_id, function (error, results, fields) {
                                        if (error) throw error;
                                        element.categories = [];
                                        if (results.length != 0) {
                                            n++;
                                            let x = 0;
                                            let temp_length = results.length;
                                            for (const iterator of results) {
                                                axios.get(process.env.IMG_URL + `/api/image/get/` + iterator.category_image + `/` + req.params.key)
                                                    .then(response => {
                                                        const { data } = response.data;
                                                        iterator.category_image = data;
                                                    })
                                                    .catch(error => console.log(error)).finally(() => {
                                                        element.categories.push(iterator);
                                                        x++;
                                                        n++;
                                                        if (x == temp_length) {
                                                            temp.push(element);
                                                        }
                                                        if (n == length) {
                                                            return res.send({ status: "success", data: temp });
                                                        }
                                                    });
                                            }
                                        }
                                    })
                                }
                            }
                        });
                });
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * lấy các sản phẩm thuộc danh mục
 */
router.get('/get/:category_id/:option/:key', async (req, res) => {
    let id = req.params.category_id;
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `category_product`.`product_id` FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` WHERE `category`.`category_id` = 1 AND `category`.`status` = 1';
                break;
            case '1':
                sql = 'SELECT `category_product`.`product_id` FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` WHERE `category`.`category_id` = 1';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                productModel.getProducts(results, option, req, res);
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * lấy các sản phẩm thuộc danh mục theo trang
 */
router.get('/page/:page/:category_id/:option/:key', async (req, res) => {
    let id = req.params.category_id;
    let key = req.params.key;
    let option = req.params.option;
    let page = req.params.page * 12;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `category_product`.`product_id` FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` WHERE `category`.`category_id` = 1 AND `category`.`status` = 1 ORDER BY `product`.`product_date` DESC LIMIT 1,?';
                break;
            case '1':
                sql = 'SELECT `category_product`.`product_id` FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` WHERE `category`.`category_id` = 1 ORDER BY `product`.`product_date` DESC LIMIT 1,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, [id,page], function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                productModel.getProducts(results, option, req, res);
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);
module.exports = router;