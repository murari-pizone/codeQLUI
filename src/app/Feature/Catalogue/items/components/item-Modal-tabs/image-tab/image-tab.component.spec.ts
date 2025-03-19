import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTabComponent } from './image-tab.component';

describe('ImageTabComponent', () => {
  let component: ImageTabComponent;
  let fixture: ComponentFixture<ImageTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
