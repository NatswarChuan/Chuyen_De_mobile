const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Lấy tỷ lệ hoa hồng
 */
router.get('/get/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `ship` WHERE `id` = 2', function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            return res.send({ status: "success", data: { commission_rate: results[0].value, last_update: results[0].last_update }, message: 'cập nhật thành công' });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Cap nhat giá trị ty le hoa hong
 */
 router.get('/update/:commission_rate/:last_update/:key', async (req, res) => {
    let key = req.params.key;
    let commission_rate = req.params.commission_rate;
    let last_update = req.params.last_update;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `ship` SET `value`= ?, `last_update` = `last_update` + 1  WHERE `id`= 2 AND `last_update` = ?', [commission_rate, last_update], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            dbConn.query('SELECT * FROM `ship` WHERE `id` = 2', function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                return res.send({ status: "success", data: { commission_rate: results[0].value, last_update: results[0].last_update }, message: 'cập nhật thành công' });
            });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;