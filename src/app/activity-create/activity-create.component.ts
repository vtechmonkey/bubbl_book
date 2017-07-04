
import { Component, EventEmitter, Input, OnInit, Output, Inject, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AbstractControl, FormGroup, FormArray, FormBuilder,FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { MdButtonToggleModule,MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';

import { Activity,Price,Date,Time } from '../activity';
import { Category } from '../category';
import { Subcategory } from '../subcategory';
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
  categories : Category[];
  subcategories : Subcategory[];
  location:Location;
  url: any;
 // @Output() close = new EventEmitter();
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


allCategories: ICategory[];
subCategoryByCategory: ISubCategory[];


activityForm: FormGroup;
name: FormControl;
description: FormControl;
venue:FormControl;
image:FormControl;
min:FormControl;
max:FormControl;
category:FormControl;
subCategory:FormControl;
publicActivity:FormControl;
prices:FormArray;
dates:FormArray;


@Input() activity: Activity;


@Output() close = new EventEmitter();

userProfile = this.userProfile;

 //activity: Array<Activity> =[];


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
      this.categories = this.activitiesService.getCategories();
      //this.subcategories = this.activitiesService.getSubcategories().filter((item)=>item.category == this.activityData.category);

} //constructor function 

      createForm(){

         this.name = new FormControl('', [Validators.required]);
         this.description = new FormControl('', [Validators.required]);
         this.venue = new FormControl('', [Validators.required]);
         this.image = new FormControl('', [Validators.required]);
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
            image:this.image,
            min:this.min,
            max:this.max,
            category:this.category,
            subCategory:this.subCategory,
            publicActivity:this.publicActivity,
            prices:this.prices,
            dates:this.dates
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

 
  ngOnInit() {
    this.categoryService.getCategory()
      .subscribe(
      categoryData => this.allCategories = _.uniqBy(categoryData, 'category')
      );
     }

  onSelect(categoryName) {
    console.log ('User selected ' + categoryName);
    this.subCategoryService.getSubCategory(categoryName)
      .subscribe(
      subCategoryData => this.subCategoryByCategory = _.filter(subCategoryData, function(o) { return o.category == categoryName},'subCategory')
      
      );

  }

  // previewEvent() {
  //  this.dialogRef = this.dialog.open(MoreDetailsComponent, {
  //    data: this.activityData
  //  });
  // }

  // onSelect(category){  
  // console.log(category);  
  // this.subcategories = this.activitiesService.getSubcategories().filter((item)=>item.category == category);
  // }    

  // createActivity() {
  //    if(this.pics.fileEvent){
  //      this.activityData.imageURL = this.pics.imageURL;
  //  }
  // this.activitiesService
  //  .save(this.activityData)
  //  .subscribe((res) => {
  //    this.activity = res;
  //    this.gotoActivitiesList(this.activityData);
  //  });
  // }
  
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
      image: activityModel.image as string,
      min: activityModel.min as number,
      max: activityModel.max as number,
      category: activityModel.categories as string,
      subCategory: activityModel.subCategories as string,
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
