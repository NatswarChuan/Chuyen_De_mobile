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
    console.log(key, process.env.KEY);
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `category` WHERE `status` = 1 ORDER BY `category`.`category_id` ASC';
                break;
            case '1':
                sql = 'SELECT * FROM `category` ORDER BY `category`.`category_id` ASC';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: `error ${error}` });

            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                let categories = [];

                (
                    async () => {
                        for (let i = 0; i < results.length; i++) {
                            categories.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].category_image + `/` + req.params.key)
                                .then(response => {
                                    const { data } = response.data;
                                    results[i].category_image = data;
                                }))
                        }

                        await Promise.all([...categories]).then(() => {
                            for (let i = 0; i < results.length; i++) {
                                results[i].categories = [];
                                for (let j = 0; j < results.length; j++) {
                                    if (results[i].category_id == results[j].category_category) {
                                        results[i].categories.push(results[j]);
                                    }
                                }
                            }

                            for (let i = 0; i < results.length; i++) {
                                if (results[i].categories.length == 0) {
                                    results.splice(i, 1);
                                    i--;
                                }
                            }
                            return res.send({ status: "success", data: results });
                        })
                    }
                )()
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
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? AND `category`.`status` = 1';
                break;
            case '1':
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            console.log(results)
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            return res.send({ status: "success", data: results, message: 'sản phẩm có id=' });
                        })
                    }
                )()
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
    let page = req.params.page * 10 + 1;
    if (key == process.env.KEY) {
        let sort = '';
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'desc':
                    sort = '`product`.`product_title` DESC,'
                    break;
                case 'asc':
                    sort = '`product`.`product_title` ASC,'
                    break;
                default:
                    break;
            }
        }

        let filter = '';
        if (req.query.begin && req.query.end) {
            filter = 'AND `product`.`product_price` <= ' + req.query.end + ' AND `product`.`product_price` >= ' + req.query.begin
        }

        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? AND `category`.`status` = 1 ' + filter + ' ORDER BY ' + sort + ' `product`.`product_date` DESC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? ' + filter + ' ORDER BY ' + sort + ' `product`.`product_date` DESC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, [id, page], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            let isload = results.length < page;
                            if(!isload){
                                results.splice(results.length - 1, 1);
                            }
                            return res.send({ status: "success", isload: !isload, data: results, message: 'sản phẩm có id=' });
                        })
                    }
                )()
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);
module.exports = router;