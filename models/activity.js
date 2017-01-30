var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
	name: String,
	venue: String,
	price: String,
	date: String,
	time: String,
	category: String,
	isPrivate: false
	
});

module.exports = mongoose.model('Activity', ActivitySchema);