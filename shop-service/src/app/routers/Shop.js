const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Trả về thông tin của shop
 */
router.get('/info/:shop_id/:option/:key', async (req, res) => {
    let id = req.params.shop_id;
    let key = req.params.key;
    let option = req.params.option;
    let sql = '';
    if (key == process.env.KEY) {
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `shop` WHERE `shop_id` = ? AND status = 1';
                break;
            case '1':
                sql = 'SELECT * FROM `shop` WHERE `shop_id` = ?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có shop' });
            }
            else {
                axios.get(process.env.IMG_URL + `/api/image/get/` + results[0].shop_avatar + `/` + req.params.key)
                    .then(response => {
                        const { data } = response.data;
                        results[0].shop_avatar = data;
                        return res.send({ status: "success", data: results[0], message: 'cửa hàng có id=' + id });

                    })
                    .catch(error => { return res.send({ status: "fail", message: error }) });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Thêm thông tin shop
 */
router.post('/add/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        const shop_name = req.body.shop_name;
        const shop_description = req.body.shop_description;
        const shop_owner = req.body.shop_owner;
        const shop_avatar = req.body.shop_avatar;
        dbConn.query('SELECT * FROM `shop` WHERE `shop_name` LIKE ? OR `shop_owner` = ?', [shop_name, shop_owner], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results.length > 0) {
                return res.send({ status: "fail", message: 'Tên cửa hàng đã tồn tại, hoặc bạn đã có shop!' });
            }

            dbConn.query('INSERT INTO `shop`( `shop_name`, `shop_description`, `shop_owner`, `shop_avatar`) VALUES (?,?,?,?)', [shop_name, shop_description, shop_owner, shop_avatar], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                return res.send({ status: "success", message: 'Thành công!' });
            });
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy doanh thu của shop
 */
router.get('/revenue/:shop_id/:key', async (req, res) => {
    let id = req.params.shop_id;
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `revenue` WHERE `shop_id` = ?', id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'Shop chưa có doanh thu!' });
            }
            else {
                return res.send({
                    status: "success", data: results, message: 'Doanh thu của shop id = ' + id
                })
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cập nhật thông tin shop
 */
router.post('/update/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        const shop_id = req.params.shop_id;
        dbConn.query('SELECT * FROM `shop` WHERE `shop_id` LIKE ?', [shop_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const shop_name = req.body.shop_name ? req.body.shop_name : results[0].shop_name;
            const shop_description = req.body.shop_description ? req.body.shop_description : results[0].shop_description;
            const shop_avatar = req.body.shop_avatar ? req.body.shop_avatar : results[0].shop_avatar;
            const last_update = req.body.last_update;
            if (last_update != results[0].last_update) {
                return res.send({ status: "fail", message: 'key không hợp lệ' });
            }
            dbConn.query('SELECT * FROM `shop` WHERE `shop_name` LIKE ? AND `shop_id` !=  ?', [shop_name, shop_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                if (results.length > 0) {
                    return res.send({ status: "fail", message: 'Tên cửa hàng đã tồn tại' });
                }
                dbConn.query(
                    'UPDATE `shop` SET `shop_name` = ?,`shop_description` = ?,`shop_avatar` = ?,`last_update` = `last_update` + 1 WHERE `shop_id` = ? AND `last_update` = ?',
                    [shop_name, shop_description, shop_avatar, shop_id, last_update], function (error, results, fields) {
                        if (error) return res.send({ status: "fail", message: error });
                        axios.get(process.env.BASE_URL + `/api/shop/info/${shop_id}/0/` + process.env.KEY).then(function (response) {
                            return res.send({ status: "success", data: response.data.data, message: 'Thành công!' });
                        })
                    });
            });

        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Trả về thông tin của shop theo owner
 */
router.get('/get/:shop_owner/:option/:key', async (req, res) => {
    let id = req.params.shop_owner;
    let key = req.params.key;
    let option = req.params.option;
    let sql = '';
    if (key == process.env.KEY) {
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `shop` WHERE `shop_owner` = ? AND status = 1';
                break;
            case '1':
                sql = 'SELECT * FROM `shop` WHERE `shop_owner` = ?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", data: {}, message: 'không có shop' });
            }
            else {
                axios.get(process.env.IMG_URL + `/api/image/get/` + results[0].shop_avatar + `/` + req.params.key)
                    .then(response => {
                        const { data } = response.data;
                        results[0].shop_avatar_id = results[0].shop_avatar;
                        results[0].shop_avatar = data;
                        return res.send({ status: "success", data: results[0], message: 'cửa hàng có id=' + id });

                    })
                    .catch(error => { return res.send({ status: "fail", message: error }) });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cập nhật doanh thu shop
 */
router.get('/update_revenue/:shop_id/:price/:key', async (req, res) => {
    let id = req.params.shop_id;
    let key = req.params.key;
    let price = req.params.price;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `revenue` WHERE `shop_id` = ? GROUP BY `revenue_id` DESC', id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const access = results[0];
            const now = new Date(Date.now());
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const season = ((month + 1) % 3 == 0) ? Math.floor((month + 1) / 3) : Math.floor(((month + 1) / 3) + 1);
            let sql = '';
            if (access.revenue_year == year && access.revenue_month == month && access.revenue_seasion == season) {
                sql = 'UPDATE `revenue` SET `revenue_money`= `revenue_money` + ? WHERE `revenue_month` = ? AND `revenue_year` = ? AND `revenue_seasion` = ? AND `shop_id` = ?';
            }
            else {
                sql = 'INSERT INTO `revenue`(`revenue_money`, `revenue_month`, `revenue_year`, `revenue_seasion`,  `shop_id`) VALUES (?,?,?,?,?)';
            }
            dbConn.query(sql, [price, month, year, season, id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                return res.send({ status: "success", message: 'cập nhật thành công' });
            })
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy danh sách shop
 */
router.get('/all/:page/:key', async (req, res) => {
    let key = req.params.key;
    let page = 10 * req.params.page;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `shop` LIMIT 0,?', page, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            let arr = [];
            for (let i = 0; i < results.length; i++) {
                arr.push(axios.get(`${process.env.IMG_URL}/api/image/get/${results[i].shop_avatar}/${process.env.key}`).then((res) => {
                    results[i].shop_avatar = res.data.data;
                }))
            }

            Promise.all([...arr]).then(() => {
                return res.send({ status: "success", data: results, message: "danh sách shop" })
            })
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cập nhật trạng thái shop
 */
router.get('/status/:page/:status/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    let status = req.params.status;
    let shop_id = req.params.shop_id;
    let page = 10 * req.params.page;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `shop` SET `status`= ? WHERE `shop_id` = ?', [status, shop_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results.affectedRows) {
                axios.get(`${process.env.PRODUCT_URL}/api/product/update_status/${status}/${shop_id}/${process.env.key}`).then((response) => {
                    dbConn.query('SELECT * FROM `shop` LIMIT 0,?', page, function (error, results, fields) {
                        if (error) return res.send({ status: "fail", message: error });
                        let arr = [];
                        for (let i = 0; i < results.length; i++) {
                            arr.push(axios.get(`${process.env.IMG_URL}/api/image/get/${results[i].shop_avatar}/${process.env.key}`).then((res) => {
                                results[i].shop_avatar = res.data.data;
                            }))
                        }
            
                        Promise.all([...arr]).then(() => {
                            return res.send({ status: "success", data: results, message: "danh sách shop" })
                        })
                    });
                })
            } else {
                return res.send({ status: "fail", message: results });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;