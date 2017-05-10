import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MdButtonToggleModule } from '@angular/material';


import { Activity } from '../activity';
import{ActivitiesService} from '../activities.service';
import { PicsService } from '../pics.service';


@Component({
  selector: 'app-activity-details',
  providers: [Location, {provide: LocationStrategy, useClass:  PathLocationStrategy}],
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],

})



export class ActivityDetailsComponent implements OnInit {


  @Input() activity: any;
  @Output() close = new EventEmitter();
  error:any;
  navigated = false;
  sub: any;
  imageURL: string;
  location:Location;
  url: any;
  visible:boolean;
  showActivityForm: string;

  constructor(private activitiesService:ActivitiesService,
                private route: ActivatedRoute,
                private router: Router,
                private pics: PicsService,
                location:Location             
               
                ) { 

                this.location = location;
                this.url = this.location.path();
                this.showActivityForm = 'hideForm';//show/hide form 
                this.visible = true;    //show/hide form 

                 }
//show/hide form 
   toggle(){
     this.visible = !this.visible;
     this.showActivityForm = this.visible ? 'hideForm' : 'showForm';
   }

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

    getURL() {
      if (this.pics.fileEvent()) {
        this.imageURL = this.pics.imageURL;  
      }
    }
}

