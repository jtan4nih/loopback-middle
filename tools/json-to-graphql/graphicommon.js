'use strict';
var request = require('request');

var util = {

  listModels: function(apiHost, uri, id, callback) {
      var url = `${apiHost}${uri}`;
      var action = 'GET';
      if(typeof id !== 'undefined') {
        url = url + `/${id}`;
      }
      console.log(`callback ${id} ${url} ${action}`);
      request({
          url: url, //URL to hit
          qs: {from: 'graphi.js', time: +new Date()}, //Query string data
          method: action,
          headers: {
              'Content-Type': 'application/json'
          }
      }, function(error, response, body){
          if(error) {
              console.log(error);
              return callback(error);
          } else {
              console.log(response.statusCode, body);
              var ret = JSON.parse(body);
              if(typeof id !== 'undefined') {
                ret = [JSON.parse(body)];
              }
              return callback(ret);
          }
      });
  }

}

module.exports = util;