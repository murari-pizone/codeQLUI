import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBaseInfoComponent } from './tab-base-info.component';

describe('TabBaseInfoComponent', () => {
  let component: TabBaseInfoComponent;
  let fixture: ComponentFixture<TabBaseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabBaseInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
