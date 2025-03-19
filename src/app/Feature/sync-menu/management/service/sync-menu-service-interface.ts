import { Observable } from "rxjs"
import { CommonResponseJson, FetchDataJson, FilterDropDataValues, GetViewMenu, MenuData, SyncTrackResponse } from "../interface/sync-menu-interface"

export interface IGetDataOutLet {
    getOutLetData(): Observable<CommonResponseJson>
}
export interface IGetSyncData{
    syncData(ShopCode?:string[]):Observable<MenuData>
}

export interface IGetMenuData{
    getMenu(pageNumber : number , limit : number, ShopCode?:string,search? : string | null):Observable<GetViewMenu>
}

export interface IPublishRecord{
    publishRecords(GroupOfRecords : FetchDataJson[]):Observable<CommonResponseJson>
}

export interface IFetchFromERP {
    fetchFromERP(GroupOfRecords : FetchDataJson[]):Observable<CommonResponseJson>
}

export interface IVerifyRecords {
    verifyRecords(GroupOfRecords : FetchDataJson[]):Observable<CommonResponseJson>
}
export interface IGetSyncTrack{
    getSyncTrack(pageNumber : number , limit : number, ShopCode?:string):Observable<SyncTrackResponse>
}

export interface IApplyFilter{
    applyFilter(body : FilterDropDataValues): Observable<any>
}