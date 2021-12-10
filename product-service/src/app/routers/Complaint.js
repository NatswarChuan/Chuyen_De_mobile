const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * thêm complaint của người dùng
 */
router.post('/insert/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        let complaint_content = req.body.complaint_content;
        let product_id = req.body.product_id;

        dbConn.query('INSERT INTO `complaint`(`complaint_content`, `product_id`) VALUES (?,?)',
            [complaint_content, product_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: `error ${error}` });
                return res.send({ status: "success", message: 'thêm complaint vào product_id=' + product_id + ' thành công!' });
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy complaint theo sản phẩm
 */
router.get('/get/:product_id/:key', async (req, res) => {
    let key = req.params.key;
    let product_id = req.params.product_id;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `complaint` JOIN `product` ON `product`.`product_id` = `complaint`.`product_id` WHERE `complaint`.`product_id` = ? ORDER BY `complaint`.`complaint_id` DESC',
            product_id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                let arr = [];
                for (let i = 0; i < results.length; i++) {
                    arr.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].product_avatar + `/` + process.env.KEY)
                        .then(res => {
                            const { data } = res.data;
                            results[i].product_avatar = data;
                        }))
                    arr.push(axios.get(process.env.SHOP_URL + `/api/shop/info/` + results[i].shop_id + `/1/` + process.env.KEY)
                        .then(res => {
                            const { data } = res.data;
                            results[i].shop_info = data;
                        }))
                }

                Promise.all([...arr]).then(() => {
                    return res.send({ status: "success", data: results, message: 'complaint  product_id=' + product_id });
                })

            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy tất cả complaint
 */
router.get('/all/:page/:key', async (req, res) => {
    let key = req.params.key;
    let page = 10 * req.params.page;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `complaint` JOIN `product` ON `product`.`product_id` = `complaint`.`product_id` ORDER BY `complaint`.`complaint_id` DESC LIMIT 0,?',
            page, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                let arr = [];
                for (let i = 0; i < results.length; i++) {
                    arr.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].product_avatar + `/` + process.env.KEY)
                        .then(res => {
                            const { data } = res.data;
                            results[i].product_avatar = data;
                        }))
                    arr.push(axios.get(process.env.SHOP_URL + `/api/shop/info/` + results[i].shop_id + `/1/` + process.env.KEY)
                        .then(res => {
                            const { data } = res.data;
                            results[i].shop_info = data;
                        }))
                }

                Promise.all([...arr]).then(() => {
                    return res.send({ status: "success", data: results, message: 'complaint  page=' + page });
                })

            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;