import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { HiwComponent } from '../hiw/hiw.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
  constructor( public dialog: MdDialog ) { }

  openHIW() {
  	let dialogRef = this.dialog.open(HiwComponent);

  }


  ngOnInit() {
  }

}
