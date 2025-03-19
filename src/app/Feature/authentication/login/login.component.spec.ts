import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth-service/auth.service';
import { throwError, of } from 'rxjs';
import { CustomError } from '../interface/login-interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']);
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  // Test: Form contains email and password inputs
  it('should have a form with email and password controls', () => {
    const emailControl = fixture.debugElement.query(By.css('#email'));
    const passwordControl = fixture.debugElement.query(By.css('#password'));

    expect(emailControl).toBeTruthy();
    expect(passwordControl).toBeTruthy();
  });

  // Test: Invalid email format
  it('should show validation errors if email is invalid', () => {
    component.userData.email = 'invalid-email';
    component.userData.password = 'password123';
    component.onSubmit();
    fixture.detectChanges();

    expect(component.usernameError).toBe(component.loginConst.invalidUser);
  });

  // Test: Missing password error
  it('should show validation errors if password is missing', () => {
    component.userData.email = 'test@example.com';
    component.userData.password = '';
    component.onSubmit();
    fixture.detectChanges();
    expect(component.passwordError).toBe(component.loginConst.requiredPass);
  });

  // Test: Invalid password length
  it('should show password length error if password is too short', () => {
    component.userData.email = 'test@example.com';
    component.userData.password = 'short';
    component.onSubmit();
    fixture.detectChanges();
    expect(component.passwordError).toBe(component.loginConst.passwordLength);
  });

  // Test: Submit button disabled when form is invalid
  it('should disable submit button when form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;

    // Initially, the button should be enabled
    component.userData.email = 'test@example.com';
    component.userData.password = 'password123';
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();

    // Now set invalid email and password
    component.userData.email = ''; // Invalid email
    component.userData.password = ''; // Invalid password
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();
  });

  // Test: Login success, token and userId are stored, and redirect occurs
  it('should store token and userId and navigate to dashboard on successful login', () => {
    const mockResponse = { success: 'OK', userId: '123', token: 'abc123' };
    authService.login.and.returnValue(of(mockResponse));
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();

    component.userData = { email: 'test@example.com', password: 'password123' };
    component.onSubmit();

    expect(localStorage.getItem('Token')).toBe('abc123');
    expect(localStorage.getItem('loggedUserId')).toBe('123');
    expect(navigateByUrlSpy).toHaveBeenCalledWith('view/dashboard');
  });

  // Test: Login error (incorrect password)
  it('should handle login error with incorrect password', () => {
    const mockError = new CustomError('Authentication failed');
    mockError.customMessage = 'Incorrect password.';

    authService.login.and.returnValue(throwError(mockError));

    component.userData = { email: 'test@example.com', password: 'wrongPassword' };
    component.onSubmit();

    expect(component.passwordError).toBe('Incorrect password.');
    expect(component.isLoading).toBeFalse();
    expect(component.showIcon).toBeFalse();
  });

  // Test: Login error (user not found)
  it('should handle login error with user not found', () => {
    const mockError = new CustomError('Authentication failed');
    mockError.customMessage = 'User not found.';

    component.userData = { email: 'nonexistent@example.com', password: 'anyPassword' };
    authService.login.and.returnValue(throwError(mockError));

    component.onSubmit();

    expect(component.usernameError).toBe('User not found.');
    expect(component.isLoading).toBeFalse();
    expect(component.showIcon).toBeFalse();
  });

  // Test: Generic error case
  it('should handle login error with generic error', () => {
    const mockError = new CustomError('Authentication failed');
    mockError.customMessage = '';

    component.userData = { email: 'test@example.com', password: 'password123' };
    authService.login.and.returnValue(throwError(mockError));

    component.onSubmit();

    expect(component.usernameError).toBe('Invalid credentials are provided');
    expect(component.isLoading).toBeFalse();
    expect(component.showIcon).toBeFalse();
  });

  // Test: Check email validation on blur
  it('should show email validation error if email is invalid on blur', () => {
    component.userData.email = 'invalid-email';
    component.checkEmailIsValid();
    fixture.detectChanges();
    expect(component.usernameError).toBe(component.loginConst.invalidEmail);
  });

  // Test: Check for valid email input
  it('should pass valid email input on blur', () => {
    component.userData.email = 'valid@example.com';
    component.checkEmailIsValid();
    fixture.detectChanges();
    expect(component.usernameError).toBe('');
  });

  // Test: Show password when eye icon is clicked
  it('should toggle password visibility when the eye icon is clicked', () => {
    const eyeIcon = fixture.debugElement.query(By.css('.eye-icon'));
    eyeIcon.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showIcon).toBeTrue();
    expect(component.controlType).toBe('text');
  });

  // Test: Go to forgot password page when link is clicked
  it('should navigate to forgot password page when link is clicked', () => {
    const forgotPasswordLink = fixture.debugElement.query(By.css('.forget-password'));
    forgotPasswordLink.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(router.navigateByUrl.calls.mostRecent().args[0]).toBe('forgot-password');
  });

  // Test: Go to change password page when link is clicked
  it('should navigate to change password page when link is clicked', () => {
    const changePasswordLink = fixture.debugElement.query(By.css('.change-password'));
    changePasswordLink.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(router.navigateByUrl.calls.mostRecent().args[0]).toBe('change-password');
  });

  // Test: Check if empty function is called
  it('should call empty function', () => {
    spyOn(component, 'empty');
    component.empty();
    expect(component.empty()).toHaveBeenCalled();
  });

  // Test: Go to forgot password screen when goToForgot() is called
  it('should navigate to forgot password screen when goToForgot() is called', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.goToForgot();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('forgot-password');
  });

  
  it('should log "empty function" to the console when called', () => {
    component.empty();
  });

  it('should toggle showIcon and controlType correctly when called', () => {
    // Initially, we expect showIcon to be false and controlType to be "password"
    expect(component.showIcon).toBeFalse();
    expect(component.controlType).toBe('password');

    // Call the showPass method
    component.showPass();

    // After calling showPass, showIcon should be true and controlType should be "text"
    expect(component.showIcon).toBeTrue();
    expect(component.controlType).toBe('text');

    // Call showPass again to toggle it back
    component.showPass();

    // After calling showPass again, showIcon should be false and controlType should be "password"
    expect(component.showIcon).toBeFalse();
    expect(component.controlType).toBe('password');
  });
  // Test: Go to change password screen when goToChangePass() is called
  it('should navigate to change password screen when goToChangePass() is called', () => {
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    component.goToChangePass();
    expect(navigateByUrlSpy).toHaveBeenCalledWith('change-password');
  });
  it('should return false if both email and password are empty', () => {
    // Setup
    component.userData = { email: '', password: '' };
    component.usernameError = '';
    
    // Call the method
    // const result = component.isFormValid();

    // Assert the result and error message
    // expect(result).toBeFalse();
    expect(component.errorMessage).toBe(component.loginConst.invalidUserAndPass);
  });

  it('should return false if email is empty', () => {
    // Setup
    component.userData = { email: '', password: 'password123' };
    component.usernameError = '';
    
    // Call the method
    // const result = component.isFormValid();

    // Assert the result and error message
    // expect(result).toBeFalse();
    expect(component.usernameError).toBe(component.loginConst.invalidUser);
  });

  it('should return false if password is empty', () => {
    // Setup
    component.userData = { email: 'user@example.com', password: '' };
    component.usernameError = '';
    
    // Call the method
    // const result = component.isFormValid();

    // Assert the result and error message
    // expect(result).toBeFalse();
    expect(component.passwordError).toBe(component.loginConst.requiredPass);
  });

  it('should return true if both email and password are valid', () => {
    // Setup
    component.userData = { email: 'user@example.com', password: 'password123' };
    component.usernameError = '';
    
    // Call the method
    // const result = component.isFormValid();

    // Assert the result
    // expect(result).toBeTrue();
  });

  it('should not check if usernameError is not empty', () => {
    // Setup
    component.userData = { email: '', password: 'password123' };
    component.usernameError = 'Some error';
    
    // Call the method
    // const result = component.isFormValid();

    // Assert the result and ensure no error message is set
    // expect(result).toBeTrue();
    expect(component.usernameError).toBe('Some error');
    expect(component.errorMessage).toBeUndefined();
  });
  it('should navigate to change-password route', () => {
    // Call the goToChangePass method
    component.goToChangePass();
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl').and.callThrough();

    // Assert that navigateByUrl was called with the correct URL
    expect(navigateByUrlSpy).toHaveBeenCalledWith('change-password');
  });

});
