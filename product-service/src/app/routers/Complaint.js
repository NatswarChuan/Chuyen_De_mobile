const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * thêm complaint của người dùng
 */
router.post('/insert/:key', async (req, res) => {
    let key = req.params.key;
    console.log(req.body);
    if (key == process.env.KEY) {
        let complaint_content = req.body.complaint_content;
        let product_id = req.body.product_id;

        dbConn.query('INSERT INTO `complaint`(`complaint_content`, `product_id`) VALUES (?,?)',
            [complaint_content, product_id], function (error, results, fields) {
                if (error) throw error;
                return res.send({ status: "success", message: 'thêm complaint vào product_id=' + product_id + ' thành công!' });
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;