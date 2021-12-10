const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Lấy giá trị tiền ship
 */
router.get('/get/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `ship` WHERE `id` = 1', function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            return res.send({ status: "success", data: { ship_price: results[0].value, last_update: results[0].last_update }, message: 'cập nhật thành công' });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cap nhat giá trị tiền ship
 */
router.get('/update/:ship_price/:last_update/:key', async (req, res) => {
    let key = req.params.key;
    let ship_price = req.params.ship_price;
    let last_update = req.params.last_update;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `ship` SET `value`= ?, `last_update` = `last_update` + 1  WHERE `id`= 1 AND `last_update` = ?', [ship_price, last_update], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            dbConn.query('SELECT * FROM `ship` WHERE `id` = 1', function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                return res.send({ status: "success", data: { ship_price: results[0].value, last_update: results[0].last_update }, message: 'cập nhật thành công' });
            });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;