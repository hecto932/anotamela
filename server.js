//Dependencies
var express = require('express');
var bodyParser = require('body-parser');

//Local Variables
var server = express();
var db = {};

//Middleware
server.use(bodyParser.json('application/json'));

//Routes
server.post('/notas', function(req, res){

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

server.get('/notas/:id?', function(req, res){
	console.log('GET /notas/%s', req.params.id);

	var id = req.params.id;
	var nota = db[id];

	res.json({
		notas : nota
	});

});

//Expose or start server
if(!module.parent)
{
	server.listen(3000, function(){
		console.log("http://localhost:3000/");
	});
}
else
{
	module.exports = server;
}
