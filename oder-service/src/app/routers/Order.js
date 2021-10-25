const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

function getOder(id, res, req) {
    dbConn.query('SELECT * FROM `order`  WHERE `oder_id` = ?', id, function (error, results, fields) {
        if (error) return res.send({ status: "fail",  message: error });
        if (results == null || results.length === 0) {
            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
        }
        else {
            dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ?', id, function (error, results, fields) {
                if (error) return res.send({ status: "fail",  message: error });
                if (results == null || results.length === 0) {
                    return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                }
                else {
                    let arr2 = [];
                    for (let j = 0; j < results.length; j++) {
                        arr2.push(
                            axios.get(process.env.PRODUCT_URL + `/api/product/get/` + results[j].product_id + `/` + 1 + `/` + req.params.key)
                                .then(res => {
                                    const { data } = res.data;
                                    results[j].product = data
                                    delete results[j]["product_id"];
                                })
                        )
                    }

                    Promise.all([...arr2]).then(() => {
                        res.send({ status: "success", data: results, message: "" })
                    })
                }
            });

        }
    });
}

function getOders(req, res, sql, id) {
    dbConn.query(sql, id, function (error, results, fields) {
        if (error) return res.send({ status: "fail",  message: error });
        if (results == null || results.length === 0) {
            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
        }
        else {

            let oderArr = results;
            let arr1 = [];
            for (let i = 0; i < oderArr.length; i++) {
                arr1.push(
                    new Promise(function (resolve, reject) {
                        dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ?', oderArr[i].oder_id, function (error, results, fields) {
                            if (error) return res.send({ status: "success",  message: error });
                            if (results == null || results.length === 0) {
                                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                            }
                            else {
                                oderArr[i].product_oder = results;
                                resolve();
                            }
                        })
                    }
                    )
                );
            }

            Promise.all([...arr1]).then(() => {
                let arr2 = [];
                for (let i = 0; i < oderArr.length; i++) {
                    for (let j = 0; j < oderArr[i].product_oder.length; j++) {
                        arr2.push(
                            axios.get(process.env.PRODUCT_URL + `/api/product/get/` + oderArr[i].product_oder[j].product_id + `/` + 1 + `/` + req.params.key)
                                .then(res => {
                                    const { data } = res.data;
                                    oderArr[i].product_oder[j].product = data
                                    delete oderArr[i]["product_id"];
                                })
                        )
                    }
                }

                Promise.all([...arr2]).then(() => {
                    res.send({ status: "success", data: oderArr, message: "" })
                })
            })

        }
    });
}

/**
 * Lấy tất cả đơn hàng theo option
 * */
router.get('/all/:user_id/:option/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.user_id;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `order`  WHERE `status` = 0 AND `oder_customer` = ?';
                break;
            case '1':
                sql = 'SELECT * FROM `order`  WHERE `status` = 1 AND `oder_customer` = ?';
                break;
            case '2':
                sql = 'SELECT * FROM `order`  WHERE `status` = 2 AND `oder_customer` = ?';
                break;
            case '3':
                sql = 'SELECT * FROM `order` WHERE `oder_customer` = ?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }

        getOders(req, res, sql, id);
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lưu đơn hàng từ giỏ hàng
 */
router.post('/save/:user_id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.user_id;
    if (key == process.env.KEY) {
        let oder_id = id + Number(Date.now());
        if (req.cookies.cart) {
            cart = req.cookies.cart;
            for (let i = 0; i < req.cookies.cart.length; i++) {
                axios.get(process.env.PRODUCT_URL + `/api/product/get/` + cart[i].product_id + `/` + 1 + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        cart[i].product = data;
                    })
                    .finally(() => {

                        dbConn.query('INSERT INTO `product_oder`(`oder_id`, `product_id`, `product_quantity`,`shop_id`) VALUES (?,?,?,?)', [oder_id, cart[i].product_id, cart[i].qty, cart[i].shop_id], function (error, results, fields) {
                            if (error) return res.send({ status: "fail",  message: error });
                        });
                        if (i == req.cookies.cart.length - 1) {
                            dbConn.query('INSERT INTO `order`(`oder_id`, `oder_address`, `oder_phone`, `oder_customer`) VALUES (?,?,?,?)', [oder_id, req.body.address, req.body.phone, id], function (error, results, fields) {
                                if (error) return res.send({ status: "fail",  message: error });
                            });
                            res.clearCookie('cart');
                            res.send({ status: "success", message: 'đã đặt hàng' });
                        }
                    });
            }
        }
        else {
            return res.send({ status: "fail", message: 'đặt hàng thất bại' });
        }
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cập nhật trạng thái giỏ hàng
 */
router.post('/change/:user_id/:key', async (req, res) => {
    let key = req.params.key;
    let user_id = req.params.user_id;
    let oder_id = req.body.oder_id;
    let status = req.body.status;
    if (key == process.env.KEY) {
        if (status == 0) {
            dbConn.query('UPDATE `order` SET `status`=? WHERE `oder_id` = ? AND `oder_customer` = ?', [status, oder_id, user_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail",  message: error });
                dbConn.query('UPDATE `product_oder` SET `status`= ? WHERE `oder_id` = ?', [status, oder_id], function (error, results, fields) {
                    if (error) return res.send({ status: "fail",  message: error });
                    getOders(req, res, 'SELECT * FROM `order` WHERE `oder_customer` = ?', user_id);
                });
            });
        }
        else {
            dbConn.query('SELECT COUNT(`product_oder`.`product_id`) AS COUNT FROM `product_oder` WHERE `oder_id`= ? AND `status` != 0', oder_id, function (error, results, fields) {
                if (error) return res.send({ status: "fail",  message: error });
                if (results[0].COUNT == 0) {
                    getOders(req, res, 'SELECT * FROM `order` WHERE `oder_customer` = ?', user_id);
                } else {
                    dbConn.query('UPDATE `order` SET `status`=? WHERE `oder_id` = ? AND `oder_customer` = ?', [status, oder_id, user_id], function (error, results, fields) {
                        if (error) return res.send({ status: "fail",  message: error });
                        getOders(req, res, 'SELECT * FROM `order` WHERE `oder_customer` = ?', user_id);
                    });
                }
            });
        }

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cập nhật trạng thái sản phẩm trong giỏ hàng giỏ hàng
 */

router.post('/change_product/:key', async (req, res) => {
    let key = req.params.key;
    let oder_id = req.body.oder_id;
    let product_id = req.body.product_id;
    let status = req.body.status;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `product_oder` SET `status`= ? WHERE `product_id` = ? AND `oder_id` = ?', [status, product_id, oder_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail",  message: error });
            let count = 0;
            let oder_product_count = [];
            dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? AND `status` = ?', [oder_id, status], function (error, results, fields) {
                if (error) return res.send({ status: "fail",  message: error });
                oder_product_count = results.length;
                dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? ', oder_id, function (error, results, fields) {
                    if (error) return res.send({ status: "fail",  message: error });
                    count = results.length;
                    if (oder_product_count == count) {
                        dbConn.query('UPDATE `order` SET `status`= ? WHERE `oder_id` = ?', [status, oder_id], function (error, results, fields) {
                            if (error) return res.send({ status: "fail",  message: error });
                            getOder(oder_id, res, req)
                        });
                    } else {
                        getOder(oder_id, res, req)
                    }
                });

            });

        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy đơn hàng theo id
 * */
router.get('/get/:oder_id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.oder_id;
    if (key == process.env.KEY) {
        getOder(id, res, req)
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy đơn hàng theo shop id
 * */
router.get('/get_shop/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.shop_id;
    if (key == process.env.KEY) {
        let result = [];
        dbConn.query('SELECT DISTINCT `order`.* FROM `product_oder` JOIN `order` ON `product_oder`.`oder_id` = `order`.`oder_id` WHERE `product_oder`.`shop_id` =  ?', id, function (error, results, fields) {
            if (error) return res.send({ status: "fail",  message: error });
            result = results;
            let arr1 = [];
            for (let i = 0; i < results.length; i++) {
                arr1.push(new Promise(function (resolve, reject) {
                    dbConn.query('SELECT `product_oder`.* FROM `product_oder` JOIN `order` ON `product_oder`.`oder_id` = `order`.`oder_id` WHERE `product_oder`.`shop_id` = ? AND `product_oder`.`oder_id` = ?', [id, results[i].oder_id], function (error, results, fields) {
                        if (error) return res.send({ status: "fail",  message: error });
                        result[i].product_oder = results;
                        resolve();
                    })
                }))
            }
            Promise.all([...arr1]).then(() => {
                let arr2 = []
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < results[i].product_oder.length; j++) {
                        arr2.push(axios.get(process.env.PRODUCT_URL + `/api/product/get/` + results[i].product_oder[j].product_id + `/` + 0 + `/` + req.params.key)
                            .then(res => {
                                const { data } = res.data;
                                results[i].product_oder[j].product = data
                                delete results[i].product_oder[j]["product_id"];
                            }));
                    }
                }
                Promise.all([...arr2]).then(() => {
                    return res.send({ status: "success", data: result, message: '' });
                })
            })


        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;