
import { Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AbstractControl, FormGroup, FormArray, FormBuilder,FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { MdButtonToggleModule,MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import "rxjs/add/operator/filter";
import * as _ from 'lodash';

import { Activity,Price,Date,Time } from '../activity';
// import { Category } from '../category';
// import { Subcategory } from '../subcategory';
import { ActivitiesService } from '../activities.service';


import { PicsService } from '../pics.service';
import { AuthService } from '../auth.service';
import { MoreDetailsComponent } from '../more-details/more-details.component';

import { CategoryService } from '../category/category.service';
import { SubCategoryService } from '../subCategory/subCategory.service';
import { ICategory } from '../category/category';
import { ISubCategory } from '../subCategory/subCategory';

@Component({
  selector: 'app-activity-create',  
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})


export class ActivityCreateComponent implements OnInit {

  title:string = "Create your own Event";
  location:Location;
  url: any;
 
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

@Input() activity: Activity;
@Output() close = new EventEmitter();

userProfile:any;
formCookie:any;

  dialogRef: MdDialogRef<MoreDetailsComponent>
   config: MdDialogConfig={

   data :
      this.activityForm 
  };


  constructor(
    private activitiesService:ActivitiesService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private pics:PicsService,
    private auth:AuthService,    
    location:Location,  
    public dialog: MdDialog, //more details dialog    
    @Inject (DOCUMENT) doc:any,
    private fb: FormBuilder
    ) {  //constructor function
    
      this.createForm();
      this.location = location;
      this.url = this.location.path();         
      this.pics.imageURL = pics.imageURL; // default string or image url of image uploaded with pics service
    
} //constructor function 
 
  ngOnInit() {
    this.categoryService.getCategory()
      .subscribe(
      categoryData => this.allCategories = _.uniqBy(categoryData, 'category')
      );

         console.log(this.auth.userProfile);
        //  console.log(this.auth.userProfile.email);
        if (this.auth.userProfile.email){
        console.log(this.auth.userProfile.user_id);
      }

      if(this.pics.imageURL == undefined){
        this.pics.imageURL == this.activity.imageURL;
        console.log(this.pics.imageURL);
      }
     }

      createForm(){

         this.name = new FormControl('', [Validators.required]);
         this.description = new FormControl('', [Validators.required]);
         this.venue = new FormControl('', [Validators.required]);       
         this.min = new FormControl('', [Validators.required]);
         this.max = new FormControl('', [Validators.required]);
         this.category = new FormControl('', [Validators.required]);
         this.subCategory = new FormControl('', [Validators.required]);
         this.publicActivity = new FormControl('', [Validators.required]);
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
            qty: '',//['', Validators.required],
            perPerson: ''
        });
    }

    initDate() {
        return this.fb.group({
            date: '',//['', Validators.required],
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

  previewEvent() {
   this.dialogRef = this.dialog.open(MoreDetailsComponent, {
     data: this.activityForm.value
   });

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
      authUserId:this.auth.userProfile.user_id as string,
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
        let link = ['/activities'];
        this.router.navigate(link);    
                    
  }
 
}
