const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * Trả về hình ảnh của slide
 */

router.get('/all/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql;
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `slider` WHERE `slider`.`status` = 1';
                break;
            case '1':
                sql = 'SELECT * FROM `slider`';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                let arr = []
                for (let i = 0; i < results.length; i++) {
                    results[i].slider_image_id = results[i].slider_image;
                    arr.push(new Promise((resolve, reject) => {
                        dbConn.query('SELECT * FROM `image` WHERE `image_id` = ?', results[i].slider_image, function (error, result, fields) {
                            if (error) return res.send({ status: "fail", message: error });
                            if (result.length > 0) {
                                let img = process.env.BASE_SERVER + '/api/image/photo/' + result[0].image_id + '/' + process.env.KEY;
                                results[i].slider_image = img;
                            }
                            resolve();
                        })
                    }));
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

/**
 * Cập nhật slider
 */

router.post('/update/:slider_id/:key', async (req, res) => {
    const key = req.params.key;
    const slider_id = req.params.slider_id;
    if (key == process.env.KEY) {
        const slider_image = req.body.slider_image;
        const slider_title = req.body.slider_title;
        const last_update = req.body.last_update;
        const status = req.body.status;
        dbConn.query('UPDATE `slider` SET `slider_image`= ? ,`slider_title`= ?,`status`= ? ,`last_update`= `last_update` +1 WHERE `slider_id` = ? AND `last_update` = ?', [slider_image, slider_title, status, slider_id, last_update], function (error, result, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const message = result.affectedRows ? 'cập nhật thành công' : 'cập nhật thất bại';
            const _status = result.affectedRows ? "success" : "fail";
            axios.get(`${process.env.BASE_URL}/api/slider/all/1/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
                return res.send({ status: _status, data: response.data.data, message: message });
            }).catch(err => res.send({ status: "fail", message: err }))
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Thêm slider
 */

router.post('/insert/:key', async (req, res) => {
    const key = req.params.key;
    if (key == process.env.KEY) {
        const slider_image = req.body.slider_image;
        const slider_title = req.body.slider_title;
        dbConn.query('INSERT INTO `slider`(`slider_image`, `slider_title`) VALUES (?,?)', [slider_image, slider_title], function (error, result, fields) {
            if (error) return res.send({ status: "fail", message: error });
            axios.get(`${process.env.BASE_URL}/api/slider/all/1/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
                return res.send({ status: "success", data: response.data.data, message: 'cập nhật thành công' });
            }).catch(err => res.send({ status: "fail", message: err }))
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Xóa slider
 */

router.post('/remove/:key', async (req, res) => {
    const key = req.params.key;
    if (key == process.env.KEY) {
        const slider_id = req.body.slider_id;
        dbConn.query('DELETE FROM `slider` WHERE `slider_id` = ?', [slider_id], function (error, result, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const message = result.affectedRows ? 'xóa thành công' : 'xóa thất bại';
            const _status = result.affectedRows ? "success" : "fail";
            axios.get(`${process.env.BASE_URL}/api/slider/all/1/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
                return res.send({ status: _status, data: response.data.data, message: message });
            }).catch(err => res.send({ status: "fail", message: err }))
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;