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
	dateOptions:DateTime[];	
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
	time:string;
}

export class DateTime {
	theDate: string;
	theTime: string;
	isChecked:boolean;
	voterIds:VoterId[]
}

export class VoterId {
	voterId:string;
	voterName:string;
}


