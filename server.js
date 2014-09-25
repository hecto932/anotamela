//Dependencies
var express = require('express');
var bodyParser = require('body-parser');

//Local Variables
var server = express();


//Middleware
server.use(bodyParser.json('application/json'));

//Routes
var notas = require('./lib/notas');

server.use(notas);
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
