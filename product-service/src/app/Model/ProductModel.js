const { rejects } = require('assert');
const axios = require('axios');
const { get } = require('http');
const { resolve } = require('path');
var dbConn = require('../config/Db/config');

function getProducts(results, res) {
    return (
        async () => {
            let data = [];
            for (let i = 0; i < results.length; i++) {
                data.push(getProductInfo(results[i], res))
            }
            await Promise.all([...data]).then(() => {
            })
        }
    )()
}

function getProductInfo(product, res) {
    return (async () => {
        product.product_image_id = [];
        product.product_avatar_id = product.product_avatar;
        let arrImages = product.product_image.split(",");
        product.product_image = [];

        const getRating = new Promise((resolve, reject) => {
            dbConn.query('SELECT AVG(`comment`.`comment_rating`) AS `product_rating` FROM `product` JOIN `comment` ON `comment`.`product_id` = `product`.`product_id` WHERE `product`.`product_id` = ?', [product.product_id], function (error, results, fields) {
                if (error) {
                    return res.send({ status: "fail", message: error });
                }
                if (results.length > 0) {
                    product.product_rating = results[0].product_rating;
                }
                resolve()
            })
        })



        const getCategories = new Promise((resolve, reject) => {
            dbConn.query('SELECT `category`.`category_id` AS `category_id`,`category`.`category_category` AS `category_category`,`category`.`category_name` AS `category_name` FROM `category_product` JOIN `category` ON `category`.`category_id` = `category_product`.`category_id` WHERE `category_product`.`product_id` = ?', [product.product_id], function (error, results, fields) {
                if (error) {
                    return res.send({ status: "fail", message: error });
                }
                if (results.length > 0) {
                    let categories = []
                    results.map((item) => {
                        if (item.category_category) {
                            categories.push({
                                label: item.category_name,
                                value: `${item.category_category},${item.category_id}`
                            })
                        }
                    })
                    product.product_categories = categories;
                }
                resolve()
            })
        })

        //gọi API image lấy đường dẫn Avatar
        const getAvatar = axios.get(process.env.IMG_URL + `/api/image/get/` + product.product_avatar + `/` + process.env.KEY)
            .then(res => {
                const { data } = res.data;
                product.product_avatar = data;
            })
            .catch(error => {
                return res.send({ status: "fail", message: error });
            });

        //gọi API image lấy đường dẫn các hình ảnh sản phẩm
        let getImages = [];
        arrImages.map(item => {
            getImages.push(axios.get(process.env.IMG_URL + `/api/image/get/` + item + `/` + process.env.KEY)
                .then(res => {
                    const { data } = res.data;
                    product.product_image.push(data);
                    product.product_image_id.push(item)
                })
                .catch(error => {
                    return res.send({ status: "fail", message: error });
                })
            )
        });

        await Promise.all([getAvatar, ...getImages, getRating, getCategories]).then(() => {
            product.product_image.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0)
            product.product_image_id.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0)
        })
    })()
}

module.exports = {
    getProducts,
    getProductInfo
}