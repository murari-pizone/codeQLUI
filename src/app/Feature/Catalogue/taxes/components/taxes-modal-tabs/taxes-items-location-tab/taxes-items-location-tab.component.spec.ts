import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaxesItemsLocationTabComponent } from './taxes-items-location-tab.component';

describe('TaxesItemsLocationTabComponent', () => {
  let component: TaxesItemsLocationTabComponent;
  let fixture: ComponentFixture<TaxesItemsLocationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesItemsLocationTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesItemsLocationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
