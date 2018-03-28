const express = require('express');
const router = express.Router();


router.get('/profile',isLoggedIn,(req,res)=>{
    res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
    });
});



// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;