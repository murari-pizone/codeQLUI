import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesChargesTabComponent } from './taxes-charges-tab.component';

describe('TaxesChargesTabComponent', () => {
  let component: TaxesChargesTabComponent;
  let fixture: ComponentFixture<TaxesChargesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesChargesTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesChargesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
