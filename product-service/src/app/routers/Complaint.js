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
        dbConn.query('SELECT * FROM `complaint` WHERE `product_id` = ? ORDER BY `complaint`.`complaint_id` DESC',
            product_id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                return res.send({ status: "success", data: results, message: 'complaint  product_id=' + product_id });
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;