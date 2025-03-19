import { Component, Inject } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../../Shared/loader/loader.component';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { IChangePassword} from '../auth-service/authService-interface';
import { AUTH_SERVICE_TOKEN } from '../authentication.module';
import { ApiResponse, ChangePassword, CustomError } from '../interface/login-interface';
import { loginConst } from '../const/login-const';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, LoaderComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalInterceptor,
      multi: true, // This allows multiple interceptors
    },
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService }
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  userData = new ChangePassword();
  loginConstants = loginConst;
  oldPassError: string = '';  // Error message for old Password
  newPassError: string = '';  // Error message for new Password
  confirmPassError: string = '';  // Error message for password
  newOldPassError: string = '';  // Error message for password
  errorMessage: string = '';    // General error message for login
  loadingSpinner: boolean = false;
  showIcon:boolean[] = [false, false, false]
  controlType:string[] = ['password', 'password', 'password']
  constructor(@Inject(AUTH_SERVICE_TOKEN) public authService: IChangePassword, readonly route: Router) { }

  onSubmit(): void {
    this.loadingSpinner = true;
    this.resetErrors();

    if (this.isFormValid()) {
      const userId = this.getUserId();
      const changePasswordPayload = this.createChangePasswordPayload(userId);

      this.submitChangePassword(changePasswordPayload);
    } else {
      this.loadingSpinner = false;
    }
  }

  getUserId(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('loggedUserId') : null;
  }

  createChangePasswordPayload(userId: string | null): ChangePassword {
    return {
      oldPassword: this.userData.oldPassword,
      newPassword: this.userData.newPassword,
      userId: userId?.toString(),
    };
  }

  submitChangePassword(payload: ChangePassword): void {
    this.authService.changePassword(payload).subscribe({
      next: (response: ApiResponse) => {
        this.handlePasswordChangeSuccess(response)
      },
      error: (error: CustomError) => {
        this.handlePasswordChangeError(error)
      }
    });
  }

  handlePasswordChangeSuccess(response: ApiResponse): void {
    if (response['success'] === 'OK' || response['message'] === "Password updated successfully!") {
      this.loadingSpinner = false;
      this.clearLocalStorage();
      this.navigateToLogin();
    }
  }

  handlePasswordChangeError(error: CustomError): void {
    this.oldPassError = error['customMessage'] === 'Old password does not match.' ? error['customMessage'] : '';
    this.errorMessage = error['customMessage'] && !this.oldPassError ? error['customMessage'] : '';
    this.loadingSpinner = false;
  }

  clearLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('Token');
      localStorage.removeItem('loggedUsedId');
    }
  }

  navigateToLogin(): void {
    void this.route.navigateByUrl('login');
  }

  // Validation logic
  isFormValid(): boolean {
    const { oldPassword, newPassword, confirmPass } = this.userData;

    if (!oldPassword?.trim() && !newPassword?.trim() && !confirmPass?.trim()) {
      this.errorMessage = this.loginConstants.emptyFields;
      return false;
    }
    if (!newPassword?.trim() && !confirmPass?.trim()) {
      this.errorMessage = this.loginConstants.emptyFields;
      return false;
    }
    if (!oldPassword?.trim()) {
      this.oldPassError = this.loginConstants.oldPassword;
      return false;
    }
    if (!newPassword?.trim()) {
      this.newPassError = this.loginConstants.newPassword;
      return false;
    }
    if (!confirmPass?.trim()) {
      this.confirmPassError = this.loginConstants.confirmPass;
      return false;
    }
    // Check if password is less than 8 characters
    if (newPassword.length < 8) {
      this.newPassError = this.loginConstants.passLength; // Add a message in your constants for password length
      return false;
    }
    if (!(!newPassword?.trim() && !confirmPass?.trim())) {
      if (newPassword != confirmPass) {
        this.newOldPassError = this.loginConstants.newConfirmSame;
        return false;
      }
    }

    return true;
  }

  // Helper method to reset error messages
  resetErrors(): void {
    this.oldPassError = '';
    this.newPassError = '';
    this.confirmPassError = '';
    this.newOldPassError = '';
    this.errorMessage = '';
  }
  empty():void{
    console.log('empty function')
  }
  showPass(index:number): void {
    this.showIcon[index] = !this.showIcon[index];
    if (this.showIcon[index]) {
      this.controlType[index] = 'text';
    } else {
      this.controlType[index] = 'password';
    }
  }
}
