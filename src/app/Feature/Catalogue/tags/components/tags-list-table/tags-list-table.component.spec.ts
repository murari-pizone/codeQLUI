import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListTableComponent } from './tags-list-table.component';

describe('TagsListTableComponent', () => {
  let component: TagsListTableComponent;
  let fixture: ComponentFixture<TagsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsListTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TagsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
