var stemjwt = require('../../server/jwt');

module.exports = function(Questspowerups) {

  Questspowerups.beforeRemote('**', function(context, unused, next) {
    console.log('Questspowerups calls intercepted!');
    var req = context.req;
    var res = context.res;
    var tokenHeader = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
    var token = stemjwt.getToken(tokenHeader);
    var stat = stemjwt.isTokenValid(token);
    console.log(stat);
    if(stat) {
      next();
    } else {
      next(new Error('must be logged in'));
    }
  });

  Questspowerups.afterRemote('find', function(context, questspowerups, next) {
    console.log('Questspowerups find call intercepted!');
    var Powerups = Questspowerups.app.models.Powerups;

    Powerups.find(function (err, data) {
      var req = context.req;
      var res = context.res;
      // console.log('questspowerups.js response = [' + JSON.stringify(questspowerups) + ']');
      var item;
      var itemList = questspowerups;  //or context.result; 
      for(var i=0; i<itemList.length;i++) {
        item = itemList[i];
        for (let item1 of data) {
          if(item1.id === item.powerupsid) {
            // console.log(item1);
            item.powerups = item1;
          }
        }
      }
      next();
    });


  });

};
