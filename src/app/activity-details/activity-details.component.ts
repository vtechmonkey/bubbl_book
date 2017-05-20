import { Component, EventEmitter, Input, OnInit, Output, Inject, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MdButtonToggleModule,MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';
import { PicsService } from '../pics.service';
import { AuthService } from '../auth.service';
import { MoreDetailsComponent } from '../more-details/more-details.component';

@Component({
  selector: 'app-activity-details',
  providers: [Location, {provide: LocationStrategy, useClass:  PathLocationStrategy}],
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
  encapsulation: ViewEncapsulation.None,

})



export class ActivityDetailsComponent implements OnInit {


  activity: any;
  @Output() close = new EventEmitter();
  error:any;
  navigated = false;
  sub: any;
  imageURL: string;
  location:Location;
  url: any;
  visible:boolean;//show/hide form 
  showActivityForm: string;//show/hide form 
  userProfile = this.userProfile;//user icon
  max = 100;
  min = 0;
  //details dialog
  dialogRef: MdDialogRef<MoreDetailsComponent>
  config: MdDialogConfig={

   data :
      this.activity
    
  };

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(private activitiesService:ActivitiesService,
                private route: ActivatedRoute,
                private router: Router,
                private pics: PicsService,
                private auth: AuthService,
                location:Location,  
                public dialog: MdDialog, //more details dialog
                @Inject (DOCUMENT) doc:any
               
                ) { 

                this.location = location;
                this.url = this.location.path();
                this.showActivityForm = 'hideForm';//show/hide form 
                this.visible = true;    //show/hide form 

                 } //close constructor 

   moreDetails() {
     this.dialogRef = this.dialog.open(MoreDetailsComponent, {
       data: this.activity
     });

   }

   toggle(){//show/hide form 
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

