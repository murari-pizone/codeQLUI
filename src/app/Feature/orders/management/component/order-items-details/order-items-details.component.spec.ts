import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsDetailsComponent } from './order-items-details.component';

describe('OrderItemsDetailsComponent', () => {
  let component: OrderItemsDetailsComponent;
  let fixture: ComponentFixture<OrderItemsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderItemsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderItemsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
