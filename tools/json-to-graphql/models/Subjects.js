var request = require('request');
var util = require('../graphicommon.js');

class Subjects {
  constructor() {
    this.apiHost = "http://127.0.0.1:3000";
    this.name = '_Subjects'
  }

  listSubjects(
    id,
    type,
    name
  ) {
    console.log(`1 listSubjects ${id}`);
    return new Promise((listSubjects, reject) => {
      // if(!first) first = 0;
      // if(!skip) skip = 0;
      // db.collection('subjects')
      //   .find({})
      //   .skip(skip).limit(first)
      //   .toArray((err, result) => {
      //     if (err) return reject(err);
      //     return subjects(result);
      // });

      /*
      curl -X GET --header "Accept: application/json" "http://localhost:3000/api/Subjects"
      */
      util.listModels(this.apiHost, `/api/${this.name}`, id, type, name, listSubjects);

      console.log(`2 listSubjects`);
    });
  }

  saveSubject(
    type,
    name,
    description,
    id
  ) {
    console.log(`2 saveSubject ${name}, ${description}, ${id}`);
    var newSubject = new Subjects();
    newSubject.type = type;
    newSubject.name = name;
    newSubject.description = description;
    newSubject.id = id;

    // return new Promise((saveSubject, reject) => {
    //   db.collection('subjects')
    //     .update({id:id},{$set:{name:name,description:description}},{upsert:true}, (err, result) => {

    //     if (err) return console.log(err)

    //     console.log(`saved to database: ${result}`)
    //     return saveSubject(newSubject);
    //   });
    // });

    return new Promise((saveSubject, reject) => {
    // "owner": "${newSubject.owner}",
      /*
      curl -X POST --header "Content-Type: application/json" --header "Accept: application/json" -d "{
        "id": 0,
        "owner": "string",
        "type": "string",
        "name": "string"
      }" "http://localhost:3000/api/Subjects"
      */

      var data = `{
            "id": 0,
            "type": "${newSubject.type}",
            "owner": "${newSubject.owner}",
            "type": "${newSubject.type}",
            "name": "${newSubject.name}"
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
              return saveSubject(error);
          } else {
              console.log(response.statusCode, body);
              newSubject.id = JSON.parse(body).id;
              return saveSubject(newSubject);
          }
      });
    });
  }

  deleteSubject(
    id
  ) {
    console.log(`deleteSubject ${id}`);

    return new Promise((deleteSubject, reject) => {
      // db.collection('subjects')
      //   .remove({id:id}, (err, result) => {

      //   if (err) return console.log(err)

      //   console.log(`deleted from database: ${result}`)
      //   return deleteSubject(result);
      // });

      // "owner": "${newSubject.owner}",
      /*
      curl -X DELETE --header "Accept: application/json" "http://localhost:3000/api/Subjects/5"
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
              return deleteSubject(error);
          } else {
              console.log(response.statusCode, body);
              return deleteSubject(body);
          }
      });

    });
  }
}

module.exports = Subjects;