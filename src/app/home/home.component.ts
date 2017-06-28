import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { HiwComponent } from '../hiw/hiw.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	title:string = "Welcome to Bubblbook";
  
  constructor( 
              public dialog: MdDialog,
              private authService: AuthService
     ) { }

  openHIW() {
  	let dialogRef = this.dialog.open(HiwComponent, {
      // height:'800px',
      // width:'500px',
    });

  }


  ngOnInit() {
  }

}
