import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { JwtPayload } from 'jwt-decode';
// import * as jwtDecode from 'jwt-decode';
 
import { interval, Subscription } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private tokenCheckSubscription!: Subscription;
  private readonly tokenCheckInterval = 1000; // Check every second
 
  constructor(private router: Router) {}
 
  // Start monitoring token expiration
  public monitorToken(): void {
    this.tokenCheckSubscription = interval(this.tokenCheckInterval).subscribe(() => {
      const token = localStorage.getItem('Token'); // Replace with your token retrieval method
 
      if (token) {
        const isExpired = this.isTokenExpired(token);
        console.log(`Token status: ${isExpired ? 'Expired' : 'Valid'}`);
 
        if (isExpired) {
          this.logout();
        }
      } else {
        // console.log('No token found.');
      }
    });
  }
 
  // Stop monitoring token expiration
  public stopMonitoringToken(): void {
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }
 
  // Check if the token is expired
  private isTokenExpired(token: string): boolean {
    try {
      // Split the JWT to extract the payload
      const payloadBase64 = token.split('.')[1];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = JSON.parse(atob(payloadBase64)); // Decode the Base64 payload
 
      // Check if the `exp` field exists and compare it with the current time
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return payload.exp ? payload.exp < now : true; // Token is expired if `exp` is less than now
    } catch (error) {
      console.error('Invalid token:', error);
      return true; // Treat invalid tokens as expired
    }
  }
 
 
  // Log out the user
  private logout(): void {
    alert('Your session has expired. You are being logged out.');
    sessionStorage.clear(); // Clear user session or tokens
    localStorage.clear(); // Clear user session or tokens
    void this.router.navigateByUrl('/login'); // Redirect to the login page
  }
}