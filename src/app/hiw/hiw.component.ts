import { Component, OnInit} from '@angular/core';
import { MdDialog, MdButtonToggleModule } from '@angular/material';
import { Image } from './image.interface';
//see home component for dialogRef
@Component({
  selector: 'app-hiw',
  templateUrl: './hiw.component.html',
  styleUrls: ['./hiw.component.css']
})

export class HiwComponent implements OnInit {

public images = IMAGES;

//variables for material toggle button used on large screens 
img1 = IMAGES[0].url;
img2 = IMAGES[1].url;
img3 = IMAGES[2].url;

isChecked: boolean =true; // set img1 as checked on opening dialog 


//swipo action for mobile devices 
	SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

	swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
		console.log(currentIndex);
		//out of range
		if (currentIndex > this.images.length || currentIndex < 0 ) return;
		let nextIndex = 0;
		//swipe right, next image
		if (action === this.SWIPE_ACTION.RIGHT){
			console.log("right");
			const isLast = currentIndex === this.images.length -1 ;
			nextIndex = isLast ? 0 : currentIndex + 1;
		}
		//swipe left, previous image 
		if (action === this.SWIPE_ACTION.LEFT) {
			const isLast = currentIndex === this.images.length -1 ;
			nextIndex = isLast ? 0 : currentIndex + 1;
		}
		// 	const isFirst = currentIndex === 0;
		// 	nextIndex = isFirst ? 1: currentIndex +1;
		// }
		// toggle image visibility
		this.images.forEach((x, i) => x.visible = (i === nextIndex));
	}

  constructor( public dialog: MdDialog ) {

   }
   ngOnInit(){

   }
  
}


var IMAGES: Image[] = [
	{"url": "/assets/hiw_1.gif", visible:true},
	{"url": "/assets/hiw_2.gif", visible:false},
	{"url": "/assets/hiw_3.gif", visible:false}
];

