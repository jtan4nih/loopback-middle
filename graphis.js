const express = require('express');
const app = express();
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var graphQLSchema = require('./swagger-to-graphql/lib');
 
graphQLSchema('./stem-models-config/openapi/swagger.json').then(schema => {
  app.use('/graphql', graphqlHTTP(() => {
    return {
      schema,
      context: {
        GQLProxyBaseUrl: 'http://petstore.swagger.io/v2'
      },
      graphiql: true
    };
  }));
 
  app.listen(3009, 'localhost', () => {
    console.info(`http://localhost:3009/graphql`);
  });
}).catch(e => {
  throw e;
});