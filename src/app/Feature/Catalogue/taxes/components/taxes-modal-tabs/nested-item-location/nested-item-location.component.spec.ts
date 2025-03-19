import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedItemLocationComponent } from './nested-item-location.component';

describe('NestedItemLocationComponent', () => {
  let component: NestedItemLocationComponent;
  let fixture: ComponentFixture<NestedItemLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestedItemLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NestedItemLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
