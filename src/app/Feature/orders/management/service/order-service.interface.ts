import { Observable } from "rxjs";
import { CommonResponseJson } from "../../../../Shared/const/common.constant";

export interface IGetOrderData {
    getOrderData(pageNumber : number , limit : number , Date : string | null | undefined , status : string | null , search : string | null) : Observable<CommonResponseJson>
}