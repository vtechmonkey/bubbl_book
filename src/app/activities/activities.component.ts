import { Component, OnInit } from '@angular/core';


import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

	activities: Activity[];
  errorMessage:string = '';


  constructor(
    
    private activitiesService:ActivitiesService) { }


  ngOnInit() {
    this.activitiesService
    .getAllActivities()
    .subscribe((res)=> {
      this.activities = res;

    });

}
}