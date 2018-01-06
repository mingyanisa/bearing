var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs-extra');
var sql = require('mysql');
var io = require('socket.io')(http);

app.listen(3000);
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

io.on('connection', (socket) => {
    console.log('ming');
});

app.get('/', (req, res) => {
    res.render('index', {});
});