const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * lấy comment của sản phẩm
 */
router.get('/all/:product_id/:key', async (req, res) => {
    let id = req.params.product_id;
    let key = req.params.key;
    if (key == process.env.KEY) {

        dbConn.query('SELECT * FROM `comment` WHERE `product_id` = ? ORDER BY `comment`.`comment_id` DESC', id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có bình luận của sản phẩm có id=' + id });
            }
            else {
                let i = 0;
                results.map(comment => {

                    let user;
                    axios.get(process.env.USER_URL + `/api/user/get/user/by/` + comment.user_id)
                        .then(res => {
                            const { data } = res.data;
                            user = data;
                        })
                        .catch(error => console.log(error))
                        .finally(() => {
                            axios.get(process.env.IMG_URL + `/api/image/get/` + user.user_avatar + `/` + req.params.key)
                                .then(res => {
                                    const { data } = res.data;
                                    user.user_avatar = data;
                                })
                                .catch(error => console.log(error))
                                .finally(() => {
                                    delete comment["user_id"];
                                    comment.user = user;
                                    i++;
                                    if (i === results.length) {
                                        return res.send({ status: "success", data: results, message: 'comment của sản phẩm có id=' + id });
                                    }
                                });
                        });

                })

            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

/**
 * thêm comment của người dùng
 */
router.post('/insert/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        let userId = req.body.user_id;
        let comment_content = req.body.comment_content;
        let product_id = req.body.product_id;
        let comment_rating = req.body.comment_rating;

        dbConn.query('INSERT INTO `comment`( `user_id`, `comment_rating`, `comment_content`, `product_id`) VALUES (?, ?, ?, ?)',
            [userId, comment_rating, comment_content, product_id], function (error, results, fields) {
                if (error) throw error;
                axios.get(process.env.BASE_URL + `/api/comment/all/` + product_id + `/` + req.params.key)
                    .then(response => {
                        const { data } = response.data;
                        return res.send({ status: "success", data: data, message: 'thêm comment của user_id=' + userId + ' vào product_id=' + product_id + ' thành công!' });
                    })
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;