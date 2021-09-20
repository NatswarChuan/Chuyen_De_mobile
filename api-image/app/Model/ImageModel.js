var config = require('../config/config');
var dbConn = require('./Db'); 
function  getImage(req, res){
    let id = req.params.image_id;
    let key = req.params.key;
    if (key == config.key) {
        dbConn.query('SELECT `image_name` FROM `image` WHERE `image_id` = ?', id, function (error, results, fields) {
            if (error) throw error;
            if (results == null || results.length === 0) {
                return res.send({ status: "fail", message: 'không có hình' });
            }
            else {
                let img = config.url + results[0].image_name;
                return res.send({ status: "success", data: img, message: 'hình có id=' + id });
            }
        });
    }
    else {
        return res.send({ status: "fail", message: 'key không hợp lệ' });
    }
}

module.exports = {
    getImage: getImage
}