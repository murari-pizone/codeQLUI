import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldTabComponent } from './custom-field-tab.component';

describe('CustomFieldTabComponent', () => {
  let component: CustomFieldTabComponent;
  let fixture: ComponentFixture<CustomFieldTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomFieldTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFieldTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
