var express = require('express');
var app = express();
var exports = module.exports = {};

app.disable('x-powered-by');
app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3001, function(){
  console.log('Magic is happening on port 3001');
});

exports.closeServer = function(){
  server.close();
};
