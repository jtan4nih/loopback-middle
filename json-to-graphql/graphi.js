var express = require('express');
var graphqlHTTP = require('express-graphql');
// var schema1 = require('./schema.js'); //TODO cause error "Error: RootQueryType.description field type must be Output Type but got: null."
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Audits {
    subject: String
    description: String
    service: String
    extra: String
    owner: String
    createdat: String
    updatedat: String
    id: Int
  }

  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    hello: String
    getDie(numSides: Int): RandomDie
    getAudits: Audits
  }
`);

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

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

// The root provides the top-level API endpoints
var root = {
  getAudits: function () {
    return new Audits();
  },
  hello: function () { 
    return "world"
  },
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');