const { P2cBalancer,RandomBalancer, } = require('load-balancers');
const http = require('http');
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
server.listen(3102, () => {
    console.log('Listen on port ' + 3102 + '...')

});
const cors = require("cors");

app.use(
    cors({
        origin: "*",
    })
);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
// TODO: Update this list with your proxies or virtual machines.
const proxies = [
    httpProxy('52.187.10.119:3301'),
    httpProxy('127.0.0.1:3301')
];
 
// Initializes the Power of 2 Choices (P2c) Balancer with ten proxies.
const balancer = new P2cBalancer(proxies.length);
 
app.use((req,res,next)=>{
    const proxy = proxies[balancer.pick()];
    proxy(req,res,next)
})
// P2c Balancer is preferred over the Random Balancer.
// const balancer = new RandomBalancer(proxies.length);


