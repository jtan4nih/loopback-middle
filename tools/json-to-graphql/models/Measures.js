var request = require('request');
var util = require('../graphicommon.js');

class Measures {
  constructor() {
    this.apiHost = "http://127.0.0.1:3000";
    this.name = '_Measures'
  }

  listMeasures(
    id,
    type,
    name
  ) {
    console.log(`1 listMeasures ${id}`);
    return new Promise((listMeasures, reject) => {
      // if(!first) first = 0;
      // if(!skip) skip = 0;
      // db.collection('Measures')
      //   .find({})
      //   .skip(skip).limit(first)
      //   .toArray((err, result) => {
      //     if (err) return reject(err);
      //     return Measures(result);
      // });

      /*
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Measures"
      */
      util.listModels(this.apiHost, `/api/${this.name}`, id, type, name, listMeasures);

      console.log(`2 listMeasures`);
    });
  }

  saveMeasure(
    type,
    name,
    text,
    description,
    id
  ) {
    console.log(`2 saveMeasure ${name}, ${description}, ${id}`);
    var newMeasure = new Measures();
    newMeasure.type = type;
    newMeasure.name = name;
    newMeasure.text = text;
    newMeasure.description = description;
    newMeasure.id = id;

    // return new Promise((saveMeasure, reject) => {
    //   db.collection('Measures')
    //     .update({id:id},{$set:{name:name,description:description}},{upsert:true}, (err, result) => {

    //     if (err) return console.log(err)

    //     console.log(`saved to database: ${result}`)
    //     return saveMeasure(newMeasure);
    //   });
    // });

    return new Promise((saveMeasure, reject) => {
    // "owner": "${newMeasure.owner}",
      /*
      curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
        "id": 0,
        "owner": "string",
        "type": "string",
        "name": "string"
      }" "http://localhost:3000/api/Measures"
      */

      var data = `{
            "id": 0,
            "type": "${newMeasure.type}",
            "owner": "${newMeasure.owner}",
            "type": "${newMeasure.type}",
            "name": "${newMeasure.name}",
            "text": "${newMeasure.text}"
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
              return saveMeasure(error);
          } else {
              console.log(response.statusCode, body);
              newMeasure.id = JSON.parse(body).id;
              return saveMeasure(newMeasure);
          }
      });
    });
  }

  deleteMeasure(
    id
  ) {
    console.log(`deleteMeasure ${id}`);

    return new Promise((deleteMeasure, reject) => {
      // db.collection('Measures')
      //   .remove({id:id}, (err, result) => {

      //   if (err) return console.log(err)

      //   console.log(`deleted from database: ${result}`)
      //   return deleteMeasure(result);
      // });

      // "owner": "${newMeasure.owner}",
      /*
      curl -X DELETE --header "Accept: application/json" "http://localhost:3000/api/Measures/5"
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
              return deleteMeasure(error);
          } else {
              console.log(response.statusCode, body);
              return deleteMeasure(body);
          }
      });

    });
  }
}

module.exports = Measures;