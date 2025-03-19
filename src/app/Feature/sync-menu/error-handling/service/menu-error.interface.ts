import { Observable } from "rxjs"
import { CommonResponseJson } from "../interface/menuSyncError-interface"

export interface IGetSyncError {
    getSyncError(pageNumber : number , limit : number): Observable<CommonResponseJson>
}

export interface IEGetSyncData {
    syncData(ShopCode?:number): Observable<unknown>
}

export interface ICreateOutlets {
    createOutlets(data? : any): Observable<unknown>
}