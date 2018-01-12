var db = require('../function/db')
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        db.user.find({
            id: id
        }).then(users => {
            if(users.length === 0){
                return done(null, null);
            }
            return done(null, users[0]);
        }).catch(err => done(err, null));
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(() => {
            db.user.find({
                email: email
            }).then(users => {
                if (users.length !== 0) {
                    throw ({
                        err: 1
                    });
                } else {
                    return db.user.insert({
                        email: email,
                        password: password
                    });
                }
            }).then(results => db.user.find({
                id: results.insertId
            })).then(users => done(null, users[0])).catch(err => {
                switch (err.err) {
                    case 1:
                        return done(null, false);
                    default:
                        return done(err);
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        db.user.find({
            email: email
        }).then(users => {
            console.log(users);
            if (users.length === 0) {
                return done(null, false);
            }
            if (users[0].password !== password) {
                return done(null, false);
            }
            return done(null, users[0]);
        }).catch(err => done(err));
    }));
}