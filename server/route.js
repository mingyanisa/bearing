module.exports = function(app, passport){

    app.get('/', (req, res) => {
        res.render('index', {});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/',
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin',
        failureRedirect: '/'
    }));
};