const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Lấy danh sách thành phố
 */
router.get('/city/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        axios.get('https://api.mysupership.vn/v1/partner/areas/province')
            .then((response) => {
                res.send(response.data);
            })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * Lấy danh sách quận huyện theo thành phố
 */
router.get('/district/:id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.id;
    if (key == process.env.KEY) {
        axios.get('https://api.mysupership.vn/v1/partner/areas/district?province=' + id).then((response) => {
            res.send(response.data);
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});


/**
 * Lấy danh sách phường xã theo quận huyện
 */
router.get('/ward/:id/:key', async (req, res) => {
    let key = req.params.key;
    let id = req.params.id;
    if (key == process.env.KEY) {
        axios.get('https://api.mysupership.vn/v1/partner/areas/commune?district=' + id).then((response) => {
            res.send(response.data);
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;