var express = require('express');
var graphqlHTTP = require('express-graphql');
// var schema1 = require('./schema.js'); //TODO cause error "Error: RootQueryType.description field type must be Output Type but got: null."
var casual = require('casual');
// Construct a schema, using GraphQL schema language
var schema = require('./schema.js');

const MongoClient = require('mongodb').MongoClient;

// This class implements the RandomDie GraphQL type
class Audits {
  constructor() {
    this.subject = 'subject 1'
    this.description = 'desc 1'
    this.service = 'service 1'
    this.extra = ''
    this.owner = 'root'
    this.createdat = '12-12-2016'
    this.updatedat = '12-12-2016'
    this.id = -1
  }
}

class Results {
}

class Measures {
}

class Constructs {
  constructor() {
    this.name = 'construct 1'
  }
}

class Subjects {
  constructor() {
    this.name = 'subject 1'
  }

  saveSubject(
    name,
    description,
    id
  ) {
    console.log(`2 saveSubject ${name}, ${description}, ${id}`);
    var newSubject = new Subjects();
    newSubject.name = name;
    newSubject.description = description;
    newSubject.id = id;

    return new Promise((saveSubject, reject) => {
      db.collection('subjects')
        .update({id:id},{$set:{name:name,description:description}},{upsert:true}, (err, result) => {

        if (err) return console.log(err)

        console.log(`saved to database: ${result}`)
        return saveSubject(newSubject);
      });
    });
  }

  deleteSubject(
    id
  ) {
    console.log(`deleteSubject ${id}`);

    return new Promise((deleteSubject, reject) => {
      db.collection('subjects')
        .remove({id:id}, (err, result) => {

        if (err) return console.log(err)

        console.log(`deleted from database: ${result}`)
        return deleteSubject(result);
      });
    });
  }
}

// class RandomDie {
//   constructor(numSides) {
//     this.numSides = numSides;
//   }

//   rollOnce() {
//     return 1 + Math.floor(Math.random() * this.numSides);
//   }

//   roll({numRolls}) {
//     var output = [];
//     for (var i = 0; i < numRolls; i++) {
//       output.push(this.rollOnce());
//     }
//     return output;
//   }
// }

// The root provides the top-level API endpoints
var root = {
  subjects: function ({first, skip}) {
    return new Promise((subjects, reject) => {
      if(!first) first = 0;
      if(!skip) skip = 0;
      db.collection('subjects')
        .find({})
        .skip(skip).limit(first)
        .toArray((err, result) => {
          if (err) return reject(err);
          return subjects(result);
      });
    });
  },
  saveSubject: function ({
    name,
    description,
    id
  }) {
    console.log(`1 saveSubject ${name}, ${description}, ${id}`);
    return new Subjects().saveSubject(name, description, id);
  },
  deleteSubject: function ({
    id
  }) {
    console.log(`deleteSubject ${id}`);
    return new Subjects().deleteSubject(id);
  }
  // ,
  // getDie: function ({numSides}) {
  //   return new RandomDie(numSides || 6);
  // },
  // hello: function () { 
  //   return "world"
  // }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

var db;
var dbUser = 'bn_df';
var dbPassword = 'a7264c4821';
var mongodbUrl = `mongodb://${dbUser}:${dbPassword}@127.0.0.1:27017/bitnami_df`;

MongoClient.connect(mongodbUrl, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
  })
})