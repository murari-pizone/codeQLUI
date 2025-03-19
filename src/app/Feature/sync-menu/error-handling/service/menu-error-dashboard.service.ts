import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../../../../Core/services/common.service';
import { CommonResponseJson, MenuErrorRow } from '../interface/menuSyncError-interface';
import { Observable } from 'rxjs';
// import { GetAllMenu } from '../../management/interface/sync-menu-interface';
import { ICreateOutlets, IEGetSyncData, IGetSyncError } from './menu-error.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuErrorDashboardService implements IGetSyncError, IEGetSyncData , ICreateOutlets {
  staticData : MenuErrorRow[] = [] 

  constructor(private readonly http: HttpClient, private readonly CommonService: CommonService) {}

  readonly baseUrl = this.CommonService.baseUrl;

  // get all error 
  getSyncError(pageNumber: number, limit: number): Observable<CommonResponseJson> {
    console.log(pageNumber, limit)
    // return of(this.staticData)
    // return this.http.get<MenuErrorRow>(this.baseUrl + `sync-error?page=${pageNumber}&limit=${limit}`)
    const query = `sync-error?page=${pageNumber}&limit=${limit}`
    const query2 = status ? `${query}&status=${status}` : query
    return this.http.get<CommonResponseJson>(this.baseUrl + query2)
  }

  // // data syncing 
  syncData(ShopCode?: number): Observable<any> {
    const body = { ShopCode: ShopCode }
    return this.http.post<any>(this.baseUrl + 'full-menu/', body)
  }

  createOutlets(data? : any): Observable<unknown>{
    return this.http.post<any>(this.baseUrl + 'create-outlet', data)
  }
}
