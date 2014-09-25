//Dependencies
var express = require('express');
var bodyParser = require('body-parser');

//Local Variables
var server = express();

//Middleware
server.use(bodyParser.json('application/json'));

//Routes
server.post('/notas', function(req, res){

	console.log('POST', req.body);
	var notaNueva = req.body.nota;
	notaNueva.id = 123;
	res
		.status(201)
		.json({
			nota:notaNueva
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
