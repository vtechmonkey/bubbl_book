import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/catch';
import { ICategory } from './category';

@Injectable()
export class CategoryService{
  private _urlCategory = '../src/api/category.json';
  sorted:ICategory[];

  constructor(private _http: Http) { }

  getCategory(): Observable <ICategory[]> {
    return this._http.get(this._urlCategory)
    .map((response: Response) => <ICategory[]> response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error('I found something bad');
    console.error( error);
    return Observable.throw(error.json().error || 'Server error ...');
  }

}
  