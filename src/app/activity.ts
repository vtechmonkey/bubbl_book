export class Activity {

	authUserId: string;
	_id:string;
	name: string;
	description:string;
	fullDescription:string;
	duration:string;
	activityLocation:string;
	imageURL:string;
	min:number;
	max:number;
	providerUrl:string;
	category:string;
	subCategory:string;
	comments:string;
    prices:Price[];
	dates:Date[];
	votes:Vote[];
	voteCount:number
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
