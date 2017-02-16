import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Activity } from './activity';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }
  
    search(term: string): Observable<Activity[]>{
    	return this.http
    		.get('app/activities/?name=${term}')
    		.map(response => response.json().data as Activity[]);
    }

}
