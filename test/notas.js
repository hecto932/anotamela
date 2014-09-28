var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var async = require('async');

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

        var id;

        //USANDO ASYNC
        async.waterfall([
            function createNote(cb)
            {
                 request
                    .post('/notas')
                    .send(data)
                    .set('Accept', 'application/json')
                    .expect(201)
                    .end(cb)
            },
            function getNote(res, cb){
                id = res.body.nota.id;
                request
                    .get('/notas/'+id)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
                    .end(cb)
            },
            function assertions(res, cb){
                var nota = res.body.notas;

                expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota).to.have.property('description', 'Introduccion a clase');
                expect(nota).to.have.property('type', 'js');
                expect(nota).to.have.property('body', 'soy el cuerpo de json');
                expect(nota).to.have.property('id', id);
                cb();
            }
        ],done);
        /*
       //USANDO PROMISES
        
        request
            .post('/notas')
            .send(data)
            .set('Accept', 'application/json')
            .expect(201)
            .then(function(res){
                id = res.body.nota.id;

                return request
                    .get('/notas/'+id)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
            },done)
            .then(function(res){
                var nota = res.body.notas;

                expect(nota).to.have.property('title', 'Mejorando.la #node-pro');
                expect(nota).to.have.property('description', 'Introduccion a clase');
                expect(nota).to.have.property('type', 'js');
                expect(nota).to.have.property('body', 'soy el cuerpo de json');
                expect(nota).to.have.property('id', id);

                done();
            }, done);
            //POST data
            //GET
            //expect
            */
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
})