

module.exports = (app,passport)=>{

    app.get('/',(req,res)=>{
        res.render('index',{});
    });
    app.get('/store',(req,res)=>{
        res.render('store',{});
    });
    app.get('/login',(req,res)=>{
        res.render('login',{});
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
    }));
}