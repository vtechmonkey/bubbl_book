import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable }  from 'rxjs/RX';
import { Activity } from './activity';


import 'rxjs/add/operator/map';


@Injectable()
export class ActivitiesService {

    private activitiesUrl: string = 'http://localhost:3000/api/activities';
    
    constructor(private http: Http) { }

  // Get all activities 
    getAllActivities(): Observable<Activity[]> {
    let activities$ = this.http
    .get(this.activitiesUrl)
    .map(res => res.json())
    .catch(this.handleError); 
    return activities$;                
}
// Get a single activity
getActivityById(_id): Observable<Activity[]> {
  let activity$ = this.http
  .get(`${this.activitiesUrl}/${_id}`,{headers: this.getHeaders()})
  .map(res => res.json());
  return activity$;
}

// create activity
createActivity(data):Observable<Activity[]> {
  let activity$= this.http
  .post(this.activitiesUrl,JSON.stringify(data),
  {headers: this.getHeaders()})
  .map(res=>res.json());
  return activity$;
}

//delete activity
deleteActivity(_id):Observable<Activity[]> {
  return this.http
  .delete(`${this.activitiesUrl}/${_id}`)
  .map(res => res.json());
  

}

// update activity
updateActivity(activity):Observable<Activity[]>{
  return this.http
  .put(`${this.activitiesUrl}/${activity._id}`,JSON.stringify(activity),
  {headers: this.getHeaders()})
  .map(res => res.json());
  
}







    private getHeaders(){
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }



 private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  }