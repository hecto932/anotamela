var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('recurso /notas', function(){
	describe('POST', function(){
    it("deberia de crear una nota nueva", function(done){
        var data = {
            "nota": {
                "title": "Mejorando.la #node-pro",
                "description": "Introduccion a clase",
                "type": "js",
                "body": "soy el cuerpo de json"
            }
        };

        // crear solicitud de http enviando data
        request
            .post('/notas')
            .set('Accept', 'application/json')
            .send(data)
            .expect(201)
            .expect('Content-Type', /application\/json/)
            .end(function(err, res) {
                var nota;

                var body = res.body;
                console.log('body', body);

                // Nota existe
                expect(body).to.have.property('nota');
                nota = body.nota;

                // Propiedades
                // nota debe tener una propiedad 'title' = "Mejorando.la #node-pro"
                expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota).to.have.property('description', 'Introduccion a clase');
                // cuerpo de la solicitud debe tener una nota en JS
                expect(nota).to.have.property('type', 'js');
                expect(nota).to.have.property('body', 'soy el cuerpo de json');
                expect(nota).to.have.property('id');
                done(err);
            });
		});
	});

    describe('GET', function(){
        it('deberia obtener una nota existente', function(done){
            var data = {
            "nota": {
                "title": "Mejorando.la #node-pro",
                "description": "Introduccion a clase",
                "type": "js",
                "body": "soy el cuerpo de json"
            }
        };

        // crear solicitud de http enviando data
        request
            .post('/notas')
            .send(data)
            .set('Accept', 'application/json')
            .expect(201)
            .end(function(err,res){
                var id = res.body.nota.id;

                request
                    .get('/notas'+id)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .end(function(err, res){
                        var nota = res.body.notas;

                        expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                        expect(nota).to.have.property('description', 'Introduccion a clase');
                        expect(nota).to.have.property('type', 'js');
                        expect(nota).to.have.property('body', 'soy el cuerpo de json');
                        expect(nota).to.have.property('id');

                        done();
                    });
            })
            //POST data
            //GET
            //expect
        });
    });
})