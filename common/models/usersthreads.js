module.exports = function(Usersthreads) {

/**
Useful filter:
GET /Usersthreads
{"usersid1": 0, "usersid2": 0}

*/
    Usersthreads.sendmessage = function(fromwhoId, fromwhoName, fromwhoEmail, towhoId, towhoName, towhoEmail, text, cb) {
        var Messages = Usersthreads.app.models.Messages;
        var Threads = Usersthreads.app.models.Threads;
        // "subject": "Message by " + StemService.getUserName(stemcfg),
		console.log(`0 creating messages ${fromwhoId} ${towhoId} ${text} <~~~~~~~~~~~~~~~~~~~~~~~`);
        var json1 = {
			"id": 0,
			"subject": "Message from " + fromwhoName + " to " + towhoName,
			"text": text,
			"createdat": "2016-04-05",
			"updatedat": "2016-04-05",
			"liked": "false",
			"state": "Private",
			"type": "NA",
			"owner": 0,
			"likecount": 0
        };
    	Messages.create(json1, function(err, data) {
            var status = {"message":null, "usersthreads": null, "threads": null};
        	console.log('1 creating messages <~~~~~~~~~~~~~~~~~~~~~~~');
            if (err) return cb(err);
            // console.log(data);
            // console.log(`Messages id ${data.id}`);
            var messageid = data.id;
            status.message = data;
           	Usersthreads.find({"usersid1": fromwhoId, "usersid2": towhoId}, function(err, data) {
                status.usersthreads = data;
    			console.log('2.0 finding userthreads <~~~~~~~~~~~~~~~~~~~~~~~');
                console.log(data);
                console.log(`Userthreads threads id found ${data.id}`);
                // return
                var threadsid = -1;
                if(typeof data.id === 'undefined') {
                	threadsid = 0;
	            } else {
					threadsid = data.id;
	            }
	            var json2 = {
	              "id": threadsid,
	              "messages": messageid
	            };
        		console.log(`2 creating threads threadsid ${threadsid}<~~~~~~~~~~~~~~~~~~~~~~~`);
	            Threads.upsert(json2, function(err, data) {
                    status.threads = data;
					var json3 =	{
	              	  "id": 0,
					  "usersid1": fromwhoId,
					  "usersid2": towhoId,
					  "threads": data.id
					};
	        		console.log('2 creating userthreads <~~~~~~~~~~~~~~~~~~~~~~~');
	            	Usersthreads.upsert(json3, function(err, data) {
                    	status.usersthreads = data;
		                if (err) return cb(err);
	                    cb(null, status);
					});
	            });
            });

        });
        console.log('Userthreads: sendmessage ========================================================> done !');
;
    };

    Usersthreads.remoteMethod(
        'sendmessage',
        {
          http: {path:'/sendmessage', verb:'post'},
          accepts: [{arg: 'fromwhoId', type: 'string'},{arg: 'fromwhoName', type: 'string'},{arg: 'fromwhoEmail', type: 'string'},{arg: 'towhoId', type: 'string'},{arg: 'towhoName', type: 'string'},{arg: 'towhoEmail', type: 'string'},{arg: 'text', type: 'string'}],
          returns: {arg: 'usersthreads', type: 'Object'}
        }
    );

    Usersthreads.mymessages = function(fromwho, towho, text, callback) {
        var Users = Usersthreads.app.models.Users;
        var json;
        var fromwho, towho, text;

		console.log(`0 mymessages messages ${fromwho} ${towho} ${text} <~~~~~~~~~~~~~~~~~~~~~~~`);
        // if(id != '{id}') {
        // 	json = {
        //         id: id,
        //         state: 'Private'
        //     };
	       //  console.log('Userthreads: mymessages 1 ========================================================> json ' + JSON.stringify(json));
        // } else {
        // 	json = {
        //         state: 'Private'
        //     };
        // 	console.log('Userthreads: mymessages 2 ========================================================> json ' + JSON.stringify(json));
        // }
        // Users.find({
        //     "where": json
        // }, function(err, data) {
        Usersthreads.inbox(fromwho, towho, text, function(err, data) {
            if (err) return callback(err);
			// console.log('GET Usersthreads.mymessages: data');

            var data1 = [];
            // console.log(`Usersthreads.js mymessages = [`);
			// console.log(`0 mymessages ${fromwho} ${towho} ${text} <~~~~~~~~~~~~~~~~~~~~~~~`);
            // console.log(data);
            for (let item of data) {
                console.log(item);
                // if(item1.fromwho.toLowerCase() === fromwho || item1.towho.toLowerCase() === towho) {
	            if((item.subject.indexOf('Message from ' + fromwho) > -1 || item.subject.indexOf('to ' + fromwho) > -1) && item.state.toLowerCase() === 'private') {
                    // console.log(`Usersthreads.js mymessages message ${count} = [`);
                    // console.log(item1);
                    // console.log(']');
                    data1.push(item);
                }
            }
            // console.log(']');

            // console.log(data1);
            callback(null, data1);
        });
    }

    Usersthreads.remoteMethod(
        'mymessages', {
            accepts: [{arg: 'fromwho', type: 'string'},{arg: 'towho', type: 'string'},{arg: 'text', type: 'string'}],
			http: {path:'/mymessages', verb:'get'},
			returns: {arg: 'messages', type: 'Object'}
        }
    );

    function getFromWhoName(subject) {
    	var ret = subject;
    	if(typeof subject !== 'undefined') {
    		var marker1 = 'Message from ';
    		var marker2 = ' to ';
	    	var begin = 0;
	    	var end = subject.indexOf(marker2);
	    	ret = subject.substring(begin + marker1.length, end);
    	}
    	console.log('getFromWhoName = ' + ret);
    	return ret;
    }

    function getToWhoName(fromwhoName, subject) {
    	var ret = subject;
    	if(typeof subject !== 'undefined') {
    		var marker = 'to ';
	    	var begin = subject.indexOf(marker);
	    	var end = subject.length;
	    	ret = subject.substring(begin + marker.length, end);
    	}
    	return ret;
    }

	function uniqBy(a, key) {
	    var seen = {};
	    return a.filter(function(item) {
	        var k = key(item);
	        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
	    })
	}

    Usersthreads.inbox = function(fromwho, towho, text, cb) {
        var Threads = Usersthreads.app.models.Threads;
        var sortedMessages = {};
        var count = 0;
        Usersthreads.find(function (err, data) { //TODO we need to filter only the related messages!
        	var usersthreads = data;
            //TODO the following codes are not optimized!!!
            var Messages = Threads.app.models.Messages;
            Messages.find(function (err, data1) {
                var data3 = [];
            	// console.log(data);
                for (let item of data) {
                    for (let item1 of data1) {
                        // console.log(item1);
                        // if(item1.subject.indexOf('Message by ' + fromwho) > -1 && item1.state.toLowerCase() === 'private') {
                            // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>> ' + ++count);
                            //added thread id
                            item1.threadid = item.id;
                            // console.log(`Usersthreads.js inbox message ${count} = [`);
                            // console.log(']');
		                    //=== added addtional field of private message:
		                    item1.fromwho = getFromWhoName(item1.subject);
		                    item1.towho = getToWhoName(fromwho, item1.subject);
                            // console.log(item1);
                            data3.push(item1);
                        // }
                    }
                }
                console.log(data3);
                sortedMessages = uniqBy(data3, JSON.stringify);
                cb(null, sortedMessages);
            });   //Messages.find end
        });
    };

    Usersthreads.remoteMethod(
        'inbox',
        {
            http: {path:'/inbox', verb:'get'},
            accepts: [{arg: 'fromwho', type: 'string'},{arg: 'towho', type: 'string'},{arg: 'text', type: 'string'}],
            returns: {arg: 'inbox', type: 'Object'}
        }
    );

};
