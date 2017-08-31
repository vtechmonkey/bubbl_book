import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Activity,Price,Date,Time,Vote,dateTime } from '../activity';   
import { ActivitiesService } from '../activities.service';
import { AuthService } from '../auth.service';

///https://gist.github.com/linxlad/8db835431cbf2e862c35f17aa1e90aa9
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

//public vote: Vote;

//activities: Activity[];
//votes: Vote[];
//Vote:{userId:''};
//Vote:{userId:string}[] = [];

userId:any;
v:any;
@Input() activity: Activity; 
@Input() 
@Input() myVote = 0;
@Input() userProfile; 
@Output('vote') change = new EventEmitter();

  

constructor(
	private activitiesService:ActivitiesService,
    private auth: AuthService,   

	) { 
	//this.vote = Vote;
	this.userId = this.auth.userProfile.user_id;
	console.log(this.auth.userProfile.user_id);
	//console.log(this.userId);

	}
		

ngOnInit() {
	if (this.activity.voteCount == undefined) {
		this.activity.voteCount = 0;
	 }
	//this.activity.votes = [];
	console.log(this.activity.dates)
	;
}

upVote() {
	if(this.myVote == 1){
		return;
	}
	this.activity.voteCount++;
	// this.v = {userId: this.userId};
	// console.log(this.v);	
	this.activity.votes.push(this.userId);
	console.log(this.activity.votes);
	this.activitiesService.save(this.activity).subscribe(/* error handling */);   
	this.emitEvent();
	console.log(this.activity);
}

downVote() {
	if(this.myVote == -1){
		return;
	}
	this.myVote--;
	this.emitEvent();
}

emitEvent() {
	this.change.emit({myVote: this.myVote})
}

saveVote() {
	this.activitiesService.save(this.activity).subscribe(/* error handling */);   
}

}
