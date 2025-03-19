import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemLocationsComponent } from './item-locations.component';

describe('ItemLocationsComponent', () => {
  let component: ItemLocationsComponent;
  let fixture: ComponentFixture<ItemLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemLocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
