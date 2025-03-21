import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationComponent } from './addLocation.component';

describe('AddLocationComponent', () => {
  let component: AddLocationComponent;
  let fixture: ComponentFixture<AddLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
