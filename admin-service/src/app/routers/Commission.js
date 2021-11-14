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
            return res.send({ status: "success", data: { commission_rate: results[0].value }, message: 'cập nhật thành công' });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;