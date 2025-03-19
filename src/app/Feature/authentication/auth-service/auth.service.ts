import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../../../Core/services/common.service';
import { Observable } from 'rxjs';
import { ILogin ,IVerifyOtp,IForgotUpdatePassword,IForgotPassword,IChangePassword,IGetToken } from './authService-interface';
import { ApiResponse, ChangePassword, ForgotPassword, OtpJson, UpdatePassword, UserLogin } from '../interface/login-interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService implements ILogin,IVerifyOtp,IForgotUpdatePassword,IForgotPassword,IChangePassword,IGetToken {
  token: string = '';
  constructor(private readonly http: HttpClient , private readonly CommonService : CommonService) { }
  readonly baseUrl = this.CommonService.baseUrl;

  login(json:UserLogin): Observable<{success:string,userId:string,token:string,customMessage?:string}> {
    return this.http.post<{success:string,userId:string,token:string,customMessage?:string}>(this.baseUrl + 'auth/login', json)
  }
  forgotPassword(json:ForgotPassword): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'auth/forget-password', json)
  }

  verifyOtp(json: OtpJson): Observable<ApiResponse>  {
    return this.http.post<ApiResponse>(this.baseUrl + 'auth/verify-otp', json)
  }

  forgotUpdatePassword(json: UpdatePassword): Observable<{status : string}>  {
    return this.http.post<{status : string}>(this.baseUrl + 'auth/set-password', json)
  }

  changePassword(json: ChangePassword): Observable<ApiResponse>  {
    return this.http.post<ApiResponse>(this.baseUrl + 'auth/reset-password', json)
  }

  getToken():boolean {
    let tok: string | null = '';

    if (typeof localStorage !== 'undefined') {
      // You can access localStorage here
      tok = localStorage.getItem('Token');
    }
    if (![null, undefined,''].includes(tok)) {
      return true;
    } else {
      return false;
    }
  }
}
