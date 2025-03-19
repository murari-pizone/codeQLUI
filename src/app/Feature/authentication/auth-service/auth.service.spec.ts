import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ApiResponse, ChangePassword, ForgotPassword, OtpJson, UpdatePassword, UserLogin } from '../interface/login-interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000/';  // Replace with your actual base URL for testing

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return a token', () => {
    const loginData: UserLogin = { email: 'test', password: 'password' };
    const mockResponse = {
      success: 'true',
      userId: '12345',
      token: 'fake-token',
      customMessage: 'Login successful'
    };

    service.login(loginData).subscribe((response) => {
      expect(response.success).toBe('true');
      expect(response.token).toBe('fake-token');
    });

    const req = httpMock.expectOne(`${baseUrl}auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call forgotPassword and return an ApiResponse', () => {
    const forgotPasswordData: ForgotPassword = { email: 'test@example.com' };
    const mockResponse: ApiResponse = { success: 'Ok', message: 'Check your email for the reset link' };

    service.forgotPassword(forgotPasswordData).subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.message).toBe('Check your email for the reset link');
    });

    const req = httpMock.expectOne(`${baseUrl}auth/forget-password`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call verifyOtp and return an ApiResponse', () => {
    const otpData: OtpJson = { otp: '123456' };
    const mockResponse: ApiResponse = { success: 'true', message: 'OTP verified' };

    service.verifyOtp(otpData).subscribe((response) => {
      expect(response.success).toBeTrue();
      expect(response.message).toBe('OTP verified');
    });

    const req = httpMock.expectOne(`${baseUrl}auth/verify-otp`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call forgotUpdatePassword and return the status', () => {
    const updatePasswordData: UpdatePassword = { userId: '12345', newPassword: 'newPassword' };
    const mockResponse = { status: 'Password updated successfully' };

    service.forgotUpdatePassword(updatePasswordData).subscribe((response) => {
      expect(response.status).toBe('Password updated successfully');
    });

    const req = httpMock.expectOne(`${baseUrl}auth/set-password`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call changePassword and set Authorization header if token exists', () => {
    const changePasswordData: ChangePassword = { oldPassword: 'oldPassword', newPassword: 'newPassword' };

    // Mock the localStorage to return a token
    spyOn(localStorage, 'getItem').and.returnValue('Bearer fake-token');
    
    service.changePassword(changePasswordData).subscribe();

    const req = httpMock.expectOne(`${baseUrl}auth/reset-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
  });

  it('should not set Authorization header if no token exists in localStorage', () => {
    const changePasswordData: ChangePassword = { oldPassword: 'oldPassword', newPassword: 'newPassword' };

    // Mock the localStorage to return null
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    service.changePassword(changePasswordData).subscribe();

    const req = httpMock.expectOne(`${baseUrl}auth/reset-password`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBeFalse();
  });

  it('should return true if a token exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    expect(service.getToken()).toBeTrue();
  });

  it('should return false if no token exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.getToken()).toBeFalse();
  });
});
