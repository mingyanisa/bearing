
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs-extra');
var mysql = require('mysql');
var io = require('socket.io')(http);
var morgan = require('morgan');
var passport = require('passport');
require('../config/passport')(passport);


app.listen(3000);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req,res,next){
    // Allow access from other domain
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    // No cache kept in local
    res.header("Cache-Control","no-cache, no-store, must-revalidate");
    res.header("Pragma","no-cache");
    res.header("Expires","0");
    next();
});
app.set('view engine','pug')
io.on('connection',(socket)=>{
    console.log('ming');
});

app.use(morgan('tiny'));

app.use(passport.initialize());
app.use(passport.session());
app.use('/admin',require('./adminRoute')());

require('./route')(app,passport);