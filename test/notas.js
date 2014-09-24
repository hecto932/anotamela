var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('recurso /notas', function(){
	describe('POST', function(){
    it("deberia de crear una nota nueva", function(done){
      var data = {
        "title": "Mejorando.la #node-pro",
        "description": "Introduccion a clase",
        "type": "js",
        "body": "soy el cuerpo de json"
      };

      // crear solicitud de http enviando data
      request
        .post('/notas')
        // Accept application/json
        .set('Accept', 'application/json')
        // Status Code = 201
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res){
          var body = res.body;

          expect(body).to.have.property('nota');

          nota = body.notas;

          expect(body).to.have.property('title', 'Mejorando.la #node-pro');
          expect(body).to.have.property('description', 'Introduccion a clase');
          expect(body).to.have.property('type', 'js');
          expect(body).to.have.property('body', 'soy el cuerpo de json');
          expect(body).to.have.property('id');
          done();


        });
      // cuerpo de la solicitud debe tenr una nota en JS

      // nota debe tener una propiedad 'title' = "Mejorando.la #node-pro"



      

		});
	});
})