All the json files generated here were generated manually by hitting the Swagger endpoints e.g. http://localhost:3000/api/Audits

Sample mutations:

mutation {
  saveSubject(name:"n1", type:"participant", description:"d1") {
    id
  }
}

mutation {
  deleteSubject(id:"1")
}

References:

https://github.com/matthewmueller/graph.ql

http://graphql.org/learn/schema/

https://www.npmjs.com/package/graphql-custom-datetype

https://www.npmjs.com/package/casual
