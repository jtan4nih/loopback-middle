const {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull
} = require('graphql')

function null1() {
    return 'TODO';
}

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: () => ({
            subject: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for subject
                resolve: () => null1,
            },
            description: {
                description: 'enter your description',
                type: null,
                // TODO: Implement resolver for description
                resolve: () => null1,
            },
            object: {
                description: 'enter your description',
                type: null,
                // TODO: Implement resolver for object
                resolve: () => null1,
            },
            service: {
                description: 'enter your description',
                type: null,
                // TODO: Implement resolver for service
                resolve: () => null1,
            },
            extra: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for extra
                resolve: () => null1,
            },
            owner: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for owner
                resolve: () => null1,
            },
            createdat: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for createdat
                resolve: () => null1,
            },
            updatedat: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLString),
                // TODO: Implement resolver for updatedat
                resolve: () => null1,
            },
            id: {
                description: 'enter your description',
                type: new GraphQLNonNull(GraphQLID),
                // TODO: Implement resolver for id
                resolve: () => null1,
            }
        })
    })
})