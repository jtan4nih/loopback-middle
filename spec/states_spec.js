//=== https://docs.strongloop.com/display/public/LB/Discovering+models+from+relational+databases
var dburl = process.env.MYSQL_HOST || '127.0.0.1';
var dbname = process.env.MYSQL_DB || 'stem2dev_db';
var dbuser = process.env.MYSQL_USER || 'root';
var dbpass = process.env.MYSQL_PASSWORD || 'admin';

var server1 = require('../server/server1.js');
var loopback = require('loopback');
var boot = require('loopback-boot');
// var app = loopback();
var ds;

var appstates = require("../server/appstates.js");
var console = require("util");
// console.log("app ---> : " + JSON.stringify(app));
process.on('uncaughtException',function(e) {
    console.log("Caught unhandled exception: " + e);
    console.log(" ---> : " + e.stack);
});

process.on('exit', function() {
    done();
    console.log('Goodbye!');
});

var models = {}, econonyModel, powerUpsModel, questsModel;
function init(models, next, done) {
    ds = loopback.createDataSource('MySQL', {
      "host": dburl,
      "port": 3306,
      "database": dbname,
      "username": dbuser,
      "password": dbpass
    });

    ds.discoverAndBuildModels("Economy", {}, function (err, models) {
            // console.log("Models: ", models);
            models.Economy.findOne({}, function (err, eco) {
                // console.log("Economy: ", eco);
                econonyModel = eco;
                ds.discoverAndBuildModels("Powerups", {}, function (err, models) {
                    models.Powerups.findOne({}, function (err, pus) {
                        // console.log("Powerups: ", pus);
                        powerUpsModel = pus;
                        ds.discoverAndBuildModels("Quests", {}, function (err, models) {
                            models.Quests.findOne({}, function (err, que) {
                                // console.log("Quests: ", que);
                                models.Powerups = powerUpsModel;
                                models.Quests = questsModel;
                                models.Economy = econonyModel;
                                // ds.disconnect();
                                next(models);
                                // done();
                            });
                        });
                    });
                });
            });
        }
    )
}

describe("Loopback Server", function() {
    var models, complete;
    var app, server;
    beforeEach(function(done) {
        function next(m) {
            // console.log("next: <==============================");
            models = m;
            done();
        }
        // boot(loopback(), __dirname, function(err) {
        //     if (err) throw err;

        //     // start the server if `$ node server.js`
        //     if (require.main === module) {
                // app.start();
                if(typeof ds !== 'undefined') ds.disconnect();
                if(typeof server !== 'undefined') server.close();
                app = server1.start();
                server = app.server;
                init(models, next, done);
        //     }
        // });
    })
    afterEach(function(done) {
        ds.disconnect();
        server.close();
        ds = undefined;
        done();
    });
    // describe("PowerUps", function() {
        it("action test - should trigger quest progression 2", function(done) {
            console.log('-------------------------------------> states_spec.js: begin 2');
            // var state = appstates.check(app, models, powerUpsModel);
            var state = appstates.check(app, models, questsModel);
            // var state = appstates.check(app, models, econonyModel);
            console.log('state returned = [');
            console.log(state);
            console.log(']');
            done();
            console.log('<------------------------------------- states_spec.js: end 2');
        });
return;

        it("action test - should trigger quest progression 1", function(done) {
            console.log('-------------------------------------> states_spec.js: begin 1');
            var state = appstates.check(app, models, powerUpsModel);
            console.log('state returned = [');
            console.log(state);
            console.log(']');
            done();
            console.log('<------------------------------------- states_spec.js: end 1');
        });

        it("action test - should trigger quest progression 3", function(done) {
            console.log('-------------------------------------> states_spec.js: begin 3');
            var state = appstates.check(app, models, powerUpsModel);
            // var state = appstates.check(app, models, questsModel);
            // var state = appstates.check(app, models, econonyModel);
            console.log('state returned = [');
            console.log(state);
            console.log(']');
            done();
            console.log('<------------------------------------- states_spec.js: end 3');
        });

    // }) //end of inner describe
}); //end of outer describe
