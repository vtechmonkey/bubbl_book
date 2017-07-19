var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
	authUserId: String,
	name: String,
	description:String,
	venue: String,
	imageURL:String,
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