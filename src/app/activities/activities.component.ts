import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';
import { Category } from './category.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

	activities: Activity[];
  public categories = Categories;


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

var Categories : Category[] = [
  {"name":"cycling","url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/cycling.jpg"},
  {"name": "golf", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/golf.jpg" },
  {"name": "tennis", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/tennis3.jpg" }
 
];
