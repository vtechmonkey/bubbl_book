import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ActivitiesService {

  

    constructor(private http: Http) { }

  // Get all posts from the API
  getAllActivities() {
     return this.http.get('http://localhost:3000/api/activities')                     
    .map(res => res.json());
                    
}
}