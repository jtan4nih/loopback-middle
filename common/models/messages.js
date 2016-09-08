module.exports = function(Messages) {

    // Messages.beforeRemote('**', function(context, unused, next) {
    //   console.log('Messages calls intercepted!');
    //   var req = context.req;
    //   var res = context.res;
    //   var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['Authorization'];
    //   console.log('Messages token received [' + token + ']');
    //   var stat = stemjwt.isTokenValid(token);
    //   console.log(stat);
    //   if(stat) {
    //     next();
    //   } else {
    //     next(new Error('must be logged in'));
    //   }
    // });

};
