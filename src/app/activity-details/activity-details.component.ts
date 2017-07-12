import { Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {AbstractControl, FormGroup, FormArray, FormBuilder,FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { MdButtonToggleModule,MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import { Activity,Price,Date,Time } from '../activity';    
import { CategoryService } from '../category/category.service';    
import { SubCategoryService } from '../subCategory/subCategory.service';    
import { ICategory } from '../category/category';    
import { ISubCategory } from '../subCategory/subCategory';
import { ActivitiesService } from '../activities.service';
import { PicsService } from '../pics.service';
import { AuthService } from '../auth.service';
import { MoreDetailsComponent } from '../more-details/more-details.component';


@Component({
  selector: 'app-activity-details',
  providers: [Location, {provide: LocationStrategy, useClass:  PathLocationStrategy}],
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],


})

export class ActivityDetailsComponent implements OnInit {
  title = "Event Details";

  activities: Activity[];
  error:any;
  navigated = false;
  sub: any;
  location:Location;
  url: any;
  visible:boolean;//show/hide form 
  showActivityForm: string;//show/hide form 


allCategories: ICategory[];    
subCategoryByCategory: ISubCategory[];    
activityForm: FormGroup;    
name: FormControl;    
description: FormControl;    
venue:FormControl;    
imageURL:any;    
min:FormControl;    
max:FormControl;    
category:FormControl;    
subCategory:FormControl;    
publicActivity:FormControl;    
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

 // @ViewChild(TemplateRef) template: TemplateRef<any>;

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
                 console.log(this.activity);  
            
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
              this.activityForm  // using patchValue to populate the form as it doesn't expect exactly matching data
               .patchValue({name:this.activity.name})
              this.activityForm
               .patchValue({venue:this.activity.venue})
              this.activityForm
               .patchValue({description:this.activity.description})
              this.activityForm
               .patchValue({category:this.activity.category})              
              this.activityForm  
               .patchValue({subCategory:this.activity.subCategory})           
              this.activityForm  
               .patchValue({min:this.activity.min})            
              this.activityForm  
               .patchValue({max:this.activity.max})
              this.activityForm  
               .patchValue({publicActivity:this.activity.publicActivity})            
              this.activityForm  
               .patchValue({prices:this.activity.prices})      
              this.activityForm  
               .patchValue({dates:this.activity.dates})
              });
            

        } else {
          this.navigated = false;
          this.activity = new Activity();      
        }
     }) 

      this.categoryService.getCategory()
      .subscribe(
      categoryData => this.allCategories = _.uniqBy(categoryData, 'category')
      );

}

      createForm() {
        

         this.name = new FormControl('')//, [Validators.required]);
         this.description = new FormControl('')//, [Validators.required]);
         this.venue = new FormControl('')//, [Validators.required]);
         //this.imageURL = new FormControl('', [Validators.required]); 
         this.min = new FormControl('')//, [Validators.required]);
         this.max = new FormControl('')//, [Validators.required]);
        // this.category = new FormControl/('', [Validators.required]);
         //this.subCategory = new FormControl('', [Validators.required]);
         this.publicActivity = new FormControl('')//, [Validators.required]);
         this.prices = this.fb.array([this.initPrice()]);
         this.dates = this.fb.array([this.initDate()]);
         
          this.activityForm = this.fb.group({
            name: this.name,
            description: this.description,
            venue:this.venue,        
            min:this.min,
            max:this.max,
            category:this.category,
            subCategory:this.subCategory,
            publicActivity:this.publicActivity,
            prices:this.prices,
            dates:this.dates,
            imageURL: this.pics.imageURL
       
          });
  }

         
  initPrice() {
        return this.fb.group({
            qty: ['', Validators.required],
            perPerson: ['']
        });
    }

    initDate() {
        return this.fb.group({
            date: ['', Validators.required],
            times:this.fb.array([
              this.initTime(),
            ])
        });
    }    

    initTime(){
      return this.fb.group({
        time:['']
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
       _id:activityModel._id as string,
      name: activityModel.name as string,
      description: activityModel.description as string,
      venue: activityModel.venue as string,
      imageURL: this.pics.imageURL as string,
      min: activityModel.min as number,
      max: activityModel.max as number,
      category: activityModel.category as string,
      subCategory: activityModel.subCategory as string,
      publicActivity: activityModel.publicActivity as string,
      prices:priceModelCopy,
      dates:datesModelCopy     
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
 

