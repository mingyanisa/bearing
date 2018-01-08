var LocalStrategy = require('passport-local').Strategy;
var sql = require('../functions/db');

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        done(null, user)
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(() => {
            sql.users.findByEmail(email).then(result => {
                if (result.length === 0) {
                    sql.users.addUser(email, password).then(result => {
                        return sql.users.findByEmail(email);
                    }).then(user => {
                        return done(null, user[0].RowDataPacket);
                    });
                } else {
                    return done(null, false);
                }
            }).catch(error => {
                return done(error);
            });
        });
    }));
};