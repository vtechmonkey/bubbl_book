import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import { Activity } from './activity';


import 'rxjs/add/operator/map';


@Injectable()
export class ActivitiesService {

    private activitiesUrl: string = 'http://ec2-52-209-95-130.eu-west-1.compute.amazonaws.com:3000/api/activities';
    
    constructor(private http: Http) { }

  // Get all activities 
    getAllActivities(): Observable<Activity[]> {
    return this.http
    .get(this.activitiesUrl)
    .map(res => res.json())
    .catch(this.handleError); 
                    
}
// Get a single activity
getActivityById(_id): Observable<Activity[]> {

  let headers = new Headers({
   'Content-Type': 'application/json'
  });

  let activity$ = this.http
  .get(`${this.activitiesUrl}/${_id}`,{headers: headers})
  .map(res => res.json());
  return activity$;
}

// save and update activity
save(activity:Activity): Observable<Activity[]> {
  if(activity._id){
    return this.put(activity); 
  }
    return this.post(activity);
}

//post activity
private post(activity:Activity): Observable<Activity[]>{
  let headers = new Headers({
    'Content-Type': 'application/json'
  });

  return this.http
   .post(this.activitiesUrl,JSON.stringify(activity),{headers:headers})
   .map(res => res.json())
   .catch(this.handleError); 

}


//put activity
private put(activity:Activity):  Observable<Activity[]> {
  let headers = new Headers({
    'Content-Type': 'application/json'
  });

  return this.http
  .put(`${this.activitiesUrl}/${activity._id}`,JSON.stringify(activity),{headers:headers})
  .map(res => res.json())
  .catch(this.handleError);
}

//delete activity
delete(activity: Activity):Observable<Activity[]> {
  let headers = new Headers({
    'Content-Type': 'application/json'
  });

 return this.http
.delete(`${this.activitiesUrl}/${activity._id}`, {headers:headers})
.map(res => res.json());

}


 private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  }