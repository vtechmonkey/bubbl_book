import { Component} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Image } from './image.interface';

@Component({
  selector: 'app-hiw',
  templateUrl: './hiw.component.html',
  styleUrls: ['./hiw.component.css']
})

export class HiwComponent {


  constructor( public dialog: MdDialog ) { }
  openHIW(){
  this.dialog.open(HiwDialog);
  }
  
}

@Component({
	selector: 'hiw-dialog',
	templateUrl: './hiw.dialog.html',
  styleUrls: ['./hiw.component.css']
})

export class HiwDialog {
  
public images = IMAGES;

constructor(){}


}


var IMAGES: Image[] = [
	{"url": "./assets/hiw_1.gif"},
	{"url": "./assets/hiw_2.gif"},
	{"url": "./assets/hiw_3.gif"}
];

