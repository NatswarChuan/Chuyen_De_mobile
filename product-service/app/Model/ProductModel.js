var config = require('../config/config');
var dbConn = require('./Db');
const axios = require('axios');

//lấy 1 sản phẩm theo id
function getProduct(req, res) {
    let id = req.params.product_id;
    let key = req.params.key;
    if (key == config.key) {
        dbConn.query('SELECT * FROM `product` WHERE `product_id`= ? AND `status` = 1', id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ error: true, message: 'không có sản phẩm có id=' + id });
            }
            else {
                let arrImages = results[0].product_image.split(",");
                results[0].product_image = [];
                let i = 0;

                //gọi API image lấy đường dẫn Avatar
                axios.get(`http://192.168.1.2:3000/api/image/` + results[0].product_avatar + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        results[0].product_avatar = data;
                    })
                    .catch(error => console.log(error));

                //gọi API image lấy đường dẫn các hình ảnh sản phẩm
                arrImages.map(item => {
                    axios.get(`http://192.168.1.2:3000/api/image/` + item + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            results[0].product_image.push(data);
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            i++;
                            if (i === arrImages.length) {
                                return res.send({ error: false, data: results, message: 'sản phẩm có id=' + id });
                            }
                        });
                });
            }
        });

    }
    else {
        return res.send({ error: true, message: 'key không hợp lệ' });
    }
}

//lấy tất cả sản phẩm
function getProducts(req, res) {
    let key = req.params.key;
    if (key == config.key) {
        dbConn.query('SELECT `product_id` FROM `product` WHERE `status` = 1', function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ error: true, message: 'không có sản phẩm trong cơ sở dữ liệu'});
            }
            else {
                let result = [];
                let i = 0;
                results.map(item=>{
                    axios.get(config.app_url+  `/api/product/` + item.product_id + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            result.push(data[0]);
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            i++;
                            if (i === results.length) {
                                return res.send({ error: false, data: result, message: 'tất cả thông tin sản phẩm' });
                            }
                        });
                });
            }
        });
    }
    else {
        return res.send({ error: true, message: 'key không hợp lệ' });
    }
}

module.exports = {
    getProduct: getProduct,
    getProducts: getProducts
}