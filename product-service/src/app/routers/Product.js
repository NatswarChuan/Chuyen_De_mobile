const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
var productModel = require('../Model/ProductModel');
const axios = require('axios');

/**
 * trả về thông tin 1 sản phẩm theo option
 */
router.get('/get/:product_id/:option/:key', async (req, res) => {
    let id = req.params.product_id;
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product`.*FROM `product`WHERE `product`.`product_id`=  ? AND status = 1';
                break;
            case '1':
                sql = 'SELECT `product`.*FROM `product`WHERE `product`.`product_id`= ?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }

        dbConn.query(sql, id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: `error ${error}` });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProductInfo(results[0], res)
                        a.then(() => {
                            return res.send({ status: "success", data: results[0], message: 'sản phẩm có id=' + id });
                        })
                    }
                )()
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy nhiều sản phẩm theo option
 */
router.get('/all/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sort = '';
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'desc':
                    sort = '`product`.`product_title` DESC,'
                    break;
                case 'asc':
                    sort = '`product`.`product_title` ASC,'
                    break;
                default:
                    break;
            }
        }

        let filter = '';
        if (req.query.begin && req.query.end) {
            filter = 'AND `product`.`product_price` <= ' + req.query.end + ' AND `product`.`product_price` >= ' + req.query.begin
        }

        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product`.*FROM `product`WHERE status = 1 ' + filter + ' ORDER BY ' + sort + ' `product_date` DESC,`product`.`product_id` ASC';
                break;
            case '1':
                sql = 'SELECT `product`.*FROM `product` WHERE 1 ' + filter + ' ORDER BY ' + sort + ' `product_date` DESC,`product`.`product_id` ASC';
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
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            return res.send({ status: "fail", data: results, message: 'sản phẩm có id=' });
                        })
                    }
                )()
            }

        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy nhiều sản phẩm theo từ khóa và option
 */
router.get('/search/:page/:key_search/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    let page = 10 * req.params.page + 1;
    let key_search = '%' + req.params.key_search + '%';
    if (key == process.env.KEY) {
        let sort = '';
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'desc':
                    sort = '`product`.`product_title` DESC,'
                    break;
                case 'asc':
                    sort = '`product`.`product_title` ASC,'
                    break;
                default:
                    break;
            }
        }

        let filter = '';
        if (req.query.begin && req.query.end) {
            filter = 'AND `product`.`product_price` <= ' + req.query.end + ' AND `product`.`product_price` >= ' + req.query.begin
        }

        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `product` WHERE `product_title` LIKE ? AND `status` = 1 ' + filter + ' ORDER BY ' + sort + ' `product_date` DESC, `product_id` ASC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product`.*FROM `product` WHERE `product_title` LIKE ? ' + filter + ' ORDER BY ' + sort + ' `product_date` DESC, `product`.`product_id` ASC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        dbConn.query(sql, [key_search, page], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            let isload = results.length < page;

                            if (!isload) {
                                results.splice(results.length - 1, 1);
                            }
                            return res.send({ status: "success", isload: !isload, data: results, message: 'sản phẩm danh mục search=' + key_search });
                        })
                    }
                )()
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * cập nhật lượt xem của sản phẩm và trả về thông tin sản phẩm
 */
router.get('/view/:product_id/:option/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
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
                res.cookie('view_product', cookies_view, { secure: true, sameSite: 'none' });
                setView(req, res);
            }
            //kiểm tra cookie của sản phẩm đã hết hạn chưa
            else if (view_product.expires <= Number(new Date(Date.now()))) {
                cookies_view.find(element => element.product_id == req.params.product_id).expires = Number(new Date(Date.now() + 86400000));
                res.cookie('view_product', cookies_view, { secure: true, sameSite: 'none' });
                setView(req, res);
            } else {
                let id = req.params.product_id;
                let product;

                dbConn.query('SELECT `product`.*FROM `product`WHERE `product`.`product_id`=  ? AND status = 1', id, function (error, results, fields) {
                    if (error) return res.send({ status: "fail", message: `error ${error}` });
                    if (results == null || results.length === 0) {
                        return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
                    }
                    else {
                        product = results[0];

                        let option = req.params.option;
                        let a = productModel.getProductInfo(product, res);
                        a.then(() => {
                            return res.send({ status: "fail", data: product, message: 'sản phẩm đã không cập nhật lượt xem' });
                        })
                    }
                });
            }
        }
        else {
            cookies_view.push(
                {
                    product_id: req.params.product_id,
                    expires: Number(new Date(Date.now() + 86400000)),
                }
            );
            res.cookie('view_product', cookies_view, { secure: true, sameSite: 'none' });
            setView(req, res);
        }

        function setView(req, res) {
            let id = req.params.product_id;
            let product;
            dbConn.query('SELECT `product`.*FROM `product`WHERE `product`.`product_id`=  ? AND status = 1', id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: `error ${error}` });
                if (results == null || results.length === 0) {
                    return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
                }
                else {
                    (
                        async () => {
                            product = results[0];
                            product.product_view++;
                            let a = productModel.getProductInfo(product, res);
                            a.then(() => {
                                dbConn.query('UPDATE `product` SET `product_view`= `product_view`+1 WHERE `product_id` = ?', id, function (error, results, fields) {
                                    if (error) return res.send({ status: "fail", message: `error ${error}` });

                                    return res.send({ status: "success", data: product, message: 'sản phẩm đã cập nhật lượt xem' });
                                });
                            })
                        }
                    )()

                }
            });
        }

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy tất cả sản phẩm thuộc 1 shop
 */
router.get('/shop/:page/:shop_id/:option/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.shop_id;
    let option = req.params.option;
    let page = 10 * req.params.page + 1;
    if (key == process.env.KEY) {
        let sort = '';
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'desc':
                    sort = '`product`.`product_title` DESC,'
                    break;
                case 'asc':
                    sort = '`product`.`product_title` ASC,'
                    break;
                default:
                    break;
            }
        }

        let filter = '';
        if (req.query.begin && req.query.end) {
            filter = 'AND `product`.`product_price` <= ' + req.query.end + ' AND `product`.`product_price` >= ' + req.query.begin
        }
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT `product`.*FROM `product` WHERE `shop_id` = ? AND status = 1 ' + filter + ' ORDER BY ' + sort + ' `product_date` DESC,`product`.`product_id` ASC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product`.*FROM `product` WHERE `shop_id` = ? ' + filter + ' ORDER BY ' + sort + ' `product_date` DESC,`product`.`product_id` ASC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'option không hợp lệ' });
        }

        dbConn.query(sql, [id, page], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            let isload = results.length < page;
                            if (!isload) {
                                results.splice(results.length - 1, 1);
                            }
                            return res.send({ status: "success", data: results, isload: !isload, message: 'sản phẩm shop id=' + id });
                        })
                    }
                )()
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * lấy sản phẩm theo trang
 */
router.get('/page/:page/:type/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    let page = 10 * req.params.page + 1;
    let type = req.params.type;
    if (key == process.env.KEY) {
        let sort = '';
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'desc':
                    sort = '`product`.`product_title` DESC,'
                    break;
                case 'asc':
                    sort = '`product`.`product_title` ASC,'
                    break;
                default:
                    break;
            }
        }

        let filter = '';
        if (req.query.begin && req.query.end) {
            filter = 'AND `product`.`product_price` <= ' + req.query.end + ' AND `product`.`product_price` >= ' + req.query.begin
        }
        let sql = '';
        switch (type) {
            case 'hot':
                type = "`product_view`";
                break;
            case 'new':
                type = "`product_date`";
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        switch (option) {
            case '0':
                sql = 'SELECT `product`.*FROM `product`WHERE status = 1 ' + filter + ' ORDER BY ' + sort + ' `product`.' + type + ' DESC, `product`.`product_id` ASC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product`.*FROM `product` WHERE 1 ' + filter + ' ORDER BY ' + sort + ' `product`.' + type + ' DESC, `product`.`product_id` ASC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }


        dbConn.query(sql, page, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            let isload = results.length < page;
                            if (!isload) {
                                results.splice(results.length - 1, 1);
                            }
                            return res.send({ status: "success", isload: !isload, data: results, message: `sản phẩm ${type} trang ${req.params.page}` });
                        })
                    }
                )()
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * thêm sản phẩm
 */
router.post('/insert/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    let shop_id = req.params.shop_id;
    if (key == process.env.KEY) {
        let product_avatar = req.body.product_avatar;
        let product_quantity = req.body.product_quantity == '' ? null : req.body.product_quantity;
        let product_price = req.body.product_price;
        let product_image = req.body.product_image;
        let product_title = req.body.product_title;
        let product_description = req.body.product_description;
        let product_sale = req.body.product_sale == '' ? 0 : req.body.product_sale;
        let product_categories = req.body.product_categories;

        dbConn.query(
            'INSERT INTO `product`( `shop_id`, `product_avatar`, `product_quantity`, `product_price`, `product_sale`, `product_title`, `product_image`, `product_description`) VALUES (?,?,?,?,?,?,?,?)',
            [shop_id, product_avatar, product_quantity, product_price, product_sale, product_title, product_image, product_description], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                const product_id = results.insertId;
                const categoryArr = product_categories.split(',');
                let arr = [];
                for (const item of categoryArr) {
                    arr.push(
                        new Promise(function (resolve, reject) {
                            dbConn.query('INSERT INTO `category_product`(`category_id`, `product_id`) VALUES (?,?)', [item, product_id], function (error, results, fields) {
                                if (error) {
                                    console.log(error, 443);
                                    return res.send({ status: "fail", message: error });
                                }

                                resolve();
                            })

                        }));
                }

                Promise.all([...arr]).then(() => {
                    let page = 11;
                    dbConn.query('SELECT `product`.* FROM `product`  WHERE `shop_id` = ? ORDER BY `product_date` DESC,`product`.`product_id` ASC LIMIT 0,?', [shop_id, page], function (error, results, fields) {
                        if (error) {
                            console.log(error, 457);
                            return res.send({ status: "fail", message: error });
                        }
                        if (results == null || results.length === 0) {
                            console.log(461);
                            return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                        }
                        else {
                            (
                                async () => {
                                    let a = productModel.getProducts(results, res);
                                    a.then(() => {
                                        let isload = results.length < page;
                                        if (!isload) {
                                            results.splice(results.length - 1, 1);
                                        }
                                        return res.send({ status: "success", data: results, isload: !isload, message: 'sản phẩm shop id=' + shop_id });
                                    })
                                }
                            )()
                        }
                    });
                })
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * xóa sản phẩm
 */
router.post('/delete/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    let shop_id = req.params.shop_id;
    if (key == process.env.KEY) {
        let product_id = req.body.product_id;

        dbConn.query('DELETE FROM `product` WHERE `product_id` = ? AND `shop_id` = ?', [product_id, shop_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            dbConn.query('DELETE FROM `category_product` WHERE `product_id` = ?', product_id, function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                let page = 11;
                dbConn.query('SELECT `product`.* FROM `product`  WHERE `shop_id` = ? ORDER BY `product_date` DESC,`product`.`product_id` ASC LIMIT 0,?', [shop_id, page], function (error, results, fields) {
                    if (error) return res.send({ status: "fail", message: error });
                    if (results == null || results.length === 0) {
                        return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                    }
                    else {
                        (
                            async () => {
                                let a = productModel.getProducts(results, res);
                                a.then(() => {
                                    let isload = results.length < page;
                                    if (!isload) {
                                        results.splice(results.length - 1, 1);
                                    }
                                    return res.send({ status: "success", data: results, isload: !isload, message: 'sản phẩm shop id=' + shop_id });
                                })
                            }
                        )()
                    }
                });
            });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * sửa sản phẩm
 */
router.post('/update/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    let shop_id = req.params.shop_id;
    if (key == process.env.KEY) {
        let product_avatar = req.body.product_avatar;
        let product_quantity = req.body.product_quantity == '' ? null : req.body.product_quantity;
        let product_price = req.body.product_price;
        let product_image = req.body.product_image;
        let product_title = req.body.product_title;
        let product_description = req.body.product_description;
        let product_sale = req.body.product_sale == '' ? 0 : req.body.product_sale;
        let product_id = req.body.product_id;
        let product_categories = req.body.product_categories;
        let last_update = req.body.last_update;
        dbConn.query(
            'UPDATE `product` SET `product_avatar`= ? ,`product_quantity`= ? ,`product_price`= ? ,`product_sale`= ? ,`product_title`= ?,`product_image`= ? ,`product_description`= ? ,`last_update`= `last_update` + 1 WHERE `product_id` = ? AND `last_update` = ? AND `shop_id` = ?',
            [product_avatar, product_quantity, product_price, product_sale, product_title, product_image, product_description, product_id, last_update, shop_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                if (results.changedRows != 0) {
                    dbConn.query('DELETE FROM `category_product` WHERE `product_id` = ?', product_id, function (error, results, fields) {
                        if (error) return res.send({ status: "fail", message: error });
                        const categoryArr = product_categories.split(',');
                        let arr = [];
                        for (const item of categoryArr) {
                            arr.push(
                                new Promise(function (resolve, reject) {
                                    dbConn.query('INSERT INTO `category_product`(`category_id`, `product_id`) VALUES (?,?)', [item, product_id], function (error, results, fields) {
                                        if (error) return res.send({ status: "fail", message: error });
                                        resolve();
                                    })
                                }));
                        }

                        Promise.all([...arr]).then(() => {
                            let page = 11;
                            dbConn.query('SELECT `product`.* FROM `product`  WHERE `shop_id` = ? ORDER BY `product_date` DESC,`product`.`product_id` ASC LIMIT 0,?', [shop_id, page], function (error, results, fields) {
                                if (error) return res.send({ status: "fail", message: error });
                                if (results == null || results.length === 0) {
                                    return res.send({ status: "fail", message: 'không có sản phẩm trong cơ sở dữ liệu' });
                                }
                                else {
                                    (
                                        async () => {
                                            let a = productModel.getProducts(results, res);
                                            a.then(() => {
                                                let isload = results.length < page;
                                                if (!isload) {
                                                    results.splice(results.length - 1, 1);
                                                }
                                                return res.send({ status: "success", data: results, isload: !isload, message: 'sản phẩm shop id=' + shop_id });
                                            })
                                        }
                                    )()
                                }
                            });
                        })
                    });
                }
                else {
                    return res.send({ status: "fail", message: 'Cập nhật thất bại!' });
                }
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});


/**
 * cập nhật trạng thái sản phẩm theo shop
 */
router.get('/update_status/:status/:shop_id/:key', async (req, res) => {
    let key = req.params.key;
    let shop_id = req.params.shop_id;
    let status = req.params.status;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `product` SET `status`= ? WHERE `shop_id` = ?', [status, shop_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            return res.send({ status: "success", message: results });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * cập nhật trạng thái sản phẩm theo product id
 */
router.get('/status_id/:status/:product_id/:key', async (req, res) => {
    let key = req.params.key;
    let product_id = req.params.product_id;
    let status = req.params.status;
    if (key == process.env.KEY) {
        dbConn.query('UPDATE `product` SET `status`= ? WHERE `product_id` = ?', [status, product_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            return res.send({ status: "success", message: "Cập nhật thành công" });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});
module.exports = router;