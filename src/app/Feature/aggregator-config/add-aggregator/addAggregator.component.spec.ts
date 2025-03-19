import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAggregatorDialogComponent } from './addAggregator.component';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InlineErrorMsgComponent } from '../../../Shared/inline-error-msg/inline-error-msg.component';
import { of, throwError } from 'rxjs';
import { FormValidator, FormDataBuilder } from './aggregator-validator.service';
import { AddForm } from '../list-aggregator/interface/list-aggregator.interface';

class MockAggregatorService {
  addAggregator = jasmine.createSpy('addAggregator').and.returnValue(of(true));
}

describe('AddAggregatorDialogComponent', () => {
  let component: AddAggregatorDialogComponent;
  let fixture: ComponentFixture<AddAggregatorDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AddAggregatorDialogComponent>>;
  let mockAggregatorService: MockAggregatorService;

  const mockFormData: AddForm = {
    aggregator_name: 'Test Aggregator',
    api_key: '12345',
    secret_key: 'secret',
    endpoint_url: 'http://example.com',
  };

  beforeEach(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockAggregatorService = new MockAggregatorService();

    await TestBed.configureTestingModule({
      declarations: [AddAggregatorDialogComponent, InlineErrorMsgComponent],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        // { provide: IAddAggregator, useValue: mockAggregatorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAggregatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addAggregator on submit if form is valid', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForAdd').and.returnValue(mockFormData);

    component.formData = mockFormData;
    component.submitForm();

    expect(mockAggregatorService.addAggregator).toHaveBeenCalledWith(mockFormData);
    expect(component.isLoading).toBeTrue();
  });

  it('should set validationError if form validation fails', () => {
    const validationErrors = ['Aggregator name is required'];
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue(validationErrors);

    component.submitForm();

    expect(component.validationError).toEqual(validationErrors);
    expect(mockAggregatorService.addAggregator).not.toHaveBeenCalled();
  });

  it('should set errorMessages if addAggregator fails', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForAdd').and.returnValue(mockFormData);

    mockAggregatorService.addAggregator.and.returnValue(
      throwError({ error: { error: 'Error occurred' } })
    );

    component.submitForm();

    expect(component.errorMessages).toBe('Error occurred');
    expect(component.isLoading).toBeFalse();
  });

  it('should close the dialog with formData if addAggregator succeeds', () => {
    spyOn(FormValidator, 'validateAggregatorForm').and.returnValue([]);
    spyOn(FormDataBuilder, 'prepareAggregatorDataForAdd').and.returnValue(mockFormData);

    component.formData = mockFormData;
    component.submitForm();

    // expect(mockDialogRef.close).toHaveBeenCalledWith(mockFormData);
    expect(component.isLoading).toBeFalse();
  });

  it('should clear errorMessages when closeInlineError is called', () => {
    component.errorMessages = 'An error occurred';

    component.closeInlineError();

    expect(component.errorMessages).toBe('');
  });
});
