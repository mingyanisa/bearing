var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs-extra');
var _ = require('lodash');
var passport = require('passport');
var CryptoJS = require("crypto-js");
var sql = require('../functions/db');
var morgan = require('morgan');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan('tiny'));

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
    console.log('Initialize Database');
    // Use for re-model database
    // sql.clearAllDatabase();
    sql.initDatabase();
});

io.on('connection', socket => {
    console.log('Socket io a user connected');
    console.log('ming');
});
require('../config/passport')(passport);
require('./route')(app, passport);