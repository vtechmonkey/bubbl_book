import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
///https://gist.github.com/linxlad/8db835431cbf2e862c35f17aa1e90aa9
@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

constructor() { }
ngOnInit() {
  }
  
@Input() voteCount = 0;
@Input() myVote = 0;
@Output('vote') change = new EventEmitter();

upVote() {
	if(this.myVote == 1){
		return;
	}
	this.myVote++;
	this.emitEvent();
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


}
