import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { CommonResponseJson, FetchDataJson, FilterDropDataValues, GetViewMenu, MenuRows, SyncTrackResponse } from '../interface/sync-menu-interface';
import { CommonService } from '../../../../Core/services/common.service';
import { HttpClient } from '@angular/common/http';
import { IApplyFilter, IFetchFromERP, IGetDataOutLet, IGetMenuData, IGetSyncData, IGetSyncTrack, IPublishRecord, IVerifyRecords } from './sync-menu-service-interface';

@Injectable({
  providedIn: 'root',
})
export class SyncMenuService implements IGetDataOutLet, IGetSyncData , IGetMenuData ,IPublishRecord ,IFetchFromERP, IVerifyRecords,IGetSyncTrack , IApplyFilter {
  rows : MenuRows[] = []
    constructor(readonly http:HttpClient,private readonly CommonService : CommonService) {}

    readonly baseUrl = this.CommonService.baseUrl;
 
    // For Getting Rows data for dashboard
    getOutLetData():Observable<CommonResponseJson>{
      return this.http.get<CommonResponseJson>(this.baseUrl + 'get-outlets');
    }
 
    // For Getting Menu list of Perticuller Restaurant
    getMenu(pageNumber: number, limit: number, ShopCode?:string , search? : string | null): Observable<GetViewMenu> {
        search = search ?search :null; 
        let url:string = '';
        if(search){
         url = `${this.baseUrl}/get-menu?page=${pageNumber}&limit=${limit}&search=${search}`;
        }else{
            url = `${this.baseUrl}/get-menu?page=${pageNumber}&limit=${limit}`;
        }
        const body = ShopCode ? { ShopCode } : {};
        return this.http.post<GetViewMenu>(url, body);
    }

    // data syncing 
    syncData(ShopCode:string[]):Observable<any>{
        let body:any;
        for (const element of ShopCode) {
            if (ShopCode.length == 1) {
                body = { ShopCode: element }
            }else{
                body = ShopCode.map(element => ({ ShopCode: element }));
            }
        }
        return this.http.post<any>(this.baseUrl + 'full-menu/' , body)
    }

    // publishing data one or more then one records at one time 
    publishRecords(GroupOfRecords : FetchDataJson[]):Observable<CommonResponseJson>{
        const jsonBody = GroupOfRecords
        return this.http.post<CommonResponseJson>(this.baseUrl + 'publish' , jsonBody)
    }

    // // verify data one or more then one records at one time
    verifyRecords(GroupOfRecords : FetchDataJson[]):Observable<CommonResponseJson>{
        const jsonBody = GroupOfRecords
        const shopCodeIdArray = jsonBody.map(item => ({ ShopCode: item.ShopCode }))
        return this.http.post<CommonResponseJson>(this.baseUrl + 'verify-data' , shopCodeIdArray)
    }

    // fetch data from erp for one and more then one record at single time 
    fetchFromERP(GroupOfRecords : FetchDataJson[]):Observable<CommonResponseJson>{
        const jsonBody = GroupOfRecords
        return this.http.post<CommonResponseJson>(this.baseUrl + 'outlet/get-data' , jsonBody)
    }

    // For Getting Menu list of Perticuller Restaurant
    getSyncTrack(pageNumber: number, limit: number, ShopCode?:string): Observable<SyncTrackResponse> {
        const url = `${this.baseUrl}/sync-menu/track?page=${pageNumber}&limit=${limit}`;
        const body = ShopCode ? { ShopCode } : {};
        return this.http.post<SyncTrackResponse>(url, body);
    }

    applyFilter(body : FilterDropDataValues): Observable<any> {
        const bodyJson = body;
        return this.http.post<any>("http://localhost:3000/api/v1/full-menu", bodyJson);
    }
}
