const   mongoose = require('mongoose'),
        scema = require('../user/user.shema'),
        User = mongoose.model('User', scema),
        JwtStrategy = require('passport-jwt').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        TwitterStrategy = require('passport-twitter').Strategy,
        GoogleStrategy = require('passport-google-oauth2').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt,
        passport = require('passport'),
        jwt = require('jsonwebtoken'),
        bcrypt = require('bcrypt-nodejs'),
        authConfig = require('../../config/auth.js'),
        http = require('http');

module.exports = function(app) {
    function prepareResp(success, message, token) {
        return {
            success: !!success,
            msg: message,
            data: token
        }
    }

    // serialize and deserialize
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    const opts = {};
          opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
          opts.secretOrKey = 'secret';

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log('here we go', jwt_payload);
        User.findById(jwt_payload.user, done)
    }));

    passport.use(new TwitterStrategy(authConfig.twitterAuth,
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        const newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.twitter.id    = profile.id; // set the users facebook id
                        newUser.twitter.token = accessToken; // we will save the token that facebook provides to the user
                        newUser.twitter.displayName  = profile.displayName; // look at the passport user profile to see how names are returned
                        newUser.twitter.username  = profile.username; // look at the passport user profile to see how names are returned
                        newUser.twitter.imageUrl  = profile.photos[0].value; // look at the passport user profile to see how names are returned

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    passport.use(new GoogleStrategy(authConfig.googleAuth,
        function(accessToken, refreshToken, profile, done) {
            console.log('profile--',profile);
            console.log('acc-token--',accessToken);
            console.log('ref-token--',refreshToken);
            process.nextTick(function () {
                User.findOne({ 'google.id' : profile.id }, function(err, user) {

                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        const newUser = new User();

                        console.log('saving');

                        // set all of the facebook information in our user model
                        newUser.google.id    = profile.id; // set the users facebook id
                        newUser.google.token = accessToken; // we will save the token that facebook provides to the user
                        newUser.google.name  = profile.displayName; // look at the passport user profile to see how names are returned
                        if(profile.emails) newUser.google.email = profile.emails[0].value;// facebook can return multiple emails so we'll take the first


                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });

                    }

                });
            });
        }
    ));

    passport.use(new FacebookStrategy(authConfig.facebookAuth,
        function(token, refreshToken, profile, done) {
            console.log('profile--',profile);
            console.log('acc-token--',token);
            console.log('ref-token--',refreshToken);
            process.nextTick(function() {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {


                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        const newUser = new User();

                        console.log('saving');

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                        if(profile.emails) newUser.facebook.email = profile.emails[0].value;// facebook can return multiple emails so we'll take the first


                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });

                    }

                });
            });

        }
    ));


    app.get('/auth/twitter',
        passport.authenticate('twitter'),
        function(req, res){});
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { failureRedirect: '/',session: true }),
        function(req, res) {
             res.redirect('http://localhost:8080/posts/');
        });


    app.get('/auth/google',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'email',
                'profile'
            ],
            accessType: 'offline',
            prompt: 'consent'
        }));
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('http://localhost:8080/posts/');
        });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope:['email', 'public_profile', 'token']}),  function(req, res) {
        console.log('finish', req);
    });
// handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('http://localhost:8080');
        });


    app.get('/auth/logout', function(req, res){
        req.logout();
        res.redirect('http://localhost:8080');
    });
    app.post( '/auth/login', function (req, res) {
            User.findOne({email : req.body.email}, function(err, user) {
                if (!user) {
                    res.status(401).json(prepareResp(false, 'User not found'))
                }
                else{
                     bcrypt.compare(req.body.password, user.password, function (err, compareResult) {
                        if (err) throw err;
                        if (compareResult) {
                            const token = jwt.sign({user: user.id}, opts.secretOrKey);
                            res.status(200).json(prepareResp(true, 'Success login', token));
                        }
                    })
                }
        });
    });

    app.get('/me', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.status(200).json(prepareResp(true, 'Success auth', req.user));
    });
};
