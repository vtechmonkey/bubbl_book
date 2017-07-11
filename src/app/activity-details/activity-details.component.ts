import { Component, EventEmitter, Input, OnInit, Output, Inject, ViewEncapsulation, ViewChild, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MdButtonToggleModule,MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';


import { Activity } from '../activity';
import { Category } from '../category';
import { Subcategory } from '../subcategory';
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
  title = "Event Details";
  activity: any;
  activities: Activity[];
  categories : Category[];
  subcategories : Subcategory[];
  @Output() close = new EventEmitter();
  error:any;
  navigated = false;
  sub: any;
 // imageURL: string;
  location:Location;
  url: any;
  visible:boolean;//show/hide form 
  showActivityForm: string;//show/hide form 
  userProfile = this.userProfile;//user icon from auth0

  //more details dialog
  dialogRef: MdDialogRef<MoreDetailsComponent>
  config: MdDialogConfig={

   data :
      this.activity
    
  };

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(  private activitiesService:ActivitiesService,
                private route: ActivatedRoute,
                private router: Router,
                private pics: PicsService,
                private auth: AuthService,

                location:Location,  
                public dialog: MdDialog, //more details dialog
                @Inject (DOCUMENT) doc:any
               
                )
              { 
                
                this.location = location;
                this.url = this.location.path();
                this.showActivityForm = 'hideForm';//show/hide form 
                this.visible = true;    //show/hide form 
                this.pics.imageURL = pics.imageURL; 
                this.categories = this.activitiesService.getCategories();
                console.log([this.activity]);
               
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
      
  moreDetails() {
   this.dialogRef = this.dialog.open(MoreDetailsComponent, {
     data: this.activity
   });

  }

  toggle(){//show/hide form 
    this.visible = !this.visible;
    this.showActivityForm = this.visible ? 'hideForm' : 'showForm';
  }

   deleteActivity(activity: Activity, event: any): void{
 // event.stopPropagation();
   this.activitiesService
    .delete(activity)
    .subscribe((res)=>
    this.gotoActivitiesList()
    
    )
  }


  onSelect(category){  
  console.log(category);  
    this.subcategories = this.activitiesService.getSubcategories().filter((item)=>item.category == category);
  }
    
  save(): void {
  if (this.pics.fileEvent) {
      this.activity.imageURL = this.pics.imageURL; 
      } 
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


} // close component 
 


// bit of experimenting with input 
@Component({
  selector: 'app-simple-form',
  template: `<div>
  {{message}}
  <input #myInput type="text">
  <button (click)="onClick($event,myInput.value)">click me</button>
  </div>`
})
export class SimpleFormComponent {
  @Input() message;

onClick(event, value){
  console.log(event);
  console.log(value);
}
constructor() {}

}
