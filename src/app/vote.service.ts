import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from './activity';

@Injectable()
export class VoteService{
  private activitiesUrl = 'http://localhost:3300/api/activities';
  
  constructor(
    private http: Http
    ) { 
    console.log(4);
  }

  getActivityById(_id): Observable<Activity> {

  let headers = new Headers({
   'Content-Type': 'application/json'
  });

  let activity$ = this.http
  .get(`${this.activitiesUrl}/${_id}`,{headers: headers})
  .map(res => res.json());
  console.log('vote service' + activity$)
  return activity$;
}


  private handleError(error: Response) {
    console.error('I found something bad');
    console.error(error);
    return Observable.throw(error.json().error || 'Server error ...');
  }

}