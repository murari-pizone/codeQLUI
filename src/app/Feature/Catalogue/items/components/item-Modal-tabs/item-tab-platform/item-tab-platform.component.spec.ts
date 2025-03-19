import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTabPlatformComponent } from './item-tab-platform.component';

describe('ItemTabPlatformComponent', () => {
  let component: ItemTabPlatformComponent;
  let fixture: ComponentFixture<ItemTabPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTabPlatformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTabPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
