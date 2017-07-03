import { Injectable } from '@angular/core';
import { Http, Response,Headers } from '@angular/http';
import { Observable }  from 'rxjs/Observable';
import { Activity } from './activity';
import { Category } from './category';
import { Subcategory } from './subcategory';

import 'rxjs/add/operator/map';


@Injectable()
export class ActivitiesService {

   private activitiesUrl = 'http://localhost:3300/api/activities';
    
    constructor(
      private http: Http
   
      ) { }

// hard coded categories and subcategories pending new database
category: Category[]=[
{id:1, name:'Sport'}, {id:2, name:'Food'}, {id:3, name:'Entertainment'}
];
subcategory: Subcategory[]=[
{category: 'Sport', name:'5-aside'},{category: 'Sport', name:'Tennis'},{category: 'Sport', name:'Rugby'},{category: 'Sport', name:'Golf'},
{category: 'Food', name:'Sushi'}, {category: 'Food', name:'Italian'},{category: 'Food', name:'Mexican'},{category: 'Food', name:'Thai'},
{category: 'Entertainment', name:'Movie'},{category: 'Entertainment', name:'Music'},{category: 'Entertainment', name:'Theatre'}
]

  // Get all activities 
    getAllActivities(): Observable<Activity[]> {
    return this.http
    .get(this.activitiesUrl)
    .map(res => res.json())
    .catch(this.handleError); 
                    
}
//Get categories 
getCategories() {
  return this.category;
}
getSubcategories(){
  return this.subcategory;
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