import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';
import { PicsService } from '../pics.service';


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {


  @Input() activity: any;
  @Output() close = new EventEmitter();
  error:any;
  navigated = false;
  sub: any;


  constructor(private activitiesService:ActivitiesService,
                private route: ActivatedRoute,
                private router: Router,
                private pics: PicsService              
               
                ) { }
  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
       if(params['_id'] !== undefined){
          let _id = params['_id'];
          this.navigated = true;
          console.log('getting activity with id: ', _id);
          this.activitiesService
            .getActivityById(_id)
            .subscribe(p =>this.activity =p);
        } else {
          this.navigated = false;
          this.activity = new Activity();
        }
     });
  }

          save(): void{
            this.activitiesService
            .save(this.activity)
            .subscribe( (res)=>{
              this.activity = res;
              this.gotoActivitiesList(this.activity);
            });

          }

  

      gotoActivitiesList(activity: Activity = null):void{

        this.close.emit(activity);
        if(this.navigated){window.history.back();}
        
    }

      

}

