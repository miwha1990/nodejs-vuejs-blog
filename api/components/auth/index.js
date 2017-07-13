const   mongoose = require('mongoose'),
        scema = require('../user/user.shema'),
        User = mongoose.model('User', scema),
        JwtStrategy = require('passport-jwt').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
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

    const opts = {};
          opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
          opts.secretOrKey = 'secret';

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log('here we go', jwt_payload);
        User.findById(jwt_payload.user, done)
    }));

    passport.use(new FacebookStrategy(authConfig.facebookAuth,
        function(token, refreshToken, profile, done) {
            console.log(profile);
            // asynchronous
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

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

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
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }),  function(req, res) {
        console.log(req);
    });

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : 'http://localhost:8080/post',
            failureRedirect : '/'
        }),  function(req, res) {
            console.log(req);
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
