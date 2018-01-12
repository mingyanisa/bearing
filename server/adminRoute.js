var express = require('express');
var app = express(); 
module.exports= ()=>{
    app.get('/home',(req,res)=>{
        res.render('adminTemplate',{});
    })
    return app;
}