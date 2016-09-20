var stemconfig = require('../common/config');
var request = require('request');

var app = module.exports = {

    loginDreamFactory: function(u,p,cb) {
        var myJSONObject = {email:u, password:p};
	      var target = stemconfig.getUserMgmtHost() + '/api/v2/user/session';
        console.log("connecting to users mgmt service [" + target + '] ...');

//=== just for test
//cb(true);   //uncomment this to proceed if df has a "504 Gateway Time-out" issue

        //=== curl -i -k -X GET https://df-[app id].enterprise.dreamfactory.com/api/v2/system/environment
        request({
            url: target,   //TODO this should be our self hosted server
            method: "POST",
            json: true,   // <--Very important!!!
            body: myJSONObject
        }, function (error, response, body){
            try {
                var ret = false;
                var json = JSON.parse(JSON.stringify(body));
                console.log('------------------------------------>');
                console.log(json);
                if(json && typeof json.session_token !== 'undefined') {
                    ret = true;
                }
                cb(ret, json);
            } catch (e) {
                console.log(body);
                console.log("not JSON: " + e);
            }
        });
    }

};
