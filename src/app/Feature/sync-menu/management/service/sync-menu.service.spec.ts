import { TestBed } from '@angular/core/testing';

import { SyncMenuService } from './sync-menu-service';

describe('SyncMenuService', () => {
  let service: SyncMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
