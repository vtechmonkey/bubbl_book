import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';
import { DummyCategory } from './dummy-category.interface';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  title:string = "Suggested for you"

  activities: Activity[];
  private categories = Categories;


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


//this is a dummy list for subcategory until the merge with the new backend 
var Categories : DummyCategory[] = [
  {"categoryName":"sport", "name":"5-aside","url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/5-aside.jpg"},
  {"categoryName":"sport","name": "golf", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/golf.jpg" },
  {"categoryName":"sport","name": "tennis", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/tennis3.jpg" },
  { "categoryName": "food", "name": "italian", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/pasta.jpg" },
  { "categoryName": "food", "name": "fusion", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/food.jpg" },
  { "categoryName": "food", "name": "sushi", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/sushi.jpg" },
  { "categoryName": "entertainment", "name": "theatre", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/theatre.jpg" },
  { "categoryName": "entertainment", "name": "movies", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/projector.jpg" },
  { "categoryName": "entertainment", "name": "music", "url": "https://s3-eu-west-1.amazonaws.com/bubblbookimages/music.jpg" }

];
