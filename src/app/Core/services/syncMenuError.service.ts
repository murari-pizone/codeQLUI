import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { CommonResponseJson } from '../../Shared/const/common.constant';

@Injectable({
  providedIn: 'root'
})
export class SyncMenuErrorService {

  constructor(private readonly http:HttpClient,private readonly CommonService : CommonService) { }

  readonly baseUrl = this.CommonService.baseUrl;

  // get menu sync error for specific restaurant 
  getSyncErrorById(shopCode : number): Observable<CommonResponseJson> {
    return this.http.post<CommonResponseJson>(this.baseUrl + 'sync-error', {'ShopCode' : shopCode})
  }
}
