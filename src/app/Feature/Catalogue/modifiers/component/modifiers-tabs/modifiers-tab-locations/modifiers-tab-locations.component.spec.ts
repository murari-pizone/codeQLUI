import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersTabLocationsComponent } from './modifiers-tab-locations.component';

describe('ModifiersTabLocationsComponent', () => {
  let component: ModifiersTabLocationsComponent;
  let fixture: ComponentFixture<ModifiersTabLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersTabLocationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersTabLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
