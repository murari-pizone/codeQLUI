import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersModalComponent } from './modifiers-modal.component';

describe('ModifiersModalComponent', () => {
  let component: ModifiersModalComponent;
  let fixture: ComponentFixture<ModifiersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
