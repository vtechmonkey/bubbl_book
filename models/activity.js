var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
	authUserId: String,
	name: String,
	description:String,
	fullDescription:String,
	duration:String,
	activityLocation: String,
	imageURL:String,
	min: Number,
	max: Number,
	providerUrl:String,
	category: String,
	subCategory:String,
	comments:String,
    prices:[],
	dates:[],
	dateOptions:[],
	
	
	

	
});

module.exports = mongoose.model('Activity', ActivitySchema);