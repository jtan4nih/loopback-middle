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

    Threads.saveLike = function(messageId, ownerId, ownerName, cb) {
        var Flags = Threads.app.models.Flags;
        console.log(`threads.js saveLike() entered ${messageId} ${ownerId} ${ownerName}`);
        var items = [];
        var json3 = {
            data: {
                "subject": "Like by " + ownerName,
                "description": "favourite of a message",
                "messages": messageId,
                "owner": ownerId
            }
        };
        // debugger
        var oldFlag;
        function updateUserFlags(data) {
            console.log('threads.js updateUserFlags: old flags data [');
            console.log(data);
            console.log(']');
            // data.obj = data;  //support fetch
            oldFlag = data;  //getFlagByMessageIdAndOwner(data, messageId, ownerName);  //TODO for now, only the first one!
            if(typeof oldFlag !== 'undefined' && oldFlag !== null && typeof oldFlag.id !== 'undefined') {
                if(json3.data.messages == oldFlag.messages) {
                    json3.data = oldFlag;
                }
                else {
                    json3.data.id = 0;
                    //=== musy be a new flag!
                }
            } else {
                json3.data.id = 0;
                //=== musy be a new flag!
            }
            json3.data.state = !json3.data.state;
            console.log(`threads.js json3.data.state: ${json3.data.state}`);

            function updateLikeUI(data) {
                // var scope = StemFactory.get('wallCtrl');
                var oldFlag;
                function updateMessageLikeCount(data) {
                    var json4 = { data: '' };
                    json4.data = {};
                    console.log('threads.js updateMessageLikeCount: json3 [');
                    console.log(json3);
                    console.log(']');
                    var currentFlag = json3.data.state;
                    console.log('threads.js updateMessageLikeCount: old messages data [');
                    console.log(data);
                    console.log('] currentFlag [');
                    console.log(currentFlag);
                    console.log(']');
                    if(typeof data !== 'undefined' && data !== null) {
                        var oldMessage = data;  //support http fetch
                        console.log(`threads.js before oldMessage.liked: ${oldMessage.liked}`);
                        oldMessage.liked = currentFlag?"true":"false";
                        console.log(`threads.js after oldMessage.liked: ${oldMessage.liked}`);
                        json4.data = oldMessage;
                        if(currentFlag) {
                            json4.data.likecount = json4.data.likecount + 1;
                        } else {
                            json4.data.likecount = json4.data.likecount - 1;
                        }
                    }
                    console.log(`threads.js new json4.data.likecount: ${json4.data.likecount}`);
                    function updateItem(data) {
                        cb(null, data);
                    }
                    setMessage(json4.data, updateItem);
                }
                getMessage(messageId, updateMessageLikeCount);
            }
            setMessageFlag(json3.data, updateLikeUI);
        } //updateFlags end
        getMessageFlag(messageId, ownerId, updateUserFlags);
    }; //saveIt end

    // accepts: [{arg: 'userId', type: 'string'}, {arg: 'messageId', type: 'string'}, {arg: 'ownerId', type: 'string'}, {arg: 'ownerName', type: 'string'}, {arg: 'itemIndex', type: 'number'}],
    Threads.remoteMethod(
        'saveLike',
        {
          http: {path:'/saveLike', verb:'post'},
          accepts: [{arg: 'messageId', type: 'string'}, {arg: 'ownerId', type: 'string'}, {arg: 'ownerName', type: 'string'}],
          returns: {arg: 'status', type: 'string'}
        }
    );

    //TODO begin the following have to be refactored into a common codes!!!
    function setMessage(json, handleFlag) {
        var ret = false;
        var Messages = Threads.app.models.Messages;
        Messages.upsert(json, function (err, data2) {
            console.log('threads.js setMessage: json [');
            console.log(json);
            console.log('] length = ');
            console.log(json);
            console.log('] data2 [');
            console.log(data2);
            console.log(']');
            handleFlag(data2);
        }); //Messages.upsert end
    }
    function getMessage(messageid, handleFlag) {
        console.log(`threads.js getMessage: messageid ${messageid}`);
        var ret = false;
        var Messages = Threads.app.models.Messages;
        Messages.findById(messageid, function (err, data2) {
            console.log('threads.js getMessage: data2 [');
            console.log(data2);
            console.log(']');
            handleFlag(data2);
        }); //Messages.findById end
    }
    function setMessageFlag(json, handleFlag) {
        var ret = false;
        var Flags = Threads.app.models.Flags;
        Flags.upsert(json, function (err, data2) {
            console.log(`=================> threads.js setMessageFlag: data2 ${json.state} [`);
//=== TODO piggy back the results of flags onto messages but it is not there???? :(
// data2.flagState = json.state;
            console.log(data2);
            console.log(']');
            handleFlag(data2);
        }); //Flags.upsert end
    }
    function getMessageFlag(messageid, loggedinownerid, handleFlag) {
        console.log(`threads.js getMessageFlag: messageid ${messageid}`);
    	var ret = false;
        var Flags = Threads.app.models.Flags;
		Flags.findOne({where: {"messages": messageid, "owner": loggedinownerid}}, function (err, data2) {
			console.log('threads.js getMessageFlag: data2 [');
			console.log(data2);
			console.log(']');
	    	console.log('getMessageFlag = ' + data2);
			handleFlag(data2);
		});	//Flags.findOne end
    }
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
    //TODO end the following have to be refactored into a common codes!!!

    //=== https://strongloop.com/strongblog/remote-methods-in-loopback-creating-custom-endpoints/
    //=== http://apidocs.strongloop.com/loopback/#persistedmodel
    Threads.wall = function(loggedinuser, cb) {
      var sortedMessages = {};
      var data3 = [];
      Threads.find(function (err, data) {
          data.reverse(); //new topic on the top but leave the comment(s) as is

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
						data3.push(item1);	//create a thread for each message ---- THIS happens before ****** 1 ****** !!!!!!
					}
				}
			}

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
