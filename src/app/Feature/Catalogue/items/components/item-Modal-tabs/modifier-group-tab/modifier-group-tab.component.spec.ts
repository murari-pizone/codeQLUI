import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierGroupTabComponent } from './modifier-group-tab.component';

describe('ModifierGroupTabComponent', () => {
  let component: ModifierGroupTabComponent;
  let fixture: ComponentFixture<ModifierGroupTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierGroupTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierGroupTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
