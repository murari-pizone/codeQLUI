import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedModifierComponent } from './nested-modifier.component';

describe('NestedModifierComponent', () => {
  let component: NestedModifierComponent;
  let fixture: ComponentFixture<NestedModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedModifierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
