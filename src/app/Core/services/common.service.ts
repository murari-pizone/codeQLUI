import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AggregatorList, CommonResponseJson } from '../../Shared/const/common.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilterDropDataInterface } from '../../Feature/sync-menu/management/interface/sync-menu-interface';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})



export class CommonService {
  token: string | null = '';
  public baseUrl = environment.URL;
  isLogIn:boolean = false;
  listOfAggregators : AggregatorList[] = []
  constructor(private readonly http: HttpClient) { }

  // Get all list of aggregators
  getAggregators(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('Token');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {})  // Add 'Bearer ' prefix to the token
    });
    const options = { headers: headers };
     this.http.get<CommonResponseJson>(this.baseUrl + 'aggregator/getall',options).subscribe({
      next : (response : CommonResponseJson)=>{
        this.listOfAggregators = response.data
        localStorage.setItem('aggregatorList',JSON.stringify(this.listOfAggregators))
      }
     })
  }

  // Getting location , city and region lists for sync menu filter
  getSyncMenuFilterData():Observable<FilterDropDataInterface>{
    return this.http.get<FilterDropDataInterface>(this.baseUrl + 'sync')
  }

  // get token
  getToken():boolean {
    let tok: string | null = '';

    if (typeof localStorage !== 'undefined') {
      // You can access localStorage here
      tok = localStorage.getItem('Token');
    }
    if (![null, undefined,''].includes(tok)) {
      return true;
    } else {
      return false;
    }
  }
}
export class CloseError{
  // When click on close icon on inline error message
  static closeInlineError(errorState: { errorMessages: string; isErrorOccur: boolean }):void{
    errorState.errorMessages = '';
    errorState.isErrorOccur = false;
  }
}
