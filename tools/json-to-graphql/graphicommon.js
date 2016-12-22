'use strict';
var request = require('request');

var util = {

  listModels: function(apiHost, uri, id, type, name, callback) {
      var url = `${apiHost}${uri}`;
      var action = 'GET';
      if(typeof id !== 'undefined') {
        url = url + `/${id}`;
      }
      var where = {};
      if(typeof type !== 'undefined') {
        where.type = type;
      }
      if(typeof name !== 'undefined') {
        where.name = name;
      }
      var filter = {};
      filter.where = where;
      console.log(`filter: `);
      console.log(filter);
      url = url + "?filter=" + JSON.stringify(filter);
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
                if(typeof type !== 'undefined') {
                  ret.type = type;
                }
                if(typeof name !== 'undefined') {
                  ret.name = name;
                }
                //=== wrap with an array if only one element!
                ret = [ret];
              }
              return callback(ret);
          }
      });
  }

}

module.exports = util;