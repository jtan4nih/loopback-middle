module.exports = function(app) {
  // var models = ['QuestsPowerups', 'Quests', 'QuestsPowerups','UsersAchievements'];

  // app.dataSources.stem2local.isActual(models, function(err, actual) {
  //     if (!actual) {

// return

        // app.dataSources.stem2local.autoupdate(models, function(err) {
        // app.dataSources.stem2local.autoupdate(['Powerups', 'Quests', 'Questspowerups'], function(err) {
        app.dataSources.stem2local.automigrate(['Questspowerups'], function(err) {
          if (err) throw err;
            console.log('Updating QuestsPowerups models ... \n');
       
            app.models.Questspowerups.create([
              {
                "id": 1,
                "questsid": 1,
                "powerupsid": 1
              },
              {
                "id": 2,
                "questsid": 1,
                "powerupsid": 2
              },
              {
                "id": 3,
                "questsid": 2,
                "powerupsid": 1
              },
              {
                "id": 4,
                "questsid": 3,
                "powerupsid": 1
              }
          ], function(err, quests) {
            if (err) {
              // throw err;
              console.log('QuestsPowerups models unchanged. \n', quests);
            } else {
              // console.log('QuestsPowerups models created: \n', quests);
            }
          });

        });

      // } else {
      //       console.log('Quests models have not changed.\n');
      // }
  // });

};
