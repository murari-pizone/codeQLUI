import { Observable } from "rxjs";
import { CommonResponseJson } from "../../../Shared/const/common.constant";

export interface IGetAggregators {
    getAggregators(): Observable<CommonResponseJson>
}

export interface IUpdateAggregator {
    updateAggregator(formData: any , id?:string): Observable<unknown>
}

export interface IAddAggregator {
    addAggregator(formData: any): Observable<unknown>
}