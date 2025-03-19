import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

interface CustomError {
  message?: string;
  error?: string;
}
@Injectable()
export default class GlobalInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {

    // Retrieve the token from localStorage
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('Token') : null;
    // Clone the request and set the new headers
    const clonedReq = token
      ? req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      : req;
    return handler.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        let customError;
        const customMsg:string = 'We encountered an unexpected error. Please refresh the page';
        if([(error.error as CustomError)?.error].includes('Database query for execution') || error?.message.includes('Http failure response for')){
          customError = customMsg;
        }else
        if((error.error as CustomError)?.message){
          customError = (error.error as CustomError)?.message ?? customMsg;
        }else if((error.error as CustomError)?.error){
          customError = (error.error as CustomError)?.error ?? customMsg;
        }else{
          customError = customMsg
        }

        const modifiedError = {
          ...error, // copy the existing properties
          customMessage: customError // add your custom message or property
        };

        // Return an observable with a user-facing error message
        return throwError(() => modifiedError);
      })
    );
  }
}