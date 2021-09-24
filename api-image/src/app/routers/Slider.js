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
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                let i = 0;
                results.map(item => {
                    axios.get(process.env.BASE_URL + `/api/image/get/` + item.slider_image + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            results[i].slider_image = data;
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            i++;
                            if (i === results.length) {
                                return res.send({ status: "success", data: results, message: 'tất cả hình ảnh trong silder' });
                            }
                        });
                });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;