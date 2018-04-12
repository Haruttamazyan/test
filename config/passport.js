// config/passport.js

const hash = require('bcrypt-nodejs');
// load all the things we need
const LocalStrategy   = require('passport-local').Strategy;
const database = require('./database/database');

const conn = database.connect();



// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        conn.query("select * from users where id = " + id, function (err, rows) {
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            conn.query("select * from users where email = '" + email + "'", function (err, rows) {
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('authMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    let newUserMysql = new Object();

                //console.log(req.body);
                    newUserMysql.name = req.body.name;
                    newUserMysql.lastname = req.body.lastname;
                    newUserMysql.email = email;
                    newUserMysql.password = database.generatehash(password); // use the generateHash function in our user model

                    let insertQuery = "INSERT INTO users ( name, lastname ,email, password ) values ('" + newUserMysql.name + "','" + newUserMysql.lastname + "','" + newUserMysql.email + "','" + newUserMysql.password + "')";
                    console.log(insertQuery);
                    //console.log(database.validpassword(password,newUserMysql.password));
                    conn.query(insertQuery, function (err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }

            });

        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            conn.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    console.log('test');
                    return done(null, false, req.flash('authMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                //console.log(rows[0]);
                // if the user is found but the password is wrong

                if (!database.validpassword(password,rows[0].password)) {
                    return done(null, false, req.flash('authMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }


                // all is well, return successful user
                return done(null, rows[0]);

            });



        }));
}