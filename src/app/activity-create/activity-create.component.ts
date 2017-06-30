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
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})


export class ActivityCreateComponent implements OnInit {
  title:string = "Create your own Event";
  categories : Category[];
  subcategories : Subcategory[];
  location:Location;
  url: any;
  @Output() close = new EventEmitter();
  @Input()
   activityData = {
     _id: '',
     name: '',
     venue: '',
     price: '',
     date: '',
     time: '',
     category: '',
     subcategory:'',
     imageURL:''
   };
   dialogRef: MdDialogRef<MoreDetailsComponent>
   config: MdDialogConfig={

   data :
      this.activityData    
  };

 userProfile = this.userProfile;

 activity: Array<Activity> =[];

  constructor(
    private activitiesService:ActivitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private pics:PicsService,
    private auth:AuthService,    
    location:Location,  
    public dialog: MdDialog, //more details dialog
    @Inject (DOCUMENT) doc:any
    ) {

          this.location = location;
          this.url = this.location.path();         
          this.pics.imageURL = pics.imageURL; // default string or image url of image uploaded with pics service
          this.categories = this.activitiesService.getCategories();
          //this.subcategories = this.activitiesService.getSubcategories().filter((item)=>item.category == this.activityData.category);

     }

  ngOnInit() {
  }

  previewEvent() {
   this.dialogRef = this.dialog.open(MoreDetailsComponent, {
     data: this.activityData
   });
  }

  onSelect(category){  
  console.log(category);  
  this.subcategories = this.activitiesService.getSubcategories().filter((item)=>item.category == category);
  }    

  createActivity() {
     if(this.pics.fileEvent){
       this.activityData.imageURL = this.pics.imageURL;
   }

   this.activitiesService
   .save(this.activityData)
   .subscribe((res) => {
     this.activity = res;
     this.gotoActivitiesList(this.activityData);
   });
  }

  gotoActivitiesList(activity: Activity = null):void{

        this.close.emit(activity);
        let link = ['/activities'];
        this.router.navigate(link);               
    }
}
