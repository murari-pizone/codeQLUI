/* eslint-disable */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { aggregatorListComponent } from './list-aggregator.component';
import { aggregatorService } from '../../service/aggregators-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Avoid animation-related errors in tests
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Aggregator } from '../interface/list-aggregator.interface';
import { of, throwError } from 'rxjs';

import { ApiSettingConstants } from '../const/list-aggregator.const';
import { AddAggregatorDialogComponent } from '../../add-aggregator/addAggregator.component';
import { EditAggregatorDialogComponent } from '../../update-aggregator/updateAggregator.component';
import { HttpClientModule } from '@angular/common/http';

describe('ApiSettingComponent', () => {
  let component: aggregatorListComponent;
  let fixture: ComponentFixture<aggregatorListComponent>;
  let service: aggregatorService;
  let dialog: MatDialog;
  let toaster: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        ClipboardModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      providers: [
        aggregatorService,
        MatDialog,
        ToastrService,
        ApiSettingConstants,
        { provide: MatDialogRef, useValue: {} }, // Mock MatDialogRef
        {
          provide: aggregatorService,
          useValue: {
            getAggregators: jasmine.createSpy().and.returnValue(of({
              statusCode: 200,
              data: [{
                id: '1',
                aggregator_name: 'Aggregator 1',
                status: 'active',
                toggleStatusButton: true,
                api_key: 'apiKey1',
                secret_key: 'secretKey1',
                endpoint_url: 'https://api.example.com'
              }]
            })),
            updateAggregator: jasmine.createSpy().and.returnValue(of({})),
            deleteAggregator: jasmine.createSpy().and.returnValue(of({}))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(aggregatorListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(aggregatorService);
    dialog = TestBed.inject(MatDialog);
    toaster = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

it('should set aggregators and toggle status button when the API call is successful', () => {
  // Mocking the response
  // const mockResponse: any = {
  //   statusCode: 200,
  //   data: [
  //     { status: 'active', toggleStatusButton: false },
  //     { status: 'inactive', toggleStatusButton: false }
  //   ]
  // };

  // spyOn(component.service, 'getAggregators').and.returnValue(of(mockResponse));  // Mocking the service call

  component.getAggregator();  // Calling the method

  // Asserting that the aggregators are set and the status button is toggled correctly
  expect(component.aggregators.length).toBe(2);
  expect(component.aggregators[0].toggleStatusButton).toBeTrue();
  expect(component.aggregators[1].toggleStatusButton).toBeFalse();
  expect(component.loadingSpinner).toBeFalse();  // Spinner should stop
});



it('should stop the spinner and log successful message when the API call completes', () => {
  // const mockResponse: any = { statusCode: 200, data: [] };
  // spyOn(component.service, 'getAggregators').and.returnValue(of(mockResponse));  // Mocking the service call
  const logSpy = spyOn(console, 'log');  // To spy on the console log

  component.getAggregator();  // Calling the method

  // Asserting completion behavior
  expect(component.loadingSpinner).toBeFalse();  // Spinner should stop
  expect(logSpy).toHaveBeenCalledWith(component.constant.successfulDataFetched);  // Completion message should be logged
});

  it('should get aggregators on init', () => {
    spyOn(service, 'getAggregators').and.callThrough();
    component.ngOnInit();
    expect(service.getAggregators).toHaveBeenCalled();
    expect(component.aggregators.length).toBeGreaterThan(0);
  });

  it('should handle error while fetching aggregators', () => {
    spyOn(service, 'getAggregators').and.returnValue(throwError('Error fetching aggregators'));
    component.getAggregator();

    expect(component.isErrorOccur).toBeTrue();
    expect(component.errorMsg).toBe('Error fetching aggregators');
  });

  it('should add an aggregator and update the list', () => {
    const mockAggregator: Aggregator = {
      id: '2',
      aggregator_name: 'Aggregator 2',
      status: 'inactive',
      toggleStatusButton: false,
      api_key: 'apiKey2',
      secret_key: 'secretKey2',
      endpoint_url: 'https://api.example2.com',
      auto_order_confirm: false
    };

    const dialogRef = { afterClosed: () => of(mockAggregator) };
    spyOn(dialog, 'open').and.returnValue(dialogRef as any);

    component.addAggregator();

    expect(dialog.open).toHaveBeenCalledWith(AddAggregatorDialogComponent, { disableClose: true });
    expect(component.aggregators.length).toBe(1); // Assuming mock data is returned and the list updates
  });

  it('should handle null or empty aggregator list from service', () => {
    spyOn(service, 'getAggregators').and.returnValue(of({
      statusCode: 200,       // statusCode is present
      data: [],              // empty data array
      message: 'Success',    // Include message (required by CommonResponseJson)
      success: 'true'  ,      // success should be a string, not a boolean
      pagination: {
        pageSize: 0,
        totalItems: 0,
        currentPage: 0,
      }
    }));
  
    component.getAggregator();
  
    expect(component.aggregators.length).toBe(0); // Verify that the aggregator list is empty
  });

  it('should toggle status of an aggregator', () => {
    const mockAggregator: Aggregator = {
      id: '1',
      aggregator_name: 'Aggregator 1',
      status: 'active',
      toggleStatusButton: true,
      api_key: 'apiKey1',
      secret_key: 'secretKey1',
      endpoint_url: 'https://api.example.com',
      auto_order_confirm: false
    };

    component.toggleStatus(mockAggregator);

    expect(service.updateAggregator).toHaveBeenCalledWith(mockAggregator); // Verify update call
    expect(mockAggregator.status).toBe('inactive'); // Status should toggle
  });

  it('should handle error while updating aggregator status', () => {
    const mockAggregator: Aggregator = {
      id: '1',
      aggregator_name: 'Aggregator 1',
      status: 'active',
      toggleStatusButton: true,
      api_key: 'apiKey1',
      secret_key: 'secretKey1',
      endpoint_url: 'https://api.example.com',
      auto_order_confirm: false
    };
    spyOn(service, 'updateAggregator').and.returnValue(throwError('Error updating aggregator'));

    component.toggleStatus(mockAggregator);

    expect(component.isErrorOccur).toBeTrue();
    expect(component.errorMsg).toBe('Failed to update');
  });

  it('should edit an aggregator and update the list', () => {
    const mockAggregator: Aggregator = {
      id: '1',
      aggregator_name: 'Aggregator 1',
      status: 'active',
      toggleStatusButton: true,
      api_key: 'apiKey1',
      secret_key: 'secretKey1',
      endpoint_url: 'https://api.example.com',
      auto_order_confirm: false
    };
    const dialogRef = { afterClosed: () => of({ success: true, data: mockAggregator }) };
    spyOn(dialog, 'open').and.returnValue(dialogRef as any);

    component.editAggregator(mockAggregator);

    expect(dialog.open).toHaveBeenCalledWith(EditAggregatorDialogComponent, { data: { ...mockAggregator } });
    expect(service.updateAggregator).toHaveBeenCalledWith(mockAggregator);
    expect(component.aggregators.length).toBeGreaterThan(0); // List should be updated
  });

  it('should show info message if edit is canceled', () => {
    const mockAggregator: Aggregator = {
      id: '1',
      aggregator_name: 'Aggregator 1',
      status: 'active',
      toggleStatusButton: true,
      api_key: 'apiKey1',
      secret_key: 'secretKey1',
      endpoint_url: 'https://api.example.com',
      auto_order_confirm: false
    };
    const dialogRef = { afterClosed: () => of({ success: false, data: mockAggregator }) };
    spyOn(dialog, 'open').and.returnValue(dialogRef as any);

    spyOn(toaster, 'info');
    component.editAggregator(mockAggregator);

    expect(toaster.info).toHaveBeenCalledWith('changes will not happen', 'Information', {
      timeOut: 3500,
      progressBar: true,
      positionClass: 'toast-top-center'
    });
  });


  it('should show success toast message when copied to clipboard', () => {
    spyOn(toaster, 'success');

    component.onClipboardCopy(true);

    expect(toaster.success).toHaveBeenCalledWith('Copied to Clipboard', 'Successfully', {
      positionClass: 'toast-bottom-right',
      progressBar: true,
      timeOut: 2500
    });
  });

  it('should close inline error message', () => {
    component.isErrorOccur = true;
    component.errorMsg = 'Some error occurred';

    component.closeInlineError();

    expect(component.isErrorOccur).toBeFalse();
    expect(component.errorMsg).toBe('');
  });

});
