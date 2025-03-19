import { Injectable } from '@angular/core';
// import { NGXLogger } from 'ngx-logger';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonResponseJson } from '../../../../Shared/const/common.constant';
import { IGetOrderError } from './order-error-service.interface';
import { CommonService } from '../../../../Core/services/common.service';

@Injectable()
export class orderErrorService implements IGetOrderError {

    constructor(readonly http : HttpClient,private readonly CommonService : CommonService) {  }
    apiUrl = this.CommonService.baseUrl;
    getOrderError(json:{Region:string,ShopCode:string}): Observable<CommonResponseJson> {
      let token :string | null ='';
      if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('Token');
      }
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})  // Add 'Bearer ' prefix to the token
      });
    
      const options = { headers: headers };
      return this.http.post<CommonResponseJson>(this.apiUrl + 'sync-menu', json, options)
    }
  }