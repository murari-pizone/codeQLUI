import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessEditComponent } from './success-edit.component';
import { EventEmitter } from '@angular/core';

describe('SuccessEditComponent', () => {
  let component: SuccessEditComponent;
  let fixture: ComponentFixture<SuccessEditComponent>;
  let normalStateEmitter: EventEmitter<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessEditComponent);
    component = fixture.componentInstance;
    normalStateEmitter = component.normalState;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test to ensure the normalState event is emitted correctly when hideSuccess() is called
  it('should emit normalState event when hideSuccess() is called', () => {
    spyOn(normalStateEmitter, 'emit'); // Spy on the emit method to check if it was called

    component.hideSuccess(); // Call the method that should emit the event

    expect(normalStateEmitter.emit.bind(normalStateEmitter)).toHaveBeenCalled(); // Check that emit was called
  });

  // Test to verify that the emit method is called exactly once
  it('should emit normalState event exactly once when hideSuccess() is called', () => {
    spyOn(normalStateEmitter, 'emit');

    component.hideSuccess();

    expect(normalStateEmitter.emit.bind(normalStateEmitter)).toHaveBeenCalledTimes(1); // Ensure it was called once
  });
});
