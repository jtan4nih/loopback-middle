module.exports = function(app) {
  app.dataSources.stem2local.autoupdate([
    //'QuestsPowerups',
    'Powerups'], function(err) {
// return
    if (err) throw err;
 
      console.log('Updating Powerups models ... \n');

      app.models.Powerups.create([
        {
          "id": 1,"title": "Hydration PU 1",
          "what": "a brief instruction () describing how to complete the Hydration",
          "how": "a corresponding explanation of how the Hydration may be beneficial to the user",
          "category": "Hydration","subcategory": "Brainstorm",
          "state": "Incomplete",
          "point": 0
        },
        {
          "id": 2,"title": "Hydration PU 2",
          "what": "a brief instruction () describing how to complete the Hydration",
          "how": "a corresponding explanation of how the Hydration may be beneficial to the user",
          "category": "Hydration","subcategory": "Store Knowledge",
          "state": "Incomplete",
          "point": 0
        },
        {
          "id": 10,"title": "Medication PU 1",
          "what": "a brief instruction () describing how to complete the Medication",
          "how": "a corresponding explanation of how the Medication may be beneficial to the user",
          "category": "Medication","subcategory": "Protective Benefits",
          "state": "Incomplete",
          "point": 0
        },
        {
          "id": 20,"title": "Exercise PU 1",
          "what": "a brief instruction () describing how to complete the Exercise",
          "how": "a corresponding explanation of how the Exercise may be beneficial to the user",
          "category": "Exercise","subcategory": "Stay Active",
          "state": "Incomplete",
          "point": 0
        }
      ], function(err, powerups) {
        if (err) {
          // throw err;
          console.log('Powerups models unchanged. \n', powerups);
        } else {
          console.log('Powerups models created: \n', powerups);
        }
      });

  });

};
