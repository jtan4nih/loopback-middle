var request = require('request');
var util = require('../graphicommon.js');

class Points {
  constructor() {
    this.apiHost = "http://127.0.0.1:3000";
    this.name = '_Points'
  }

  listPoints(
    id,
    type,
    name
  ) {
    console.log(`1 listPoints ${id}`);
    return new Promise((listPoints, reject) => {
      // if(!first) first = 0;
      // if(!skip) skip = 0;
      // db.collection('Points')
      //   .find({})
      //   .skip(skip).limit(first)
      //   .toArray((err, result) => {
      //     if (err) return reject(err);
      //     return Points(result);
      // });

      /*
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Points"
      */
      util.listModels(this.apiHost, `/api/${this.name}`, id, type, name, listPoints);

      console.log(`2 listPoints`);
    });
  }

  savePoint(
    type,
    name,
    value,
    description,
    id
  ) {
    console.log(`2 savePoint ${name}, ${description}, ${id}`);
    var newPoint = new Points();
    newPoint.type = type;
    newPoint.name = name;
    newPoint.value = value;
    newPoint.description = description;
    newPoint.id = id;

    // return new Promise((savePoint, reject) => {
    //   db.collection('Points')
    //     .update({id:id},{$set:{name:name,description:description}},{upsert:true}, (err, result) => {

    //     if (err) return console.log(err)

    //     console.log(`saved to database: ${result}`)
    //     return savePoint(newPoint);
    //   });
    // });

    return new Promise((savePoint, reject) => {
    // "owner": "${newPoint.owner}",
      /*
      curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
        "id": 0,
        "owner": "string",
        "type": "string",
        "name": "string"
      }" "http://localhost:3000/api/Points"
      */

      var data = `{
            "id": 0,
            "type": "${newPoint.type}",
            "owner": "${newPoint.owner}",
            "type": "${newPoint.type}",
            "name": "${newPoint.name}",
            "value": "${newPoint.value}"
          }`;

      request({
          url: `${this.apiHost}/api/${this.name}`, //URL to hit
          qs: {from: 'graphi.js', time: +new Date()}, //Query string data
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: data //Set the body as a string
      }, function(error, response, body){
          if(error) {
              console.log(error);
              return savePoint(error);
          } else {
              console.log(response.statusCode, body);
              newPoint.id = JSON.parse(body).id;
              return savePoint(newPoint);
          }
      });
    });
  }

  deletePoint(
    id
  ) {
    console.log(`deletePoint ${id}`);

    return new Promise((deletePoint, reject) => {
      // db.collection('Points')
      //   .remove({id:id}, (err, result) => {

      //   if (err) return console.log(err)

      //   console.log(`deleted from database: ${result}`)
      //   return deletePoint(result);
      // });

      // "owner": "${newPoint.owner}",
      /*
      curl -X DELETE --header "Accept: application/json" "http://localhost:3000/api/Points/5"
      */

      request({
          url: `${this.apiHost}/api/${this.name}/${id}`, //URL to hit
          qs: {from: 'graphi.js', time: +new Date()}, //Query string data
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }, function(error, response, body){
          if(error) {
              console.log(error);
              return deletePoint(error);
          } else {
              console.log(response.statusCode, body);
              return deletePoint(body);
          }
      });

    });
  }
}

module.exports = Points;