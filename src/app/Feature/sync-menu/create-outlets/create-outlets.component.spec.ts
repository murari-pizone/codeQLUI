import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutletsComponent } from './create-outlets.component';

describe('CreateOutletsComponent', () => {
  let component: CreateOutletsComponent;
  let fixture: ComponentFixture<CreateOutletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOutletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOutletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
