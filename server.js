//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
//Local Variables
var server = express();

//MIDDLEWARE
server.use(bodyParser.json('application/json'));

server.use(bodyParser.urlencoded({
  extended: true
}));

//Routes
server.post('/notas', function(req, res){

	console.log('POST', req);
	
	res
		.status(201)
		.json(req.body);
});

server.post('/usuario', function(req, res){
	console.log("POST", req.body);
	res
		.status(201)
		.json({"Usuario":"exitoso"});
});

//Expose or start server
if(!module.parent)
{
	server.listen(3000, function(){
		console.log("Hola estoy escuchando en el puerto 3000 en http://localhost:3000/");
	});
}
else
{
	module.exports = server;
}