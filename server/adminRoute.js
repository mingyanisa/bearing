module.exports = function (passport) {
    var express = require('express');
    var app = express();

    app.get('/', (req, res) => {
        res.render('./dashboard/adminTemplate', {});
    });

    return app;
}