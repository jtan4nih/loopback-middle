//=== https://docs.strongloop.com/display/public/LB/Discovering+models+from+relational+databases
var dburl = process.env.MYSQL_HOST || '127.0.0.1';
var dbname = process.env.MYSQL_DB || 'stem2dev_db';
var dbuser = process.env.MYSQL_USER || 'root';
var dbpass = process.env.MYSQL_PASSWORD || 'admin';

var loopback = require('loopback');
var ds = loopback.createDataSource('MySQL', {
  "host": dburl,
  "port": 3306,
  "database": dbname,
  "username": dbuser,
  "password": dbpass
});

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
function init(models) {
    ds.discoverAndBuildModels("Economy", {}, function (err, models) {
            // console.log("Models: ", models);
            models.Economy.findOne({}, function (err, eco) {
                console.log("Economy: ", eco);
                econonyModel = eco;
                ds.discoverAndBuildModels("Powerups", {}, function (err, models) {
                    models.Powerups.findOne({}, function (err, pus) {
                        console.log("Powerups: ", pus);
                        powerUpsModel = pus;
                        ds.discoverAndBuildModels("Quests", {}, function (err, models) {
                            models.Quests.findOne({}, function (err, que) {
                                console.log("Quests: ", que);
                                models.Powerups = powerUpsModel;
                                models.Quests = questsModel;
                                models.Economy = econonyModel;
                                ds.disconnect();
                            });
                        });
                    });
                });
            });
        }
    )
}

describe("Loopback Server", function() {
    beforeEach(function() {
        init(models);
    })
    afterEach(function() {
    });
    describe("PowerUps", function() {
        it("action test - should not trigger quest progression", function(done) {
            next = function(state) {
                console.log('<------------------------------------- begin');
                // console.log(done);
                console.log(state);
                done();
                console.log('<------------------------------------- done');
            }
            appstates.check(models, powerUpsModel, next);
        });
    }) //end of inner describe
}); //end of outer describe
