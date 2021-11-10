const { P2cBalancer, RandomBalancer, } = require('load-balancers');
const http = require('http');
const fs = require('fs');
const https = require('https');
const express = require('express');
const httpProxy = require('express-http-proxy')
const app = express();
const server = http.createServer(app);
const axios = require('axios');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const privateKey = fs.readFileSync('./certificate/private.key');
const certificate = fs.readFileSync('./certificate/certificate.crt');
const ca = fs.readFileSync('./certificate/ca_bundle.crt');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials,app);
const httpServer = http.createServer(app);

httpServer.listen(3102, () => {
    console.log('Listen on port ' + 3102 + '...')

});
httpsServer.listen(443, () => {
    console.log('Listen on port ' + 443 + '...')

});

const cors = require("cors");

app.set('trust proxy', true);

app.use(cors(
    {
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: ['https://localhost:3000','http://localhost:3000','http://103.207.38.200:3102','https://103.207.38.200:443'],
        credentials: true,
        exposedHeaders: ["set-cookie"],
    }
));

app.use(function (req, res, next) {
    req.headers['X-Forwarded-Proto'] = 'https';
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Origin', "https://localhost:3000");
    //res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Set-Cookie'
    )
    next()
})
// TODO: Update this list with your proxies or virtual machines.
const proxies = [
    // httpProxy('52.187.10.119:3301'),
    httpProxy('127.0.0.1:3301')
];

// Initializes the Power of 2 Choices (P2c) Balancer with ten proxies.
const balancer = new P2cBalancer(proxies.length);

app.use((req, res, next) => {
    const proxy = proxies[balancer.pick()];
    proxy(req, res, next)
})
// P2c Balancer is preferred over the Random Balancer.
// const balancer = new RandomBalancer(proxies.length);


