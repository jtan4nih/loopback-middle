/**
	Basic types:
	
	http://graphql.org/graphql-js/basic-types/

	cURL test:

	On Windows, do not use single quotes but use just the double qoutes e.g.

	curl -X POST -H "Content-Type: application/json" -d "{\"query\": \"{ hello }\"}" http://localhost:4000/graphql
*/
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');