import { Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {AbstractControl, FormGroup, FormArray, FormBuilder,FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MdButtonToggleModule,MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import * as _ from 'lodash';

import { Activity,Price,Date,Time, Vote } from '../activity';    
import { CategoryService } from '../category/category.service';    
import { SubCategoryService } from '../subCategory/subCategory.service';    
import { ICategory } from '../category/category';    
import { ISubCategory } from '../subCategory/subCategory';
import { ActivitiesService } from '../activities.service';
import { PicsService } from '../pics.service';
import { AuthService } from '../auth.service';
import { MoreDetailsComponent } from '../more-details/more-details.component';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-activity-details',
  providers: [Location, {provide: LocationStrategy, useClass:  PathLocationStrategy}],
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
  
})

export class ActivityDetailsComponent implements OnInit {


  title = "Event Details";

  activities: Activity[];
  votes: Vote[];
  error:any;
  navigated = false;
  sub: any;
  location:Location;
  url: any;
  visible:boolean;//show/hide form 
  showActivityForm: string;//show/hide form 
  categoryName: any;
  getSub:any;

allCategories: ICategory[];    
subCategoryByCategory: ISubCategory[];    
activityForm: FormGroup;    
name: FormControl;    
description: FormControl;
fullDescription: FormControl;    
activityLocation:FormControl;
duration:FormControl
providerUrl:FormControl;    
imageURL:any;    
min:FormControl;    
max:FormControl;    
category:FormControl;    
subCategory:FormControl;    
comments:FormControl;    
prices:FormArray;    
dates:FormArray;    

@Input() 
activity: Activity;    
@Output() close = new EventEmitter();    

userProfile = this.userProfile;//user icon from auth0

  //more details dialog
  dialogRef: MdDialogRef<MoreDetailsComponent>
  config: MdDialogConfig={

   data :
      this.activity
    
  };


  constructor(  private activitiesService:ActivitiesService,
                private route: ActivatedRoute,
                private categoryService: CategoryService,    
                private subCategoryService: SubCategoryService,
                private router: Router,
                private pics: PicsService,
                private auth: AuthService,             

                location:Location,  
                public dialog: MdDialog, //more details dialog
                @Inject (DOCUMENT) doc:any,
                private fb: FormBuilder
               
                )
              { 
                this.createForm();
                this.location = location;
                this.url = this.location.path();
                this.showActivityForm = 'hideForm';//show/hide form 
                this.visible = true;    //show/hide form 
                this.pics.imageURL = pics.imageURL;   
                this.auth.userProfile = auth.userProfile;
                //this.auth.userProfile.user_id
                //this.userProfile = JSON.parse(localStorage.getItem('profile'));
                console.log(this.auth.userProfile.user_id + 'details comp');
               
   }


    ngOnInit() {

     this.sub = this.route.params.subscribe(params => {
       if(params['_id'] !== undefined){
          let _id = params['_id'];
          this.navigated = true;
          console.log('getting activity with id: ', _id);

          //.subscribe(p =>this.activity =p);  

          this.activitiesService
            .getActivityById(_id)
            .subscribe((response) =>{
              this.activity = response; 
            // using patchValue to populate the form as it doesn't expect exactly matching data
                    
              this.activityForm  
               .patchValue({name:this.activity.name})
              this.activityForm
               .patchValue({activityLocation:this.activity.activityLocation})
              this.activityForm
               .patchValue({description:this.activity.description})
               this.activityForm
               .patchValue({fullDescription:this.activity.fullDescription})
               this.activityForm
               .patchValue({duration:this.activity.duration})
               this.activityForm
               .patchValue({providerUrl:this.activity.providerUrl})
              this.activityForm
               .patchValue({category:this.activity.category})              
              this.activityForm  
               .patchValue({subCategory:this.activity.subCategory})           
              this.activityForm  
               .patchValue({min:this.activity.min})            
              this.activityForm  
               .patchValue({max:this.activity.max})
              this.activityForm  
               .patchValue({comments:this.activity.comments})            
              this.activityForm  
               .patchValue({prices:this.activity.prices})      
              this.activityForm  
               .patchValue({dates:this.activity.dates})
               this.activityForm  
               .patchValue({imageURL:this.activity.imageURL})     


              if(this.activity.category){
                console.log(this.activity.category);
                const cat = this.activity.category;
                this.subCategoryService.getSubCategory(cat)
                .subscribe(
                subCategoryData => this.subCategoryByCategory = _.filter(subCategoryData, function(o) { return o.category == cat},'subCategory')
                );
              }

              if(!this.pics.imageURL ){
                console.log('meh!');
                console.log(this.activity.imageURL);
                const img = this.activity.imageURL;
                this.pics.imageURL = img;
                console.log(this.pics.imageURL);
              }


            });  
       }         
         else {
          this.navigated = false;
          this.activity = new Activity();      
        }
     })     
}

ngAfterViewInit(){

    this.categoryService.getCategory()
      .subscribe(
      categoryData => this.allCategories = _.uniqBy(categoryData, 'category')
    
     );


}     
  
      createForm() {
        
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('')//, [Validators.required]);
    this.fullDescription = new FormControl('')//, [Validators.required]);
    this.activityLocation = new FormControl('')//, [Validators.required]);
    this.duration = new FormControl('')//, [Validators.required]); 
    this.providerUrl = new FormControl('')//, [Validators.required]);      
    this.min = new FormControl('')//, [Validators.required]);
    this.max = new FormControl('')//, [Validators.required]);
    this.category = new FormControl('')//, [Validators.required]);
    this.subCategory = new FormControl('')//, [Validators.required]);
    this.comments = new FormControl('')//, [Validators.required]);
    this.prices = this.fb.array([this.initPrice()]);
    this.dates = this.fb.array([this.initDate()]);
         
      this.activityForm = this.fb.group({
      name: this.name,
      description: this.description,
      fullDescription: this.fullDescription,
      activityLocation: this.activityLocation,
      duration: this.duration,
      providerUrl: this.providerUrl,
      min: this.min,
      max: this.max,
      category: this.category,
      subCategory: this.subCategory,
      comments: this.comments,
      prices: this.prices,
      dates: this.dates,
      imageURL: this.pics.imageURL
    });
  }

         
  initPrice() {
        return this.fb.group({
            qty: ['', Validators.required],
            perPerson: ['', Validators.required]
        });
    }

    initDate() {
        return this.fb.group({
            date: [null, Validators.required],
            times:this.fb.array([
              this.initTime(),
            ])
        });
    }    

    initTime(){
      return this.fb.group({
        time:['', Validators.required]
      })
    }
  

    onSelect(categoryName) {

    console.log ('User selected ' + categoryName);
    this.subCategoryService.getSubCategory(categoryName)
      .subscribe(
      subCategoryData => this.subCategoryByCategory = _.filter(subCategoryData, function(o) { return o.category == categoryName},'subCategory')
      );
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

 onSubmit() {   
 
    this.activity = this.prepareSaveActivity();
    this.activitiesService.save(this.activity).subscribe(/* error handling */);   
  }

  prepareSaveActivity():Activity{
    const activityModel = this.activityForm.value;

     const priceModelCopy: Price[] = activityModel.prices.map(
      (price: Price) => Object.assign({}, price)
    );

     const datesModelCopy: Date[] = activityModel.dates.map(
      (date: Date) => Object.assign({}, date)
    );

    
    const saveActivity: Activity = {
     authUserId: this.auth.userProfile.user_id as string,
      _id: activityModel._id as string,
      name: activityModel.name as string,
      description: activityModel.description as string,
      fullDescription: activityModel.fullDescription as string,
      activityLocation: activityModel.activityLocation as string,
      duration: activityModel.duration as string,
      providerUrl: activityModel.providerUrl as string,
      imageURL: this.pics.imageURL as string,
      min: activityModel.min as number,
      max: activityModel.max as number,
      category: activityModel.category as string,
      subCategory: activityModel.subCategory as string,
      comments: activityModel.comments as string,
      prices: priceModelCopy,
      dates: datesModelCopy,
      votes:[],
      voteCount:this.activity.voteCount as number  
    };
    return saveActivity;
  }

  addPrice() {
    const control = <FormArray>this.activityForm.controls['prices'];
        control.push(this.initPrice());
  }

  addDate(){
        this.dates.push(this.initDate());
  }

  addTime(i?:number,t?:number){
    const control: FormArray = <FormArray> this.dates.at(i).get('times');
        control.push(this.initTime());
  }
   
  gotoActivitiesList(activity: Activity = null):void{

    this.close.emit(activity);
    if(this.navigated){window.history.back();}    
  }   

} // close component 
 

