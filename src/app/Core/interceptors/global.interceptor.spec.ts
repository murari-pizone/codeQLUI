/* eslint-disable @typescript-eslint/unbound-method */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest, HttpErrorResponse, HttpHandler,HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import GlobalInterceptor from './global.interceptor';
import { CustomError } from '../../Feature/authentication/interface/login-interface';


describe('GlobalInterceptor', () => {
  let interceptor: GlobalInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GlobalInterceptor ,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: GlobalInterceptor ,
          multi: true
        }
      ]
    });

    interceptor = TestBed.inject(GlobalInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header with token from localStorage', () => {
    // Mock localStorage.getItem to return a token
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');

    const req = new HttpRequest('GET', '/test-url');
    const handler: HttpHandler = {
      handle: (): Observable<HttpEvent<any>> => of({} as HttpEvent<any>) // Cast the empty object to HttpEvent<any>
    };

    interceptor.intercept(req, handler).subscribe();

    // Ensure that the request contains the Authorization header
    expect(req.headers.has('Authorization')).toBeTrue();
    expect(req.headers.get('Authorization')).toBe('Bearer fake-token');
  });

  it('should not add Authorization header if no token is found in localStorage', () => {
    // Mock localStorage.getItem to return null (no token)
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const req = new HttpRequest('GET', '/test-url');
    const handler: HttpHandler = {
      handle: (): Observable<HttpEvent<any>> => of({} as HttpEvent<any>) // Cast the empty object to HttpEvent<any>
    };

    interceptor.intercept(req, handler).subscribe();

    // Ensure that no Authorization header is added
    expect(req.headers.has('Authorization')).toBeFalse();
  });

  it('should handle error with custom error message if message is present', () => {
    const errorResponse = new HttpErrorResponse({
      error: { message: 'Custom error message' },
      status: 500,
      statusText: 'Server Error',
      url: '/test-url'
    });

    const req = new HttpRequest('GET', '/test-url');
    const handler: Partial<HttpHandler> = {
      handle: (): Observable<never> => throwError(() => errorResponse)
    };
    

    interceptor.intercept(req, handler as HttpHandler).subscribe({
      next: () => {},
      error: (error:CustomError) => {
        expect(error.customMessage).toBe('Custom error message');
      }
    });
  });

  it('should handle error with custom error message if error is present', () => {
    const errorResponse = new HttpErrorResponse({
      error: { error: 'Another custom error message' },
      status: 500,
      statusText: 'Server Error',
      url: '/test-url'
    });

    const req = new HttpRequest('GET', '/test-url');
    const handler: Partial<HttpHandler> = {
      handle: (): Observable<never> => throwError(() => errorResponse)
    };

    interceptor.intercept(req, handler as HttpHandler).subscribe({
      next: () => {},
      error: (error:CustomError) => {
        expect(error.customMessage).toBe('Another custom error message');
      }
    });
  });

  it('should handle error with default message if no message or error is provided', () => {
    const errorResponse = new HttpErrorResponse({
      error: {},
      status: 500,
      statusText: 'Server Error',
      url: '/test-url'
    });

    const req = new HttpRequest('GET', '/test-url');
    const handler: Partial<HttpHandler> = {
      handle: (): Observable<never> => throwError(() => errorResponse)
    };

    interceptor.intercept(req, handler as HttpHandler).subscribe({
      next: () => {},
      error: (error:CustomError) => {
        expect(error.customMessage).toBe('Unknown error');
      }
    });
  });
});
