var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/anotamela');

console.log('this is the model');

var NotasSchema = new Schema({
	title: 'string',
	type: 'string',
	description: 'string',
	body: 'string'
});
/*
NotaSchema.virtual('id').get(function(){
	return this._id.toHexString();
});
*/
module.exports = mongoose.model('nota',NotasSchema);