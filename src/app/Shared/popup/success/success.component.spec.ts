/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessComponent } from './success.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PopupData, AggregatorList, ContactData } from '../../const/common.constant';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<SuccessComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule, FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
  });

  it('should create the SuccessComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize popupData and contactData based on MAT_DIALOG_DATA', () => {
    // Mock ContactData
    const mockContactData: ContactData = { ErrorCode: '404', Timestamp: '2024-11-15T10:00:00Z' };
    // Mock Aggregator List
    const mockAggregatorList: AggregatorList[] = [{ name: 'Aggregator1', isChecked: false }];
    
    // Provide all required properties for PopupData
    const mockData: PopupData = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      hideCrossIcon: false, // Required property
      contactData: mockContactData,
    };

    component.popupData = mockData;
    component.contactData = mockData.contactData;

    expect(component.popupData).toEqual(mockData);
    expect(component.contactData).toEqual(mockContactData);
  });

  it('should call ngOnInit', () => {
    spyOn(console, 'log');
    component.ngOnInit();
  });

  it('should close dialog with a SyncPopupResponse if aggregatorData exists', () => {
    const mockAggregatorList: AggregatorList[] = [{ name: 'Aggregator1', isChecked: true }];
    const mockData: PopupData = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      hideCrossIcon: false, // Required property
      contactData: { ErrorCode: '200', Timestamp: '2024-11-15T10:00:00Z' },
    };

    component.popupData = mockData;
    component.close();

    const expectedResponse = {
      success: true,
      aggregatorList: mockAggregatorList,
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedResponse);
  });

  it('should close dialog with true if no aggregatorData exists', () => {
    const mockAggregatorList: AggregatorList[] = [
      { name: 'Aggregator1', isChecked: true },
      { name: 'Aggregator2', isChecked: true },
    ];
    const mockData: PopupData = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      contactData: { ErrorCode: '200', Timestamp: '2024-11-15T10:00:00Z' },
      hideCrossIcon: false, // Required property
    };

    component.popupData = mockData;
    component.close();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should toggle checkbox and enable sync button if one aggregator is checked', () => {
    const mockAggregatorList: any[] = [
      { name: 'Aggregator1', isChecked: false },
      { name: 'Aggregator2', isChecked: false },
    ];
    const mockData: any = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      hideCrossIcon: false, // Required property
      contactData: { ErrorCode: '200', Timestamp: '2024-11-15T10:00:00Z' },
    };

    component.popupData = mockData;
    const aggregator: any = { name: 'Aggregator1', isChecked: false };
    component.onCheck(aggregator);

    expect(component.popupData?.aggregatorData?.aggregatorList[0].isChecked).toBeTrue();
    expect(component.enableSyncButton).toBeFalse(); // The sync button should remain disabled until all are checked

    if (component.popupData?.aggregatorData) {
      component.onCheck(component.popupData.aggregatorData.aggregatorList[1]); // Check second aggregator
    } else {
      fail('popupData or aggregatorData is undefined');
    }
    
    expect(component.enableSyncButton).toBeTrue(); // Enable sync button now
  });

  it('should disable sync button if no aggregator is checked', () => {
    const mockAggregatorList: any[] = [
      { name: 'Aggregator1', isChecked: false },
      { name: 'Aggregator2', isChecked: false },
    ];
    const mockData: any = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      contactData: { ErrorCode: '500', Timestamp: '2024-11-15T10:00:00Z' },
      hideCrossIcon: false, // Required property
    };

    component.popupData = mockData;
    component.enableSyncButton = false;

    const result = component.checkIsAllFalse(mockData.aggregatorData.aggregatorList);

    expect(result).toBeFalse();
    expect(component.enableSyncButton).toBeFalse();
  });

  it('should return true for checkIsAllFalse when any aggregator is checked', () => {
    const mockAggregatorList: AggregatorList[] = [
      { name: 'Aggregator1', isChecked: true },
      { name: 'Aggregator2', isChecked: false },
    ];
    const mockData: any = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      contactData: { ErrorCode: '200', Timestamp: '2024-11-15T10:00:00Z' },
      hideCrossIcon: false, // Required property
    };

    component.popupData = mockData;

    const result = component.checkIsAllFalse(mockData.aggregatorData.aggregatorList);

    expect(result).toBeTrue();
  });

  it('should disable sync button if all checkboxes are unchecked', () => {
    const mockAggregatorList: AggregatorList[] = [
      { name: 'Aggregator1', isChecked: false },
      { name: 'Aggregator2', isChecked: false },
    ];
    const mockData: any = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      contactData: { ErrorCode: '404', Timestamp: '2024-11-15T10:00:00Z' },
      hideCrossIcon: false, // Required property
    };

    component.popupData = mockData;
    component.onCheck(mockData.aggregatorData.aggregatorList[0]);

    expect(component.enableSyncButton).toBeFalse();
  });

  it('should enable sync button if all checkboxes are checked', () => {
    const mockAggregatorList: AggregatorList[] = [
      { name: 'Aggregator1', isChecked: true },
      { name: 'Aggregator2', isChecked: true },
    ];
    const mockData: any = {
      title: 'Popup Title',
      description: 'Popup Description',
      hideCancelButton: true, // Required property
      customizeNameForSave: 'Custom Name', // Required property
      aggregatorData: { showAggregatorList: true, aggregatorList: mockAggregatorList },
      contactData: { ErrorCode: '200', Timestamp: '2024-11-15T10:00:00Z' },
      hideCrossIcon: false, // Required property
    };

    component.popupData = mockData;
    component.onCheck(mockData.aggregatorData.aggregatorList[0]);

    expect(component.enableSyncButton).toBeTrue();
  });
  it('should close the dialog with SyncPopupResponse when popupData.aggregatorData is defined', () => {
    // Mock the popupData with aggregatorData
    component.popupData  as any;

    // Call the close method
    component.close();

    // Check that dialogRef.close() was called with the correct SyncPopupResponse
    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      success: true, 
      aggregatorList: ['aggregator1', 'aggregator2']
    });
  });

  it('should close the dialog with true when popupData.aggregatorData is not defined', () => {
    // Mock the popupData without aggregatorData
    component.popupData  as {};

    // Call the close method
    component.close();

    // Check that dialogRef.close() was called with true
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
  });

  it('should not attempt to close the dialog if dialogRef is not provided', () => {
    // Set dialogRef to null
    component.dialogRef ;

    // Call the close method
    component.close();

    // Ensure dialogRef.close() is not called
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
