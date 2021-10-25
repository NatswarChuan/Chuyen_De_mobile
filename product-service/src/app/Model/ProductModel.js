const axios = require('axios');
const { get } = require('http');
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
        let arrImages = product.product_image.split(",");
        product.product_image = [];

        const getRating = dbConn.query('SELECT AVG(`comment`.`comment_rating`) AS `product_rating` FROM `product` JOIN `comment` ON `comment`.`product_id` = `product`.`product_id` WHERE `product`.`product_id` = ?', [product.product_id], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                product.product_rating = results[0].product_rating;
            }
        })

        //gọi API image lấy đường dẫn Avatar
        const getAvatar = axios.get(process.env.IMG_URL + `/api/image/get/` + product.product_avatar + `/` + process.env.KEY)
            .then(res => {
                const { data } = res.data;
                axios.get(process.env.IMG_URL + `/api/image/get/` + product.product_avatar + `/` + process.env.KEY)
                product.product_avatar = data;

            })
            .catch(error => { return res.send({ status: "fail", message: `error ${error}` }); });

        //gọi API image lấy đường dẫn các hình ảnh sản phẩm
        let getImages = [];
        arrImages.map(item => {
            getImages.push(axios.get(process.env.IMG_URL + `/api/image/get/` + item + `/` + process.env.KEY)
                .then(res => {
                    const { data } = res.data;
                    product.product_image.push(data);
                })
                .catch(error => res.send({ status: "fail", message: error }))
            )
        });

        await Promise.all([getAvatar, ...getImages, getRating]).then(() => {
            product.product_image.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0)
        })
    })()
}

module.exports = {
    getProducts,
    getProductInfo
}