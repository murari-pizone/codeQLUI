import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMapComponent } from './small-map.component';

describe('SmallMapComponent', () => {
  let component: SmallMapComponent;
  let fixture: ComponentFixture<SmallMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
