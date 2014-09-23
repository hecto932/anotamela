var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('recurso /notas', function(){
	describe('POST', function(){
		it("deberia de crear una nota nueva", function(){
			//throw new Error('Tengo hambre');
			//return true;

			var data = {
        		"nota": {
          			"title": "Mejorando.la #node-pro",
          			"description": "Introduccion a clase",
          			"type": "js",
          			"body": "soy el cuerpo de json"
        		}
      		};

      		request
      			.post('/notas')
      			.set('Accept', 'application/json')
      			.send(data)
      			.expect(201)
      			.expect('Content-Type', /application\/json/)
      			.end(function(err, res){
      				var body = res.body;

      				expect(body).to.have.property('nota');

      				var nota = body.nota;

      				//Propiedades
      				expect(nota).to.have.property('title','Mejorando.la #node-pro');
      				expect(nota).to.have.property('description','Introduccion a clase');
      				expect(nota).to.have.property('type','js');
      				expect(nota).to.have.property('body','soy el cuerpo de js');
      				expect(nota).to.have.property('id');
      			});
		});
	});
})