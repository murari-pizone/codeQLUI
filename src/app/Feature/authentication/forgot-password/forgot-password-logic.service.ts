import { Injectable } from "@angular/core";
import { loginConst } from "../const/login-const";
import { ApiResponse, ForgotPassword } from "../interface/login-interface";

@Injectable({
    providedIn: 'root',
  })
  export class ForgotPasswordLogicService {
    constructor() {}

  
    // validation for old , new and confirm password 
    validatePassword(password: string, confirmPass: string): { valid: boolean, errors: string[] } {
      const errors = [];
  
      if (!password || password.trim() === '') {
        errors.push(loginConst.newPassword);
      }
      if (password.length < 8) {
        errors.push(loginConst.passLength);
      }
      if (!confirmPass || confirmPass.trim() === '') {
        errors.push(loginConst.confirmPass);
      }
      if (password !== confirmPass) {
        errors.push(loginConst.newConfirmSame);
      }

      return {
        valid: errors.length === 0,
        errors
      };
    }
  
    // handel response after verify otp
    handleOtpResponse(response: ApiResponse): string | null {
      if (response.message === 'Verification success') {
        const userId = response.userId?.toString() ?? '';
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('forgotScreen', 'password');
          localStorage.setItem('userId', userId);
        }
        return null; // No error, verification successful
      }
      return 'Invalid or expired OTP';
    }
  
    // handel response of api 
    handleResponse(response: ApiResponse, userData: ForgotPassword): boolean {
      if (response['message'] === 'The OTP has been sent to your email.') {
        this.handleOtpSuccess(userData);
        return true;
      } else {
        this.handleOtpFailure();
        return false
      }
    }
  
    // when otp successfully sended to the user's email than start timer
    handleOtpSuccess(userData: ForgotPassword): void {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('forgotScreen', 'otp');
          if (userData.email) {
            localStorage.setItem('resend', userData.email.toString());
          }
        }
        localStorage.setItem('email', userData.email || '');
      }
  
    handleOtpFailure(): void {
      // Handle OTP failure logic if needed
    }


    // check enter email is valid or not
    isFormValid(userData:ForgotPassword): string {
      const { email } = userData;
  
      if (!email?.trim()) {
        return loginConst.requiredUser;
      }
      const valid = !!email?.trim();
      if (valid) {
        const phonePattern =  /^\d{10}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneValid = phonePattern.test(email);
        const emailValid = emailPattern.test(email);
        if (!(phoneValid || emailValid)) {
          return loginConst.invalidUser;
        }
      }
      return '';
    }

    // when user enter value in otp 
    onKeyUp(event: KeyboardEvent, index: number):string | null {
      const inputValue = (event.target as HTMLInputElement).value;
      // Handle invalid 'e' key for number inputs (e.g., preventing 'e' for exponential numbers)
      if (event.key === 'e') {
        return ''
      }
      // Handle backspace key
      else if (event.key === 'Backspace') {
        this.handleBackspace(event, index);
        return 'handled';
      }
      // Ensure only numeric input is allowed
      else if (!/^\d$/.test(inputValue)) {
        return ''
      }
      // Move to the next input if input length is 1
      this.focusNextInput(event, index);
      return null;
    }

    // when press backspace 
    handleBackspace(event: KeyboardEvent, index: number): void {
      if (index > 0) {
        const currentInput = event.target as HTMLElement;
        const previousInput = currentInput.previousElementSibling as HTMLInputElement;
        if (previousInput) {
          previousInput.focus();
        }
      }
    }

    // when enter value on current input 
    focusNextInput(event: KeyboardEvent, index: number):void {
      if (index < 5) {
        const currentInput = event.target as HTMLElement;
        const nextInput = currentInput.nextElementSibling as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }

    checkEmailIsValid(userData : ForgotPassword):string{
      const { email } = userData;
      if(email?.trim() != ''){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(typeof email === 'string' && !emailRegex.test(email)){
          return loginConst.invalidUser
        }else{
          return ''
        }
      }
      return ''
    }

  validateForm(userData: ForgotPassword): string | null {
    return this.isFormValid(userData) || null;
  }

  getOtpValue(otp: string[]): string {
    return otp.join('');
  }

  isOtpValid(otpValue: string): boolean {
    return otpValue.length === 6;
  }
  }
  