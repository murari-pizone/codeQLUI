import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersTabParentGroupsComponent } from './modifiers-tab-parent-groups.component';

describe('ModifiersTabParentGroupsComponent', () => {
  let component: ModifiersTabParentGroupsComponent;
  let fixture: ComponentFixture<ModifiersTabParentGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersTabParentGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersTabParentGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
