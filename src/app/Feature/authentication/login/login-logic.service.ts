// services/login.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../../Core/services/common.service';
import { CustomError } from '../interface/login-interface';

@Injectable({
  providedIn: 'root',
})
export class LoginLogicService {
  // Validates the login form and returns validation errors
  validateForm(userData: { email: string; password: string }): {
    usernameError?: string;
    passwordError?: string;
  } | null {
    const { email, password } = userData;

    if (!email.trim() && !password.trim()) {
      return { usernameError: 'Email is required', passwordError: 'Password is required' };
    }
    if (!email.trim()) {
      return { usernameError: 'Email is required' };
    }
    if (!password.trim()) {
      return { passwordError: 'Password is required' };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return { usernameError: 'Invalid email format' };
    }

    return null;
  }

  // Validates email on focus out
  validateEmail(email: string): string | null {
    if (!email.trim()) {
      return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? null : 'Invalid email format';
  }

  // Handles successful login and manages navigation/localStorage
  handleLoginSuccess( response: {success : string, userId: string; token: string }, route: Router, commonService: CommonService): void {
    if(response.success == 'ok'){
        const { userId, token } = response;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('Token', token);
            localStorage.setItem('loggedUserId', userId);
        }
    }
    void route.navigateByUrl('view/dashboard').then(() => {
        setTimeout(() => {
            commonService.isLogIn = true;
        }, 100);
    })
  }

  // Handles login errors and returns error messages
  handleLoginError(error: CustomError): {
    usernameError?: string;
    passwordError?: string;
    errorMessage?: string;
  } {
    const message = error.customMessage || 'Unknown error occurred';
    if (message === 'Incorrect password.') {
      return { passwordError: message };
    }
    if (['User does not exist', 'Invalid email format'].includes(message)) {
      return { usernameError: message };
    }
    return { errorMessage: 'An error occurred during login' };
  }
}
