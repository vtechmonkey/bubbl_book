import { Component} from '@angular/core';
import { MdDialog } from '@angular/material';
import { Image } from './image.interface';
//see home component for dialogRef
@Component({
  selector: 'app-hiw',
  templateUrl: './hiw.component.html',
  styleUrls: ['./hiw.component.css']
})

export class HiwComponent {

public images = IMAGES;
  constructor( public dialog: MdDialog ) { }
  
}


var IMAGES: Image[] = [
	{"url": "/assets/hiw_1.gif"},
	{"url": "/assets/hiw_2.gif"},
	{"url": "/assets/hiw_3.gif"}
];

