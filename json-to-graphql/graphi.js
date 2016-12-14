var express = require('express');
var graphqlHTTP = require('express-graphql');
// var schema1 = require('./schema.js'); //TODO cause error "Error: RootQueryType.description field type must be Output Type but got: null."
var { buildSchema } = require('graphql');
var casual = require('casual');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    subjects: [Subjects]
    getSubjects: Subjects
    getAudits: Audits
    hello: String
    getDie(numSides: Int): RandomDie
  }

  type Subjects {
    name: String
    description: String
    type: String
    construct: Constructs
    input: Measures
    output: Results
    createdat: String
    updatedat: String
    id: Int
  }

  type Constructs {
    name: String
    description: String
    type: String
    createdat: String
    updatedat: String
    id: Int
  }

  type Measures {
    name: String
    subject: Subjects
    description: String
    type: String
    createdat: String
    updatedat: String
    id: Int
  }

  type Results {
    name: String
    subject: Subjects
    description: String
    type: String
    awards: Awards
    goals: Goals
    createdat: String
    updatedat: String
    id: Int
  }

  type Awards {
    owner: Results
    description: String
    type: String
    createdat: String
    updatedat: String
    id: Int
  }

  type Goals {
    owner: Awards
    description: String
    type: String
    createdat: String
    updatedat: String
    id: Int
  }

  type Audits {
    subject: Subjects
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
  subjects: function () { 
    var subjectsList = [new Subjects(),new Subjects(),new Subjects(),new Subjects(),new Subjects()];
    var count = 0;
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].input = new Measures();
    subjectsList[count].input.name = casual.title;
    subjectsList[count].input.subject = subjectsList[count];
    subjectsList[count].input.id = count;
    subjectsList[count].output = new Results();
    subjectsList[count].output.name = casual.title;
    subjectsList[count].output.subject = subjectsList[count];
    subjectsList[count].output.id = count;
    subjectsList[count++].id = count;

    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].input = new Measures();
    subjectsList[count].input.name = casual.title;
    subjectsList[count].input.subject = subjectsList[count];
    subjectsList[count].input.id = count;
    subjectsList[count].output = new Results();
    subjectsList[count].output.name = casual.title;
    subjectsList[count].output.subject = subjectsList[count];
    subjectsList[count].output.id = count;
    subjectsList[count++].id = count;
    
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].input = new Measures();
    subjectsList[count].input.name = casual.title;
    subjectsList[count].input.subject = subjectsList[count];
    subjectsList[count].input.id = count;
    subjectsList[count].output = new Results();
    subjectsList[count].output.name = casual.title;
    subjectsList[count].output.subject = subjectsList[count];
    subjectsList[count].output.id = count;
    subjectsList[count++].id = count;
    
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].input = new Measures();
    subjectsList[count].input.name = casual.title;
    subjectsList[count].input.subject = subjectsList[count];
    subjectsList[count].input.id = count;
    subjectsList[count].output = new Results();
    subjectsList[count].output.name = casual.title;
    subjectsList[count].output.subject = subjectsList[count];
    subjectsList[count].output.id = count;
    subjectsList[count++].id = count;
    
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].input = new Measures();
    subjectsList[count].input.name = casual.title;
    subjectsList[count].input.subject = subjectsList[count];
    subjectsList[count].input.id = count;
    subjectsList[count].output = new Results();
    subjectsList[count].output.name = casual.title;
    subjectsList[count].output.subject = subjectsList[count];
    subjectsList[count].output.id = count;
    subjectsList[count++].id = count;

    return subjectsList
  },
  getSubjects: function () {
    return new Subjects();
  },
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
console.log('1 Running a GraphQL API server at localhost:4000/graphql');