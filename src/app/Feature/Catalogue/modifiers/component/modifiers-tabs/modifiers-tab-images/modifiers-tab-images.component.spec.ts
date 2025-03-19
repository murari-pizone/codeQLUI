import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiersTabImagesComponent } from './modifiers-tab-images.component';

describe('ModifiersTabImagesComponent', () => {
  let component: ModifiersTabImagesComponent;
  let fixture: ComponentFixture<ModifiersTabImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifiersTabImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiersTabImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
