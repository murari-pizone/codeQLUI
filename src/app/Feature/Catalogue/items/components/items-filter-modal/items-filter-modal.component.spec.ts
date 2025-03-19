import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsFilterModalComponent } from './items-filter-modal.component';

describe('ItemsFilterComponent', () => {
  let component: ItemsFilterModalComponent;
  let fixture: ComponentFixture<ItemsFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsFilterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
