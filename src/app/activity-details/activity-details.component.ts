import { Component, OnInit, OnDestroy, EventEmitter,Input,Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit,OnDestroy {


  activity: any;
  sub: any;


 private activities: Array<Activity> = [];

  constructor(private activitiesService:ActivitiesService,
                private route: ActivatedRoute,
                private router: Router ) { }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
          let _id = params['_id'];
          console.log('getting activity with id: ', _id);
          this.activitiesService
            .getActivityById(_id)
            .subscribe(p =>this.activity =p);
        });
  }
   ngOnDestroy(){
        this.sub.unsubscribe();
    }

      gotoActivitiesList(){
         let link = ['/activities'];
        this.router.navigate(link);
    }

   updateActivityDetails(){
     this.activitiesService
      .updateActivity(this.activity)
      .subscribe((res) => {
        this.activities = res;
      });


    
   }
}

