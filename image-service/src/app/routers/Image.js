const fs = require('fs');
const express = require('express');
const router = express.Router();
var dbConn = require('../config/Db/config');
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: Infinity,
    }
});
const path = require('path');
const sharp = require('sharp');
const axios = require('axios');
/**
 * Trả về đường dẫn hình ảnh
 */
router.get('/get/:image_id/:key', async (req, res) => {
    let id = req.params.image_id;
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT `image_name` FROM `image` WHERE `image_id` = ?', id, function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có hình' });
            }
            else {
                let img = process.env.BASE_SERVER + '/api/image/photo/' + id + '/' + process.env.KEY;
                return res.send({ status: "success", data: img, message: 'hình có id=' + id });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

//Lưu hình
router.post("/save/:key", upload.single('file'), async function (req, res) {
    let key = req.params.key;
    if (key == process.env.KEY) {
        const imagePath = process.env.IMG_DIR;
        const fileUpload = new Resize(imagePath);
        const fileName = `${Math.floor(Math.random() * 99)}${Number(Date.now())}`;

        console.log(req.file);

        if (!req.file) {
            res.status(401).json({ error: 'Please provide an image' });
        }
        const filename = await fileUpload.save(req.file.buffer, fileName);

        req.body.image_title ?
            dbConn.query('INSERT INTO `image`(`image_name`,`image_title`) VALUES (?,?)', [filename, req.body.image_title], function (error, results, fields) {
                if (error) {
                    console.log(error,54)
                    return res.send({ status: "fail", message: error });
                }
                const img_id = results.insertId;
                return res.send({ status: "success", data: { image_id: img_id }, message: 'hình có id=' + img_id });
            }) :
            dbConn.query('INSERT INTO `image`(`image_name`) VALUES (?)', [filename], function (error, results, fields) {
                if (error) {
                    console.log(filename,error,62)
                    return res.send({ status: "fail", message: error });
                }
                const img_id = results.insertId;
                return res.send({ status: "success", data: { image_id: img_id }, message: 'hình có id=' + img_id });
            })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

//Trả về hình ảnh
router.get('/photo/:image_id/:key', function (req, res) {
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `image` WHERE `image`.`image_id` = ?', [req.params.image_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            if (results[0]) {
                res.sendFile(process.env.IMG_DIR + results[0].image_name);
            }
            else {
                return res.send({ status: "fail", message: 'key không hợp lệ' });
            }
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

//Xóa hình
router.get('/remove/:image_id/:key', function (req, res) {
    let key = req.params.key;
    if (key == process.env.KEY) {
        dbConn.query('SELECT * FROM `image` WHERE `image`.`image_id` = ?', [req.params.image_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const imageLink = process.env.IMG_DIR + results[0].image_name;
            dbConn.query('DELETE FROM `image` WHERE `image`.`image_id` =  ?', [req.params.image_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                fs.unlink(imageLink, (err) => {
                    if (err) return res.send({ status: "fail", message: err });
                    return res.send({ status: "success", message: 'xóa hình thành công' });
                });
            })
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

//sửa hình
router.post("/update/:image_id/:key", upload.single('file'), async function (req, res) {
    let key = req.params.key;
    if (key == process.env.KEY) {
        const imagePath = process.env.IMG_DIR;
        const fileUpload = new Resize(imagePath);
        const fileName = `${Math.floor(Math.random() * 1000)}${Number(Date.now())}`;

        if (!req.file) {
            res.status(401).json({ error: 'Please provide an image' });
        }

        const filename = await fileUpload.save(req.file.buffer, fileName);
        dbConn.query('SELECT * FROM `image` WHERE `image`.`image_id` = ?', [req.params.image_id], function (error, results, fields) {
            if (error) return res.send({ status: "fail", message: error });
            const imageLink = process.env.IMG_DIR + results[0].image_name;
            dbConn.query('DELETE FROM `image` WHERE `image`.`image_id` =  ?', [req.params.image_id], function (error, results, fields) {
                if (error) return res.send({ status: "fail", message: error });
                fs.unlink(imageLink, (err) => {
                    if (err) return res.send({ status: "fail", message: err });
                    req.body.image_title ?
                        dbConn.query('INSERT INTO `image`(`image_name`,`image_title`) VALUES (?,?)', [filename, req.body.image_title], function (error, results, fields) {
                            if (error) return res.send({ status: "fail", message: error });
                            return res.send({ status: "success", data: { image_id: results.insertId }, message: 'hình có id=' + results.insertId });
                        }) :
                        dbConn.query('INSERT INTO `image`(`image_name`) VALUES (?)', [filename], function (error, results, fields) {
                            if (error) return res.send({ status: "fail", message: error });
                            return res.send({ status: "success", data: { image_id: results.insertId }, message: 'hình có id=' + results.insertId });
                        })
                });
            })
        })
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer, fileName) {
        const filename = fileName + '.png';
        const filepath = this.filepath(filename);

        await sharp(buffer).toFile(filepath);

        return filename;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = router;