var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('recurso /notas', function() {

  describe('POST', function() {
    //DONE ES UNA FORMA DE DECIRLE A LA PRUEBA QUE ES ASINCRONA
    it('deberia crear una nota', function(done){
        //throw new Error('Esta clase esta muy chevere');

        var data = {
            "title" : "Mejorando.la #node-pro",
            "description": "Introduccion a clase",
            "type": "js",
            "body": "Soy el cuerpo de json"
        };

        //CREAR UNA SOLICITUD DE HTTP ENVIANDO DATA
        request
            .post('/notas')
        //ACCEPT APPLICATION/JSON
            .set('Accept', 'application/json')
        //STATUS CODE = 201
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res){
                var body = res.body;

                expect(body).to.have.property('nota');

                nota = body.notas;

                expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota).to.have.property('description', 'Introduccion a clase');
                expect(nota).to.have.property('type', 'js');
                expect(nota).to.have.property('body', 'soy el cuerpo de json');
                expect(nota).to.have.property('id');

                done();

            });
        //CUERPO DE LA SOLICITUD DEBE TENER UNA NOTA EN JSON
            
        //NOTA DEBE TENER UNA PROPIEDAD 'title' = "Mejorando.la #node-pro"

    });
  });

});