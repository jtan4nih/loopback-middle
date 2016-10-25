/**
Usesful SQLs:

select count(*) as usersthreads,0 as threads,0 as flags,0 as messages,0 as users from usersthreads
union
select 0,count(*),0,0,0 from threads
union
select 0,0,count(*),0,0 from flags
union
select 0,0,0,count(*),0 from messages
union
select 0,0,0,0,count(*) from users

Note: a space after -- is required!
-- delete from usersthreads;
-- delete from threads;
-- delete from flags;
-- delete from messages;
-- delete from users;
*/
// var swagger = require('swagger-client');
// var loopback = require("../server/server.js");
var app = require("../server/api-helper.js");
var request = require("request");
var console = require("util");
var base_url = process.env.APIHOST || "http://127.0.0.1:3000";
var jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1c2VyMUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImV4cCI6MTQ4NTEzMTM3MjMzN30.baGR8tXMsKTc2amqcuLt9x5DhPOPQJ_0LKE-uYCQgT0";
var tokenStr = "";  //"?token="+jwtToken;

// console.log("app ---> : " + JSON.stringify(app));
process.on('uncaughtException',function(e) {
    console.log("Caught unhandled exception: " + e);
    console.log(" ---> : " + e.stack);
});

process.on('exit', function() {
    done();
    console.log('Goodbye!');
});

function handleFetchResponse(data, swagger) {
    if(typeof swagger !== 'undefined' && swagger === 'swagger') {
        data = data.obj;
    }
    // console.log('handleFetchResponse data returned:');
    // console.log(data);
    return data;
}

describe("Loopback Server", function() {
  console.log('fetch_spec.js: APIHOST url is [' + base_url + ']');

  describe("GET /", function() {
    // var server;
    // try {
    //     server = loopback.start();
    // } catch(e) {
	   //  console.log(e);
    // }

    it("returns status code 200", function(done) {
	var targetUrl = base_url + '/explorer';
	console.log('api service url = [' + targetUrl + ']');
      request.get(targetUrl, function(error, response, body) {
console.log('/explorer returned:');
console.log('response:');
console.log(response);
console.log('body:');
console.log(body);
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

	var currentTotalMessageCount = 0;
    it("3 level swagger calls test - should be ok", function(done) {
    	function putCount(data) {
            console.log('putCount data returned:');
            console.log(data);

    		currentTotalMessageCount = handleFetchResponse(data).count;
		    console.log('current message count is ' + currentTotalMessageCount);
			currentTotalMessageCount++;
            var json4Str = `
            {
              "id": ${currentTotalMessageCount},
              "subject": "Message by Test User 1",
              "text": "t1",
              "createdat": "2016-07-14",
              "updatedat": "2016-07-14",
              "state": "false",
              "type": "topic173-owner",
              "owner": 0,
              "likecount": 0
            }
            `;
            json4 = JSON.parse(json4Str);
			console.log('in putCount !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:');
			console.log(done);
			app.api(base_url, '/api/Messages'+tokenStr, 'PUT', 'model', 'method', json4, callOnlyTwo, done, '', jwtToken);
            // app.api(base_url, '/api/Messages', 'PUT', 'model', 'method', json4, null, done);
    	}
    	function callOnlyTwo(data) {
            done();
    		api1(data, done);
    	}
    	function api1(data, done) {
            done();
			app.api(base_url, '/api/Flags'+tokenStr, 'GET', 'model', 'method', {}, api2, done, '', jwtToken);
    	}
    	function api2(data) {
    		var userName = 'Test User 1';
    		var messageId = currentTotalMessageCount;	//that.item.id;
            var temp = "Like by " + userName;
            // console.log(data);
            // var json3Str = `
            // {
            //   "subject": "${temp}",
            //   "description": "favourite of a message",
            //   "state": 0,
            //   "messages": ${messageId},
            //   "owner": 0
            // }
            // `;
            // // console.log(json3Str);
            // json3 = JSON.parse(json3Str);
            json3 = handleFetchResponse(data);
            console.log('api2 json3:');
            console.log(json3);
			// app.api(base_url, '/api/Flags', 'PUT', 'model', 'method', json3, null, done, 'swagger');
            app.api(base_url, '/api/Flags'+tokenStr, 'PUT', 'model', 'method', json3, null, done, '', jwtToken);
            done();
            // process.exit();
    	}
        function nothing(data) {
            console.log('done!');
            done();
            // server.close();
            process.exit();
        }
		app.api(base_url, '/api/Messages/count'+tokenStr, 'GET', 'model', 'method', {}, putCount, done, '', jwtToken);
        // app.api(base_url, '/api/Messages/count', 'GET', 'model', 'method', {}, nothing, done);
    }, 20000);
// return

    it("Messages find by id test - should be ok", function(done) {
    	function printCount(data) {
		    console.log('message by id ' + currentTotalMessageCount + ' is = ' + JSON.stringify(data.obj));
			console.log('in printCount !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:');
			console.log(done);
            done();
    	}
		var messageId = currentTotalMessageCount;
		app.api(base_url, '/api/Messages/id'+tokenStr, 'GET', 'model', 'method', {id: messageId}, printCount, done, '', jwtToken);
    }, 20000);

    it("User login test - should be ok", function(done) {
        function authenticated(data) {
            console.log('user authentication = ' + JSON.stringify(handleFetchResponse(data)));
            console.log('in authenticated !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:');
            console.log(done);
            done();
        }
        var messageId = currentTotalMessageCount;
        app.api(base_url, '/api/Users/login', 'POST', 'model', 'method', {userId: "user1@gmail.com", password: "111111"}, authenticated, done, '', jwtToken);
    }, 20000);
// return

    it("Wall load test - should be ok", function(done) {
        function wallLoaded(data) {
            console.log('wall = ' + JSON.stringify(handleFetchResponse(data)));
            console.log('in wallLoaded !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:');
            console.log(done);
            done();
        }
        var messageId = currentTotalMessageCount;
        app.api(base_url, '/api/Threads/wall'+tokenStr, 'GET', 'model', 'method', {}, wallLoaded, done, '', jwtToken);
    }, 20000);
// return

    it("4 level swagger calls test - should hanged!", function(done) {
    	function putCount(data) {
    		currentTotalMessageCount = handleFetchResponse(data).count;
		    console.log('current message count is ' + currentTotalMessageCount);
			currentTotalMessageCount++;
			// var json4 = {
   //              "data":{"id":currentTotalMessageCount,"subject":"Message by Test User 1","text":"t1","createdat":"2016-04-05T00:00:00.000Z","updatedat":"2016-04-05T00:00:00.000Z","state":"false","type":"topic173-owner","owner":-1,"likecount":0}
   //          };
            var json4Str = `
            {
              "id": ${currentTotalMessageCount},
              "subject": "Message by Test User 1",
              "text": "t1",
              "createdat": "2016-07-14",
              "updatedat": "2016-07-14",
              "state": "false",
              "type": "topic173-owner",
              "owner": 0,
              "likecount": 0
            }
            `;
            json4 = JSON.parse(json4Str);
			console.log('in putCount !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:');
			console.log(done);
            console.log('in putCount !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> json4:');
            console.log(json4);
			app.api(base_url, '/api/Messages'+tokenStr, 'PUT', 'model', 'method', json4, launch, done, '', jwtToken);
    	}
    	function launch(data) {
            done();
    		startFlagTest(data, done);
    	}
		app.api(base_url, '/api/Messages/count'+tokenStr, 'GET', 'model', 'method', {}, putCount, done, '', jwtToken);
		// getMessageCount(done, putCount);
    }, 20000);

    /*
	function getMockupFlagByMessageIdAndOwner(data, msgId, ownerId) {
	    var ret;
	    // console.log("=====================> getMockupFlagByMessageIdAndOwner: searching in data [");
	    // console.log(data);
	    // console.log(']  by msgId [' + msgId + '] ownerId [' + ownerId + ']');

        ret = {
            obj: {
                "subject": "Like by " + ownerId,
                "description": "favourite of a message",
                "messages": msgId,
                "owner": ownerId
            }
        };

        // console.log("getMockupFlagByMessageIdAndOwner() found ret messages : [" + ret.obj.messages + ']');
	    return ret;
	}
	*/

    function startFlagTest(data, done) {
		console.log('in startFlagTest !!!!!!!!!!!!!!!!!!!!!!!!! >>>>>>> done:');
		console.log(done);
    	var userName = 'Test User 1';
    	var messageId = currentTotalMessageCount;	//that.item.id;
    	var json3 = {
    		data: {
    		    "subject": "Like by " + userName,	//StemService.getUserName(stemcfg),
    		    "description": "favourite of a message",
    		    "messages": messageId,
    		    "owner": userName   //component.getOwnerId(localStorage.getItem(stemcfg.user))
    	    }
    	};

        function toExplorerFilter(json) {
            var jsonData = json;
            var r = JSON.stringify(jsonData);
            return encodeURIComponent(r);
        }
        //TODO can't call this function - it hanged!
        function MessagesFindByIdDone(data) {
            done();
            console.log("---------------------------------> MessagesFindByIdDone():");
            console.log(data);
            function allDone() {
                console.log('>>>>>>>>>>>>>>> test complete!');
                if(process.env.quit === 'true') {
                    process.exit();
                }
            }
            var oldMessage = handleFetchResponse(data);
            var currentFlag = oldMessage.state;
            oldMessage.state = currentFlag ? "true" : "false";
            // var json4 = { data: oldMessage };
            if (currentFlag) {
                oldMessage.likecount = oldMessage.likecount + 1;
            } else {
                oldMessage.likecount = oldMessage.likecount - 1;
            }
            console.log("MessagesFindByIdDone():");
            console.log(oldMessage);
            app.api(base_url, '/api/Messages'+tokenStr, 'PUT', 'model', 'method', oldMessage, allDone, done, '', jwtToken);
        } //MessagesFindByIdDone end
        function flagsUpdateDone(data) {
            done();
            console.log("flagsUpdateDone():");
            console.log(data);
            var j = {"id": messageId};
            app.api(base_url, '/api/Messages/findOne?filter=' + toExplorerFilter(j)+tokenStr, 'GET', 'model', 'method', j, MessagesFindByIdDone, done, '', jwtToken);
            // app.api(base_url, '/api/Messages/findOne?filter=' + toExplorerFilter(j), 'GET', 'model', 'method', j, null, done);
        }

		function flagsFindDone(data) {
            done();
 		    // console.log("flagsFindDone():");
		    // console.log(data);
	        // var json3 = {
	        //     "data": {
	        //         "subject": "Like by " + userName,   //StemService.getUserName(stemcfg),
	        //         "description": "favourite of a message",
	        //         "messages": messageId,
	        //         "owner": userName   //component.getOwnerId(localStorage.getItem(stemcfg.user))
	        //     }
	        // };
            var json3 = handleFetchResponse(data);
            // function nothing(data) {
            //     console.log('done!');
            //     done();
            //     // server.close();
            //     process.exit();
            // }
            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~ AFTER THE NEXT API CALL, IT SHOULD HANGED! THUS STOPPING HERE!!! :( ~~~~~~~~~~~~~~~~~~~~~~~~~')
            // nothing();
	        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~ AFTER THE NEXT API CALL, IT SHOULD HANGED! ~~~~~~~~~~~~~~~~~~~~~~~~~')
			app.api(base_url, '/api/Flags'+tokenStr, 'PUT', 'model', 'method', json3, flagsUpdateDone, done, '', jwtToken);
		}
		app.api(base_url, '/api/Flags'+tokenStr, 'GET', 'model', 'method', json3, flagsFindDone, done, '', jwtToken);
		// app.api(base_url, '/api/Flags', 'GET', 'model', 'method', json3, null, done);

    } //startFlagTest end

    //========= NOTHING WILL WORK AFTER THIS POINT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


/*    
*/
  });
});
