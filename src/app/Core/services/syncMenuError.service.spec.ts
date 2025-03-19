import { TestBed } from '@angular/core/testing';
import { SyncMenuErrorService } from './syncMenuError.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService } from './common.service';
import { CommonResponseJson } from '../../Shared/const/common.constant';

describe('SyncMenuErrorService', () => {
  let service: SyncMenuErrorService;
  let httpMock: HttpTestingController;

  const mockResponse: any = { status: 'success', message: 'Sync successful' }; // Mock response

  // Mock the CommonService for baseUrl
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SyncMenuErrorService,
        { provide: CommonService, useValue: { baseUrl: 'https://api.example.com/' } }  // Mock baseUrl
      ]
    });
    service = TestBed.inject(SyncMenuErrorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Ensures that no HTTP requests are pending
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to the correct endpoint with the correct headers and body when a token is present', () => {
    const mockToken = 'mockToken';
    const requestPayload = { Region: 'NA', ShopCode: '123' };

    // Spy on localStorage to simulate the token
    spyOn(localStorage, 'getItem').and.returnValue(mockToken);

    const req = httpMock.expectOne('https://api.example.com/sync-menu');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestPayload);

    // Check if the Authorization header contains the token
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    req.flush(mockResponse as CommonResponseJson); // Mock the response from the server
  });

  it('should make a POST request without the Authorization header if no token is present', () => {
    const requestPayload = { Region: 'NA', ShopCode: '123' };

    // Spy on localStorage to simulate no token
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const req = httpMock.expectOne('https://api.example.com/sync-menu');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(requestPayload);

    // Ensure the Authorization header is not present
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush(mockResponse as CommonResponseJson); // Mock the response from the server
  });

  it('should return a response from the API', () => {
    const req = httpMock.expectOne('https://api.example.com/sync-menu');
    req.flush(mockResponse as CommonResponseJson); // Mock the successful response

    expect(req.request.method).toBe('POST');
  });

  it('should handle error response gracefully', () => {

    const req = httpMock.expectOne('https://api.example.com/sync-menu');
    req.flush('Something went wrong', { status: 500, statusText: 'Internal Server Error' });  // Mock the error response
  });
});