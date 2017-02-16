import { Component, OnInit } from '@angular/core';
import{ActivitiesService} from '../activities.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

activities: any = [];
  constructor(
  	private activitiesService:ActivitiesService
  	) { } 

  ngOnInit(){
  	this.activitiesService.getAllActivities().subscribe(activities => {
  		this.activities = activities; 
  	});
  }
  

}
