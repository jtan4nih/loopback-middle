var stemjwt = require('../../server/jwt');

module.exports = function(Messages) {

    Messages.beforeRemote('**', function(context, unused, next) {
      console.log('Messages calls intercepted!');
      var req = context.req;
      var res = context.res;
      var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
      console.log('1 Messages token received [' + token + ']');
      var bearer = "Bearer ";
      if(token.indexOf(bearer) > -1) {
              console.log('1.1');

        var begin = token.indexOf(bearer) + bearer.length;
              console.log('1.2 begin ' + begin);
        token = token.substr(begin, token.length);
      console.log('1.3 Messages token received [' + token + ']');
      }
      console.log('2 Messages token received [' + token + ']');
      var stat = stemjwt.isTokenValid(token);
      console.log(stat);
      if(stat) {
        next();
      } else {
        next(new Error('must be logged in'));
      }
    });

};
