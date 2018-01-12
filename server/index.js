var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var morgan = require('morgan');
var db = require('../function/db');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('tiny'));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Cache-Control","no-cache, no-store, must-revalidate");
    res.header("Pragma","no-cache");
    res.header("Expires","0");
    next();
});

app.use(passport.initialize());

app.set('view engine','pug')

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function () {
    console.log('Listening on port 3000');
    console.log('Initialize Database');
    // Use for re-model database
    // sql.clearAllDatabase();
    db.initDatabase();
});

io.on('connection',(socket)=>{
    console.log('ming');
});

require('../config/passport')(passport);
require('./route')(app,passport);
app.use('/admin',require('./adminRoute')());