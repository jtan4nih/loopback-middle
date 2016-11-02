module.exports = function(app) {
        app.dataSources.stem2local.automigrate([
          // 'Usersquests'
          // , 
          // 'Quests'
          // , 
          // 'Usersachievements'
          ], function(err) {
          if (err) throw err;
            console.log('Updating Economy models ... \n');

            app.models.Economy.create([
              {
                "id": 1,
                "owner": 0,
                "resource": "actions",
                "entity": "powerups",
                "total": 0,
                "completed": 0,
                "weight": 1,
                "duration": 0,
                "state": "check",
                "progress": 0,
                "points": 0,
                "awards": ""
              },
              {
                "id": 2,
                "owner": 0,
                "resource": "levels",
                "entity": "quests",
                "total": 0,
                "completed": 0,
                "weight": 1,
                "duration": 0,
                "state": "check",
                "progress": 0,
                "points": 0,
                "awards": ""
              },
              {
                "id": 3,
                "owner": 0,
                "resource": "awards",
                "entity": "quests",
                "total": 0,
                "completed": 0,
                "weight": 1,
                "duration": 0,
                "state": "check",
                "progress": 0,
                "points": 0,
                "awards": ""
              },
              {
                "id": 4,
                "owner": 0,
                "resource": "goals",
                "entity": "awards",
                "total": 0,
                "completed": 0,
                "weight": 1,
                "duration": 0,
                "state": "check",
                "progress": 0,
                "points": 0,
                "awards": ""
              }
          ], function(err, economy) {
            if (err) {
              // throw err;
              console.log('Economy models unchanged. \n', economy);
            } else {
              console.log('Economy models created: \n', economy);
            }
          });

        });

      // } else {
      //       console.log('Economy models have not changed.\n');
      // }
  // });

};
