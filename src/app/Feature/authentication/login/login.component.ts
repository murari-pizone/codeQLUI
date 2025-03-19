import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service/auth.service';
import { loginConst, welcomeText } from '../const/login-const';
import { Router } from '@angular/router';
import { UserLogin, CustomError } from '../interface/login-interface';
import { LoaderComponent } from '../../../Shared/loader/loader.component';
import { CommonService } from '../../../Core/services/common.service';
import { AUTH_SERVICE_TOKEN } from '../authentication.module';
import { ILogin } from '../auth-service/authService-interface';
import { LoginLogicService } from './login-logic.service';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS,useClass: GlobalInterceptor,multi: true, // This allows multiple interceptors 
    },
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService }
  ]
})
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy{

  userData = new UserLogin();
  loginConst = loginConst;
  welcomeText = welcomeText;
  usernameError: string | null = '';
  passwordError: string | null = ''; 
  errorMessage: string | null = ''; 
  isLoading: boolean = false;
  showIcon: boolean = false;
  controlType: string = 'password';
  loadingText : string = 'Loading'
  @ViewChild('email') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('secondInput') secondInput!: ElementRef<HTMLInputElement>;


  counter:number  [] = [];
  counterSubscription!: Subscription;

  constructor(@Inject(AUTH_SERVICE_TOKEN) private authService: ILogin, readonly route: Router,readonly commonService:CommonService , public loginLogicService : LoginLogicService) {

    console.log('login components called')
   }

   ngOnInit():void {
    const counterObservable: Observable<number> = interval(1000);

    this.counterSubscription = counterObservable.subscribe((value) => {
      this.counter.push(value);
    });
  }

  startObserver():void{
    const counterObservable: Observable<number> = interval(1000);

    this.counterSubscription = counterObservable.subscribe((value) => {
      this.counter.push(value);
    });
  }

  stopObserver():void{
    this.counterSubscription.unsubscribe();
  }

  ngOnDestroy():void {
    this.counterSubscription.unsubscribe();
  }
  
  ngAfterViewInit(): void {
    this.handleLoginRoute(); // Route-specific logic
    this.focusEmailInput(); // UI behavior
  }

  focusNext(): void {
    this.secondInput.nativeElement.focus();
  }
  

  onSecondInputEnter(): void {
    this.onSubmit();
  }

  // Validation logic
  onSubmit(): void {
    this.setLoadingState(true);
    this.resetErrors();

    const validationErrors = this.loginLogicService.validateForm(this.userData);
    if (validationErrors) {
     this.validatorError(validationErrors);
      return;
    }

    this.authService.login(this.userData).subscribe({
      next: (response) =>
        this.loginLogicService.handleLoginSuccess(response, this.route, this.commonService),
      error: (error: CustomError) => {
        console.log('errr', error)
        // this.handleSubmitError(error);
      },
    });


    void this.route.navigateByUrl('view/sync-menu').then(() => {
      setTimeout(() => {
        this.commonService.isLogIn = true;
        this.commonService.getAggregators()
      }, 100);
      this.setLoadingState(false);
    });
  }

  handleSubmitError(error: CustomError): void {
    const loginErrors = this.loginLogicService.handleLoginError(error);
    this.usernameError = loginErrors.usernameError || '';
    this.passwordError = loginErrors.passwordError || '';
    this.errorMessage = loginErrors.errorMessage || '';
    this.isLoading = false;
    console.log(error)
  }

  // Function to toggle loading
  setLoadingState(state:boolean) :void{
    this.isLoading = state;
    this.togglePageWrapperClass(state);
  }

  togglePageWrapperClass(isLoading: boolean): void {
    const pageWrapper = document.body;
    if (isLoading) {
      pageWrapper.classList.add('page-disabled');
    } else {
      pageWrapper.classList.remove('page-disabled');
    }
  }

  // Helper method to reset error messages
  resetErrors(): void {
    this.usernameError = '';
    this.passwordError = '';
    this.errorMessage = '';
  }

  showPass(): void {
    this.showIcon = !this.showIcon;
    this.controlType = this.showIcon ? 'text' : 'password';
  }
  
  // check email validation on focus out from input 
  checkEmailIsValid():void{
    const error = this.loginLogicService.validateEmail(this.userData.email);
    this.usernameError = error || '';
  }

  goToForgot(): void {
    localStorage.removeItem('forgotScreen');
    localStorage.removeItem('resend');
    void this.route.navigateByUrl('forgot-password')
  }
  goToChangePass(): void {
    void this.route.navigateByUrl('change-password')
  }

  empty():void{
    console.log('empty function')
  }
  handleLoginRoute(): void {
    const isLoginRoute = this.isLoginRoute();
    if (typeof localStorage !== 'undefined' && isLoginRoute) {
      this.clearLocalStorage();
      this.updateLoginState();
    }
  }
  
  isLoginRoute(): boolean {
    return this.route.url === '/login' || this.route.url === '/';
  }
  
  clearLocalStorage(): void {
    localStorage.clear();
  }
  
  updateLoginState(): void {
    this.commonService.isLogIn = !!localStorage.getItem('Token');
  }
  
  focusEmailInput(): void {
    this.emailInput.nativeElement.focus();
  }

  validatorError(validationErrors: { usernameError?: string;  passwordError?: string;}):void{
    this.usernameError = validationErrors.usernameError || '';
    this.passwordError = validationErrors.passwordError || '';
    this.isLoading = false;
  }

}