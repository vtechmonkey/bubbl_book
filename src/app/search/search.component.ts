import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
	items:Array<string>;
	term$ = new Subject<string>();


  constructor(
  	private searchService: SearchService
  	) { 

  	this.term$.subscribe(term => this.search(term))
  }


  search(term: string) {
  	this.searchService.search(term)
  		.subscribe(results => this.items = results);
  }
  ngOnInit() {
  }

}
