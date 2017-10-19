 import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Activity,Price,Date,Time,DateTime } from '../activity';   
import { ActivitiesService } from '../activities.service';
import { AuthService } from '../auth.service';
import { VoteService } from '../vote.service';
import * as _ from 'lodash';


///https://gist.github.com/linxlad/8db835431cbf2e862c35f17aa1e90aa9
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

//userId:any;
//dateOptions:any;
//voterIds:any;
//checked:any;
//v:any;
dateArray:any;
@Input() activity: Activity; 
//@Input() myVote = 0;
@Input() userProfile; 
//@Output('vote') change = new EventEmitter();

constructor(
	private activitiesService:ActivitiesService, 
    private auth: AuthService,
	) { 
	this.userProfile = auth.userProfile;

	
}

ngOnInit() {
	console.log('this activity '+JSON.stringify(this.activity.dateOptions,null,'\t'));
	this.getActivityDates();
	//console.log(this.activity.dates);
	console.log('dateArray is '+JSON.stringify(this.dateArray, null, '\t'));
	this.createNewDateOptions(); 
	


}

getActivityDates() { //uses reduce and map function to go through the 
	//date array and create a new object with the date repeated for each time 
	//adds an empty array to the object for voterids and isChecked for the checkbox
	let dateTime ={}; // new dateTime object 
	this.dateArray = this.activity.dates.reduce((acc, curr)=>  {
		let result = curr.times.map(time =>
			 dateTime ={
			 	voterIds:[],
			 	isChecked:false,
			 	theTime: time.time,
			 	theDate: curr.date
			}
	);
		return acc.concat(result);
	},[]);
	console.log(this.dateArray );
	return this.dateArray;
}

createNewDateOptions() { //joins any previously saved dateOptions to the new date options
	this.activity.dateOptions = this.dateArray.reduce(function(acc, item){
		acc.push(item);
		return acc;
	}, this.activity.dateOptions);

	// let piggy = _.uniqBy(this.activity.dateOptions, 'theDate', 'theTime');
	
	let removeDups = (entry, index, arr)=>
		arr.findIndex(item =>
			item.theDate === entry.theDate
			&& item.theTime === entry.theTime
			&& item.voterIds.length === 0)
		!== index;
	this.activity.dateOptions = this.activity.dateOptions.filter(removeDups);
//	console.log('piggy is' +JSON.stringify(piggy, null, '\t'));
console.log('findIndex and filter ' +JSON.stringify(this.activity.dateOptions, null, '\t'));

}//createNewDateOptions()

saveVote() {

	let voterId =this.userProfile.user_id;
	let voterName = this.userProfile.name;
	
	this.activity.dateOptions.forEach(x =>{
		if(x.isChecked){
			x.voterIds.push(voterId);
			x.voterIds.push(voterName);
		}
		console.log('forEach' +this.activity.dateOptions);
	})
	console.log(this.activity.dateOptions);
	  this.activitiesService.save(this.activity).subscribe(/* error handling */);  
}//saveVote 

}
