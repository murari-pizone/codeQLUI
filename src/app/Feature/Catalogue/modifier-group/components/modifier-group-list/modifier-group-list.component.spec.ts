import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierGroupListComponent } from './modifier-group-list.component';

describe('ModifierGroupComponent', () => {
  let component: ModifierGroupListComponent;
  let fixture: ComponentFixture<ModifierGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
