// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '829249167245035', // your App ID
        'clientSecret'  : '84846583e847d479d466ad186efca476', // your App Secret
        'callbackURL'   : 'http://localhost:8000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'WqHZLmSe6z3fFzXUQ0WxEdyn3',
        'consumerSecret'    : 'vroszHGqj2rnJpyBetwo5QbDvimxYBQAc76CKRY9XYWQhJfSD5',
        'callbackURL'       : 'http://localhost:8000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '610013265299-uimjcnheonbqkkckbr32mf1bugbedva1.apps.googleusercontent.com',
        'clientSecret'  : 'UwfhisJl8DoDx1YTeJ6NCB-0',
        'callbackURL'   : 'http://localhost:8000/auth/google/callback',
        'passReqToCallback':true
    }

};