var request = require('request');
var util = require('../graphicommon.js');

class Constructs {
  constructor() {
    this.apiHost = "http://127.0.0.1:3000";
    this.name = 'Construct 1'
  }

  listConstructs(
    id
  ) {
    console.log(`1 listConstructs ${id}`);
    return new Promise((listConstructs, reject) => {
      // if(!first) first = 0;
      // if(!skip) skip = 0;
      // db.collection('Constructs')
      //   .find({})
      //   .skip(skip).limit(first)
      //   .toArray((err, result) => {
      //     if (err) return reject(err);
      //     return Constructs(result);
      // });

      /*
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Constructs"
      */
      util.listModels(this.apiHost, '/api/Constructs', id, listConstructs);

      console.log(`2 listConstructs`);
    });
  }

  saveConstruct(
    type,
    name,
    description,
    id
  ) {
    console.log(`2 saveConstruct ${name}, ${description}, ${id}`);
    var newConstruct = new Constructs();
    newConstruct.type = type;
    newConstruct.name = name;
    newConstruct.description = description;
    newConstruct.id = id;

    // return new Promise((saveConstruct, reject) => {
    //   db.collection('Constructs')
    //     .update({id:id},{$set:{name:name,description:description}},{upsert:true}, (err, result) => {

    //     if (err) return console.log(err)

    //     console.log(`saved to database: ${result}`)
    //     return saveConstruct(newConstruct);
    //   });
    // });

    return new Promise((saveConstruct, reject) => {
    // "owner": "${newConstruct.owner}",
      /*
      curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
        "id": 0,
        "owner": "string",
        "type": "string",
        "name": "string"
      }" "http://localhost:3000/api/Constructs"
      */

      var data = `{
            "id": 0,
            "type": "${newConstruct.type}",
            "owner": "${newConstruct.owner}",
            "type": "${newConstruct.type}",
            "name": "${newConstruct.name}"
          }`;

      request({
          url: `${this.apiHost}/api/Constructs`, //URL to hit
          qs: {from: 'graphi.js', time: +new Date()}, //Query string data
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: data //Set the body as a string
      }, function(error, response, body){
          if(error) {
              console.log(error);
              return saveConstruct(error);
          } else {
              console.log(response.statusCode, body);
              newConstruct.id = JSON.parse(body).id;
              return saveConstruct(newConstruct);
          }
      });
    });
  }

  deleteConstruct(
    id
  ) {
    console.log(`deleteConstruct ${id}`);

    return new Promise((deleteConstruct, reject) => {
      // db.collection('Constructs')
      //   .remove({id:id}, (err, result) => {

      //   if (err) return console.log(err)

      //   console.log(`deleted from database: ${result}`)
      //   return deleteConstruct(result);
      // });

      // "owner": "${newConstruct.owner}",
      /*
      curl -X DELETE --header "Accept: application/json" "http://localhost:3000/api/Constructs/5"
      */

      request({
          url: `${this.apiHost}/api/Constructs/${id}`, //URL to hit
          qs: {from: 'graphi.js', time: +new Date()}, //Query string data
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }, function(error, response, body){
          if(error) {
              console.log(error);
              return deleteConstruct(error);
          } else {
              console.log(response.statusCode, body);
              return deleteConstruct(body);
          }
      });

    });
  }
}

module.exports = Constructs;