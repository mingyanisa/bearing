var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs-extra');
var sql = require('mysql');
var _ = require('lodash');
var CryptoJS = require("crypto-js");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
    next();
});

app.set('view engine', 'pug')

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function () {
    console.log('Listening on port 3000');
});

io.on('connection', socket => {
    console.log('Socket io a user connected');
    console.log('ming');
});

app.get('/', (req, res) => {
    res.render('index', {});
});