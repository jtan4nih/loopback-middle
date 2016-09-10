module.exports = function(app) {
  // var models = ['UsersQuests', 'Quests', 'QuestsPowerups','UsersAchievements'];

  // app.dataSources.stem2local.isActual(models, function(err, actual) {
  //     if (!actual) {

        // app.dataSources.stem2local.autoupdate(models, function(err) {

// return

        app.dataSources.stem2local.automigrate([
          'Usersquests'
          , 
          'Quests'
          // , 
          // 'Usersachievements'
          ], function(err) {
          if (err) throw err;
            console.log('Updating Quests models ... \n');
       
            app.models.Quests.create([
              {
                "id": 1,"title": "Onboarding",
                "description": "Let's get started",
                "how": "a corresponding explanation of how the Onboarding may be beneficial to the user",
                "threshold": 2,
                "state": "Unlocked",
                "point": 5
              },
              {
                "id": 2,"title": "Hydro Station",
                "description": "Are you drinking water?",
                "how": "a corresponding explanation of how the Hydro Station may be beneficial to the user",
                "threshold": 4,
                "state": "Unlocked",
                "point": 10
              },
              {
                "id": 3,"title": "Bright Ideas",
                "description": "Learn about the cool app",
                "how": "a corresponding explanation of how the Bright Ideas may be beneficial to the user",
                "threshold": 10,
                "state": "Unlocked",
                "point": 20
              },
              {
                "id": 4,"title": "Break These Walls",
                "description": "Learn how to overcome barriers",
                "how": "a corresponding explanation of how the Break These Walls may be beneficial to the user",
                "threshold": 15,
                "state": "Unlocked",
                "point": 20
              }
          ], function(err, quests) {
            if (err) {
              // throw err;
              console.log('Quests models unchanged. \n', quests);
            } else {
              console.log('Quests models created: \n', quests);
            }
          });

        });

      // } else {
      //       console.log('Quests models have not changed.\n');
      // }
  // });

};
