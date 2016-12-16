var express = require('express');
var graphqlHTTP = require('express-graphql');
// var schema1 = require('./schema.js'); //TODO cause error "Error: RootQueryType.description field type must be Output Type but got: null."
var casual = require('casual');
// Construct a schema, using GraphQL schema language
var schema = require('./schema.js');

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
  subjects: function ({first, skip}) { 
    var subjectsList = [new Subjects(),new Subjects(),new Subjects(),new Subjects(),new Subjects()];
    var count = 0;
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].measures = new Measures();
    subjectsList[count].measures.name = casual.title;
    subjectsList[count].measures.subject = subjectsList[count];
    subjectsList[count].measures.id = count;
    subjectsList[count].results = new Results();
    subjectsList[count].results.name = casual.title;
    subjectsList[count].results.subject = subjectsList[count];
    subjectsList[count].results.id = count;
    subjectsList[count++].id = count;

    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].measures = new Measures();
    subjectsList[count].measures.name = casual.title;
    subjectsList[count].measures.subject = subjectsList[count];
    subjectsList[count].measures.id = count;
    subjectsList[count].results = new Results();
    subjectsList[count].results.name = casual.title;
    subjectsList[count].results.subject = subjectsList[count];
    subjectsList[count].results.id = count;
    subjectsList[count++].id = count;
    
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].measures = new Measures();
    subjectsList[count].measures.name = casual.title;
    subjectsList[count].measures.subject = subjectsList[count];
    subjectsList[count].measures.id = count;
    subjectsList[count].results = new Results();
    subjectsList[count].results.name = casual.title;
    subjectsList[count].results.subject = subjectsList[count];
    subjectsList[count].results.id = count;
    subjectsList[count++].id = count;
    
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].measures = new Measures();
    subjectsList[count].measures.name = casual.title;
    subjectsList[count].measures.subject = subjectsList[count];
    subjectsList[count].measures.id = count;
    subjectsList[count].results = new Results();
    subjectsList[count].results.name = casual.title;
    subjectsList[count].results.subject = subjectsList[count];
    subjectsList[count].results.id = count;
    subjectsList[count++].id = count;
    
    subjectsList[count].name = casual.name;
    subjectsList[count].construct = new Constructs();
    subjectsList[count].construct.name = casual.title;
    subjectsList[count].construct.id = count;
    subjectsList[count].measures = new Measures();
    subjectsList[count].measures.name = casual.title;
    subjectsList[count].measures.subject = subjectsList[count];
    subjectsList[count].measures.id = count;
    subjectsList[count].results = new Results();
    subjectsList[count].results.name = casual.title;
    subjectsList[count].results.subject = subjectsList[count];
    subjectsList[count].results.id = count;
    subjectsList[count++].id = count;

    var finalList = subjectsList;
    if(first && first > 0) {
      finalList = [first];
      var j=0;
      if(typeof skip === 'undefined') {
        skip = 0;
      }
      for(var i=0; i<first && first < subjectsList.length; i++) {
        if(i >= skip) {
          finalList[j] = subjectsList[i];
          j++;
        }
      }
    }
    return finalList
  },
  getDie: function ({numSides}) {
    return new RandomDie(numSides || 6);
  },
  hello: function () { 
    return "world"
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