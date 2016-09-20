var request = require("request");
var helloWorld = require("../app.js")
var base_url = "http://localhost:3001/"

describe("Hello World Server", function() {
  console.log('hello_world_spec.js: APIHOST url is [' + base_url + ']');
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe("Hello World");
        helloWorld.closeServer();
        done();
      });
    });
  });
});
