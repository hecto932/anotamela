var app = require('express')();

//DATABASE
var db = {};

//Routes
app.post('/notas', function(req, res){

	console.log('POST', req.body);
	var notaNueva = req.body.nota;
	notaNueva.id = Date.now();

	db[notaNueva.id] = notaNueva;

	res
		.status(201)
		.json({
			nota:notaNueva
		});
});

app.get('/notas/:id?', function(req, res){
	console.log('GET /notas/%s', req.params.id);

	var id = req.params.id;
	var nota = db[id];

	res.json({
		notas : nota
	});

});

module.exports = app;