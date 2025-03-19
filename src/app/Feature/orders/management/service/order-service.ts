import { Injectable } from '@angular/core';
// import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { CommonResponseJson } from '../../../../Shared/const/common.constant';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../../Core/services/common.service';
import { DatesInformation, Order, OrderDetails } from '../interface/ordersInterface';
import { IGetOrderData } from './order-service.interface'
@Injectable()
export class orderService implements IGetOrderData {
    rows : Order[] = []
    DatesInformation : DatesInformation[] = []
    OrderDetails = new OrderDetails()
  
    constructor(readonly http : HttpClient,private readonly CommonService : CommonService ) { 
      // this.logger.info('logging')
    }
    apiUrl = this.CommonService.baseUrl;

    // get all error 
    getOrderData(pageNumber : number , limit : number , Date : string | null | undefined , status : string | null, search : string | null) : Observable<CommonResponseJson>{
      
      const query = Date ? `get-orders?page=${pageNumber}&limit=${limit}&startDate=${Date}`  :  `get-orders?page=${pageNumber}&limit=${limit}`
      const query2 = status ? `${query}&status=${status}` : query
      const query3 = search ? `${query2}&search=${search}` : query2
      return this.http.get<CommonResponseJson>(this.apiUrl + query3)
    }
  }