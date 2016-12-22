module.exports = function(app) {
  app.dataSources.stem2local.automigrate([
    'Points'], function(err) {
// return
    if (err) throw err;
 
      console.log('Updating Points models ... \n');

      app.models.Points.create([
        {
          "id": 1,"name": "Q1P1",
          "type": "Question 1:Measures",
          "value": -1,
          "description": "a Point assigned to Question 1 (Item 1 of 14) for PSS"
        },
        {
          "id": 2,"name": "Q2P1",
          "type": "Question 2:Measures",
          "value": -1,
          "description": "a Point assigned to Question 2 (Item 1 of 14) for PSS"
        },
        {
          "id": 3,"name": "Q3P1",
          "type": "Question 3:Measures",
          "value": -1,
          "description": "a Point assigned to Question 3 (Item 1 of 14) for PSS"
        },
        {
          "id": 4,"name": "Q4P1",
          "type": "Question 4:Measures",
          "value": -1,
          "description": "a Point assigned to Question 4 (Item 1 of 14) for PSS"
        }
      ], function(err, powerups) {
        if (err) {
          console.log('Points models unchanged. \n', powerups);
          throw err;
        } else {
          // console.log('Powerups models created: \n', powerups);
        }
      });

  });

};
