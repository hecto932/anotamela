var express = require('express');

var server =  express();

server.post('/notas', function(req, res){
	res
		.status(201)
		.send({});
});

//MODULE ES UNA VARIABLE QUE NOS PERMITE ACCEDER AL ENTORNO DE NODE
if(!module.parent)
{
	server.listen(3000, function(){
		console.log("Hola estoy en el puerto 3000, http://localhost:3000/");
	});
}
else
{
	module.exports = server;
}
