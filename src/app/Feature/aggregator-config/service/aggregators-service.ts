import { Injectable} from "@angular/core";
import { Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../../../Core/services/common.service";
import { CommonResponseJson } from "../../../Shared/const/common.constant";
import { IAddAggregator, IGetAggregators, IUpdateAggregator } from "./aggregators-service.interface";


@Injectable({
    providedIn: 'root'
})  

export class aggregatorService implements IGetAggregators,IAddAggregator,IUpdateAggregator {
    constructor(readonly http : HttpClient,private CommonService : CommonService) {
    }
    apiUrl = this.CommonService.baseUrl;

    // Get all list of aggregators
    getAggregators(): Observable<CommonResponseJson> {
        return this.http.get<CommonResponseJson>(this.apiUrl + 'aggregator/getall')
    }

    // Update Aggregators
    updateAggregator(formData: any , id?:string): Observable<unknown> {
        return this.http.put(this.apiUrl + `aggregator/update/${id}`, formData)
      }
    
    // Add new Aggregators
    addAggregator(formData: any): Observable<unknown> {
       return this.http.post(this.apiUrl + 'aggregator/create', formData)
    }

}