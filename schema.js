var graphql = require ('graphql').graphql;

var TodoType = new graphql.GraphQLObjectType({  
  name: 'todo',
  fields: function () {
    return {
      id: {
        type: graphql.GraphQLID
      },
      title: {
        type: graphql.GraphQLString
      },
      completed: {
        type: graphql.GraphQLBoolean
      }
    }
  }
});


var MutationAdd = {  
  type: TodoType,
  description: 'Add a Todo',
  args: {
    title: {
      name: 'Todo title',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    var newTodo = new TODO({
      title: args.title,
      completed: false
    })
    newTodo.id = newTodo._id
    return new Promise((resolve, reject) => {
      newTodo.save(function (err) {
        if (err) reject(err)
        else resolve(newTodo)
      })
    })
  }
}

var MutationType = new GraphQLObjectType({  
  name: 'Mutation',
  fields: {
    add: MutationAdd
  }
});

var Schema = new GraphQLSchema({  
  query: QueryType,
  mutation: MutationType
});