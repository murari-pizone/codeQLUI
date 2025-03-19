import { Observable } from "rxjs";
import { ApiResponse, ChangePassword, ForgotPassword, OtpJson, UpdatePassword, UserLogin } from "../interface/login-interface";

export interface ILogin {
  login(json:UserLogin): Observable<{success:string,userId:string,token:string,customMessage?:string}>;
}

export interface IVerifyOtp {
  verifyOtp(json: OtpJson): Observable<ApiResponse> ;
}

export interface IForgotUpdatePassword {
  forgotUpdatePassword(json: UpdatePassword): Observable<{status : string}>;
}

export interface IForgotPassword{
  forgotPassword(json:ForgotPassword): Observable<ApiResponse>;
}


export interface IChangePassword {
  changePassword(json: ChangePassword): Observable<ApiResponse>;
}

export interface IGetToken {
  getToken():boolean
}