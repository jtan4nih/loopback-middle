var jwt = require('jwt-simple');
var loginhelper = require('./df-helper');

var app = module.exports = {

    getSecret: function() {
        return process.env.apisecret || 'xxxxxx';  //TODO this might be better retrieved from a secured central location or even from a database!
    },
    isAuthenticated: function(userId, password, cb) {
        console.log('jwt:isAuthenticated called');
        loginhelper.loginDreamFactory(userId,password, cb);  //true;
    },
    isTokenValid: function(token) {
        var ret = false;
        //console.log('jwt.js token [' + token +'] with secret key [' + app.getSecret() + ']');     //DO NOT output this in production
        if (token) {
          try {
            var decoded = jwt.decode(token, app.getSecret());

            // handle token here
            if (decoded.exp <= Date.now()) {
              console.log('Access token has expired!');
            } else {
                ret = true;  //finally, it is a valid token!
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log('Access token is empty!???');
        }

        return ret;
    },
    getToken: function(tokenHeader) {
        var bearer = "Bearer ";
        var token = tokenHeader;
        if(typeof tokenHeader !== 'undefined' && tokenHeader.indexOf(bearer) > -1) {
            // console.log('1.1');
            var begin = tokenHeader.indexOf(bearer) + bearer.length;
            // console.log('1.2 begin ' + begin);
            token = tokenHeader.substr(begin, tokenHeader.length);
            // console.log('1.3 Messages token received [' + token + ']');
        }
        // console.log('2 Messages token received [' + token + ']');
        return token;
  }

};
