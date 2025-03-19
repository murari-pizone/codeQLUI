import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierGroupItemsTabComponent } from './modifier-group-items-tab.component';

describe('ItemsTabComponent', () => {
  let component: ModifierGroupItemsTabComponent;
  let fixture: ComponentFixture<ModifierGroupItemsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierGroupItemsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierGroupItemsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
