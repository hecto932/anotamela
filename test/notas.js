var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var async = require('async');
var _ = require('lodash');

request = request(host);

// Functions 

function createNote(){
   var id;
   var data = {
        "nota": {
            "title": "Mejorando.la #node-pro",
            "description": "Introduccion a clase",
            "type": "js",
            "body": "soy el cuerpo de json"
        }
    };

    return request
        .post('/notas')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(function getNote(res){
            this.id = res.body.nota.id;
        }.bind(this));
}

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

        beforeEach(createNote);

        it('deberia obtener una nota existente', function(done){
            var id;
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
              .then(function getNota(res) {
                id = res.body.nota.id;

                return request.get('/notas/' + id)
                  .set('Accept', 'application/json')
                  .send()
                  .expect(200)
                  .expect('Content-Type', /application\/json/)
              }, done)
              .then(function assertions(res) {
                var nota;
                var body = res.body;
                // Nota existe
                expect(body).to.have.property('notas');
                nota = body.notas;

                // Propiedades
                expect(nota).to.have.property('id', id);
                expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota).to.have.property('description', 'Introduccion a clase');
                expect(nota).to.have.property('type', 'js');
                expect(nota).to.have.property('body', 'soy el cuerpo de json');
                done();
              }, done);
        });

        it('deberia obtener todas las notas existentes', function(done) {
            var id1;
            var id2;

            var data1 = {
                "nota": {
                  "title": "Mejorando.la #node-pro",
                  "description": "Introduccion a clase",
                  "type": "js",
                  "body": "soy el cuerpo de json"
                }
              };

              var data2 = {
                "nota": {
                  "title": "Mejorando.la #node-pro",
                  "description": "Ya casi se acaba esta clase",
                  "type": "ruby",
                  "body": "wohooooooooo"
                }
              };

            request
                .post('/notas')
                .set('Accept', 'application/json')
                .send(data1)
                .expect(201)
                .expect('Content-Type', /application\/json/)
              .then(function createAnotherNota(res) {
                id1 = res.body.nota.id;
                return request
                  .post('/notas')
                  .set('Accept', 'application/json')
                  .send(data2)
                  .expect(201)
                  .expect('Content-Type', /application\/json/)
            })
            .then(function getNotas(res) {
                id2 = res.body.nota.id;
                return request.get('/notas/')
                  .set('Accept', 'application/json')
                  .send()
                  .expect(200)
                  .expect('Content-Type', /application\/json/)
            }, done)
              .then(function assertions(res) {
                var body = res.body;

                expect(body).to.have.property('notas');
                expect(body.notas).to.be.an('array')
                  .and.to.have.length.above(2);

                var notas = body.notas;

                var nota1 = _.find(notas, {id:id1});
                var nota2 = _.find(notas, {id:id2});

                // Propiedades nota1
                expect(nota1).to.have.property('id', id1);
                expect(nota1).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota1).to.have.property('description', 'Introduccion a clase');
                expect(nota1).to.have.property('type', 'js');
                expect(nota1).to.have.property('body', 'soy el cuerpo de json');

                // Propiedades nota1
                expect(nota2).to.have.property('id', id2);
                expect(nota2).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota2).to.have.property('description', 'Ya casi se acaba esta clase');
                expect(nota2).to.have.property('type', 'ruby');
                expect(nota2).to.have.property('body', 'wohooooooooo');

                done();
            }, done);
        });
    });

    describe('PUT', function(){
        it('deberia actualizar una nota existente', function(done){
            var id;
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
                .then(function getNote(res){
                    var update = {
                        "nota": {
                            "title": "Mejorando.la #node-pro",
                            "description": "Introduccion a clase",
                            "type": "ruby",
                            "body": "soy el cuerpo de ruby"
                        }
                    };

                    id = res.body.nota.id;

                    return request.put('/notas/' + id)
                      .set('Accept', 'application/json')
                      .send(update)
                      .expect(200)
                      .expect('Content-Type', /application\/json/)
                },done)
                .then(function assertions(res) {
                    var nota;
                    var body = res.body;

                    // Nota existe
                    expect(body).to.have.property('nota');
                    expect(body.nota).to.be.an('array')
                      .and.to.have.length(1);
                    nota = body.nota[0];

                    // Propiedades
                    expect(nota).to.have.property('id', id);
                    expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                    expect(nota).to.have.property('description', 'Introduccion a clase');
                    expect(nota).to.have.property('type', 'ruby');
                    expect(nota).to.have.property('body', 'soy el cuerpo de ruby');
                    done();
                }, done);
        });
    });

    describe('DELETE', function(){
        it('deberia eliminar una nota existente', function(done){
            // crear una nota
            var id;
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
            .then(function deleteNote(res){
                    id = res.body.nota.id;

                    return request.delete('/notas/' + id)
                      .set('Accept', 'application/json')
                      .expect(204)
                },done)
                .then(function assertNoteDestroyed(res){
                    return request.get('/notas/'+id)
                        .expect(400);// o 400
                }, done)
                .then(function(){
                    done();
                })
            // enviar a eliminar nota existente
            // confirmar que la nota no existe
        });
    });
})