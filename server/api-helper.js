var fetch = fetch || {}; //avoid error on NodeJS

// We will pass these to the wrapper function at the end of the file
(function(isNode, isAngular, fetch) {

function isRemote(host) {
    // debugger
    var ret = false;
    if(host.indexOf('localhost') === -1 && host.indexOf('127.0.0.1') === -1) {
        ret = true;
    }
    // console.log("isRemote ret " + ret);
    return ret;
}

function commonAPI(base_url, uri, action, model, method, jsonData, cb, doneFunc, mode, jwt, localStorage1) {
        // console.log("doneFunc:");
        // console.log(doneFunc);
        // debugger
        // console.log(">>>>>>>>>>>>>> calling " + uri + " with an HTTP " + action + " ...");
        if(typeof mode === 'undefined' || mode.trim() === '' || mode === null) {
// console.log("*** http fetch mode ***");
console.log("api-helper.js: HTTP fetch " + action + " request: " + base_url + uri);
            var payload;
            var temp = '';
            if(action === 'POST' || action === 'PUT') payload = JSON.stringify(jsonData);
            //=== c.f. https://github.com/github/fetch

            function json(response) {  
                return response.json()  
            }

            function handleErrors(response) {
                // debugger
                if(typeof response.id === "number") {
                    //must be ok - nothing is done!
                    if(cb != null) cb(response); else doneFunc();
                } else
                //=== c.f. https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
                if (typeof response.name === 'undefined' && typeof response.text !== 'undefined' && !response.ok) {
                    if(typeof response.text() !== 'undefined') {
                        response.text().then(text => {
                            if(hasError(text)) {
                                // console.log('Error text from callRemoteService() error handler: ' + text);
                                if(cb != null) cb(text); else doneFunc();
                            } else {
                                if(cb != null) cb(response.statusText); else doneFunc();
                            }
                            // throw new Error(text)
                        });
                    }
                    // throw Error(response.statusText);
                } else 
                if(typeof response.error !== 'undefined') {
                    // console.log('HTTP fetch request failed', response.error.message);
                    if(cb != null) cb(response.error.message); else doneFunc();
                } else {
                    //=== ALL GOOD!!! :)
                    // console.log('HTTP fetch request succeeded with JSON response', response);
                    if(cb != null) cb(response); else doneFunc();
                }
                return response;
            }

            function hasError(message) {
                var ret = false;
                if(typeof message !== 'undefined' && message.trim().startsWith('{"error":')) {
                    ret = true;
                }
                return ret;
            }

            var finalHeader = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage1 && localStorage1.getItem('stem2token')) || (localStorage && localStorage.getItem('stem2token'))
            };
            if(typeof jwt !== 'undefined') {
              finalHeader = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + jwt
              };
            } 

            fetch(base_url + uri, {
              method: action,
              // mode: 'no-cors',
              headers: finalHeader,
              body: payload
            })
            .then(json)
            .then(handleErrors)
            .then(function(response) {
                // console.log("ok");
            }).catch(function(error) {
                // debugger
                // console.log('HTTP fetch request exception', error);
                if(cb != null) cb(error); else doneFunc();

                console.log(error);
            });
        } else {
// console.log("*** swagger-client mode ***");
            if(uri === '/api/Flags' && action === 'GET') {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Flags.Flags_find(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Flags.Flags_find returned:");
                            // console.log(data);
                            // console.log("get flag --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Flags.Flags_find
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Flags' && action === 'PUT') {
                // console.log("calling put flag - swagger.Flags.Flags_upsert ..............................................");
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Flags.Flags_upsert(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Flags.Flags_upsert returned:");
                            // console.log(data);
                            // console.log("put flag --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Flags.Flags_upsert
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Messages/count' && action === 'GET') {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Messages.Messages_count({
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Messages.Messages_count returned:");
                            // console.log(data);
                            // console.log("get message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Messages.Messages_count
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Messages/id' && action === 'GET') {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Messages.Messages_findById(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Messages.Messages_findById returned:");
                            // console.log(data);
                            // console.log("get message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Messages.Messages_findById
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Messages' && action === 'GET') {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Messages.Messages_find(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Messages.Messages_find returned:");
                            // console.log(data);
                            // console.log("get message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Messages.Messages_find
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Messages' && action === 'PUT') {
                // debugger
if(!isRemote(base_url)) {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Messages.Messages_upsert(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Messages.Messages_upsert returned:");
                            // console.log(data);
                            // console.log("put message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Messages.Messages_upsert
                    } //end of success
                }); //swagger end
} else {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Messages.upsert__put_Messages(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Messages.Messages_upsert returned:");
                            // console.log(data);
                            // console.log("put message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Messages.Messages_upsert
                    } //end of success
                }); //swagger end
}
            } else
            if(uri === '/api/Messages' && action === 'POST') {
                // debugger
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Messages.Messages_create(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Messages.Messages_create returned:");
                            // console.log(data);
                            // console.log("put message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Messages.Messages_create
                    }, //end of success
                    authorizations : {
                       someHeaderAuth: new SwaggerClient.ApiKeyAuthorization('Authorization', "Bearer " + localStorage.getItem('stem2token'), 'header')
                    }                    
                }); //swagger end
            }
            else
            if(uri === '/api/Threads' && action === 'POST') {
                // debugger
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Threads.Threads_create(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Threads.Threads_create returned:");
                            // console.log(data);
                            // console.log("put message --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Threads.Threads_create
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Threads/wall' && action === 'GET') {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Threads.Threads_wall(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Threads.Threads_wall returned:");
                            // console.log(data);
                            // console.log("get flag --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Threads.Threads_wall
                    } //end of success
                }); //swagger end
            }
            else
            if(uri === '/api/Users/login' && action === 'POST') {
                var swagger = new Swagger({
                    url: base_url + '/explorer/swagger.json',
                    success: function() {
                        swagger.Users.Users_isAuthenticated(jsonData, {
                            responseContentType: 'application/json'
                        }, function(data) {
                            // console.log("api-helper.js (swagger-client): Users.Users_isAuthenticated returned:");
                            // console.log(data);
                            // console.log("get flag --------------------------->doneFunc:");
                            // console.log(doneFunc);
                            if(cb != null) cb(data); else doneFunc();
                        }); //end of swagger.Users.Users_isAuthenticated
                    } //end of success
                }); //swagger end
            }

        } //if(typeof mode === 'undefined') end
} //commonAPI end
// This wrapper function returns the contents of your module, 
// with dependencies
var SilverBulletModule = function(Bullet, Silver) {
  var SilverBullet = function(base_url, uri, action, model, method, jsonData, cb, doneFunc, mode) {
    // something awesome happens here
    Swagger = SwaggerClient;
    commonAPI(base_url, uri, action, model, method, jsonData, cb, doneFunc, mode);
  };
  return SilverBullet;
};
    
if (isAngular) {
    // AngularJS module definition
    // angular.module('app.silverbullet', ['app.silver', 'app.bullet']).
    // factory('SilverBullet', ['Bullet', 'Silver', SilverBulletModule]);
    angular.module('app.silverbullet', []).
    factory('capi', [SilverBulletModule]); //use is like SilverBullet(base_url, uri, action, model, method, jsonData, cb, doneFunc, mode)
} else if (isNode) {
  // NodeJS module definition
  // module.exports = SilverBulletModule(
    // require('bullet.js'), 
    // require('silver.js')
  // );

var stemconfig = require('../common/config');
var Swagger = require('swagger-client');
var fetch = require('node-fetch');


var app = module.exports = {

    //=== high level convenient method
    api: function(base_url, uri, action, model, method, jsonData, cb, doneFunc, mode, jwt) {
        var localStorage = {};
        localStorage.getItem = function(key) {
        }
        commonAPI(base_url, uri, action, model, method, jsonData, cb, doneFunc, mode, jwt, localStorage);
    } //api end

}; //api module.exports end

} //if (isNode) end

})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined', fetch);

