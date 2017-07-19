import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/catch';
import { ISubCategory } from './subCategory';

@Injectable()
export class SubCategoryService{
  private _urlSubCategory = '../src/api/subCategory.json';
  //sorted: ISubCategory
  constructor(
    private _http: Http
    ) { }

  getSubCategory(CategoryName:String): Observable<ISubCategory[]> {
    return this._http.get(this._urlSubCategory)
      .map((response: Response) => <ISubCategory[]>response.json())     
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error('I found something bad');
    console.error(error);
    return Observable.throw(error.json().error || 'Server error ...');
  }

}