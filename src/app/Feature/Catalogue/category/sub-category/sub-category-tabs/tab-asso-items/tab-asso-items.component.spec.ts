import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAssoItemsComponent } from './tab-asso-items.component';

describe('TabAssoItemsComponent', () => {
  let component: TabAssoItemsComponent;
  let fixture: ComponentFixture<TabAssoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabAssoItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabAssoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
