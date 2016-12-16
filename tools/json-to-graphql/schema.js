var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    subjects(first: Int, skip: Int): [Subjects]
    constructs: [Constructs]
    measures: [Measures]
    results: [Results]
    badges: [Badges]
  }

  type Mutation {
    saveSubject(name: String!, description: String, id: String): Subjects
    deleteSubject(id: String!): String
  }

  #getSubjects: Subjects
  #getAudits: Audits
  #getDie(numSides: Int): RandomDie
  #hello: String

  type Subjects {
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
    subject: Subjects
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Measures {
    name: String
    subject: Subjects
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Results {
    name: String
    subject: Subjects
    description: String
    type: String
    points: Points
    awards: Awards
    goals: Goals
    createdat: String
    updatedat: String
    id: String
  }

  type Points {
    owner: Results
    description: String
    type: String
    value: Int
    createdat: String
    updatedat: String
    id: String
  }

  type Awards {
    owner: Results
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Goals {
    owner: Results
    description: String
    type: String
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
    owner: Achievements
    description: String
    type: String
    createdat: String
    updatedat: String
    id: String
  }

  type Audits {
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