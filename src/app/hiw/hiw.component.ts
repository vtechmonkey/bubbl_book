import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-hiw',
  templateUrl: './hiw.component.html',
  styleUrls: ['./hiw.component.css']
})
export class HiwComponent implements OnInit {

  constructor(
  	public dialogRef: MdDialogRef<HiwComponent>
  	) { }

  ngOnInit() {
  }

}
