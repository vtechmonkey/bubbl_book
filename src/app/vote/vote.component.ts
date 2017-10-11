 import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Activity,Price,Date,Time,DateTime } from '../activity';   
import { ActivitiesService } from '../activities.service';
import { AuthService } from '../auth.service';
import { VoteService } from '../vote.service';


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
	console.log(this.activity.dateOptions);
}

getActivityDates() {	
	let dateTime ={};	
	this.activity.dateOptions = this.activity.dates.reduce((acc, curr)=>  {
		let result = curr.times.map(time =>
			 dateTime ={
				theDate: curr.date,
				theTime: time.time,
				isChecked:false,
				voterIds:[]
			}
	);
		return acc.concat(result);
	},[]);
	console.log(this.activity.dateOptions );
	return this.activity.dateOptions;
}
 

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
