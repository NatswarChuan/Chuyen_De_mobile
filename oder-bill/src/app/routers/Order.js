const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Lấy tất cả đơn hàng theo option
 * */
router.get('/all/:user_id/:option/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.user_id;
    let option = req.params.option;
    let result = [];
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

        dbConn.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                let n = 0;
                let end = results.length;
                results.map((item) => {
                    dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ?', item.oder_id, function (error, results, fields) {
                        if (error) throw error;
                        if (results == null || results.length === 0) {
                            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                        }
                        else {
                            item.product_oder = results;
                            let product_temp = item;
                            let i = 0;
                            let product = [];
                            results.map((item) => {
                                axios.get(process.env.PRODUCT_URL + `/api/product/get/` + item.product_id + `/` + 1 + `/` + req.params.key)
                                    .then(res => {
                                        const { data } = res.data;
                                        results[i].product = data
                                        delete results[i]["product_id"];
                                    })
                                    .catch(error => console.log(error))
                                    .finally(() => {
                                        product.push(results[i]);
                                        i++;
                                        if (i == results.length) {
                                            product_temp.product_oder = product;
                                            result.push(product_temp);
                                            n++;
                                            console.log(results[i]);
                                            if (n == end) {
                                                return res.send({ status: "success", data: result, message: 'tất cả đơn hàng đã đặt' });
                                            }
                                        }
                                    });
                            })
                        }
                    });
                })

            }
        });
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
        console.log(req.cookies.cart);
        if(req.cookies.cart){
            cart = req.cookies.cart;
            for (let i = 0; i < req.cookies.cart.length; i++) {
                axios.get(process.env.PRODUCT_URL + `/api/product/get/` + cart[i].product_id + `/` + 1 + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        cart[i].product = data;
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
    
                        dbConn.query('INSERT INTO `product_oder`(`oder_id`, `product_id`, `product_quantity`) VALUES (?,?,?)', [oder_id, cart[i].product_id, cart[i].qty], function (error, results, fields) {
                            if (error) throw error;
                        });
                        if (i == req.cookies.cart.length - 1) {
                            dbConn.query('INSERT INTO `order`(`oder_id`, `oder_address`, `oder_phone`, `oder_customer`) VALUES (?,?,?,?)', [oder_id, req.body.address, req.body.phone, id], function (error, results, fields) {
                                if (error) throw error;
                            });
                            res.clearCookie('cart');
                            res.send({ status: "success", message: 'đã đặt hàng' });
                        }
                    });
            }
        }
        else{
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
    let oder_id = req.body.oder_id;
    let user_id = req.params.user_id;
    let status = req.body.status;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `order` SET `status`=? WHERE `oder_id` = ? AND `oder_customer` = ?', [status,oder_id,user_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({ status: "success", message: 'cập nhật trạng thái thành công' });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;