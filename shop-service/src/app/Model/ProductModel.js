const axios = require('axios');

function getProducts(results, option, req, res) {
    let result = [];
    let i = 0;
    results.map(item => {
        axios.get(process.env.BASE_URL + `/api/product/get/` + item.product_id + `/` + option + `/` + req.params.key)
            .then(res => {
                const { data } = res.data;
                result.push(data);
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
module.exports = {
    getProducts,
}