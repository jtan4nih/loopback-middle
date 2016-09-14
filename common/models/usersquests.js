module.exports = function(Usersquests) {

    Usersquests.quests = function(userId, cb) {
		var Quests = Usersquests.app.models.Quests;
		Usersquests.find(function(err, arr) {
            if (err) return cb(err);
			Quests.find(function(err, data) {
				// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Usersquests.all userId [' + userId + '] logged in! data = ' + data + " err = " + err);
	            // cb(null, data);
	            var arr2 = [];
	            for(var i = 0; i < arr.length; i++) {
		            for(var j = 0; j < data.length; j++) {
		            	if(arr[i].usersid == userId && arr[i].questsid == data[j].id) {
		            		// console.log(data[j]);
		            		arr2.push(data[j]);
		            	}
		            }
	            }
	            cb(null, arr2);

			});

            // console.log(arr);
            // cb(null, arr);
    	});
	};

    Usersquests.remoteMethod(
        'quests',
        {
          http: {path:'/view', verb:'get'},
          accepts: [{arg: 'userId', type: 'string'}],
          returns: {arg: 'quests', type: 'string'}
        }
    );
};
