var app = require('express')();
var _ = require('lodash');
var Nota = require('./model');

//DATABASE
var db = {};

app.get('/notas', function(req, res) {
	Nota.find({}, function(err, notas){
		res
			.status(200)
			.set('Content-Type', 'application/json')
			.json({
				notas: notas
			});
	});
});

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
		Nota.create(notaNueva, function(err,nota){
			res
			.status(201)
			.json({
				nota:nota
			});
		});
	})
	//GET
	.get(function(req, res, next){
		 var id = req.params.id;

	    if (!id) {
	      return next();
	    }

	    var nota = db[id];

	    if (!nota) {
	      return res
	        .status(400)
	        .send({});
	    }

	    res.json({
	      notas: nota
	    })
	})
	//PUT
	.put(function(req, res, next) {
    	var id = req.params.id;

   	 	if (!id) {
      		return next();
    	}

    	var notaActualizada = req.body.nota;
    	notaActualizada.id = parseInt(id, 10);

    	db[id] = notaActualizada;

    	// response
    	res
      		.json({
        		nota: [db[id]]
      		});

  	})
  	.delete(function(req, res){
  		var id = req.params.id;

  		if(!id){
  			return next();
  		}

  		Nota.remove({_id:id}, function(err){
	  		res
	  			.status(204)
	  			.send();
  		});

  	});


module.exports = app;