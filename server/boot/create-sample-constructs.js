module.exports = function(app) {
  app.dataSources.stem2local.automigrate([
    //'QuestsPowerups',
    '_Constructs'], function(err) {
// return
    if (err) throw err;
 
      console.log('Updating _Constructs models ... \n');

      app.models._Constructs.create([
        {
          "id": 1,"name": "PSS",
          "type": "STEM",
          "description": "Perceived Stress - an individual's perception that the demands in their life (e.g., environmental, interpersonal, task) exceed their capacity (adaptive resources) to cope with those demands"
        }
      ], function(err, powerups) {
        if (err) {
          console.log('_Constructs models unchanged. \n', powerups);
          throw err;
        } else {
          // console.log('Powerups models created: \n', powerups);
        }
      });

  });

};
