var stemjwt = require('../../server/jwt');
// var services = require('../../server/services');
var capi = require('../../server/api-helper');

//TODO the following needs to be in a common place!!!
function predicatBy(prop, desc) {
	return function(a, b) {
		if(typeof desc === 'undefined') {
    		console.log('predicatBy asc sort');
			if( a[prop] > b[prop]){
				return 1;
			} else if( a[prop] < b[prop] ) {
			  	return -1;
			}
		} else {
    		console.log('predicatBy desc sort');
			if( a[prop] < b[prop]){
				return 1;
			} else if( a[prop] > b[prop] ) {
			  	return -1;
			}
		}
		return 0;
	}
}
//TODO the following needs to be in a common place!!!

module.exports = function(Threads) {

    //TODO begin the following have to be refactored into a common codes!!!
    function getOwnerName(subject) {
    	var ret = subject;
    	if(typeof subject !== 'undefined') {
    		var marker1 = 'Message by ';
	    	var begin = subject.indexOf(marker1);
	    	var end = subject.length;
	    	ret = subject.substring(begin + marker1.length, end);
    	}
    	console.log('getOwnerName = ' + ret);
    	return ret;
    }
    //not used!
    function getMessageFlag(messageid, loggedinownerid, handleFlag) {
    	var ret = false;
        var Flags = Threads.app.models.Flags;
		Flags.find({"messages": messageid, "owner": loggedinownerid}, function (err, data2) {
			console.log('threads.js getMessageFlag: data2 [');
			console.log(data2);
			console.log(']');
			if(data2.length == 1) { //assume only one match
				if(data2[0].state != 0) {
					ret = true;
				}
			}
	    	console.log('getMessageFlag = ' + ret);
			handleFlag(ret);
		});	//Flags.find end
    }
    //TODO end the following have to be refactored into a common codes!!!

    //=== https://strongloop.com/strongblog/remote-methods-in-loopback-creating-custom-endpoints/
    //=== http://apidocs.strongloop.com/loopback/#persistedmodel
    Threads.wall = function(loggedinuser, cb) {
      var sortedMessages = {};
var data3 = [];
      Threads.find(function (err, data) {
		  //TODO the following codes are not optimized!!!
		  var Messages = Threads.app.models.Messages;
	      Messages.find(function (err, data1) {
			// console.log('threads.js messages: data1 [');
			// console.log(data1);
			// console.log(']');
			for (let item of data) {
				console.log(item);
				for (let item1 of data1) {
					// console.log(item1.type);
					console.log(item1);
					if(item1.type.toLowerCase().includes('topic'+item.id)) {
						//added thread id
						item1.threadid = item.id;
						item1.ownerName = getOwnerName(item1.subject);
						// getMessageFlag(item1.id, loggedinuser, function(flag) {
						// 	item1.loggedinuserliked = flag;
						// 	console.log('threads.js isMessageLiked message [');
						// 	console.log(item1);
						// 	console.log(']');
							// data3.push(item1);	//does not work!!!
						// });

						// console.log('threads.js isMessageLiked message [');
						// console.log(item1);
						// console.log(']');
						data3.push(item1);	//create a thread for each message ---- THIS happens before ****** 1 ****** !!!!!!

					}
				}
			}
		    //=== sort it based on owner's, message type and timestamp
			// sortedMessages = data3.sort(predicatBy('owner'));
			// sortedMessages = sortedMessages.sort(predicatBy('type'));
			// sortedMessages = sortedMessages.sort(predicatBy('createdat', true));
			// sortedMessages = data3.sort(function(obj1, obj2) {
			// 	if(!obj2.type.indexOf('-owner') > -1)	{
			// 		return obj1.id - obj2.id;  //asc for comment
			// 	} else {
			// 		return obj2.id - obj1.id;
			// 	}
			// });

//TODO not optimized - second loop is required due to the issue of calling APIs in three level deep!!!
var data4 = [];
var Flags = Threads.app.models.Flags;
Flags.find(function (err, flags) {
	var itemIndex = 0;
	for (let item3 of data3) {
		//added extra flag for UI
		for (let item4 of flags) {
			item3.loggedinuserliked = -1;
			// console.log(`threads.js comparing message item4.owner=${item4.owner} with loggedinuser=${loggedinuser} and item4.messages=${item4.messages} with item3.id=${item3.id}`);
			if(item4.owner == loggedinuser && item4.messages == item3.id) {
				item3.loggedinuserliked = item4.state;
				// item3.loggedinuserliked = 1;
				// console.log(`message item3.loggedinuserliked set to ${item3.loggedinuserliked} itemIndex = ${itemIndex} item4.state = ${item4.state}`);
				break;
			}
			// console.log('threads.js isMessageLiked message [');
			// console.log(item3);
			// console.log(']');
            data3.splice(itemIndex, 1, item3);

		}
		itemIndex++;
	}
	sortedMessages = data3;
	// sortedMessages = data4;
	cb(null, sortedMessages);	
});	//Flags.find end

			// sortedMessages = data3;
			// cb(null, sortedMessages);
		  });	//Messages.find end
      });  //Threads.find end
    };

    Threads.remoteMethod(
        'wall',
        {
			http: {path:'/wall', verb:'get'},
			accepts: [{arg: 'loggedinuser', type: 'number'}],
			returns: {arg: 'wall', type: 'Object'}
        }
    );

};
