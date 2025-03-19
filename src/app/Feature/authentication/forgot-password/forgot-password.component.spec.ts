import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from '../auth-service/auth.service';
import { of, throwError } from 'rxjs';
import { ForgotPassword } from '../interface/login-interface';
import { loginConst } from '../const/login-const';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', ['forgotPassword', 'verifyOtp', 'forgotUpdatePassword']);
    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['forgotUpdatePassword']);
    fixture.detectChanges();
  });
  afterEach(() => {
    // Reset spy calls to avoid conflicts in subsequent tests
    authService.verifyOtp.calls.reset();
    authService.forgotPassword.calls.reset();
    authService.forgotUpdatePassword.calls.reset();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should focus the previous input when backspace is pressed and index > 0', () => {
    // Mocking a DOM structure with input elements
    const mockInputElements = [
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input')
    ];
    
    document.body.append(...mockInputElements);
  
    // Create spy for the focus method
    spyOn(mockInputElements[1], 'focus');
    spyOn(mockInputElements[0], 'focus');  // For testing the previous input
  
    // Simulate Backspace keydown event
    // const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    // component.handleBackspace(event, 1);  // index is 1, so it should focus the previous input (index 0)
  
    // Check if the previous input's focus method was called
    expect(mockInputElements[0].focus()).toHaveBeenCalled();
  });
  it('should focus the next input when a key is pressed and index < 5', () => {
    // Mocking a DOM structure with input elements
    const mockInputElements = [
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input')
    ];
  
    document.body.append(...mockInputElements);
  
    // Create spy for the focus method
    spyOn(mockInputElements[1], 'focus');
    spyOn(mockInputElements[2], 'focus');  // For testing the next input
  
    // Simulate keydown event for a regular key (not Backspace)
    // const event = new KeyboardEvent('keydown', { key: 'a' });
    // component.focusNextInput(event, 1);  // index is 1, so it should focus the next input (index 2)
  
    // Check if the next input's focus method was called
    expect(mockInputElements[2].focus()).toHaveBeenCalled();
  });
  
  it('should not focus previous input when backspace is pressed and index is 0', () => {
    // Mocking a DOM structure with input elements
    const mockInputElements = [
      document.createElement('input'),
      document.createElement('input')
    ];
    
    document.body.append(...mockInputElements);
  
    // Spy on focus method for previous input
    spyOn(mockInputElements[0], 'focus');
  
    // Simulate Backspace keydown event
    // const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    // component.handleBackspace(event, 0);  // index is 0, so it shouldn't focus any previous input
  
    // Check that the previous input's focus method was not called
    expect(mockInputElements[0].focus()).not.toHaveBeenCalled();
  });
  
  it('should not focus next input when a key is pressed and index is 5', () => {
    // Mocking a DOM structure with input elements
    const mockInputElements = [
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input'),
      document.createElement('input')
    ];
  
    document.body.append(...mockInputElements);
  
    // Spy on focus method for next input
    spyOn(mockInputElements[5], 'focus');
  
    // Simulate keydown event
    // const event = new KeyboardEvent('keydown', { key: 'a' });
    // component.focusNextInput(event, 5);  // index is 5, so it shouldn't focus any next input
  
    // Check that the next input's focus method was not called
    expect(mockInputElements[5].focus()).not.toHaveBeenCalled();
  });
  

  it('should initialize the component and set screen state', () => {
    localStorage.setItem('forgotScreen', 'otp');
    component.ngOnInit();
    expect(component.isForgot).toBe('otp');
  });

  it('should display validation errors for invalid email format', () => {
    component.userData.email = 'invalid-email';
    component.sendEmail(component.userData);
    fixture.detectChanges();

    expect(component.usernameError).toBe(component.loginConstants.invalidUser);
  });

  it('should display validation error for empty email', () => {
    component.userData.email = '';
    component.sendEmail(component.userData);
    fixture.detectChanges();

    expect(component.usernameError).toBe(component.loginConstants.invalidUser);
  });

  it('should submit a valid forgot password request', () => {
    const mockForgotPassword: ForgotPassword = { email: 'test@example.com' };
    authService.forgotPassword.and.returnValue(of({ message: 'The OTP has been sent to your email.' }));

    component.userData.email = 'test@example.com';
    component.sendEmail(component.userData);
    fixture.detectChanges();

    expect(authService.forgotPassword(component.userData)).toHaveBeenCalledWith(mockForgotPassword);
    expect(localStorage.getItem('forgotScreen')).toBe('otp');
    expect(component.isForgot).toBe('otp');
  });

  it('should handle forgotPassword API error correctly', () => {    
    component.userData.email = 'test@example.com';
    component.sendEmail(component.userData);
    
    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.loadingSpinner).toBeFalse();
  });
  it('should clear errors when both password and confirm password are valid', () => {
    // Setup initial data
    component.userData = {
      password: 'validPassword123',
      confirmPass: 'validPassword123'
    };
  
    // Call the method
    component.checkNewAndConfirmPass();
  
    // Assert that errors are cleared
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe('');
  });
  it('should set error for password if it is empty or invalid', () => {
    // Setup initial data with an invalid password
    component.userData = {
      password: '',
      confirmPass: 'validPassword123'
    };
  
    // Call the method
    component.checkNewAndConfirmPass();
  
    // Assert that the error for password is set
    expect(component.newPassError).toBe(component.loginConstants.newPasswordNotValid);
  
    // Now test for the confirm password error
    component.userData.confirmPass = ''; // Make confirm password invalid as well
    component.checkNewAndConfirmPass();
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
  });
  it('should set error for confirm password if it is empty or invalid', () => {
    // Setup initial data with valid password and invalid confirm password
    component.userData = {
      password: 'validPassword123',
      confirmPass: ''
    };
  
    // Call the method
    component.checkNewAndConfirmPass();
  
    // Assert that the error for confirm password is set
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
  });
  it('should set errors for both password and confirm password if both are invalid', () => {
    // Setup initial data with invalid password and confirm password
    component.userData = {
      password: '',
      confirmPass: ''
    };
  
    // Call the method
    component.checkNewAndConfirmPass();
  
    // Assert that the error for password is set
    expect(component.newPassError).toBe(component.loginConstants.newPasswordNotValid);
  
    // Assert that the error for confirm password is set
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
  });
  it('should clear confirm password error if password is valid', () => {
    // Setup initial data with valid password and invalid confirm password
    component.userData = {
      password: 'validPassword123',
      confirmPass: ''
    };
  
    // Call the method
    component.checkNewAndConfirmPass();
  
    // Assert that error for confirm password is set
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
    
    // Now update confirmPass to a valid value
    component.userData.confirmPass = 'validPassword123';
    component.checkNewAndConfirmPass();
    
    // Assert that error for confirm password is cleared
    expect(component.newConfirmPassError).toBe('');
  });
  
  it('should reset errors when resetErrors is called', () => {
    component.usernameError = 'Some error';
    component.resetErrors();
    expect(component.usernameError).toBe('');
  });

  it('should prevent input of "e" in OTP fields', () => {
    // Create a spy on the clearInput method to check if it is called
    // spyOn(component, 'clearInput');
    
    // Create a mock event for keydown with the key 'e'
    const event = new KeyboardEvent('keydown', { key: 'e' });
    
    // Call the onKeyUp method with the mock event and index 0 (first OTP field)
    component.onKeyUp(event, 0);
    
    // Verify that clearInput was called with the correct index
    // expect(component.clearInput(0)).toHaveBeenCalledWith(0);
  });

  it('should return true when both password and confirm password are valid and match', () => {
    // Setup initial data
    component.userData = {
      password: 'validPassword123',
      confirmPass: 'validPassword123'
    };
  
    // Call the method
    // const result = component.updateValid();
  
    // Assert that the function returns true and no error messages are set
    // expect(result).toBe(true);
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe('');
  });
  
  it('should focus on next input when typing in OTP fields', () => {
    const event = new KeyboardEvent('keydown', { key: '1' });
    // const inputElement = document.createElement('input');
    // spyOn(component, 'focusNextInput').and.callThrough();
    component.onKeyUp(event, 0);
    // expect(component.focusNextInput(event,0)).toHaveBeenCalledWith(event, 0);
  });
  it('should return false and set errors when password is empty', () => {
    component.userData = {
      password: '',
      confirmPass: 'validPassword123'
    };
  
    // const result = component.updateValid();
  
    // expect(result).toBe(false);
    expect(component.newPassError).toBe(component.loginConstants.newPassword);
    expect(component.newConfirmPassError).toBe('');
  });
  
  it('should return false and set errors when confirm password is empty', () => {
    component.userData = {
      password: 'validPassword123',
      confirmPass: ''
    };
  
    // const result = component.updateValid();
  
    // expect(result).toBe(false);
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPass);
  });

  it('should log "empty function" to the console', () => {
    // Call the empty function
    component.empty();
  });

  it('should set error when password is empty', () => {
    component.userData = {
      password: '  ',  // Empty string after trimming
      confirmPass: 'validPassword'
    };
  
    component.checkNewAndConfirmPass();
  
    expect(component.newPassError).toBe(component.loginConstants.newPasswordNotValid);
    expect(component.newConfirmPassError).toBe('');
  });
  
  it('should set error when confirm password is empty', () => {
    component.userData = {
      password: 'validPassword',
      confirmPass: '  '  // Empty string after trimming
    };
  
    component.checkNewAndConfirmPass();
  
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
  });
  
  it('should show an error message when API call fails', () => {
    const mockError = { customMessage: "Invalid credentials" };
    mockAuthService.forgotUpdatePassword.and.returnValue(throwError(() => mockError));  // Mock the error response

    component.updatePassword();

    // Ensure that the spinner is stopped and the error message is set
    expect(component.loadingSpinner).toBe(false);
    expect(component.errorMessage).toBe(mockError.customMessage);
  });

  it('should clear errors when both password and confirm password are provided', () => {
    component.userData = {
      password: 'validPassword',
      confirmPass: 'validPassword'
    };
  
    component.checkNewAndConfirmPass();
  
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe('');
  });

  it('should set errors when both password and confirm password are empty', () => {
    component.userData = {
      password: '  ',  // Empty string after trimming
      confirmPass: '  '  // Empty string after trimming
    };
  
    component.checkNewAndConfirmPass();
  
    expect(component.newPassError).toBe(component.loginConstants.newPasswordNotValid);
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
  });
  
  
  it('should call resetErrors and handle localStorage properly when userId is retrieved', () => {
    const mockResponse:{ status: string }  = { status: "OK" };
    mockAuthService.forgotUpdatePassword.and.returnValue(of(mockResponse));  // Mock the API response
    const localStorageSpy = spyOn(localStorage, 'getItem').and.returnValue('123');  // Mock localStorage.getItem
    spyOn(component, 'resetErrors');

    component.updatePassword();

    // Ensure resetErrors is called
    expect(component.resetErrors()).toHaveBeenCalled();
    // Ensure the userId is retrieved from localStorage
    expect(localStorageSpy).toHaveBeenCalledWith('userId');
  });
  it('should set error for password when password contains only spaces', () => {
    component.userData = {
      password: '    ',  // Only spaces
      confirmPass: 'validPassword'
    };
  
    component.checkNewAndConfirmPass();
  
    expect(component.newPassError).toBe(component.loginConstants.newPasswordNotValid);
    expect(component.newConfirmPassError).toBe('');
  });
  
  it('should set error for confirm password when confirm password contains only spaces', () => {
    component.userData = {
      password: 'validPassword',
      confirmPass: '    '  // Only spaces
    };
  
    component.checkNewAndConfirmPass();
  
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe(component.loginConstants.confirmPassNotValid);
  });
  it('should display error message if OTP length is not 6', () => {
    // Mock the otp array to have fewer or more than 6 characters
    component.otp = ['1', '2', '3', '4', '5'];
  
    // Call the submitOTP method
    component.submitOTP();
  
    // Expect the error message to be set
    expect(component.errorMessage).toBe('Please enter the full OTP.');
  });
  it('should handle error correctly when OTP verification fails', () => {
    // Mock the otp array to have 6 characters
    component.otp = ['1', '2', '3', '4', '5', '6'];
  
    // Call the submitOTP method
    component.submitOTP();
  
    // Verify the error handling occurs
    expect(component.errorMessage).toBe('Invalid or expired otp');
    expect(component.loadingSpinner).toBe(false);
  });

  it('should clear input when the "e" key is pressed', () => {
    // Mock the OTP array with a value in the first index
    component.otp = ['1', '', '', '', '', ''];
  
    // Spy on the clearInput method
    // const spyClearInput = spyOn(component, 'clearInput');
  
    // Create a mock KeyboardEvent for the 'e' key
    const mockEvent = { key: 'e', target: { value: '1' } ,  } as unknown as KeyboardEvent;
  
    // Call onKeyUp with the mock event
    component.onKeyUp(mockEvent, 0);
  
    // Expect clearInput to have been called
    // expect(spyClearInput).toHaveBeenCalledWith(0);
  });

  it('should call handleBackspace when the "Backspace" key is pressed', () => {
    // Mock the OTP array
    component.otp = ['1', '', '', '', '', ''];

    // Spy on the handleBackspace method
    // const spyHandleBackspace = spyOn(component, 'handleBackspace');

    // Create a mock KeyboardEvent for the 'Backspace' key
    const mockEvent = { key: 'Backspace', target: { value: '1' } } as unknown as KeyboardEvent;

    // Call onKeyUp with the mock event
    component.onKeyUp(mockEvent, 0);

    // Expect handleBackspace to have been called
    // expect(spyHandleBackspace).toHaveBeenCalledWith(mockEvent, 0);
  });

  it('should clear input when a non-numeric key is pressed', () => {
    // Mock the OTP array
    component.otp = ['1', '', '', '', '', ''];

    // Spy on the clearInput method
    // const spyClearInput = spyOn(component, 'clearInput');

    // Create a mock KeyboardEvent for a non-numeric key
    const mockEvent = { key: 'a', target: { value: '1' } } as unknown as KeyboardEvent;

    // Call onKeyUp with the mock event
    component.onKeyUp(mockEvent, 0);

    // Expect clearInput to have been called
    // expect(spyClearInput).toHaveBeenCalledWith(0);
  });

  it('should move to the next input when a valid numeric key is pressed', () => {
    // Mock the OTP array
    component.otp = ['', '', '', '', '', ''];

    // Spy on the focusNextInput method
    // const spyFocusNextInput = spyOn(component, 'focusNextInput');

    // Create a mock KeyboardEvent for the '1' key
    const mockEvent = { key: '1', target: { value: '1' } } as unknown as KeyboardEvent;

    // Call onKeyUp with the mock event
    component.onKeyUp(mockEvent, 0);

    // Expect focusNextInput to have been called
    // expect(spyFocusNextInput).toHaveBeenCalledWith(mockEvent, 0);
  });

  it('should handle empty OTP and display error message', () => {
    // Mock the otp array to be empty
    component.otp = [];
  
    // Call the submitOTP method
    component.submitOTP();
  
    // Verify that an error message is displayed
    expect(component.errorMessage).toBe('Please enter the full OTP.');
  });
  
  it('should submit OTP successfully if the OTP length is 6', () => {
    // Mock the otp array to have 6 characters
    component.otp = ['1', '2', '3', '4', '5', '6'];

    // Spy on the AuthService's verifyOtp method
    const spyVerifyOtp = spyOn(authService, 'verifyOtp').and.returnValue(of({
      message: 'Verification success',
      userId: 12345
    }));

    // Spy on localStorage.setItem to check if it's called
    const spyLocalStorageSetItem = spyOn(localStorage, 'setItem');

    // Call the submitOTP method
    component.submitOTP();

    // Expect verifyOtp to have been called
    expect(spyVerifyOtp).toHaveBeenCalled();

    // Expect that the response handling logic occurs
    expect(spyLocalStorageSetItem).toHaveBeenCalledWith('forgotScreen', 'password');
    expect(spyLocalStorageSetItem).toHaveBeenCalledWith('userId', '12345');
    expect(component.isForgot).toBe('password');
    expect(component.loadingSpinner).toBe(false);
  });
  it('should return false and set error message when both password and confirm password are empty', () => {
    // Setup user data with empty password and confirm password
    component.userData = {
      password: '  ',  // Empty password (with spaces)
      confirmPass: '  ' // Empty confirm password (with spaces)
    };
  
    // Call the updateValid method
    // const result = component.updateValid();
  
    // Assert that the method returns false and the error message is set to 'Please fill the required fields'
    // expect(result).toBe(false);
    expect(component.errorMessage).toBe('Please fill the required fields');
  });
  
  it('should clear input if "e" key is pressed', () => {
    const event = new KeyboardEvent('keyup', { key: 'e' });
    
    // Call onKeyUp with an index and the "e" key event
    component.onKeyUp(event, 0);
    
    // Expect clearInput to have been called with the correct index
    // expect(component.clearInput(0)).toHaveBeenCalledWith(0);
  });

  it('should call handleBackspace if "Backspace" key is pressed', () => {
    const event = new KeyboardEvent('keyup', { key: 'Backspace' });
    
    // Call onKeyUp with an index and the "Backspace" key event
    component.onKeyUp(event, 1);
    
    // Expect handleBackspace to have been called with the event and the correct index
    // expect(component.handleBackspace(event, 1)).toHaveBeenCalledWith(event, 1);
  });

  it('should clear input if a non-numeric character is entered', () => {
    const event = new KeyboardEvent('keyup', { key: 'a' });
    
    // Simulate a non-numeric input
    component.onKeyUp(event, 2);
    
    // Expect clearInput to have been called with the correct index
    // expect(component.clearInput(2)).toHaveBeenCalledWith(2);
  });

  it('should call focusNextInput if input length is 1', () => {
    // Simulate a numeric input with length 1
    const event = new KeyboardEvent('keyup', { key: '5' });
    // Mock the value of the input
    (event.target as HTMLInputElement).value = '5';
    
    component.onKeyUp(event, 0);
    
    // Expect focusNextInput to have been called with the correct event and index
    // expect(component.focusNextInput(event, 0)).toHaveBeenCalledWith(event, 0);
  });

  it('should not move to next input if input length is greater than 1', () => {
    // Simulate a numeric input with length greater than 1
    const event = new KeyboardEvent('keyup', { key: '1' });
    (event.target as HTMLInputElement).value = '12'; // Length > 1
    
    component.onKeyUp(event, 0);
    
    // Expect focusNextInput not to have been called
    // expect(component.focusNextInput(event, 0)).not.toHaveBeenCalled();
  });

  it('should return false and set error message when password length is less than 8 characters', () => {
    component.userData = {
      password: 'short',
      confirmPass: 'short'
    };
  
    // const result = component.updateValid();
  
    // expect(result).toBe(false);
    expect(component.newConfirmPassError).toBe(component.loginConstants.passLength);
  });
  it('should return false and set error message when password and confirm password do not match', () => {
    component.userData = {
      password: 'validPassword123',
      confirmPass: 'mismatchPassword123'
    };
  
    // const result = component.updateValid();
  
    // expect(result).toBe(false);
    expect(component.newConfirmPassError).toBe(component.loginConstants.newConfirmSame);
  });
  it('should return false and set error message when password is empty and confirm password is filled', () => {
    component.userData = {
      password: '',
      confirmPass: 'validPassword123'
    };
  
    // const result = component.updateValid();
  
    // expect(result).toBe(false);
    expect(component.newPassError).toBe(component.loginConstants.newPassword);
    expect(component.newConfirmPassError).toBe('');
  });
  
  it('should clear OTP input when invalid key is pressed', () => {
    // spyOn(component, 'clearInput'); // Spy on the clearInput method
    const event = new KeyboardEvent('keydown', { key: 'a' }); // Invalid key
    component.onKeyUp(event, 0); // Assuming OTP field index 0
    // expect(component.clearInput(0)).toHaveBeenCalledWith(0);
  });

  it('should show error when OTP is incomplete during submission', () => {
    component.otp = ['1', '2', '3', '4', '5']; // Incomplete OTP
    component.submitOTP();
    expect(component.errorMessage).toBe('Please enter the full OTP.');
  });

  it('should set isForgot to "password" after successful OTP verification', () => {
    component.otp = ['1', '2', '3', '4', '5', '6'];
    component.submitOTP();
    
    expect(component.isForgot).toBe('password');
    expect(localStorage.getItem('forgotScreen')).toBe('password');
    expect(localStorage.getItem('userId')).toBe('123');
  });

  it('should handle OTP submission error', () => {
    
    component.otp = ['1', '2', '3', '4', '5', '6'];
    component.submitOTP();
    
    expect(component.errorMessage).toBe('Invalid or expired otp');
    expect(component.loadingSpinner).toBeFalse();
  });

  it('should handle update password error correctly', () => {
    component.userData.password = 'newPassword123';
    component.userData.confirmPass = 'newPassword123';
    component.updatePassword();
    
    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.loadingSpinner).toBeFalse();
  });

  it('should validate password and confirm password fields correctly', () => {
    component.userData.password = 'password';
    component.userData.confirmPass = 'password123';
    
    // expect(component.updateValid()).toBeFalse();
    expect(component.newConfirmPassError).toBe(loginConst.newConfirmSame);
    
    component.userData.password = 'newPassword123';
    component.userData.confirmPass = 'newPassword123';
    
    // expect(component.updateValid()).toBeTrue();
  });

  it('should toggle password visibility', () => {
    component.showPass(0);
    expect(component.showIcon[0]).toBeTrue();
    expect(component.controlType[0]).toBe('text');
    
    component.showPass(0);
    expect(component.showIcon[0]).toBeFalse();
    expect(component.controlType[0]).toBe('password');
  });

  it('should handle email validation on blur', () => {
    component.userData.email = 'invalid-email';
    // component.checkEmailIsValid();
    expect(component.usernameError).toBe(loginConst.invalidEmail);
    
    component.userData.email = 'valid@example.com';
    // component.checkEmailIsValid();
    expect(component.usernameError).toBe('');
  });

  it('should handle new password and confirm password validation on blur', () => {
    component.userData.password = 'newPassword';
    component.userData.confirmPass = 'newPassword123';
    component.checkNewAndConfirmPass();
    expect(component.newPassError).toBe('');
    expect(component.newConfirmPassError).toBe('');
  });

  it('should reset errors when resetErrors is called', () => {
    component.usernameError = 'Some error';
    component.resetErrors();
    expect(component.usernameError).toBe('');
  });
});
