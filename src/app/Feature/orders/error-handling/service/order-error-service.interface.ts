import { Observable } from "rxjs";
import { CommonResponseJson } from "../../../../Shared/const/common.constant";

export interface IGetOrderError {
    getOrderError(json:{Region:string,ShopCode:string}): Observable<CommonResponseJson> 
}