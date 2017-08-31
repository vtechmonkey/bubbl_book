export class Activity {

	authUserId:string;
     _id:string;
	name: string;
	description:string;
	venue: string;
	imageURL: string;
	min: number;
	max: number;
	category: string;
	subCategory: string;
	publicActivity:string;
	prices:Price[];
	dates:Date[];
	votes:Vote[];
	voteCount: number;
	//responses:Response[];
}

export class Price{
	qty: number;
	perPerson: string;
}

export class Date{
	date: string;
	times: Time[];
}

export class Time{
	time:string
}

export class Vote {
	userId: string;
	dateTimes: dateTime[];
}

export class dateTime {
	dateTime:string;
}
// export class Response{
// 	userId: string;
// 	dateTimes:dateTime[];
// }

// export class dateTime{
// 	date:string;
// 	time:string;
// }
