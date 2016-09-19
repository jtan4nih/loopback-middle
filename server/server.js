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

var server;
if(process.env.PORT == 3000) {
    server = app.listen(app.get('port'), function () {
        console.log('LoopBack Server listening on port ' + 3000);
    });
} else {
    server = https.createServer(options, app).listen(3043, function () {
        console.log('LoopBack Server listening on secured port ' + 3043);
    });
}
return  server;

  // start the web server
  // return app.listen(function() {
  //   app.emit('started');
  //   var baseUrl = app.get('url').replace(/\/$/, '');
  //   console.log('Web server listening at: %s', baseUrl);
  //   if (app.get('loopback-component-explorer')) {
  //     var explorerPath = app.get('loopback-component-explorer').mountPath;
  //     console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
  //   }
  // });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
