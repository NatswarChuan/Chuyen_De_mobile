const fs = require('fs');
const express = require('express');
const router = express.Router();
var root = require('../config/Db/root');
var dbConn = require('../config/Db/config');
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024,
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
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có hình' });
            }
            else {
                let img = process.env.BASE_SERVER + '/api/image/photo/' + results[0].image_name + '/' + process.env.KEY;
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
        const imagePath = `C:/wamp64/www/upload/`;
        const fileUpload = new Resize(imagePath);
        const fileName = `${Math.floor(Math.random() * 1000)}${Number(Date.now())}`;

        if (!req.file) {
            res.status(401).json({ error: 'Please provide an image' });
        }
        const filename = await fileUpload.save(req.file.buffer, fileName);

        dbConn.query('INSERT INTO `image`(`image_id`, `image_name`) VALUES (?, ?)', [fileName, filename], function (error, results, fields) {
            if (error) throw error;
            return res.send({ status: "success", data: { image_id: fileName }, message: 'hình có id=' + fileName });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}
);

//Trả về hình ảnh
router.get('/photo/:photo/:key', function (req, res) {
    let key = req.params.key;
    if (key == process.env.KEY) {
        let photo = req.params.photo;
        res.sendFile(`C:/wamp64/www/upload/` + photo);
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

//Xóa hình
router.get('/remove/:photo/:key', function (req, res) {
    let key = req.params.key;
    let photo = req.params.photo;
    if (key == process.env.KEY) {
        const imageLink = `C:/wamp64/www/upload/` + photo;
        fs.unlink(imageLink, (err) => {
            if (err) throw err;
            return res.send({ status: "success", message: 'xóa hình thành công' });
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
});

//sửa hình
router.post("/update/:image_id/:key", upload.single('file'), async function (req, res) {
    let key = req.params.key;
    let id = req.params.image_id;
    if (key == process.env.KEY) {
        const imageLink = `C:/wamp64/www/upload/` + '/' + id + '.png';
        const imagePath = `C:/wamp64/www/upload/`;
        // fs.unlink(imageLink, (err) => {
        //     if (err) throw err;
        //     (
        //         async () => {
        //             const fileUpload = new Resize(imagePath);

        //             if (!req.file) {
        //                 res.status(401).json({ error: 'Please provide an image' });
        //             }
        //             const filename = fileUpload.save(req.file.buffer, id);

        //             return res.send({ status: "success", data: { image_id: id }, message: 'hình có id=' + id });
        //         }
        //     )();
        // });
        axios.get(process.env.BASE_URL + `/api/image/remove/${id}.png/${req.params.key}`)
            .finally(() => {
                (
                    async () => {
                        const imagePath = `C:/wamp64/www/upload/`;
                        const fileUpload = new Resize(imagePath);
                        const fileName = `${Math.floor(Math.random() * 1000)}${Number(Date.now())}`;

                        if (!req.file) {
                            res.status(401).json({ error: 'Please provide an image' });
                        }
                        const filename = await fileUpload.save(req.file.buffer, fileName);

                        dbConn.query('DELETE FROM `image` WHERE`image_id` = ?', id, function (error, results, fields) {
                            if (error) throw error;
                            dbConn.query('INSERT INTO `image`(`image_id`, `image_name`) VALUES (?, ?)', [fileName, filename], function (error, results, fields) {
                                if (error) throw error;
                                return res.send({ status: "success", data: { image_id: fileName }, message: 'hình có id=' + fileName });
                            });
                        });
                    })()
            });
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