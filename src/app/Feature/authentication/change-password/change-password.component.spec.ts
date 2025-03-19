import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SaveButtonComponent } from '../../../Shared/UI-Elements/save-button/save-button/save-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SuccessEditComponent } from '../../../Shared/success-edit/success-edit.component';
import { LoaderComponent } from '../../../Shared/loader/loader.component';
import GlobalInterceptor from '../../../Core/interceptors/global.interceptor';
import { HttpTestingController } from '@angular/common/http/testing';
import { ApiResponse } from '../interface/login-interface';
import { loginConst } from '../const/login-const';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['changePassword']);
    mockRouter = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SaveButtonComponent,
        SuccessEditComponent,
        LoaderComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: GlobalInterceptor,
          multi: true
        },HttpTestingController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test Cases for `onSubmit()`
  describe('onSubmit', () => {
    it('should reset errors and call AuthService.changePassword if form is valid', () => {
      const mockResponse: ApiResponse = { status: 'OK' };
      component.userData = { oldPassword: 'oldPass123', newPassword: 'newPass123', confirmPass: 'newPass123' };

      mockAuthService.changePassword.and.returnValue(of(mockResponse));

      spyOn(component, 'resetErrors');
      spyOn(component, 'isFormValid').and.returnValue(true);
      const navigateByUrlSpy = spyOn(router, 'navigateByUrl');

      component.onSubmit();

      expect(component.resetErrors.bind(component)).toHaveBeenCalled();
      expect(mockAuthService.changePassword.bind(mockAuthService)).toHaveBeenCalledWith({
        oldPassword: 'oldPass123',
        newPassword: 'newPass123',
        userId: 'null'
      });
      expect(component.loadingSpinner).toBeFalse();
      expect(navigateByUrlSpy).toHaveBeenCalledWith('login');
    });

    it('should call changePassword and navigate to login on success', () => {
      const json = { oldPassword: 'old123', newPassword: 'new123' }; // Mock input data
      const mockResponse: ApiResponse = { status: 'OK' }; // Mock the successful response

      const navigateByUrlSpy = spyOn(router, 'navigateByUrl'); // Spy on the navigateByUrl method to check for redirection
      const itemToRemove = spyOn(localStorage, 'removeItem'); // Spy on the localStorage.removeItem method

      component.authService.changePassword(json).subscribe({
        next: (response: ApiResponse) => {
          expect(response.status).toBe('OK');
          expect(component.loadingSpinner).toBeFalse(); // Ensure loading spinner is stopped
          expect(itemToRemove).toHaveBeenCalledWith('Token');
          expect(itemToRemove).toHaveBeenCalledWith('loggedUsedId');
          expect(navigateByUrlSpy).toHaveBeenCalledWith('login');
        }
      });

      // Mock the HTTP request and return the response
      const req = httpMock.expectOne('your-api-url-here'); // Replace with actual API URL
      expect(req.request.method).toBe('POST'); // Assuming it's a POST request
      req.flush(mockResponse); // Return the mock response
    });

    it('should not call AuthService.changePassword if form is invalid', () => {
      spyOn(component, 'isFormValid').and.returnValue(false);

      component.onSubmit();

      expect(mockAuthService.changePassword.bind(mockAuthService)).not.toHaveBeenCalled();
      expect(component.loadingSpinner).toBeFalse();
    });

    it('should set error message if there is an error from changePassword API', () => {
      const mockError = { customMessage: 'Invalid credentials' };
      component.userData = { oldPassword: 'oldPass123', newPassword: 'newPass123', confirmPass: 'newPass123' };

      mockAuthService.changePassword.and.returnValue(throwError(() => mockError));
      spyOn(component, 'isFormValid').and.returnValue(true);

      component.onSubmit();

      expect(component.errorMessage).toBe('Invalid credentials');
      expect(component.loadingSpinner).toBeFalse();
    });

    it('should remove Token and loggedUserId from localStorage if password change is successful', () => {
      const mockResponse: ApiResponse = { status: 'OK' };
      component.userData = { oldPassword: 'oldPass123', newPassword: 'newPass123', confirmPass: 'newPass123' };

      mockAuthService.changePassword.and.returnValue(of(mockResponse));
      const itemToRemove = spyOn(localStorage, 'removeItem');
      spyOn(component, 'isFormValid').and.returnValue(true);

      component.onSubmit();

      expect(itemToRemove).toHaveBeenCalledWith('Token');
      expect(itemToRemove).toHaveBeenCalledWith('loggedUsedId');
    });
  });

  // Test Cases for `isFormValid()`
  describe('isFormValid', () => {
    it('should return false if all fields are empty', () => {
      component.userData = { oldPassword: '', newPassword: '', confirmPass: '' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.errorMessage).toBe(loginConst.emptyFields);
    });

    it('should return false if newPassword and confirmPass are empty', () => {
      component.userData = { oldPassword: 'oldPass123', newPassword: '', confirmPass: '' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.newPassError).toBe(loginConst.newPassword);
      expect(component.confirmPassError).toBe(loginConst.confirmPass);
    });

    it('should return false if oldPassword is empty', () => {
      component.userData = { oldPassword: '', newPassword: 'newPass123', confirmPass: 'newPass123' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.oldPassError).toBe(loginConst.oldPassword);
    });

    it('should return false if newPassword is empty', () => {
      component.userData = { oldPassword: 'oldPass123', newPassword: '', confirmPass: 'newPass123' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.newPassError).toBe(loginConst.newPassword);
    });

    it('should return false if confirmPass is empty', () => {
      component.userData = { oldPassword: 'oldPass123', newPassword: 'newPass123', confirmPass: '' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.confirmPassError).toBe(loginConst.confirmPass);
    });

    it('should return false if newPassword is less than 8 characters', () => {
      component.userData = { oldPassword: 'oldPass123', newPassword: 'short', confirmPass: 'short' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.newPassError).toBe(loginConst.passLength);
    });

    it('should return false if newPassword and confirmPass do not match', () => {
      component.userData = { oldPassword: 'oldPass123', newPassword: 'newPass123', confirmPass: 'diffPass123' };
      const result = component.isFormValid();
      expect(result).toBeFalse();
      expect(component.newOldPassError).toBe(loginConst.newConfirmSame);
    });

    it('should return true if all fields are valid', () => {
      component.userData = { oldPassword: 'oldPass123', newPassword: 'newPass123', confirmPass: 'newPass123' };
      const result = component.isFormValid();
      expect(result).toBeTrue();
    });
  });

  // Test Cases for `resetErrors()`
  describe('resetErrors', () => {
    it('should reset all error messages', () => {
      component.oldPassError = 'Old password is required';
      component.newPassError = 'New password is required';
      component.confirmPassError = 'Confirm password is required';
      component.newOldPassError = 'Passwords do not match';
      component.errorMessage = 'Some error occurred';

      component.resetErrors();

      expect(component.oldPassError).toBe('');
      expect(component.newPassError).toBe('');
      expect(component.confirmPassError).toBe('');
      expect(component.newOldPassError).toBe('');
      expect(component.errorMessage).toBe('');
    });
  });

  // Test Cases for `showPass()`
  describe('showPass', () => {
    it('should toggle the password visibility for the given index', () => {
      component.showPass(0);
      expect(component.showIcon[0]).toBeTrue();
      expect(component.controlType[0]).toBe('text');

      component.showPass(0);
      expect(component.showIcon[0]).toBeFalse();
      expect(component.controlType[0]).toBe('password');
    });
  });

  // Test Cases for `empty()`
  describe('empty', () => {
    it('should log "empty function" when called', () => {
      component.empty();
    });
  });
});
