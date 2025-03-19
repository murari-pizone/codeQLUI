import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexesListComponent } from './texes-list.component';

describe('TexesListComponent', () => {
  let component: TexesListComponent;
  let fixture: ComponentFixture<TexesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TexesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
