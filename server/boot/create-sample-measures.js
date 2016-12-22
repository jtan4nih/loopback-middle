module.exports = function(app) {
  app.dataSources.stem2local.automigrate([
    'Measures'], function(err) {
// return
    if (err) throw err;
 
      console.log('Updating Measures models ... \n');

      app.models.Measures.create([
        {
          "id": 1,"name": "Question 1",
          "type": "PSS",
          "text": "In the last month, how often have you been upset because of something that happened unexpectedly?",
          "description": "Question 1 (Item 1 of 14) for PSS"
        },
        {
          "id": 2,"name": "Question 2",
          "type": "PSS",
          "text": "In the last month, how often have you felt that you were unable to control important things in your life?",
          "description": "Question 2 (Item 2 of 14) for PSS"
        },
        {
          "id": 3,"name": "Question 3",
          "type": "PSS",
          "text": "In the last month, how often have you felt nervous and “stressed”?",
          "description": "Question 3 (Item 3 of 14) for PSS"
        },
        {
          "id": 4,"name": "Question 4",
          "type": "PSS",
          "text": "In the last month, how often have you dealt successfully with irritating life hassles?",
          "description": "Question 4 (Item 4 of 14) for PSS"
        }
      ], function(err, powerups) {
        if (err) {
          console.log('Measures models unchanged. \n', powerups);
          throw err;
        } else {
          // console.log('Powerups models created: \n', powerups);
        }
      });

  });

};
