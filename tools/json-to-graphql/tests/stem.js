'use strict';

var _graphqlTester = require('graphql-tester');
var assert = require('assert');

var test = (0, _graphqlTester.tester)({
    url: 'http://localhost:4000/graphql'
});

var count = 0;

// This tests a save requests
test(`
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
`).then(function (response) {
    assert(response.success == true);
    assert(response.status == 200);
    console.log(`passed ${++count}`);
    console.log(response.data.saveSubject.id);
    console.log(response.data.saveConstruct.id);
    console.log(response.data.saveMeasure.id);
    var subid = response.data.saveSubject.id;
    var conid = response.data.saveConstruct.id;
    var meaid = response.data.saveMeasure.id;
    // This tests a list requests
    test(`
    {
      subjects(id:"${response.data.saveSubject.id}") {
        id
        type
        description
      }
      constructs(id:"${response.data.saveConstruct.id}") {
        id
        type
        description
      }
      measures(id:"${response.data.saveMeasure.id}") {
        id
        type
        description
      }
    }
    `).then(function (response) {
        assert(response.success == true);
        assert(response.status == 200);
        console.log(`passed ${++count}`);
        // console.log(response.data.subjects[0].id);
        assert(response.data.subjects[0].id === subid);
        assert(response.data.constructs[0].id === conid);
        assert(response.data.measures[0].id === meaid);

        // This tests a successful delete requests
        test(`
        mutation {
          deleteSubject(id:"${subid}")
          deleteConstruct(id:"${conid}")
          deleteMeasure(id:"${meaid}")
        }
        `).then(function (response) {
            assert(response.success == true);
            assert(response.status == 200);
            assert(JSON.parse(response.data.deleteSubject).count === 1);
            assert(JSON.parse(response.data.deleteConstruct).count === 1);
            assert(JSON.parse(response.data.deleteMeasure).count === 1);
            console.log(`passed ${++count}`);
            // console.log(JSON.parse(response.data.deleteSubject).count);
        });
    });
});

