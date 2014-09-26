var app = require('express')();

//DATABASE
var db = {};

app.route('/notas/:id?')
	//LOGIN
	.all(function(req, res, next) {
		console.log(req.method, req.path, req.body);
		res.set('Content-Type','application/json');
		next();
	})
	//POST
	.post(function(req, res){
		var notaNueva = req.body.nota;
		notaNueva.id = Date.now();
		db[notaNueva.id] = notaNueva;
		res
			.status(201)
			.json({
				nota:notaNueva
			});
	})
	//GET
	.get(function(req, res){
		var id = req.params.id;
		var nota = db[id];
		res.json({
			notas : nota
		});
	});

module.exports = app;