import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InlineErrorMsgComponent } from './inline-error-msg.component';
import { By } from '@angular/platform-browser';

describe('InlineErrorMsgComponent', () => {
  let component: InlineErrorMsgComponent;
  let fixture: ComponentFixture<InlineErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log errorMsg in the constructor', () => {
    component.errorMsg = 'Test error message';
  });

  it('should display errorMsg in the template', () => {
    component.errorMsg = 'This is an error message';
    fixture.detectChanges(); // Trigger change detection to update the DOM
    
    const errorMessageElement = fixture.debugElement.query(By.css('.error-msg'));
    const nativeElement = errorMessageElement.nativeElement as HTMLElement;  // Explicitly type as HTMLElement
  
    expect(nativeElement.textContent).toContain('This is an error message');
  });

  it('should emit an event when closeEmit is called', () => {
    spyOn(component.crossClick, 'emit'); // Spy on the emit method of crossClick
    component.closeEmit(); // Call the method
    expect(component.crossClick.emit.bind(component)).toHaveBeenCalled();
  });

  it('should log "empty" when empty() is called', () => {
    component.empty();
  });
  it('should display empty errorMsg if errorMsg is empty', () => {
    component.errorMsg = '';
    fixture.detectChanges();
    const errorMessageElement = fixture.debugElement.query(By.css('.error-msg'));
  
    // Cast the nativeElement to HTMLElement explicitly
    const nativeElement = errorMessageElement.nativeElement as HTMLElement;
  
    // Ensure no message is displayed
    expect(nativeElement.textContent).toBe(' ');
  });
});
