const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config'); 

router.get('/:image_id/:key',async (req, res)=>{
    let id = req.params.image_id;
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT `image_name` FROM `image` WHERE `image_id` = ?', id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có hình' });
            }
            else {
                let img = process.env.URL_IMG + results[0].image_name;
                return res.send({ status: "success", data: img, message: 'hình có id=' + id });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;