All the json files generated here were generated manually by hitting the Swagger endpoints e.g. http://localhost:3000/api/Audits

Sample mutations:

mutation {
  saveSubject(name:"n1", type:"participant", description:"sub") {
    id
  }
  saveConstruct(name:"c1", type:"powerups", description:"pu") {
    id
  }
  saveMeasure(name:"m1", type:"mood scale", description:"m") {
    id
  }
}

{
  subjects {
    id
  }
  constructs {
    id
    name
    type
  }
  measures {
    id
    name
    text
    type
    description
  }
  points {
    id
    name
    value
  }
}

mutation {
  deleteSubject(id:"1")
  deleteConstruct(id:"1")
  deleteMeasure(id:"1")
}

References:

https://github.com/matthewmueller/graph.ql

http://graphql.org/learn/schema/

https://www.npmjs.com/package/graphql-custom-datetype

https://www.npmjs.com/package/casual
