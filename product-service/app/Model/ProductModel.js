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
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }

        db.dbConn.query(sql, id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                let arrImages = results[0].product_image.split(",");
                results[0].product_image = [];
                let i = 0;

                //gọi API image lấy đường dẫn Avatar
                axios.get(`http://192.168.1.2:3002/api/image/` + results[0].product_avatar + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        results[0].product_avatar = data;
                    })
                    .catch(error => console.log(error));

                //gọi API image lấy đường dẫn các hình ảnh sản phẩm
                arrImages.map(item => {
                    axios.get(`http://192.168.1.2:3002/api/image/` + item + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            results[0].product_image.push(data);
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            i++;
                            if (i === arrImages.length) {
                                return res.send({ status: "success", data: results, message: 'sản phẩm có id=' + id });
                            }
                        });
                });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
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
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        db.dbConn.query(sql, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                db.getProducts(results, option, req, res);
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}

//tìm kiếm sản phẩm
function searchProducts(req, res) {
    let key = req.params.key;
    let option = req.params.option;
    let key_search = '%' + req.params.key_search + '%';
    if (key == config.key) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product_id` FROM `product` WHERE `product_title` LIKE ? AND `status` = 1';
                break;
            case '1':
                sql = 'SELECT `product_id` FROM `product` WHERE `product_title` LIKE ?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        db.dbConn.query(sql, key_search, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                db.getProducts(results, option, req, res);
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}

//cập nhật lượt xem và trả về thông tin sản phẩm
function updateView(req, res) {
    let key = req.params.key;
    if (key == config.key) {
        let cookies_view = [];
        //kiểm tra đã tồn tại cookie chưa
        if (req.cookies.view_product) {
            let cookies_view = req.cookies.view_product;
            let view_product = cookies_view.find(function (element) {
                return element.product_id == req.params.product_id;
            });

            //kiểm tra sản phẩm đã tăng view chưa
            if (typeof view_product == 'undefined') {
                cookies_view.push(
                    {
                        product_id: req.params.product_id,
                        expires: Number(new Date(Date.now() + 86400000)),
                    }
                );
                res.cookie('view_product', cookies_view);
                setView(req, res);
            }
            //kiểm tra cookie của sản phẩm đã hết hạn chưa
            else if (view_product.expires <= Number(new Date(Date.now()))) {
                cookies_view.find(element => element.product_id == req.params.product_id).expires = Number(new Date(Date.now() + 86400000));
                res.cookie('view_product', cookies_view);
                setView(req, res);
            } else {
                let product;
                let id = req.params.product_id;
                let option = req.params.option;
                axios.get(config.app_url + `/api/product/` + id + `/` + option + `/` + req.params.key)
                    .then(res => {
                        const { data } = res.data;
                        product = data[0];
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        return res.send({ status: "fail", data: product, message: 'sản phẩm đã không cập nhật lượt xem' });
                    })
            }
        }
        else {
            cookies_view.push(
                {
                    product_id: req.params.product_id,
                    expires: Number(new Date(Date.now() + 86400000)),
                }
            );
            res.cookie('view_product', cookies_view);
            setView(req, res);
        }
        function setView(req, res) {
            let id = req.params.product_id;
            let option = req.params.option;
            let view = 0;
            let product;
            axios.get(config.app_url + `/api/product/` + id + `/` + option + `/` + req.params.key)
                .then(res => {
                    const { data } = res.data;
                    product = data[0];
                    product.product_view++;
                    db.dbConn.query('UPDATE `product` SET `product_view`= ? WHERE `product_id` = ?', [product.product_view, id], function (error, results, fields) {
                        if (error) throw error;
                    });
                })
                .catch(error => console.log(error))
                .finally(() => {
                    axios.get(config.app_url + `/api/product/` + id + `/` + option + `/` + req.params.key)
                        .then(res => {
                            const { data } = res.data;
                            product = data[0];
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            return res.send({ status: "success", data: product, message: 'sản phẩm đã cập nhật lượt xem' });
                        });
                });
        }

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}

module.exports = {
    getProduct,
    getProducts,
    searchProducts,
    updateView
}