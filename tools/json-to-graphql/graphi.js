var express = require('express');
var graphqlHTTP = require('express-graphql');
var casual = require('casual');
var schema = require('./schema.js');  // Construct a schema, using GraphQL schema language
var Subjects = require('./models/Subjects.js');
var Constructs = require('./models/Constructs.js');
var Measures = require('./models/Measures.js');
var Points = require('./models/Points.js');
// const MongoClient = require('mongodb').MongoClient;

// The root provides the top-level API endpoints
var root = {
  subjects: function ({first,skip,id}) {
    return new Subjects().listSubjects(id);
  },
  saveSubject: function ({type,name,description,id}) {
    return new Subjects().saveSubject(type, name, description, id);
  },
  deleteSubject: function ({id}) {
    return new Subjects().deleteSubject(id);
  },
  constructs: function ({first,skip,id}) {
    return new Constructs().listConstructs(id);
  },
  saveConstruct: function ({type,name,description,id}) {
    return new Constructs().saveConstruct(type, name, description, id);
  },
  deleteConstruct: function ({id}) {
    return new Constructs().deleteConstruct(id);
  },
  measures: function ({first,skip,id}) {
    return new Measures().listMeasures(id);
  },
  saveMeasure: function ({type,name,text,description,id}) {
    return new Measures().saveMeasure(type, name, text, description, id);
  },
  deleteMeasure: function ({id}) {
    return new Measures().deleteMeasure(id);
  },
  points: function ({first,skip,id}) {
    return new Points().listPoints(id);
  },
  savePoint: function ({type,name,value,description,id}) {
    return new Points().savePoint(type, name, value, description, id);
  },
  deletePoint: function ({id}) {
    return new Points().deletePoint(id);
  },
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// var db;
// var dbUser = 'bn_df';
// var dbPassword = 'a7264c4821';
// var mongodbUrl = `mongodb://${dbUser}:${dbPassword}@127.0.0.1:27017/bitnami_df`;

// MongoClient.connect(mongodbUrl, (err, database) => {
//   if (err) return console.log(err)
//   db = database
  app.listen(4000, () => {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
  })
// })