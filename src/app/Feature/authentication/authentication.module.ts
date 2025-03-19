import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { IChangePassword, IForgotPassword, IForgotUpdatePassword, IGetToken, ILogin, IVerifyOtp } from './auth-service/authService-interface';
import { AuthService } from './auth-service/auth.service';
// import { BrowserModule } from '@angular/platform-browser';
export const AUTH_SERVICE_TOKEN = new InjectionToken<ILogin & IVerifyOtp & IForgotUpdatePassword & IForgotPassword & IChangePassword & IGetToken>('AUTH_SERVICE_TOKEN');
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    // BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService }
  ]
})
export class AuthenticationModule { }