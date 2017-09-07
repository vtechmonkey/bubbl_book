
import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, Inject, ChangeDetectionStrategy, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { MdButtonToggleModule, MdDialog, MdDialogConfig, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/filter";
import * as _ from 'lodash';

import { Activity, Price, Date, Time } from '../activity';
import { ActivitiesService } from '../activities.service';


import { PicsService } from '../pics.service';
import { AuthService } from '../auth.service';
import { MoreDetailsComponent } from '../more-details/more-details.component';

import { CategoryService } from '../category/category.service';
import { SubCategoryService } from '../subCategory/subCategory.service';
import { ICategory } from '../category/category';
import { ISubCategory } from '../subCategory/subCategory';

import { TimesComponent } from '../times/times.component';



@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']

})


export class ActivityCreateComponent implements OnInit {

  title: string = "Create your own Event";
  location: Location;
  url: any;

  allCategories: ICategory[];
  subCategoryByCategory: ISubCategory[];

  activityForm: FormGroup;
  name: FormControl;
  description: FormControl;
  fullDescription: FormControl;
  activityLocation: FormControl;
  duration: FormControl;
  imageURL: any;
  min: FormControl;
  max: FormControl;
  providerUrl: FormControl;
  category: FormControl;
  subCategory: FormControl;
  publicActivity: FormControl;
  prices: FormArray;
  dates: FormArray;
  comments: FormControl;


  @Input() activity: Activity;
  @Output() close = new EventEmitter();

  userProfile: any;
  localStorageForm: any;



  constructor(
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router,
    private pics: PicsService,
    private auth: AuthService,
    location: Location,
    public dialog: MdDialog, //more details dialog    
    @Inject(DOCUMENT) doc: any,
    private fb: FormBuilder
  ) {

    this.createForm();
    this.location = location;
    this.url = this.location.path();
    this.pics.imageURL = pics.imageURL; // default string or image url of image uploaded with pics service
    this.localStorageForm = (JSON.parse(localStorage.getItem('activity')));
    console.log(this.localStorageForm);
  }

  ngOnInit() {

    this.categoryService.getCategory()
      .subscribe(
      categoryData => this.allCategories = _.uniqBy(categoryData, 'category')
      )

    console.log(this.auth.userProfile);
    console.log(this.auth.userProfile.email);
    if (this.auth.userProfile) {
      console.log(this.auth.userProfile.user_id);
    }

    if (!this.auth.userProfile) {
      console.log("ain't nobody home girlfriend");
      localStorage.removeItem('activity');
      this.localStorageForm = undefined;

    }

    if (this.localStorageForm) {
      this.activityForm
        .patchValue({ name: this.localStorageForm.name })
      this.activityForm
        .patchValue({ activityLocation: this.localStorageForm.activityLocation })
      this.activityForm
        .patchValue({ description: this.localStorageForm.description })
      this.activityForm
        .patchValue({ fullDescription: this.localStorageForm.fullDescription })
      this.activityForm
        .patchValue({ category: this.localStorageForm.category })
      this.activityForm
        .patchValue({ subCategory: this.localStorageForm.subCategory })
      this.activityForm
        .patchValue({ min: this.localStorageForm.min })
      this.activityForm
        .patchValue({ max: this.localStorageForm.max })
      this.activityForm
        .patchValue({ prices: this.localStorageForm.prices })
      this.activityForm
        .patchValue({ dates: this.localStorageForm.dates })
      this.activityForm
        .patchValue({ imageURL: this.localStorageForm.imageURL })
       this.activityForm
        .patchValue({ providerUrl: this.localStorageForm.providerUrl })
       this.activityForm
        .patchValue({ duration: this.localStorageForm.duration })
       this.activityForm
        .patchValue({ comments: this.localStorageForm.comments })
    }
  }

  ngDoCheck() {

    if (this.activityForm.value) {
      localStorage.setItem('activity', JSON.stringify(this.activityForm.value));
      console.log('seems to be changes afoot');
    }
  }

  localStore() {
    localStorage.setItem('activity', JSON.stringify(this.activityForm.value));
    console.log(this.activityForm.value);

    console.log(this.localStorageForm.name);
  }

  createForm() {

    this.name = new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]);
    this.description = new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]);
    this.fullDescription = new FormControl('',[Validators.required,Validators.minLength(5)]);
    this.activityLocation = new FormControl('',[Validators.required]);
    this.duration = new FormControl('',[Validators.required]); 
    this.providerUrl = new FormControl('',[Validators.pattern(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)]);    
    this.min = new FormControl('',[Validators.required]);
    this.max = new FormControl('', [Validators.required]);
    this.category = new FormControl('',[Validators.required]);
    this.subCategory = new FormControl('',[Validators.required]);
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
      qty: '',//['', Validators.required],
      perPerson: ''
    });
  }

  initDate() {
    return this.fb.group({
      date: '',//['', Validators.required],
      times: this.fb.array([
        this.initTime(),
      ])
    });
  }

  initTime() {
    return this.fb.group({
      time: ['']
    })
  }


  onSelect(categoryName) {
    console.log('User selected ' + categoryName);
    this.subCategoryService.getSubCategory(categoryName)
      .subscribe(
      subCategoryData => this.subCategoryByCategory = _.filter(subCategoryData, function (o) { return o.category == categoryName }, 'subCategory')

      );

  }

  onSubmit() {

    this.activity = this.prepareSaveActivity();
    this.activitiesService.save(this.activity).subscribe(/* error handling */);
  }

  prepareSaveActivity(): Activity {
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
      votes: [],
      voteCount: this.activity.voteCount as number


    };
    return saveActivity;
  }


  addPrice() {
    const control = <FormArray>this.activityForm.controls['prices'];
    control.push(this.initPrice());
  }

  addDate() {
    this.dates.push(this.initDate());
  }

  addTime(i?: number, t?: number) {
    const control: FormArray = <FormArray>this.dates.at(i).get('times');
    control.push(this.initTime());
  }


  gotoActivitiesList(activity: Activity = null): void {

    this.close.emit(activity);
    let link = ['/activities'];
    this.router.navigate(link);

  }

}
