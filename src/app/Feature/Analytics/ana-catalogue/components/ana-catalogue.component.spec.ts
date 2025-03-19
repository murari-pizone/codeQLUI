import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaCatalogueComponent } from './ana-catalogue.component';

describe('AnaCatalogueComponent', () => {
  let component: AnaCatalogueComponent;
  let fixture: ComponentFixture<AnaCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
