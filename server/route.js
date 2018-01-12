module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index', {});
    });

    app.get('/store', (req, res) => {
        res.render('store', {});
    });

    app.get('/login', (req, res) => {
        res.render('login', {});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/login',
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
    }));
}