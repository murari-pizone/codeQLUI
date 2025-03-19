import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, OnDestroy, Inject} from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SuccessComponent } from '../../../Shared/popup/success/success.component';
import { LoaderComponent } from '../../../Shared/loader/loader.component';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { AUTH_SERVICE_TOKEN } from '../authentication.module';
import { ForgotPasswordLogicService } from './forgot-password-logic.service';
import { IVerifyOtp ,IForgotUpdatePassword , IForgotPassword , IChangePassword } from '../auth-service/authService-interface';
import { ApiResponse, CustomError, ForgotPassword, UpdatePassword } from '../interface/login-interface';
import { loginConst, welcomeText } from '../const/login-const';
import { CommonService } from '../../../Core/services/common.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule,  MatDialogModule, MatButtonModule, LoaderComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService }
  ]
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit, OnDestroy {

  userData  = new ForgotPassword();
  welcomeText = welcomeText;
  loginConstants = loginConst;

// Resend OTP timeout variables
  timeoutExpired: boolean = false;
  buttonDisabled: boolean = false;
  remainingTime: number = localStorage.getItem("remainingTime") ? parseInt(localStorage.getItem("remainingTime")!, 10) : 30;
  timerInterval: ReturnType<typeof setInterval> | null = null;

  usernameError: string | null = '';  // Error message for username
  errorMessage: string | null = '';    // General error message for login
  newPassError: string | null = '';    // General error message for login
  confirmPassError: string | null = '';    // General error message for login
  newConfirmPassError: string | null = '';    // General error message for login
  loadingSpinner: boolean = false;
  isForgot:string = 'forgot';
  otp: string[] = ['', '', '', '', '', ''];
  userId: string | null ='';
  showIcon:boolean[] = [false, false];
  controlType:string[] = ['password', 'password'];
  @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>;
  otpSent : boolean  = false;

  constructor(readonly route: Router,readonly commonService:CommonService, readonly popup: MatDialog , public forgetPasswordLogicService : ForgotPasswordLogicService,@Inject(AUTH_SERVICE_TOKEN) private authService: IVerifyOtp & IForgotUpdatePassword & IForgotPassword & IChangePassword) {
   }
   ngOnInit():void{
    const screen = localStorage.getItem('forgotScreen');
    if(screen){
      this.isForgot = screen;
    }else{
      this.isForgot = 'forgot';
    }
    this.otpSent =  !!localStorage.getItem('email');
    if(this.otpSent){
      this.startTimeout()
    }
   }
   ngAfterViewInit(): void {
    this.handleLoginRoute()
    this.emailInput.nativeElement.focus();
  }
  ngOnDestroy(): void {
    localStorage.removeItem('remainingTime');
    localStorage.removeItem('timeoutExpired');
    localStorage.removeItem('email');
  }

  // send otp to the email 
  sendEmail(userData: ForgotPassword): void {
    this.resetFormState();

    const validationError = this.forgetPasswordLogicService.validateForm(userData);

    if (validationError) {
      this.usernameError = validationError;
      this.loadingSpinner = false;
      return;
    }

    this.requestPasswordReset(userData);
  }

  resetFormState(): void {
    this.otp = [];
    this.loadingSpinner = true;
    this.resetErrors();
  }

  requestPasswordReset(userData: ForgotPassword): void {
    const json: ForgotPassword = { email: userData.email };

    this.authService.forgotPassword(json).subscribe({
      next: (response: ApiResponse) => {
        this.handleResponse(response, userData)
      },
      error: (error: CustomError) => {
        this.handleError(error)
      }
    });
  }

  handleResponse(response: ApiResponse, userData: ForgotPassword): void {
    const status = this.forgetPasswordLogicService.handleResponse(response, userData);
    this.loadingSpinner = false;
    this.isForgot = 'otp';

    if (status) {
      localStorage.setItem('forgotScreen', 'otp');
      setTimeout(() => { this.startTimeout() }, 400);
    }
  }

  handleError(error: CustomError): void {
    this.usernameError = error['customMessage'] || error.error?.error || '';
    this.loadingSpinner = false;
  }
  

  // verify otp and moved to the password screen 
  submitOTP(): void {
    const otpValue = this.forgetPasswordLogicService.getOtpValue(this.otp);
  
    if (this.forgetPasswordLogicService.isOtpValid(otpValue)) {
      this.verifyOtp(otpValue);
    } else {
      this.showOtpError('Please enter the full OTP.');
    }
  }
  
verifyOtp(otpValue: string): void {
    this.loadingSpinner = true;
    const json = { otp: otpValue };
  
    this.authService.verifyOtp(json).subscribe({
      next: (response: ApiResponse) => {
        this.handleOtpSuccess(response)
      },
      error: (error: CustomError) => {
        this.handleOtpError(error)
      }
    });
  }
  
handleOtpSuccess(response: ApiResponse): void {
    this.errorMessage = this.forgetPasswordLogicService.handleOtpResponse(response);
  
    if (!this.errorMessage) {
      this.isForgot = 'password';
      this.loadingSpinner = false;
      this.resetErrors();
    }
  }
  
handleOtpError(error: CustomError): void {
    this.errorMessage = error.error?.error as string;
    this.loadingSpinner = false;
  }
  
showOtpError(message: string): void {
    this.errorMessage = message;
    this.loadingSpinner = false;
  }

  // Helper method to reset error messages
  resetErrors(): void {
    this.usernameError = '';
    this.errorMessage = '';
    this.newPassError = '';
    this.confirmPassError = '';
    this.newConfirmPassError = '';
  }

  onKeyUp(event: KeyboardEvent, index: number):void {
    if(event){
      const flag = this.forgetPasswordLogicService.onKeyUp(event,index)
      if(flag && flag === ''){
        this.otp[index]=''
      }
    }
  }

  // Update new password after verify user
  updatePassword(): void {
    this.loadingSpinner = true;
    this.resetErrors();
    
    const { password, confirmPass } = this.userData;
    const validation = this.forgetPasswordLogicService.validatePassword(password??'', confirmPass??'');
  
    if (!validation.valid) {
      this.handleValidationErrors(validation.errors);
      return;
    }
  
    const userId = this.getUserId();
    this.submitPasswordUpdate(password??'', userId??'');
  }
    
  handleValidationErrors(errors: string[]): void {
    this.newPassError = this.extractError(errors, 'Password');
    this.newConfirmPassError = this.extractError(errors, 'Confirm');
    this.errorMessage = this.extractError(errors, 'Please fill');
    this.loadingSpinner = false;
  }
  
  extractError(errors: string[], keyword: string): string {
    return errors.find(err => err.includes(keyword)) || '';
  }
  
  getUserId(): string {
    return localStorage.getItem('userId')?.toString() ?? '';
  }
  
  submitPasswordUpdate(password: string, userId: string): void {
    const json: UpdatePassword = { newPassword: password, userId: userId };
  
    this.authService.forgotUpdatePassword(json).subscribe({
      next: (response: ApiResponse) => {
        this.PasswordUpdateSuccess(response)
      },
      error: (error: CustomError) => {
        this.PasswordUpdateError(error)
      }
    });
  }
  
  PasswordUpdateSuccess(response: ApiResponse): void {
    if (response['success'] === "OK") {
      this.resetErrors();
    }
    this.loadingSpinner = false;
  }
  
  PasswordUpdateError(error: CustomError): void {
    this.errorMessage = error.error?.error as string;
    this.loadingSpinner = false;
  }
  

  // handel success body after updating new password 
  handlePasswordUpdateSuccess(): void {
    this.isForgot = 'password';
    this.loadingSpinner = false;
    localStorage.removeItem('forgotScreen');
    localStorage.removeItem('userId');
    
    const popupRes = this.popup.open(SuccessComponent, {
      data: { description: 'Your password has been changed successfully.', title: 'Password Change', hideCrossIcon: true }
    });
    popupRes.afterClosed().subscribe((item: boolean) => {
      if (item) {
        void this.route.navigateByUrl('/login');
      }
    });
  }

  // handel error body after updating new password
  handlePasswordUpdateError(error: CustomError): void {
    this.isForgot = 'password';
    if (error['customMessage'] === "Invalid credentials") {
      this.errorMessage = error['customMessage'];
    }
    this.loadingSpinner = false;
  }

  
  empty():void{
    console.log('empty function')
  }

  // show and hide password
  showPass(index:number): void {
    this.showIcon[index] = !this.showIcon[index];
    this.controlType[index] = this.showIcon[index] ? 'text' : 'password';
  }

  // check email validation on focus out from input 
  EmailIsValid():void{
    const valid = this.forgetPasswordLogicService.checkEmailIsValid(this.userData)
    this.usernameError = valid !== '' ? valid : ''
  }

  // check new password and confirm pass is valid 
  checkNewAndConfirmPass():void{
    const { password, confirmPass } = this.userData;
    if(password && password.length > 0 && password?.trim() == ''){
      this.newPassError = this.loginConstants.newPasswordNotValid;
      if(confirmPass && confirmPass.length > 0 && confirmPass?.trim() == ''){
        this.newConfirmPassError = this.loginConstants.confirmPassNotValid;
      }else{
        this.newConfirmPassError  = ''
      }
    }else{
      this.newPassError = ''
      this.newConfirmPassError = ''
    }
  }

  goToLogin():void{
    void this.route.navigateByUrl('/login');
  }

  resendEmail():void{
    if (typeof localStorage !== 'undefined') {
        const resendEmail = localStorage.getItem('resend');
        
        if (resendEmail) {
            const userData: ForgotPassword = { email: resendEmail };
            this.sendEmail(userData);
            const timeoutExpired = localStorage.getItem('timeoutExpired');
            if (timeoutExpired === 'false') {
                this.startTimeout();
            } else {
                this.resetTimer();
                this.startTimeout("Pressed again");
            }
        }
    }
  }


  startTimeout(Pressed? : string): void {
    const storedRemainingTime = localStorage.getItem('remainingTime');
    const storedTimeoutExpired = localStorage.getItem('timeoutExpired');
    if (storedRemainingTime && storedTimeoutExpired !== 'true') {
        this.remainingTime = parseInt(storedRemainingTime, 10);
        this.timeoutExpired = false; 
        this.buttonDisabled = true; 
    } else {
        if(Pressed){
          this.remainingTime = 30;
        }
        this.timeoutExpired = false;
        this.buttonDisabled = true;
    }
    // Clear any previous interval to avoid multiple timers
    if (this.timerInterval) {
        clearInterval(this.timerInterval);
    }

    // Start the countdown timer
    this.timerInterval = setInterval(() => {
        this.remainingTime--;
        // Update localStorage with the new remaining time
        localStorage.setItem('remainingTime', this.remainingTime.toString());
        // If the timer reaches 0, set the timer as expired
        if (this.remainingTime <= 0) {
          this.timeoutExpired = true; 
          this.buttonDisabled = false;
          localStorage.setItem('timeoutExpired', 'true'); 
          // Stop the countdown
          if (this.timerInterval) {
              clearInterval(this.timerInterval);
          }
        }
    }, 1000);
  }



resetTimer(): void {
  // Remove timer data from localStorage
  localStorage.removeItem('remainingTime');
  localStorage.removeItem('timeoutExpired');

  // Reset the timer to 30 seconds
  this.remainingTime = 30;
  this.timeoutExpired = false;
  this.buttonDisabled = false; // Enable the button
}

handleLoginRoute(): void {
  const isLoginRoute = this.isLoginRoute();
  if (typeof localStorage !== 'undefined' && isLoginRoute) {
    this.clearLocalStorage();
    this.updateLoginState();
  }
}

isLoginRoute(): boolean {
  return this.route.url === '/forgot-password' || this.route.url === '/';
}

clearLocalStorage(): void {
  localStorage.clear();
}

updateLoginState(): void {
  this.commonService.isLogIn = !!localStorage.getItem('Token');
}
}
