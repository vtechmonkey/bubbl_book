var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
	
	name: String,
	description:String,
	venue: String,
	image:String,
	min: Number,
	max: Number,
	category: String,
	subCategory:String,
	publicActivity:String,
    prices:[],
	dates:[]

	// dates:[{*/}
	// 	dates:String,
	// 	times:
	// 		[{
	// 		times:String
	// 		}]
	// }]
	
	
});

module.exports = mongoose.model('Activity', ActivitySchema);