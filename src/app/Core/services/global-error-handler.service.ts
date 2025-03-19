import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Log the error, show a notification, or redirect to an error page
    console.error('An unexpected error occurred:handleglobal error', error);
    // Perform additional actions like reporting to a service or showing user feedback
  }
}