All the json files generated here were generated manually by hitting the Swagger endpoints e.g. http://localhost:3000/api/Audits

Sample mutations:

mutation {
  saveSubject(name:"n1", type:"participant", description:"sub") {
    id
    name
    type
  }
  saveConstruct(name:"c1", type:"powerups", description:"pu") {
    id
    type
    name
  }
  saveMeasure(name:"mood", type:"c1", description:"m") {
    id
    name
    type
  }
  savePoint(type: "mood", name: "p1", value: 10, description: "p1") {
  	id
    type
    name
    value
  }
}

{
  subjects(name:"jd") {
    id
    name
  }
  constructs(type:"STEM",name:"PSS") {
    id
    name
    type
  }
  measures(type:"PSS", name:"Question 1") {
    id
    name
    type
    text
    description
  }
  points(type:"Question 1:Measures") {
    id
    name
    type
    value
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
