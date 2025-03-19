import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModelComponent } from './model.component';

describe('ModelComponent', () => {
  let component: ModelComponent;
  let fixture: ComponentFixture<ModelComponent>;
  let clickToSureSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelComponent);
    component = fixture.componentInstance;

    // Spy on the clickToSure emitter
    clickToSureSpy = spyOn(component.clickToSure, 'emit');
    fixture.detectChanges();
  });

  it('should emit the event when clickToSureEmit is called', () => {
    // Act
    component.clickToSureEmit();

    // Assert
    expect(clickToSureSpy).toHaveBeenCalled();
  });

  it('should emit the correct value when clickToSureEmit is called', () => {
    // Arrange
    const expectedValue = { someData: 'test' };

    // Act
    component.clickToSure.emit(expectedValue);

    // Assert
    expect(clickToSureSpy).toHaveBeenCalledWith(expectedValue);
  });
});
