const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
var productModel = require('../Model/ProductModel');
const axios = require('axios');
const { response } = require('express');

/**
 *  lấy danh sách danh mục 
 */
router.get('/all/:option/:key', async (req, res) => {
    let key = req.params.key;
    let option = req.params.option;
    if (key == process.env.KEY) {
        let sql = '';
        switch (option) {
            case '0':
                sql = 'SELECT * FROM `category` WHERE `status` = 1 ORDER BY `category`.`category_id` ASC';
                break;
            case '1':
                sql = 'SELECT * FROM `category` ORDER BY `category`.`category_id` ASC';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: `error ${error}` });

            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                let categories = [];

                (
                    async () => {
                        for (let i = 0; i < results.length; i++) {
                            categories.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].category_image + `/` + req.params.key)
                                .then(response => {
                                    const { data } = response.data;
                                    results[i].category_image_id = results[i].category_image;
                                    results[i].category_image = data;
                                }).catch(err => { return }))
                        }

                        await Promise.all([...categories]).then(() => {
                            for (let i = 0; i < results.length; i++) {
                                results[i].categories = [];
                                for (let j = 0; j < results.length; j++) {
                                    if (results[i].category_id == results[j].category_category) {
                                        results[i].categories.push(results[j]);
                                    }
                                }
                            }

                            for (let i = 0; i < results.length; i++) {
                                if (results[i]["category_category"]) {
                                    results.splice(i, 1);
                                    i--;
                                }
                            }
                            return res.send({ status: "success", data: results });
                        })
                    }
                )()
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * lấy các sản phẩm thuộc danh mục
 */
router.get('/get/:category_id/:option/:key', async (req, res) => {
    let id = req.params.category_id;
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
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? AND `category`.`status` = 1 AND' + filter + ' ORDER BY ' + sort + ' `product`.`product_date` DESC,`product`.`product_id` ASC';
                break;
            case '1':
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? AND' + filter + ' ORDER BY ' + sort + ' `product`.`product_date` DESC,`product`.`product_id` ASC';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                (
                    async () => {
                        let a = productModel.getProducts(results, res);
                        a.then(() => {
                            return res.send({ status: "success", data: results, message: 'sản phẩm có id=' });
                        })
                    }
                )()
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * lấy các sản phẩm thuộc danh mục theo trang
 */
router.get('/page/:page/:category_id/:option/:key', async (req, res) => {
    let id = req.params.category_id;
    let key = req.params.key;
    let option = req.params.option;
    let page = req.params.page * 10 + 1;
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
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? AND `product`.`status` = 1 ' + filter + ' ORDER BY ' + sort + ' `product`.`product_date` DESC LIMIT 0,?';
                break;
            case '1':
                sql = 'SELECT `product`.* FROM `category` JOIN `category_product` ON `category_product`.`category_id` = `category`.`category_id` JOIN `product` ON `product`.`product_id` = `category_product`.`product_id` WHERE `category`.`category_id` = ? ' + filter + ' ORDER BY ' + sort + ' `product`.`product_date` DESC LIMIT 0,?';
                break;
            default:
                return res.send({ status: "fail", message: 'key không hợp lệ' });
        }
        dbConn.query(sql, [id, page], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
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
                            return res.send({ status: "success", isload: !isload, data: results, message: 'sản phẩm có id=' });
                        })
                    }
                )()
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * Xóa danh mục theo id (nếu có danh mục con xóa luôn danh mục con)
 */
router.get('/remove/:category_id/:key', async (req, res) => {
    let id = req.params.category_id;
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `category` WHERE `category_category` = ? OR `category`.`category_id` = ?', [id, id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const categories_id = [...results.map((item) => item.category_id)];
            const categories_image_id = [...results.map((item) => item.category_image)];
            let promise_categories_product = [];
            let promise_categories_image = [];
            for (const item of categories_id) {
                const promise = new Promise(resolve => {
                    dbConn.query('DELETE FROM `category_product` WHERE `category_id` = ?', [item], function (error, results, fields) {
                        resolve();
                    });
                })
                promise_categories_product.push(promise);
            }

            for (const item of categories_image_id) {
                promise_categories_image.push(axios.get(`${process.env.IMG_URL}/api/image/remove/${item}/e4611a028c71342a5b083d2cbf59c494`));
            }

            const delete_categories = new Promise(resolve => {
                dbConn.query('DELETE FROM `category` WHERE `category_id` = ? OR `category_category` = ?', [id, id], function (error, results, fields) {
                    resolve();
                });
            })

            Promise.all([delete_categories, ...promise_categories_product, ...promise_categories_image]).then(() => {
                (
                    async () => {
                        await axios.get(`${process.env.BASE_URL}/api/category/all/1/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
                            console.log("lakjsdlkajsdlk")
                            return res.send({ status: "success", data: response.data.data, message: "xóa thành công" });
                        })
                    }
                )()
            })
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * Thêm danh mục
 */
router.post('/insert/:key', async (req, res) => {
    // let id = req.params.category_id;
    const category_image = req.body.category_image;
    const category_name = req.body.category_name;
    const category_category = req.body.category_category ? req.body.category_category : null;
    let key = req.params.key;
    if (key == process.env.KEY) {
        let sql = 'INSERT INTO `category`(`category_image`, `category_name`, `category_category`) VALUES (? ,? ,? )';
        dbConn.query(sql, [category_image, category_name, category_category], function (error, results, fields) {
            if (error) { return res.send({ status: "fail", message: error }); }
            (
                async () => {
                    await axios.get(`${process.env.BASE_URL}/api/category/all/1/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
                        return res.send({ status: "success", data: response.data.data, message: "thêm thành công" });
                    })
                }
            )()
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 * Sửa danh mục theo id 
 */
router.post('/update/:key', async (req, res) => {
    const category_image = req.body.category_image;
    const category_name = req.body.category_name;
    const category_id = req.body.category_id;
    const last_update = req.body.last_update;
    const category_category = req.body.category_category ? req.body.category_category : null;
    let key = req.params.key;
    if (key == process.env.KEY) {
        let sql = 'UPDATE `category` SET`category_image`= ?,`category_name`= ? ,`category_category`= ? , `last_update`= `last_update` + 1 WHERE  `category_id`= ? AND `last_update` = ?';
        dbConn.query(sql, [category_image, category_name, category_category, category_id, last_update], function (error, results, fields) {
            if (error) { return res.send({ status: "fail", message: error }); }
            (
                async () => {
                    await axios.get(`${process.env.BASE_URL}/api/category/all/1/e4611a028c71342a5b083d2cbf59c494`).then((response) => {
                        return res.send({ status: "success", data: response.data.data, message: "thêm thành công" });
                    })
                }
            )()
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

/**
 *  lấy danh danh mục 
 */
 router.get('/get_cat/:category_id/:key', async (req, res) => {
    let id = req.params.category_id;
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `category` WHERE `category`.`category_id` = ? OR `category`.`category_category` = ? ORDER BY `category`.`category_id` ASC', [id,id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: `error ${error}` });

            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có sản phẩm có id=' + id });
            }
            else {
                let categories = [];

                (
                    async () => {
                        for (let i = 0; i < results.length; i++) {
                            categories.push(axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].category_image + `/` + req.params.key)
                                .then(response => {
                                    const { data } = response.data;
                                    results[i].category_image_id = results[i].category_image;
                                    results[i].category_image = data;
                                }).catch(err => { return }))
                        }

                        await Promise.all([...categories]).then(() => {
                            for (let i = 0; i < results.length; i++) {
                                results[i].categories = [];
                                for (let j = 0; j < results.length; j++) {
                                    if (results[i].category_id == results[j].category_category) {
                                        results[i].categories.push(results[j]);
                                    }
                                }
                            }
                            return res.send({ status: "success", data: results[0] });
                        })
                    }
                )()
            }
        });

    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

module.exports = router;