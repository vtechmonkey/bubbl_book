import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';
import { PicsService } from '../pics.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})


export class ActivityCreateComponent implements OnInit {
  title:string = "Create your own Event"

@Output() close = new EventEmitter();
@Input() activityData = {
   _id: '',
   name: '',
   venue: '',
   price: '',
   date: '',
   time: '',
   category: '',
   imageURL:''
 };
 

 userProfile = this.userProfile;

 private activity: Array<Activity> =[];

  constructor(
    private activitiesService:ActivitiesService,
    private router: Router,
    private pics:PicsService,
    private auth:AuthService
    ) { }



  ngOnInit() {
  }


   createActivity() {
   this.activitiesService
   .save(this.activityData)
   .subscribe((res) => {
     this.activity = res;
     this.gotoActivitiesList(this.activityData);
   });
 }

  gotoActivitiesList(activity: Activity = null):void{

        this.close.emit(activity);
        let link = ['/activities'];
        this.router.navigate(link);
        
        
    }

}
