import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersListComponent } from './modifiers-list.component';

describe('ModifiersListComponent', () => {
  let component: ModifiersListComponent;
  let fixture: ComponentFixture<ModifiersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
