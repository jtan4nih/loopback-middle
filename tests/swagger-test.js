var Swagger = require('swagger-client');
 
var client = new Swagger({
  url: 'http://petstore.swagger.io/v2/swagger.json',
  success: function() {
    client.pet.getPetById({petId:7},{responseContentType: 'application/json'},function(pet){
      console.log('pet', pet);
    });
  }
});