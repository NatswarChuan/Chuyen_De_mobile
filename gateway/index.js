const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const express = require('express')
const httpProxy = require('express-http-proxy')
const http = require('http');
const { url } = require('inspector');
const app = express()
const sever = http.createServer(app);

sever.listen(3301, () => {
    console.log('Listen on port 3301....')
    var mysql = require('mysql');

    var dbConn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: 3307,
        password: 'CANsa123***',
        database: 'gateway' 
    });
    
    dbConn.connect();

    dbConn.query('SELECT * FROM `service`', function (error, results, fields) {
        if (error) throw error;
        results.map(item => {
            dbConn.query('SELECT * FROM `api` WHERE `service_id`= ?', item.id, function (error, results, fields) {
                if (error) throw error;
                for (let index = 0; index < results.length; index++) {
                    createAPI(results[index].url,httpProxy(item.service_ip),results[index].type)           
                }
            })
        })

    });

});

// Authentication
app.use((req, res, next) => {
    // TODO: my authentication logic
    next()
})

function createAPI(url,service,type){
    if(type == 1){
        app.get(url, (req, res, next) => {
            service(req, res, next)
        })
    }
    else{
        app.post(url, (req, res, next) => {
            service(req, res, next)
        })
    }
}