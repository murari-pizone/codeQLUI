import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../../../Core/services/common.service';
import { DeleteResponse, RemoveMenuItemRequest, RemoveOutletRequest } from '../management/interface/sync-menu-interface';

@Injectable({
  providedIn: 'root'
})
export class CreateOutletService {

  constructor(private readonly http: HttpClient, private readonly CommonService: CommonService) {}

  readonly baseUrl = this.CommonService.baseUrl;

  createOutlets(data? : any): Observable<unknown>{
    return this.http.post<any>(this.baseUrl + 'create-outlet', data)
  }

  deleteOutlet(data: RemoveOutletRequest): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(this.baseUrl + 'remove-outlet',{body:data})
  }

  createMenuItem(data? : any): Observable<unknown>{
    return this.http.post<any>(this.baseUrl + 'create-item', data)
  }

  deleteMenuItem(data: RemoveMenuItemRequest): Observable<DeleteResponse>{
    return this.http.delete<DeleteResponse>(this.baseUrl + 'remove-item',{body:data})
  }
}
