import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedItemsTabComponent } from './recommended-items-tab.component';

describe('RecommendedItemsTabComponent', () => {
  let component: RecommendedItemsTabComponent;
  let fixture: ComponentFixture<RecommendedItemsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedItemsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedItemsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
