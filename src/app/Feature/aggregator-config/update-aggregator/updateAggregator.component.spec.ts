import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAggregatorDialogComponent } from './updateAggregator.component';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InlineErrorMsgComponent } from '../../../Shared/inline-error-msg/inline-error-msg.component';
import { of, throwError } from 'rxjs';
import { ToastrService as ToasterService } from 'ngx-toastr';
import { Aggregator } from '../list-aggregator/interface/list-aggregator.interface';
import { FormValidator, FormDataBuilder } from '../add-aggregator/aggregator-validator.service';

class MockAggregatorService {
  updateAggregator = jasmine.createSpy('updateAggregator').and.returnValue(of(true));
}

class MockToastrService {
  success = jasmine.createSpy('success');
  error = jasmine.createSpy('error');
}

describe('EditAggregatorDialogComponent', () => {
  let component: EditAggregatorDialogComponent;
  let fixture: ComponentFixture<EditAggregatorDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<EditAggregatorDialogComponent>>;
  let mockAggregatorService: MockAggregatorService;
  let mockToasterService: MockToastrService;

  const mockData: Aggregator = {
      id: '1',
      aggregator_name: 'Test Aggregator',
      api_key: '',
      secret_key: '',
      endpoint_url: '',
      status: '',
      toggleStatusButton: false,
      auto_order_confirm: false
  };

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockAggregatorService = new MockAggregatorService();
    mockToasterService = new MockToastrService();

    await TestBed.configureTestingModule({
      declarations: [EditAggregatorDialogComponent, InlineErrorMsgComponent],
      imports: [FormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockDialogRef },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        // { provide: IUpdateAggregator, useValue: mockAggregatorService },
        { provide: ToasterService, useValue: mockToasterService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAggregatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize previousData with a deep copy of the input data', () => {
    expect(component.previousData).toEqual(mockData);
    expect(component.previousData).not.toBe(mockData);
  });

  it('should call updateAggregator on submit if form is valid and data has changed', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForEdit').and.returnValue(mockData);
    // spyOn(isChangesHappen, 'call').and.returnValue(1);

    component.submitForm();

    expect(mockAggregatorService.updateAggregator).toHaveBeenCalledWith(mockData, mockData.id);
    expect(component.isLoading).toBeTrue();
  });

  it('should set validationError if form validation fails', () => {
    const validationErrors = ['Name is required'];
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue(validationErrors);

    component.submitForm();

    expect(component.validationError).toEqual(validationErrors);
    expect(mockAggregatorService.updateAggregator).not.toHaveBeenCalled();
  });

  it('should set errorMessages if updateAggregator fails', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForEdit').and.returnValue(mockData);
    // spyOn(isChangesHappen, 'call').and.returnValue(1);

    mockAggregatorService.updateAggregator.and.returnValue(
      throwError({ message: 'Error occurred' })
    );

    component.submitForm();

    expect(component.errorMessages).toBe('Error occurred');
    expect(component.isLoading).toBeFalse();
  });

  it('should close the dialog with true if updateAggregator succeeds', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForEdit').and.returnValue(mockData);
    // spyOn(isChangesHappen, 'call').and.returnValue(1);

    component.submitForm();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog with false if no changes are detected', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForEdit').and.returnValue(mockData);
    // spyOn(isChangesHappen, 'call' ).and.returnValue(0);

    component.submitForm();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
    expect(mockAggregatorService.updateAggregator).not.toHaveBeenCalled();
  });

  it('should clear errorMessages when closeInlineError is called', () => {
    component.errorMessages = 'An error occurred';

    component.closeInlineError();

    expect(component.errorMessages).toBe('');
  });
});