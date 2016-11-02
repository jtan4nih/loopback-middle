var https = require('https');
var fs = require('fs');
var path = require('path');
var options = {
      key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'privkey.pem'))
    , cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'fullchain.pem'))
    };
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
// var app = loopback();
// var exports = module.exports = {};

// exports.start = function() {
app.start = function() {
  // var server;
  app.set('port', process.env.PORT || 3000);
  // if(process.env.PORT == 3000) {
      server = app.listen(app.get('port'), function () {
        console.log('LoopBack Server listening on port ' + 3000);
      });
  // } else {
  //     server = https.createServer(options, app).listen(3043, function () {
  //         console.log('LoopBack Server listening on secured port ' + 3043);
  //     });
  // }

  app.server = server;
  return app;
};
