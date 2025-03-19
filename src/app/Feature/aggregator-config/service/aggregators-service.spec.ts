import { TestBed } from '@angular/core/testing';
import { aggregatorService } from './aggregators-service'; // Update with correct path
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonService } from '../../../Core/services/common.service';
// import { CommonResponseJson } from '../../../Shared/const/common.constant';

describe('ApiSettingService', () => {
  let httpMock: HttpTestingController;
  const commonService = TestBed.inject(CommonService); // Inject the service
  
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        aggregatorService
      ]
    });

    // service = TestBed.inject(aggregatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure no outstanding HTTP requests
    httpMock.verify();
  });

  // it('should fetch all aggregators', () => {
  //   const mockResponse: CommonResponseJson = { success: 'OK', data: [],
  //   message : 'string', statusCode : 200
  //    };

  //   service.getAggregators().subscribe((response :CommonResponseJson) => {
  //     expect(response).toEqual(mockResponse);
  //   });

  //   const req = httpMock.expectOne(commonService.baseUrl + 'aggregator/getall');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockResponse);
  // });

  it('should enable/disable connection of aggregator', () => {
    const id = '1';
    const currentStatus = 'active';
    const body = { id, currentStatus };

    // service.connectionEnableDisable(id, currentStatus).subscribe();

    const req = httpMock.expectOne(commonService.baseUrl + 'aggregator/connectionStatus');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({});
  });

  it('should make a POST request to enable/disable connection of aggregator with correct body', () => {
    const id = '123'; // Example id
    const currentStatus = 'active'; // Example status
    const expectedBody = { id, currentStatus };

    // Call the method
    // Verify the HTTP request
    const req = httpMock.expectOne(commonService.baseUrl + 'aggregator/connectionStatus');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedBody);

    // Simulate a successful response (empty response)
    req.flush({});
  });
});
