const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const axios = require('axios');

/**
 * lấy comment của sản phẩm
 */
router.get('/all/:product_id/:page/:key', async (req, res) => {
    let id = req.params.product_id;
    let key = req.params.key;
    let page = req.params.page * 10;
    if (key == process.env.KEY) {

        dbConn.query('SELECT * FROM `comment` WHERE `product_id` = ? ORDER BY `comment`.`comment_id` DESC LIMIT 0, ?', [id,page], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: `error ${error}` });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có bình luận của sản phẩm có id=' + id });
            }
            else {
                (
                    async () => {
                        let user_comments = [];
                        let user;
                        for (let i = 0; i < results.length; i++) {
                            user_comments.push(axios.get(process.env.USER_URL + `/api/user/get/user/by/` + results[i].user_id)
                                .then(res => {
                                    const { data } = res.data;
                                    user = data;
                                    results[i].user = user;
                                }))
                        }
                        await Promise.all([...user_comments]).then(() => {
                                results.sort((a, b) => a.comment_id !== b.comment_id ? a.comment_id < b.comment_id ? 1 : -1 : 0)
                                return res.send({ status: "success", data: results, message: 'comment của sản phẩm có id=' + id });

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
 * thêm comment của người dùng
 */
router.post('/insert/:page/:key', async (req, res) => {
    let key = req.params.key;
    if (key == process.env.KEY) {
        let userId = req.body.user_id;
        let comment_content = req.body.comment_content;
        let product_id = req.body.product_id;
        let comment_rating = req.body.comment_rating;
        let page = req.params.page * 10;

        dbConn.query('INSERT INTO `comment`( `user_id`, `comment_rating`, `comment_content`, `product_id`) VALUES (?, ?, ?, ?)',
            [userId, comment_rating, comment_content, product_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                dbConn.query('SELECT * FROM `comment` WHERE `product_id` = ? ORDER BY `comment`.`comment_id` DESC LIMIT 0, ?', [product_id,page], function (error, results, fields) {
                    if (error) return res.send({ status: "fail", message: `error ${error}` });
                    if (results == null || results.length === 0) {
                        return res.send({ status: "fail", message: 'không có bình luận của sản phẩm có id=' + product_id });
                    }
                    else {
                        (
                            async () => {
                                let user_comments = [];
                                let user;
                                for (let i = 0; i < results.length; i++) {
                                    user_comments.push(axios.get(process.env.USER_URL + `/api/user/get/user/by/` + results[i].user_id)
                                        .then(res => {
                                            const { data } = res.data;
                                            user = data;
                                            results[i].user = user;
                                        }))
                                }
                                await Promise.all([...user_comments]).then(() => {
                                    (
                                        async () => {
                                            let user_list = [];
                                            for (let i = 0; i < results.length; i++) {
                                                user_list.push(
                                                    axios.get(process.env.IMG_URL + `/api/image/get/` + results[i].user.user_avatar + `/` + req.params.key)
                                                        .then(res => {
                                                            const { data } = res.data;
                                                            let user = results[i].user;
                                                            user.user_avatar = data;
                                                            delete results[i]["user_id"];
                                                            results[i].user = user;
                                                        })
                                                        .catch(error => { return res.send({ status: "fail", message: `error ${error}` }) })
                                                )
                                            }

                                            await Promise.all([...user_list]).then(() => {
                                                return res.send({ status: "success", data: results, message: 'comment của sản phẩm có id=' + product_id });
                                            })
                                        }
                                    )()

                                })
                            }
                        )()
                    }
                });
            });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

module.exports = router;