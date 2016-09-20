var sys = require("util");
var querystring = require('querystring');
var request = require("request");
// var loopback = require("../server/server.js");
var base_url = process.env.APIHOST || "http://127.0.0.1:3000";

process.on('uncaughtException',function(e) {
    sys.log("Caught unhandled exception: " + e);
    sys.log(" ---> : " + e.stack);
});

describe("Loopback Server", function() {
  console.log('login_spec.js: APIHOST url is [' + base_url + ']');
  describe("GET /", function() {
    // var server = loopback.start();
    it("returns status code 200", function(done) {
      request.get(base_url + '/explorer', function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns StrongLoop Explorer content", function(done) {
      request.get(base_url + '/explorer', function(error, response, body) {
        expect(body).toContain("StrongLoop API Explorer");
        done();
      });
    });

    it("returns false for incorrect login (DF service)", function(done) {
        var post_data = querystring.stringify({
            'userId' : 'user1@gmail.com',
            'password': 'password1'
        });
        var post_options = {
            url: base_url + '/api/Users/login',
            method: 'POST',
            body: post_data,    // Javascript object
            // json: true,         // <--Very important!!!
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data),
                'Accept': 'application/json'
            }
        };
        request.post(post_options, function(error, response, body) {
            sys.log('returns false for incorrect login (DF service)');
            sys.log(body);
            expect(body).toContain('{"status":""}');
            done();
        });
    }, 60000);

    it("returns true for correct login (DF service)", function(done) {
        var post_data = querystring.stringify({
            'userId' : 'user1@gmail.com',
            'password': '111111'
        });
        var post_options = {
            url: base_url + '/api/Users/login',
            method: 'POST',
            body: post_data,    // Javascript object
            // json: true,         // <--Very important!!!
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data),
                'Accept': 'application/json'
            }
        };
        request.post(post_options, function(error, response, body) {
            sys.log('returns true for correct login (DF service)');
            sys.log(body);
            expect(body).toContain(`jwtToken`);
            // server.close();
            done();
        });
    }, 60000);

    it("returns false for incorrect login (mockup service)", function(done) {
        var base_url = "http://127.0.0.1:3064";
        var post_data = querystring.stringify({
            'userId' : 'test@gmail.com',
            'password': 'password1'
        });
        var post_options = {
            url: base_url + '/api/Users/login',
            method: 'POST',
            body: post_data,    // Javascript object
            // json: true,         // <--Very important!!!
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data),
                'Accept': 'application/json'
            }
        };
        request.post(post_options, function(error, response, body) {
            sys.log('returns false for incorrect login (mockup service)');
            sys.log(body);
            expect(body).toContain('{"status":""}');
            // expect(body).toBe(undefined);
            done();
        });
    }, 10000);
    
    it("returns true for correct login (mockup service)", function(done) {
        var base_url = "http://127.0.0.1:3064";
        var post_data = querystring.stringify({
            'userId' : 'test@gmail.com',
            'password': '111111'
        });
        var post_options = {
            url: base_url + '/api/Users/login',
            method: 'POST',
            body: post_data,    // Javascript object
            // json: true,         // <--Very important!!!
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(post_data),
                'Accept': 'application/json'
            }
        };
        console.log('submitting to ' + base_url);
        request.post(post_options, function(error, response, body) {
            sys.log('returns true for correct login (mockup service)');
            sys.log(body);
            expect(body).toContain(`"jwtToken":`);
            // expect(body).toBe(undefined);
    	    // server.close();
            done();
        });
    }, 10000);
/*    
*/
  });
});
