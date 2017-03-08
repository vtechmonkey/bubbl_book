import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

	activities: Activity[];
  

  constructor(
    
    private activitiesService:ActivitiesService,
    private router: Router) { }

getActivities(): void{
this.activitiesService
    .getAllActivities()
    .subscribe((res)=> {
      this.activities = res;
});
}

deleteActivity(activity: Activity, event: any): void{
event.stopPropagation();
 this.activitiesService
  .delete(activity)
  .subscribe((res)=>
  this.activities = this.activities.filter(a => a != activity)
  )
}

ngOnInit(): void {
   this.getActivities();
  };

gotoDetail(activity:Activity): void {
    let link = ['/activities',activity._id];
    this.router.navigate(link);
  }
}
