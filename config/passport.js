var LocalStrategy = require('passport-local').Strategy;
var sql = require('../functions/db');

module.exports = function (passport) {
    passport.serializaUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializaUser((id, done) => {

    })
};