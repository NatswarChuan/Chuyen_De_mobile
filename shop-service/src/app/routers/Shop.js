const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
var productModel = require('../Model/ProductModel');
const axios = require('axios');

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
        dbConn.query(sql,id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có shop' });
            }
            else {
                return res.send({ status: "success", data: results[0], message: 'cửa hàng có id=' + id });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;