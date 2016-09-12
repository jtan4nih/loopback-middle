var jwt = require('jwt-simple');
var moment = require('moment');
var stemjwt = require('../../server/jwt');
var loginhelper = require('../../server/df-helper');

module.exports = function(Users) {

    Users.isAuthenticated = function(userId, password, cb) {
var json1 = {
  "extra": "Login attempt",
  "services": "isAuthenticated",
  "owner": userId,
  "id": 0
};
var Audits = Users.app.models.Audits;
Audits.create(json1, function(err, data) {

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> users.isAuthenticated userId [' + userId + '] logged in! data = ' + data + " err = " + err);
      	//console.log('Users Users.isAuthenticated: userId [' + userId + '] password [' + password + ']');	//WARNING: Comment this out in production!!!
        var auth = false;
        var done = function(auth, user) {
            if(!auth) {
                cb(null, '');
            } else {
              //=== http://www.sitepoint.com/using-json-web-tokens-node-js/
              var expires = moment().add(90, 'days').valueOf();
              var payload = {
                iss: userId,
                role: 'user',
                exp: expires
              };
              //=== https://www.npmjs.com/package/jwt-simple
              var secret = stemjwt.getSecret();
              //console.log('apisecret [' + secret + ']');     //DO NOT output this in production
              var jwtToken = jwt.encode(payload, secret);

              cb(null, `{"flag": "ok", "userId": "` + userId + `", "jwtToken": "` + jwtToken + `", "user": ` + JSON.stringify(user) + `}`);
              // cb(null, 'isAuthenticated: [' + userId + '/'+ password + ']');   //DO NOT show the password on the console!
            }
        };
        stemjwt.isAuthenticated(userId, password, done);
});

    }

    Users.remoteMethod(
        'isAuthenticated',
        {
          http: {path:'/login', verb:'post'},
          accepts: [{arg: 'userId', type: 'string'},{arg: 'password', type: 'string'}],
          returns: {arg: 'status', type: 'string'}
        }
    );

    Users.df = function(userId, password, cb) {
        console.log('Users Users.df: userId [' + userId + '] password [' + password + ']');  //WARNING: Comment this out in production!!!
        var done = function(json) {
          console.log('Users Users.df: json [' + json + ']');
          cb(null, json);
        };
        loginhelper.loginDreamFactory(userId, password, done);
    }

    Users.remoteMethod(
        'df',
        {
          http: {path:'/df', verb:'get'},
          accepts: [{arg: 'userId', type: 'string'},{arg: 'password', type: 'string'}],
          returns: {arg: 'users', type: 'string'}
        }
    );

    //=== begin Workaround c.f. https://github.com/strongloop/loopback/issues/1859#issuecomment-163037446
    Users.powerups = function(id, questsId, powerupsId, callback) {
        var app = this.app;
        var Powerups = app.models.Powerups;
        UsersQuests.find({
            "where": {
                usersId: id,
                questsId: questsId
            }
        }, function(err, arr) {
            if (err) return callback(err);
            console.log(arr);
            callback(null, arr);
        });
    }

    Users.remoteMethod(
        'powerups', {
            accepts: [{arg: 'id', type: 'number', required: true},{arg: 'questsId', type: 'number'},{arg: 'powerupsId', type: 'number'}],
            http: {
                path: '/:id/quests/:questsId/powerups/:powerupsId',
                verb: 'get'
            },
            returns: {
                arg: 'powerups',
                type: 'array'
            }
        }
    );
    //=== end Workaround c.f. https://github.com/strongloop/loopback/issues/1859#issuecomment-163037446

/*
    Users.beforeRemote('**', function(context, unused, next) {
      console.log('Users calls intercepted!');
      next();
    });
*/

};
