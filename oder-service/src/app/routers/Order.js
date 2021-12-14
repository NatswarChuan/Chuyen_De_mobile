const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

function getOder(id, res, req) {
    dbConn.query('SELECT * FROM `order`  WHERE `oder_id` = ?', id, function (error, results, fields) {
        if (error) return res.send({ status: "fail", message: error });
        let data = results[0];
        if (results == null || results.length === 0) {
            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
        }
        else {
            dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ?', id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                if (results == null || results.length === 0) {
                    return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                }
                else {
                    let arr2 = [];
                    for (let j = 0; j < results.length; j++) {
                        let product = {};
                        product.product_title = results[j].product_title;
                        product.product_price = results[j].product_price;
                        product.product_sale = results[j].product_sale;
                        arr2.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[j].product_avatar + `/` + process.env.KEY)
                            .then(res => {
                                const { data } = res.data;
                                product.product_avatar = data;
                                results[j].product = product
                                delete results[j]['product_title'];
                                delete results[j]['product_price'];
                                delete results[j]['product_avatar'];
                                delete results[j]['product_sale'];
                            }));
                    }

                    Promise.all([...arr2]).then(() => {
                        data.product_oder = results
                        res.send({ status: "success", data: data, message: "" })
                    })
                }
            });

        }
    });
}

function getOders(req, res, sql, id) {
    dbConn.query(sql, id, function (error, results, fields) {
        if (error) return res.send({ status: "fail", message: error });
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
                            if (error) return res.send({ status: "success", message: error });
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
                        let product = {};
                        product.product_title = oderArr[i].product_oder[j].product_title;
                        product.product_price = oderArr[i].product_oder[j].product_price;
                        product.product_sale = oderArr[i].product_oder[j].product_sale;
                        arr2.push(axios.get(process.env.IMG_URL + `/api/image/get/` + oderArr[i].product_oder[j].product_avatar + `/` + process.env.KEY)
                            .then(res => {
                                const { data } = res.data;
                                product.product_avatar = data;
                                oderArr[i].product_oder[j].product = product
                                delete oderArr[i].product_oder[j]['product_title'];
                                delete oderArr[i].product_oder[j]['product_price'];
                                delete oderArr[i].product_oder[j]['product_avatar'];
                                delete oderArr[i].product_oder[j]['product_sale'];
                            }));
                    }
                }

                Promise.all([...arr2]).then(() => {
                    res.send({ status: "success", data: oderArr, message: "" })
                })
            })

        }
    });
}

function getOders_admin(req, res, sql, id) {
    dbConn.query(sql, id, function (error, results, fields) {
        if (error) return res.send({ status: "fail", message: error });
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
                            if (error) return res.send({ status: "success", message: error });
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
                    arr2.push(axios.get(process.env.USER_URL + `/api/user/get/user/by/` + oderArr[i].oder_customer)
                    .then(res => {
                        const { data } = res.data;
                        oderArr[i].oder_customer = data;
                    }))
                    for (let j = 0; j < oderArr[i].product_oder.length; j++) {
                        let product = {};
                        product.product_title = oderArr[i].product_oder[j].product_title;
                        product.product_price = oderArr[i].product_oder[j].product_price;
                        product.product_sale = oderArr[i].product_oder[j].product_sale;
                        arr2.push(axios.get(process.env.IMG_URL + `/api/image/get/` + oderArr[i].product_oder[j].product_avatar + `/` + process.env.KEY)
                            .then(res => {
                                const { data } = res.data;
                                product.product_avatar = data;
                                oderArr[i].product_oder[j].product = product
                                delete oderArr[i].product_oder[j]['product_title'];
                                delete oderArr[i].product_oder[j]['product_price'];
                                delete oderArr[i].product_oder[j]['product_avatar'];
                                delete oderArr[i].product_oder[j]['product_sale'];
                            }));
                    }
                }

                Promise.all([...arr2]).then(() => {
                    res.send({ status: "success", data: oderArr, message: "" })
                })
            })

        }
    });
}

function getOder_admin(id, res, req) {
    dbConn.query('SELECT * FROM `order`  WHERE `oder_id` = ?', id, function (error, results, fields) {
        if (error) return res.send({ status: "fail", message: error });
        let data = results[0];
        if (results == null || results.length === 0) {
            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
        }
        else {
            dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ?', id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                if (results == null || results.length === 0) {
                    return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                }
                else {
                    let arr2 = [];
                    arr2.push(axios.get(process.env.USER_URL + `/api/user/get/user/by/` + data.oder_customer)
                    .then(res => {
                        data.oder_customer = res.data.data;
                    }))
                    for (let j = 0; j < results.length; j++) {
                        let product = {};
                        product.product_title = results[j].product_title;
                        product.product_price = results[j].product_price;
                        product.product_sale = results[j].product_sale;
                        arr2.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[j].product_avatar + `/` + process.env.KEY)
                            .then(res => {
                                const { data } = res.data;
                                product.product_avatar = data;
                                results[j].product = product
                                delete results[j]['product_title'];
                                delete results[j]['product_price'];
                                delete results[j]['product_avatar'];
                                delete results[j]['product_sale'];
                            }));
                    }

                    Promise.all([...arr2]).then(() => {
                        data.product_oder = results
                        res.send({ status: "success", data: data, message: "" })
                    })
                }
            });

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
                sql = 'SELECT * FROM `order`  WHERE `status` = 0 AND `oder_customer` = ? ORDER BY `order`.`oder_date` DESC';
                break;
            case '1':
                sql = 'SELECT * FROM `order`  WHERE `status` = 1 AND `oder_customer` = ? ORDER BY `order`.`oder_date` DESC';
                break;
            case '2':
                sql = 'SELECT * FROM `order`  WHERE `status` = 2 AND `oder_customer` = ? ORDER BY `order`.`oder_date` DESC';
                break;
            case '3':
                sql = 'SELECT * FROM `order` WHERE `oder_customer` = ? ORDER BY `order`.`oder_date` DESC';
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
    const phone = req.body.phone;
    const address = req.body.address;
    if (key == process.env.KEY) {
        let oder_id = id + Number(Date.now());
        if (req.cookies.cart) {
            cart = req.cookies.cart;
            let datas = [];
            for (let i = 0; i < req.cookies.cart.length; i++) {
                datas.push(new Promise((resolve, reject) => {
                    axios.get(process.env.PRODUCT_URL + `/api/product/get/` + cart[i].product_id + `/` + 1 + `/` + req.params.key)
                        .then(ress => {
                            const { data } = ress.data;
                            cart[i].product = data;
                            product_price = data.product_price * (100 - data.product_sale) / 100;
                            dbConn.query('INSERT INTO `product_oder`(`oder_id`, `product_id`, `product_quantity`,`shop_id`,`product_title`,`product_price`,`product_avatar`,`product_sale`) VALUES (?,?,?,?,?,?,?,?)',
                                [oder_id, data.product_id, cart[i].qty, data.shop_id, data.product_title, product_price, data.product_avatar_id, data.product_sale], function (error, results, fields) {
                                    if (error) {
                                        console.log(error);
                                        return res.send({ status: "fail", message: error });
                                    }
                                    resolve();
                                });
                        })
                }))

            }
            Promise.all([...datas]).then(() => {
                dbConn.query('INSERT INTO `order`(`oder_id`, `oder_address`, `oder_phone`, `oder_customer`) VALUES (?,?,?,?)', [oder_id, address, phone, id], function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return res.send({ status: "fail", message: error });
                    }
                    res.clearCookie('cart', { secure: true, sameSite: 'none' });
                    return res.send({ status: "success", message: 'đã đặt hàng' });
                });
            })
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
                if (error) return res.send({ status: "fail", message: error });
                dbConn.query('UPDATE `product_oder` SET `status`= ? WHERE `oder_id` = ?', [status, oder_id], function (error, results, fields) {
                    if (error) return res.send({ status: "fail", message: error });
                    getOders(req, res, 'SELECT * FROM `order` WHERE `oder_customer` = ?', user_id);
                });
            });
        }
        else {
            dbConn.query('SELECT COUNT(`product_oder`.`product_id`) AS COUNT FROM `product_oder` WHERE `oder_id`= ? AND `status` != 0', oder_id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                if (results[0].COUNT == 0) {
                    getOders(req, res, 'SELECT * FROM `order` WHERE `oder_customer` = ?', user_id);
                } else {
                    dbConn.query('UPDATE `order` SET `status`=? WHERE `oder_id` = ? AND `oder_customer` = ?', [status, oder_id, user_id], function (error, results, fields) {
                        if (error) return res.send({ status: "fail", message: error });
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
 * Cập nhật trạng thái sản phẩm trong don hang
 */

router.post('/change_product/:key', async (req, res) => {
    let key = req.params.key;
    let oder_id = req.body.oder_id;
    let product_id = req.body.product_id;
    let status = req.body.status;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `product_oder` SET `status`= ? WHERE `product_id` = ? AND `oder_id` = ?', [status, product_id, oder_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            let count = 0;
            let oder_product_count = 0;
            if (status == '0') {
                dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? AND `status` = ?', [oder_id, status], function (error, results, fields) {
                    if (error) return res.send({ status: "fail", message: error });
                    oder_product_count = results.length;
                    dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? ', oder_id, function (error, results, fields) {
                        if (error) return res.send({ status: "fail", message: error });
                        count = results.length;
                        if (oder_product_count == count) {
                            dbConn.query('UPDATE `order` SET `status`= ? WHERE `oder_id` = ?', [status, oder_id], function (error, results, fields) {
                                if (error) return res.send({ status: "fail", message: error });
                                getOder(oder_id, res, req)
                            });
                        } else {
                            getOder(oder_id, res, req)
                        }
                    });
                });
            } else if (status == "2") {
                const pro_1 = new Promise((resolve, reject) => {
                    dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? AND `status` = ?', [oder_id, status], function (error, results, fields) {
                        if(results){
                            oder_product_count += results.length;
                        }
                        resolve()
                    })
                })
                const pro_2 = new Promise((resolve, reject) => {
                    dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? AND `status` = 0', oder_id, function (error, results, fields) {
                        if(results){
                            oder_product_count += results.length;
                        }
                        resolve()
                    })
                })
                const pro_3 = new Promise((resolve, reject) => {
                    dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ?', oder_id, function (error, results, fields) {
                        if(results){
                            count += results.length;
                        }
                        resolve()
                    })
                })

                Promise.all([pro_1, pro_2, pro_3]).then(() => {
                    if (oder_product_count == count) {
                        dbConn.query('UPDATE `order` SET `status`= ? WHERE `oder_id` = ?', [status, oder_id], function (error, results, fields) {
                            if (error) return res.send({ status: "fail", message: error });
                            getOder_admin(oder_id, res, req)
                        });
                    } else {
                        getOder_admin(oder_id, res, req)
                    }
                })
            } else if(status == "3" || status == "4"){
                getOder_admin(oder_id, res, req)
            } else{
                getOder(oder_id, res, req)
            }
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
router.get('/get_shop/:shop_id/:page/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.shop_id;
    let page = req.params.page * 10;
    if (key == process.env.KEY) {
        let result = [];
        dbConn.query('SELECT DISTINCT `order`.* FROM `product_oder` JOIN `order` ON `product_oder`.`oder_id` = `order`.`oder_id` WHERE `product_oder`.`shop_id` =  ? LIMIT 0, ?', [id,page], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            result = results;
            let arr1 = [];
            for (let i = 0; i < results.length; i++) {
                arr1.push(new Promise(function (resolve, reject) {
                    dbConn.query('SELECT `product_oder`.* FROM `product_oder` JOIN `order` ON `product_oder`.`oder_id` = `order`.`oder_id` WHERE `product_oder`.`shop_id` = ? AND `product_oder`.`oder_id` = ?', [id, results[i].oder_id], function (error, results, fields) {
                        if (error) return res.send({ status: "fail", message: error });
                        result[i].product_oder = results;
                        resolve();
                    })
                }))
            }
            Promise.all([...arr1]).then(() => {
                let arr2 = [];
                for (let i = 0; i < results.length; i++) {
                    for (let j = 0; j < results[i].product_oder.length; j++) {
                        arr2.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].product_oder[j].product_avatar + `/` + req.params.key)
                            .then(res => {
                                const { data } = res.data;
                                results[i].product_oder[j].product_avatar = data;
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

/**
 * Cập nhật trạng thái đơn hàng admin
 */
router.get('/change_status/:oder_id/:status/:key', async (req, res) => {
    /**
     * 0 -> hủy
     * 1 -> đặt
     * 2 -> nhận từ shop
     * 3 -> giao cho người mua
     * 4 -> đã giao
     */
    let key = req.params.key;
    let oder_id = req.params.oder_id;
    let status = req.params.status;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `order` SET `status`= ? WHERE `oder_id` = ?', [status, oder_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            console.log(status, typeof status, status == 4);
            if (status == 4) {
                dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? AND `status` = 3', oder_id, function (error, results, fields) {
                    if (error) return res.send({ status: "fail", message: error });
                    let commission = 0;
                    let commission_rate = 0;
                    let arr_oder_shop = {}
                    let arrPromise = [];
                    let arr = [];
                    axios.get(`${process.env.ADMIN_URL}/api/commission/get/${key}`).then(response => {
                        commission_rate = Number(response.data.data.commission_rate);
                        for (const result of results) {
                            arr.push(new Promise(function (resolve, reject) {
                                dbConn.query('UPDATE `product_oder` SET `status`= ? WHERE `oder_id` = ? AND `product_id` = ?', [status, oder_id, result.product_id], function (error, results, fields) {
                                    resolve()
                                })
                            }))
                            if (!arr_oder_shop[result.shop_id]) {
                                arr_oder_shop[result.shop_id] = [];
                            }
                            arr_oder_shop[result.shop_id].push(result);
                        }

                        for (const key in arr_oder_shop) {
                            let revenue_shop = 0;
                            if (Object.hasOwnProperty.call(arr_oder_shop, key)) {
                                const element = arr_oder_shop[key];
                                for (const item of element) {
                                    revenue_shop += item.product_price * (100 - item.product_sale - commission_rate) / 100 * item.product_quantity;
                                    commission += item.product_price * commission_rate / 100 * item.product_quantity;
                                }
                                arrPromise.push(axios.get(`${process.env.SHOP_URL}/api/shop/update_revenue/${key}/${revenue_shop}/${process.env.key}`))
                            }
                        }

                        const update_revenue = axios.get(`${process.env.ADMIN_URL}/api/revenue/update_revenue/${commission}/${process.env.key}`)

                        Promise.all([...arr, ...arrPromise, update_revenue]).then(() => {
                            let sql = 'SELECT * FROM `order` ORDER BY `order`.`oder_date` DESC LIMIT 0,?';
                            getOders_admin(req, res, sql, 10);
                        })

                    })
                })
            } else if (status == 3) {
                dbConn.query('SELECT * FROM `product_oder` WHERE `oder_id` = ? AND `status` = 2', oder_id, function (error, results, fields) {
                    let arr = [];
                    for (const result of results) {
                        arr.push(new Promise(function (resolve, reject) {
                            dbConn.query('UPDATE `product_oder` SET `status`= ? WHERE `oder_id` = ? AND `product_id` = ? AND `status` != 0', [status, oder_id, result.product_id], function (error, results, fields) {
                                resolve()
                            })
                        }))
                    }
                    Promise.all([...arr]).then(() => {
                        let sql = 'SELECT * FROM `order` ORDER BY `order`.`oder_date` DESC LIMIT 0,?';
                        getOders_admin(req, res, sql, 10);
                    })
                })

            } else {
                let sql = 'SELECT * FROM `order` ORDER BY `order`.`oder_date` DESC LIMIT 0,?';
                getOders_admin(req, res, sql, 10);
            }
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy danh sách đơn hàng Admin
 * */
router.get('/all_admin/:page/:key', async (req, res) => {
    let key = req.params.key;
    let page = req.params.page * 10;
    if (key == process.env.KEY) {
        let sql = 'SELECT * FROM `order` ORDER BY `order`.`oder_date` DESC LIMIT 0,?';

        getOders_admin(req, res, sql, page);
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy đơn hàng theo id admin
 * */
 router.get('/get_admin/:oder_id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.oder_id;
    if (key == process.env.KEY) {
        getOder_admin(id, res, req)
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;
