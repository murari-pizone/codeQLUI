import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncTrackComponent } from './sync-track.component';

describe('SyncTrackComponent', () => {
  let component: SyncTrackComponent;
  let fixture: ComponentFixture<SyncTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
