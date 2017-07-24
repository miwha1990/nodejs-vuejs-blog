// config/auth.js
const config = require('../config.json');

module.exports = {

    'facebookAuth' : {
        'clientID'      : '829249167245035', // your App ID
        'clientSecret'  : '84846583e847d479d466ad186efca476', // your App Secret
        'callbackURL'   :  config.backUrl+'/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'WqHZLmSe6z3fFzXUQ0WxEdyn3',
        'consumerSecret'    : 'vroszHGqj2rnJpyBetwo5QbDvimxYBQAc76CKRY9XYWQhJfSD5',
        'callbackURL'       :  config.backUrl+'/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '610013265299-uimjcnheonbqkkckbr32mf1bugbedva1.apps.googleusercontent.com',
        'clientSecret'  : 'UwfhisJl8DoDx1YTeJ6NCB-0',
        'callbackURL'   :  config.backUrl+'/auth/google/callback',
        'passReqToCallback':true
    }

};