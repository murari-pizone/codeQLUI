import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersTabBasicInfoComponent } from './modifiers-tab-basic-info.component';

describe('ModifiersTabBasicInfoComponent', () => {
  let component: ModifiersTabBasicInfoComponent;
  let fixture: ComponentFixture<ModifiersTabBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersTabBasicInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersTabBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
