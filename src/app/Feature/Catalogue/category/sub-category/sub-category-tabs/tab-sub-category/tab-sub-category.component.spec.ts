import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSubCategoryComponent } from './tab-sub-category.component';

describe('TabSubCategoryComponent', () => {
  let component: TabSubCategoryComponent;
  let fixture: ComponentFixture<TabSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSubCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
