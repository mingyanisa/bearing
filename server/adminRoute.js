module.exports = () => {
    var express = require('express');
    var app = express();

    app.get('/home', (req, res) => {
        res.render('adminTemplate', {});
    });
    return app;
}