var stemjwt = require('../../server/jwt');

module.exports = function(Messages) {

    Messages.beforeRemote('**', function(context, unused, next) {
      console.log('Messages calls intercepted!');
      var req = context.req;
      var res = context.res;
      var tokenHeader = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
      // console.log('1 Messages tokenHeader received [' + tokenHeader + ']');
      var token = stemjwt.getToken(tokenHeader);
      var stat = stemjwt.isTokenValid(token);
      // console.log(stat);
      if(stat) {
        next();
      } else {
        next(new Error('must be logged in'));
      }
    });

};
