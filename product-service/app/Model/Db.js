var mysql = require('mysql');
const axios = require('axios');
var config = require('../config/config');

var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'product'
});
dbConn.connect();

function getProducts(results,option,req,res) {
    let result = [];
    let i = 0;
    results.map(item => {
        axios.get(config.app_url + `/api/product/` + item.product_id + `/` + option + `/` + req.params.key)
            .then(res => {
                const { data } = res.data;
                result.push(data[0]);
            })
            .catch(error => console.log(error))
            .finally(() => {
                i++;
                if (i === results.length) {
                    return res.send({ status: "success", data: result, message: 'tất cả thông tin sản phẩm' });
                }
            });
    });
}

module.exports = { dbConn, getProducts };