var config = require('../config/config');
var db = require('./Db');
const axios = require('axios');

//lấy 1 sản phẩm theo id
function getProduct(req, res) {
    let id = req.params.product_id;
    let key = req.params.key;
    let option = req.params.option;
    if (key == config.key) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `product` WHERE `product_id`= ? AND status = 1';
                break;
            case '1':
                sql = 'SELECT * FROM `product` WHERE `product_id`= ?';
                break;
            default:
                return res.send({ error: true, message: 'key không hợp lệ' });
        }

        db.dbConn.query(sql, id, function (error, results, fields) {
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
    let option = req.params.option;
    if (key == config.key) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT product_id FROM product WHERE status = 1';
                break;
            case '1':
                sql = 'SELECT product_id FROM product';
                break;
            default:
                return res.send({ error: true, message: 'key không hợp lệ' });
        }


        db.dbConn.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ error: true, message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                db.getProducts(results,option,req,res);
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