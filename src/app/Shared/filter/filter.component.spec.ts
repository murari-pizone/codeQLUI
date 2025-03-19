import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let filterEmitSpy: jasmine.Spy;
  let changeDropDownValueSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,FilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    
    // Spying on the EventEmitter methods
    filterEmitSpy = spyOn(component.filter, 'emit');
    fixture.detectChanges();
  });

  // Test for the ngOnInit method to ensure debounce and distinctUntilChanged are working
  it('should subscribe to filterData and emit the filtered value after debounce', (done) => {
    // Arrange
    const inputValue = 'Confirmed';

    // Simulate user input
    component.onChangeInput(inputValue);

    // Act: Wait for debounceTime to trigger and distinctUntilChanged to pass
    component.filterData.pipe(debounceTime(600), distinctUntilChanged()).subscribe(value => {
      // Assert: Make sure the filter.emit was called with the correct value
      value
      expect(filterEmitSpy).toHaveBeenCalledWith(inputValue);
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call
      done();
    });
  });

  // Test for the filterEmit method, ensuring it emits the correct value
  it('should emit filter value when filterEmit is called directly', () => {
    // Arrange
    const filterValue = 'Pending';

    // Act: Call filterEmit directly
    component.filterEmit(filterValue);

    // Assert: Check if filter.emit() was called with the right value
    expect(filterEmitSpy).toHaveBeenCalledWith(filterValue);
  });

  // Test for the onChangeInput method, ensuring it pushes value to filterData
  it('should push value to filterData when onChangeInput is called', (done) => {
    // Arrange
    const inputValue = 'Delivered';

    // Act: Call onChangeInput which triggers filterData.next()
    component.onChangeInput(inputValue);

    // Assert: Wait for debounceTime and distinctUntilChanged to process the value
    component.filterData.pipe(debounceTime(600), distinctUntilChanged()).subscribe(value => {
      // Assert: Verify that the value emitted by filterData is the same as the inputValue
      expect(value).toBe(inputValue);
      //eslint-disable-next-line @typescript-eslint/no-unsafe-call
      done();
    });
  });

  // Test for the selection method, ensuring it emits the selected value
  it('should emit selected value when selection is called', () => {
    // Arrange
    const selectedValue = 'Confirmed';
    component.selectedValue = selectedValue;

    // Act: Call selection method
    component.selection();

    // Assert: Ensure changeDropDownValue.emit is called with the selected value
    expect(changeDropDownValueSpy).toHaveBeenCalledWith(selectedValue);
  });

  // Test for the default dropDownOptions
  it('should have default dropDownOptions', () => {
    // Arrange
    const defaultOptions = ['All', 'Pending', 'Confirmed', 'Delivered', 'Cancled', 'Accepted'];

    // Assert: Check the default value of dropDownOptions
    expect(component.dropDownOptions).toEqual(defaultOptions);
  });

  // Test for the selection with a custom value for selectedValue
  it('should emit custom selected value when selection is called', () => {
    // Arrange
    const customSelectedValue = 'Accepted';
    component.selectedValue = customSelectedValue;

    // Act: Call selection method
    component.selection();

    // Assert: Ensure the emit method is called with the custom value
    expect(changeDropDownValueSpy).toHaveBeenCalledWith(customSelectedValue);
  });
});
