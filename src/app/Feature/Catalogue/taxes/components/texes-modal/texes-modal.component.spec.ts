import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexesModalComponent } from './texes-modal.component';

describe('TexesModalComponent', () => {
  let component: TexesModalComponent;
  let fixture: ComponentFixture<TexesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TexesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
