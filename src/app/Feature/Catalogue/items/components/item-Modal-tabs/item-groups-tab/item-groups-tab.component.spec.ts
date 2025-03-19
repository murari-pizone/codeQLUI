import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGroupsTabComponent } from './item-groups-tab.component';

describe('ItemGroupsTabComponent', () => {
  let component: ItemGroupsTabComponent;
  let fixture: ComponentFixture<ItemGroupsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemGroupsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemGroupsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
