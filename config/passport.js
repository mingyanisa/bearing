var db = require('../function/db')
var LocalStrategy = require('passport-local').Strategy;
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        db.user.findById(id).then(results => {
            if (results === 0) return done(null, null);
            return done(null, results[0]);
        }).catch(err => {
            return done(err, null);
        });
    });


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            db.user.findByEmail(email).then(results => {
                if (results.length === 0) {
                    db.user.addUser(email, password).then(results => {
                        return db.user.findByEmail(email)
                    }).then(results => {
                        return done(null, results[0]);
                    }).catch(err => {
                        throw err;
                    });
                } else {
                    return done(null, false);
                }
            }).catch(err => {
                return done(err);
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        db.user.findByEmail(email).then(results => {
            if (results.length === 0) { return done(null, false) }
            if (results[0].password !== password) { return done(null, false) }
            return done(null, results[0]);
        }).catch(err => {
            return done(err);
        });
    }));

}