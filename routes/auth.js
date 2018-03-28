module.exports = (app,passport)=>
{

    app.get('/',isLoggedIn, (req, res) => {
        res.render('index', {message: req.flash('authMessage')});
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// =====================================
// LOGOUT ==============================
// =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // route middleware to make sure
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (!req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/profile');
    }



}


