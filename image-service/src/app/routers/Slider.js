const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Trả về hình ảnh của slide
 */

router.get('/all/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `slider`', function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                let arr = []
                for (let i = 0; i < results.length; i++) {
                    arr.push(new Promise((resolve, reject) => { 
                        dbConn.query('SELECT * FROM `image` WHERE `image_id` = ?', results[i].slider_image, function (error, result, fields) {
                        if (error) return res.send({ status: "fail", message: error });
                        if (result.length > 0) {
                            let img = process.env.BASE_SERVER + '/api/image/photo/' + result[0].image_id + '/' + process.env.KEY;
                            results[i].slider_image = img;
                        }
                        resolve();
                    })}));
                }
                Promise.all([...arr]).then(() => {
                    return res.send({ status: "success", data: results, message: 'tất cả hình ảnh trong silder' });
                })
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;