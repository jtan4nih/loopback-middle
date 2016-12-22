var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    subjects(first: Int, skip: Int, id: String, name: String, type: String): [Subjects]
    constructs(first: Int, skip: Int, id: String, name: String, type: String): [Constructs]
    measures(first: Int, skip: Int, id: String, name: String, type: String): [Measures]
    points(first: Int, skip: Int, id: String, name: String, type: String): [Points]
    results(first: Int, skip: Int, id: String, name: String, type: String): [Results]
    badges(first: Int, skip: Int, id: String, name: String, type: String): [Badges]
  }

  type Mutation {
    saveSubject(type: String, name: String!, description: String, id: String): Subjects
    deleteSubject(id: String!): String
    saveConstruct(type: String, name: String!, description: String, id: String): Constructs
    deleteConstruct(id: String!): String
    saveMeasure(type: String, name: String!, text: String, description: String, id: String): Constructs
    deleteMeasure(id: String!): String
    savePoint(type: String, name: String!, value: Int, description: String, id: String): Constructs
    deletePoint(id: String!): String
  }

  #getSubjects: Subjects
  #getAudits: Audits
  #getDie(numSides: Int): RandomDie
  #hello: String

  type Subjects {
    type: String
    name: String
    description: String
    type: String
    construct: Constructs
    measures: Measures
    results: Results
    createdat: String
    updatedat: String
    id: String
  }

  type Constructs {
    name: String
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Measures {
    name: String
    text: String
    subject: Subjects
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Points {
    name: String
    owner: Measures
    description: String
    type: String
    value: Int
    createdat: String
    updatedat: String
    id: String
  }

  type Results {
    name: String
    subject: Subjects
    description: String
    type: String
    measures: Measures
    awards: Awards
    goals: Goals
    createdat: String
    updatedat: String
    id: String
  }

  type Awards {
    name: String
    owner: Results
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Goals {
    name: String
    owner: Results
    description: String
    type: String
    state: String
    createdat: String
    updatedat: String
    id: String
  }

  type Achievements {
    subject: Subjects
    awards: [Awards]
    goals: [Goals]
  }

  type Badges {
    name: String
    owner: Achievements
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Audits {
    name: String
    subject: Subjects
    description: String
    service: String
    extra: String
    owner: String
    createdat: String
    updatedat: String
    id: String
  }

  #type RandomDie {
  # numSides: Int!
  # rollOnce: Int!
  # roll(numRolls: Int!): [Int]
  #}
`);

module.exports = schema;