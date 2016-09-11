var stemjwt = require('../../server/jwt');

module.exports = function(Audits) {

    Audits.beforeRemote('**', function(context, unused, next) {
      var req = context.req;
      var res = context.res;
      var tokenHeader = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
      var token = stemjwt.getToken(tokenHeader);
      var stat = stemjwt.isTokenValid(token);
      if(stat) {
        next();
      } else {
        next(new Error('must be logged in'));
      }
    });

};
