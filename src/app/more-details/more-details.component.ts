import { Component, OnInit, EventEmitter,  Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {DOCUMENT} from '@angular/platform-browser';
import { MdDialog, MdDialogRef, MdDialogConfig, MdButtonToggleModule, MD_DIALOG_DATA } from '@angular/material';

import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css'] 
  
})

export class MoreDetailsComponent implements OnInit {

 

  constructor(  
    @Inject(MD_DIALOG_DATA)  
    private data: any,
    public dialogRef: MdDialogRef<MoreDetailsComponent>,

  
  	) { }

  ngOnInit() {
    console.log( this.data);
  
  }

}
