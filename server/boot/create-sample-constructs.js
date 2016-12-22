module.exports = function(app) {
  app.dataSources.stem2local.automigrate([
    //'QuestsPowerups',
    'Constructs'], function(err) {
// return
    if (err) throw err;
 
      console.log('Updating Constructs models ... \n');

      app.models.Constructs.create([
        {
          "id": 1,"name": "PSS",
          "type": "STEM",
          "description": "Perceived Stress - an individual's perception that the demands in their life (e.g., environmental, interpersonal, task) exceed their capacity (adaptive resources) to cope with those demands"
        }
      ], function(err, powerups) {
        if (err) {
          console.log('Constructs models unchanged. \n', powerups);
          throw err;
        } else {
          // console.log('Powerups models created: \n', powerups);
        }
      });

  });

};
